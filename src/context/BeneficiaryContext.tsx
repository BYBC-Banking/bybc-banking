
import { createContext, useContext, useState, ReactNode } from "react";

interface Beneficiary {
  id: string;
  name: string;
  phoneNumber: string;
}

interface BeneficiaryContextType {
  beneficiaries: Beneficiary[];
  addBeneficiary: (beneficiary: Omit<Beneficiary, 'id'>) => void;
}

const BeneficiaryContext = createContext<BeneficiaryContextType | undefined>(undefined);

export const useBeneficiary = () => {
  const context = useContext(BeneficiaryContext);
  if (!context) {
    throw new Error("useBeneficiary must be used within a BeneficiaryProvider");
  }
  return context;
};

interface BeneficiaryProviderProps {
  children: ReactNode;
}

export const BeneficiaryProvider = ({ children }: BeneficiaryProviderProps) => {
  const [beneficiaries, setBeneficiaries] = useState<Beneficiary[]>([
    { id: "1", name: "John Doe", phoneNumber: "0123456789" },
    { id: "2", name: "Jane Smith", phoneNumber: "0987654321" },
  ]);

  const addBeneficiary = (beneficiary: Omit<Beneficiary, 'id'>) => {
    const newBeneficiary: Beneficiary = {
      ...beneficiary,
      id: Date.now().toString(),
    };
    setBeneficiaries(prev => [...prev, newBeneficiary]);
  };

  return (
    <BeneficiaryContext.Provider value={{ beneficiaries, addBeneficiary }}>
      {children}
    </BeneficiaryContext.Provider>
  );
};
