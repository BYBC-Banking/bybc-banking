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
    const { name, accountNumber, bankName, phoneNumber } = await req.json()

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

    // Validate input
    if (!name || !accountNumber || !bankName) {
      return new Response(
        JSON.stringify({ error: 'Name, account number, and bank name are required' }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 400 }
      )
    }

    // Create beneficiary
    const { data: beneficiary, error: beneficiaryError } = await supabase
      .from('beneficiaries')
      .insert({
        user_id: user.id,
        name: name,
        account_number: accountNumber,
        bank_name: bankName,
        phone_number: phoneNumber || null
      })
      .select()
      .single()

    if (beneficiaryError) {
      console.error('Beneficiary error:', beneficiaryError)
      return new Response(
        JSON.stringify({ error: 'Failed to add beneficiary' }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 500 }
      )
    }

    console.log('Beneficiary added successfully:', beneficiary.id)

    return new Response(
      JSON.stringify({ 
        success: true, 
        beneficiary: beneficiary,
        message: 'Beneficiary added successfully'
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