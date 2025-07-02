
import { useState } from "react";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useBeneficiaryManagement } from "@/hooks/useBeneficiaryManagement";
import SendPageHeader from "@/components/send/SendPageHeader";
import BeneficiaryList from "@/components/send/BeneficiaryList";
import AddBeneficiaryDialog from "@/components/send/AddBeneficiaryDialog";

const Send = () => {
  const [isAddBeneficiaryOpen, setIsAddBeneficiaryOpen] = useState(false);
  const { beneficiaries, handleBeneficiarySelect, addBeneficiary } = useBeneficiaryManagement();
  
  const handleAddBeneficiary = () => {
    setIsAddBeneficiaryOpen(true);
  };

  return (
    <div className="bg-gradient-to-br from-white to-slate-100 min-h-screen">
      <div className="container mx-auto max-w-md px-4 py-6">
        <SendPageHeader />
        
        <Button 
          onClick={handleAddBeneficiary} 
          className="w-full mb-6 flex items-center justify-center gap-2"
        >
          <Plus className="h-4 w-4" />
          Add Beneficiary
        </Button>
        
        <BeneficiaryList 
          beneficiaries={beneficiaries}
          onBeneficiarySelect={handleBeneficiarySelect}
        />
        
        <AddBeneficiaryDialog
          isOpen={isAddBeneficiaryOpen}
          onClose={() => setIsAddBeneficiaryOpen(false)}
          onAddBeneficiary={addBeneficiary}
        />
      </div>
    </div>
  );
};

export default Send;
