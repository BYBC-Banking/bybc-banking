
import { useState } from "react";
import { ArrowLeft, Plus, User } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

type Beneficiary = {
  id: string;
  name: string;
  accountNumber: string;
  bankName: string;
  recentAmount?: number;
};

const Send = () => {
  const { toast } = useToast();
  
  // Mock beneficiaries data
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
  
  const handleAddBeneficiary = () => {
    toast({
      title: "Add Beneficiary",
      description: "This would open the add beneficiary form",
    });
  };
  
  const handleBeneficiarySelect = (beneficiary: Beneficiary) => {
    toast({
      title: "Send Money",
      description: `Selected to send money to ${beneficiary.name}`,
    });
  };

  return (
    <div className="bg-gradient-to-br from-white to-slate-100 min-h-screen">
      <div className="container mx-auto max-w-md px-4 py-6">
        {/* Header */}
        <header className="flex items-center gap-4 mb-6">
          <Link to="/" className="p-2">
            <ArrowLeft className="h-5 w-5" />
          </Link>
          <h1 className="text-2xl font-bold">Send Money</h1>
        </header>
        
        {/* Add Beneficiary Button */}
        <Button 
          onClick={handleAddBeneficiary} 
          className="w-full mb-6 flex items-center justify-center gap-2"
        >
          <Plus className="h-4 w-4" />
          Add Beneficiary
        </Button>
        
        {/* Beneficiaries List */}
        <div className="space-y-4">
          <h2 className="font-medium text-lg">Your Beneficiaries</h2>
          
          {beneficiaries.length > 0 ? (
            beneficiaries.map((beneficiary) => (
              <div
                key={beneficiary.id}
                className="bg-white rounded-xl shadow-sm border p-4 cursor-pointer hover:bg-slate-50 transition-colors"
                onClick={() => handleBeneficiarySelect(beneficiary)}
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
      </div>
    </div>
  );
};

export default Send;
