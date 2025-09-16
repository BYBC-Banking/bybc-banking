import { supabase } from '@/integrations/supabase/client';

export interface SendMoneyRequest {
  amount: number;
  reference: string;
  beneficiaryName: string;
  beneficiaryAccount: string;
  beneficiaryBank: string;
  fromAccountId: string;
}

export const sendMoney = async (transferData: SendMoneyRequest) => {
  const { data: { session } } = await supabase.auth.getSession();
  
  if (!session) {
    throw new Error('Not authenticated');
  }

  const response = await supabase.functions.invoke('send-money', {
    body: transferData,
    headers: {
      Authorization: `Bearer ${session.access_token}`,
    },
  });

  if (response.error) {
    throw new Error(response.error.message);
  }

  return response.data;
};