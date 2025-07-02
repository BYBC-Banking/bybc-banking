
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";

export type Beneficiary = {
  id: string;
  name: string;
  accountNumber: string;
  bankName: string;
  recentAmount?: number;
};

export const useBeneficiaryManagement = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  
  const [beneficiaries, setBeneficiaries] = useState<Beneficiary[]>([
    {
      id: "1",
      name: "Thabo Mbeki",
      accountNumber: "1234567890",
      bankName: "Standard Bank",
      recentAmount: 500
    },
    {
      id: "2",
      name: "Lerato Khumalo",
      accountNumber: "0987654321",
      bankName: "FNB",
      recentAmount: 1500
    },
    {
      id: "3",
      name: "Nomsa Dlamini",
      accountNumber: "5678901234",
      bankName: "Nedbank"
    }
  ]);

  const handleBeneficiarySelect = (beneficiary: Beneficiary) => {
    const params = new URLSearchParams({
      name: beneficiary.name,
      bank: beneficiary.bankName,
      account: beneficiary.accountNumber
    });
    navigate(`/send-money?${params.toString()}`);
  };

  const addBeneficiary = (newBeneficiary: Omit<Beneficiary, 'id'>) => {
    const newId = (beneficiaries.length + 1).toString();
    const beneficiaryToAdd = {
      id: newId,
      ...newBeneficiary
    };
    
    setBeneficiaries([...beneficiaries, beneficiaryToAdd]);
    
    toast({
      title: "Beneficiary Added",
      description: `${newBeneficiary.name} has been added to your beneficiaries`
    });
  };

  return {
    beneficiaries,
    handleBeneficiarySelect,
    addBeneficiary
  };
};
