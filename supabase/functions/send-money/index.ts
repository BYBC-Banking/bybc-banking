import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { amount, reference, beneficiaryName, beneficiaryAccount, beneficiaryBank, fromAccountId } = await req.json()

    // Create Supabase client
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '',
    )

    // Get user from auth header
    const authHeader = req.headers.get('Authorization')!
    const token = authHeader.replace('Bearer ', '')
    const { data: { user }, error: authError } = await supabase.auth.getUser(token)

    if (authError || !user) {
      console.error('Auth error:', authError)
      return new Response(
        JSON.stringify({ error: 'Unauthorized' }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 401 }
      )
    }

    console.log('Processing transfer for user:', user.id)

    // Validate input
    if (!amount || amount <= 0) {
      return new Response(
        JSON.stringify({ error: 'Invalid amount' }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 400 }
      )
    }

    // Get sender's account and check balance
    const { data: fromAccount, error: accountError } = await supabase
      .from('accounts')
      .select('*')
      .eq('id', fromAccountId)
      .eq('user_id', user.id)
      .single()

    if (accountError || !fromAccount) {
      console.error('Account error:', accountError)
      return new Response(
        JSON.stringify({ error: 'Account not found' }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 404 }
      )
    }

    if (fromAccount.balance < amount) {
      return new Response(
        JSON.stringify({ error: 'Insufficient funds' }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 400 }
      )
    }

    // Create transfer record
    const { data: transfer, error: transferError } = await supabase
      .from('transfers')
      .insert({
        from_user_id: user.id,
        from_account_id: fromAccountId,
        amount: amount,
        reference: reference,
        beneficiary_name: beneficiaryName,
        beneficiary_account: beneficiaryAccount,
        beneficiary_bank: beneficiaryBank,
        status: 'completed'
      })
      .select()
      .single()

    if (transferError) {
      console.error('Transfer error:', transferError)
      return new Response(
        JSON.stringify({ error: 'Failed to create transfer' }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 500 }
      )
    }

    // Update sender's account balance
    const { error: balanceError } = await supabase
      .from('accounts')
      .update({ balance: fromAccount.balance - amount })
      .eq('id', fromAccountId)

    if (balanceError) {
      console.error('Balance update error:', balanceError)
      return new Response(
        JSON.stringify({ error: 'Failed to update balance' }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 500 }
      )
    }

    // Create transaction record
    const { error: transactionError } = await supabase
      .from('transactions')
      .insert({
        account_id: fromAccountId,
        type: 'transfer_out',
        amount: amount,
        description: `Transfer to ${beneficiaryName}`,
        merchant: beneficiaryName,
        category: 'Transfer',
        reference_number: transfer.id,
        status: 'completed'
      })

    if (transactionError) {
      console.error('Transaction error:', transactionError)
    }

    console.log('Transfer completed successfully:', transfer.id)

    return new Response(
      JSON.stringify({ 
        success: true, 
        transferId: transfer.id,
        message: 'Transfer completed successfully'
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )

  } catch (error) {
    console.error('Unexpected error:', error)
    return new Response(
      JSON.stringify({ error: 'Internal server error' }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 500 }
    )
  }
})