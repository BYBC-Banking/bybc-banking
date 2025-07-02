
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Beneficiary } from "@/hooks/useBeneficiaryManagement";

interface AddBeneficiaryDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onAddBeneficiary: (beneficiary: Omit<Beneficiary, 'id'>) => void;
}

const AddBeneficiaryDialog = ({ isOpen, onClose, onAddBeneficiary }: AddBeneficiaryDialogProps) => {
  const { toast } = useToast();
  const [newBeneficiary, setNewBeneficiary] = useState({
    name: "",
    accountNumber: "",
    bankName: ""
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewBeneficiary(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = () => {
    if (!newBeneficiary.name || !newBeneficiary.accountNumber || !newBeneficiary.bankName) {
      toast({
        title: "Missing information",
        description: "Please fill in all fields",
        variant: "destructive"
      });
      return;
    }
    
    onAddBeneficiary(newBeneficiary);
    onClose();
    setNewBeneficiary({ name: "", accountNumber: "", bankName: "" });
  };

  const handleClose = () => {
    onClose();
    setNewBeneficiary({ name: "", accountNumber: "", bankName: "" });
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Add New Beneficiary</DialogTitle>
          <DialogDescription>
            Enter the beneficiary's details below to add them to your list.
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="name">Full Name</Label>
            <Input 
              id="name" 
              name="name" 
              placeholder="Enter beneficiary's full name" 
              value={newBeneficiary.name}
              onChange={handleInputChange}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="accountNumber">Account Number</Label>
            <Input 
              id="accountNumber" 
              name="accountNumber" 
              placeholder="Enter account number" 
              value={newBeneficiary.accountNumber}
              onChange={handleInputChange}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="bankName">Bank Name</Label>
            <Input 
              id="bankName" 
              name="bankName" 
              placeholder="Enter bank name" 
              value={newBeneficiary.bankName}
              onChange={handleInputChange}
            />
          </div>
        </div>
        
        <DialogFooter className="sm:justify-end">
          <Button 
            variant="outline" 
            onClick={handleClose}
            className="mr-2"
          >
            Cancel
          </Button>
          <Button onClick={handleSubmit}>
            Add Beneficiary
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AddBeneficiaryDialog;
