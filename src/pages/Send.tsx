import { useState } from "react";
import { ArrowLeft, Plus, User, X } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
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

type Beneficiary = {
  id: string;
  name: string;
  accountNumber: string;
  bankName: string;
  recentAmount?: number;
};

const Send = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [isAddBeneficiaryOpen, setIsAddBeneficiaryOpen] = useState(false);
  const [newBeneficiary, setNewBeneficiary] = useState({
    name: "",
    accountNumber: "",
    bankName: ""
  });
  
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
    setIsAddBeneficiaryOpen(true);
  };
  
  const handleBeneficiarySelect = (beneficiary: Beneficiary) => {
    // Navigate to SendMoney page with beneficiary details
    const params = new URLSearchParams({
      name: beneficiary.name,
      bank: beneficiary.bankName,
      account: beneficiary.accountNumber
    });
    navigate(`/send-money?${params.toString()}`);
  };
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewBeneficiary(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handleSubmitBeneficiary = () => {
    if (!newBeneficiary.name || !newBeneficiary.accountNumber || !newBeneficiary.bankName) {
      toast({
        title: "Missing information",
        description: "Please fill in all fields",
        variant: "destructive"
      });
      return;
    }
    
    const newId = (beneficiaries.length + 1).toString();
    const beneficiaryToAdd = {
      id: newId,
      ...newBeneficiary
    };
    
    setBeneficiaries([...beneficiaries, beneficiaryToAdd]);
    setIsAddBeneficiaryOpen(false);
    setNewBeneficiary({ name: "", accountNumber: "", bankName: "" });
    
    toast({
      title: "Beneficiary Added",
      description: `${newBeneficiary.name} has been added to your beneficiaries`
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
        
        {/* Add Beneficiary Dialog */}
        <Dialog open={isAddBeneficiaryOpen} onOpenChange={setIsAddBeneficiaryOpen}>
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
                onClick={() => setIsAddBeneficiaryOpen(false)}
                className="mr-2"
              >
                Cancel
              </Button>
              <Button onClick={handleSubmitBeneficiary}>
                Add Beneficiary
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default Send;
