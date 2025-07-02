
import { User } from "lucide-react";
import { Beneficiary } from "@/hooks/useBeneficiaryManagement";

interface BeneficiaryListProps {
  beneficiaries: Beneficiary[];
  onBeneficiarySelect: (beneficiary: Beneficiary) => void;
}

const BeneficiaryList = ({ beneficiaries, onBeneficiarySelect }: BeneficiaryListProps) => {
  return (
    <div className="space-y-4">
      <h2 className="font-medium text-lg">Your Beneficiaries</h2>
      
      {beneficiaries.length > 0 ? (
        beneficiaries.map((beneficiary) => (
          <div
            key={beneficiary.id}
            className="bg-white rounded-xl shadow-sm border p-4 cursor-pointer hover:bg-slate-50 transition-colors"
            onClick={() => onBeneficiarySelect(beneficiary)}
          >
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center">
                  <User className="h-5 w-5 text-gray-600" />
                </div>
                <div>
                  <div className="font-medium">{beneficiary.name}</div>
                  <div className="text-xs text-muted-foreground">
                    {beneficiary.bankName} •••• {beneficiary.accountNumber.slice(-4)}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))
      ) : (
        <div className="text-center py-8 text-muted-foreground">
          <p>No beneficiaries added yet</p>
        </div>
      )}
    </div>
  );
};

export default BeneficiaryList;
