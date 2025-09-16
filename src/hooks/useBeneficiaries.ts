import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export interface Beneficiary {
  id: string;
  name: string;
  account_number: string;
  bank_name: string;
  phone_number?: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export const useBeneficiaries = () => {
  const [beneficiaries, setBeneficiaries] = useState<Beneficiary[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  const fetchBeneficiaries = async () => {
    try {
      setLoading(true);
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session) {
        setError('Not authenticated');
        return;
      }

      const response = await supabase.functions.invoke('get-beneficiaries', {
        headers: {
          Authorization: `Bearer ${session.access_token}`,
        },
      });

      if (response.error) {
        throw new Error(response.error.message);
      }

      setBeneficiaries(response.data.beneficiaries);
      setError(null);
    } catch (err) {
      console.error('Error fetching beneficiaries:', err);
      setError(err instanceof Error ? err.message : 'Failed to fetch beneficiaries');
    } finally {
      setLoading(false);
    }
  };

  const addBeneficiary = async (beneficiaryData: {
    name: string;
    accountNumber: string;
    bankName: string;
    phoneNumber?: string;
  }) => {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session) {
        throw new Error('Not authenticated');
      }

      const response = await supabase.functions.invoke('add-beneficiary', {
        body: {
          name: beneficiaryData.name,
          accountNumber: beneficiaryData.accountNumber,
          bankName: beneficiaryData.bankName,
          phoneNumber: beneficiaryData.phoneNumber,
        },
        headers: {
          Authorization: `Bearer ${session.access_token}`,
        },
      });

      if (response.error) {
        throw new Error(response.error.message);
      }

      await fetchBeneficiaries(); // Refresh the list
      toast({
        title: "Beneficiary added",
        description: "Beneficiary has been successfully added.",
      });

      return response.data.beneficiary;
    } catch (err) {
      console.error('Error adding beneficiary:', err);
      const errorMessage = err instanceof Error ? err.message : 'Failed to add beneficiary';
      toast({
        title: "Error",
        description: errorMessage,
        variant: "destructive",
      });
      throw err;
    }
  };

  useEffect(() => {
    fetchBeneficiaries();
  }, []);

  return {
    beneficiaries,
    loading,
    error,
    addBeneficiary,
    refetch: fetchBeneficiaries,
  };
};