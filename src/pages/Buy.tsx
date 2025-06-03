import { useState } from "react";
import { ArrowLeft, Signal, Zap, CreditCard, Check, UserPlus } from "lucide-react";
import { Link } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle, 
  CardDescription,
  CardFooter 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { BeneficiaryProvider, useBeneficiary } from "@/context/BeneficiaryContext";

type BuyOption = {
  id: string;
  name: string;
  icon: React.ReactNode;
  description: string;
};

// South African mobile networks
const networks = [
  { id: "vodacom", name: "Vodacom" },
  { id: "mtn", name: "MTN" },
  { id: "cellc", name: "Cell C" },
  { id: "telkom", name: "Telkom Mobile" },
];

// Common airtime amounts
const airtimeAmounts = [
  { value: "5", label: "R5" },
  { value: "10", label: "R10" },
  { value: "20", label: "R20" },
  { value: "30", label: "R30" },
  { value: "50", label: "R50" },
  { value: "100", label: "R100" },
  { value: "200", label: "R200" },
  { value: "custom", label: "Custom Amount" },
];

const BuyContent = () => {
  const { toast } = useToast();
  const { beneficiaries, addBeneficiary } = useBeneficiary();
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [selectedNetwork, setSelectedNetwork] = useState<string>("");
  const [selectedAmount, setSelectedAmount] = useState<string>("10");
  const [customAmount, setCustomAmount] = useState<string>("");
  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const [showBeneficiaryDialog, setShowBeneficiaryDialog] = useState(false);
  const [newBeneficiaryName, setNewBeneficiaryName] = useState("");
  const [newBeneficiaryPhone, setNewBeneficiaryPhone] = useState("");
  const [filteredBeneficiaries, setFilteredBeneficiaries] = useState(beneficiaries);
  
  // Buy options
  const buyOptions: BuyOption[] = [
    {
      id: "airtime",
      name: "Airtime",
      icon: <Signal className="h-5 w-5" />,
      description: "Purchase airtime for any mobile network"
    },
    {
      id: "data",
      name: "Data",
      icon: <CreditCard className="h-5 w-5" />,
      description: "Buy data bundles for your mobile device"
    },
    {
      id: "electricity",
      name: "Electricity",
      icon: <Zap className="h-5 w-5" />,
      description: "Pay for prepaid electricity"
    }
  ];
  
  const handleOptionClick = (option: BuyOption) => {
    setSelectedOption(option.id);
  };

  const handlePhoneNumberChange = (value: string) => {
    setPhoneNumber(value);
    
    // Filter beneficiaries based on phone number input
    if (value) {
      const filtered = beneficiaries.filter(b => 
        b.phoneNumber.includes(value) || b.name.toLowerCase().includes(value.toLowerCase())
      );
      setFilteredBeneficiaries(filtered);
    } else {
      setFilteredBeneficiaries(beneficiaries);
    }
  };

  const handleBeneficiarySelect = (beneficiary: any) => {
    setPhoneNumber(beneficiary.phoneNumber);
    setFilteredBeneficiaries([]);
  };

  const handleAddBeneficiary = () => {
    if (newBeneficiaryName && newBeneficiaryPhone) {
      addBeneficiary({
        name: newBeneficiaryName,
        phoneNumber: newBeneficiaryPhone,
      });
      setNewBeneficiaryName("");
      setNewBeneficiaryPhone("");
      setShowBeneficiaryDialog(false);
      toast({
        title: "Beneficiary Added",
        description: `${newBeneficiaryName} has been added to your beneficiaries`,
      });
    }
  };

  const handlePurchase = () => {
    // Validate phone number (basic South African format)
    const phoneRegex = /^(\+27|0)[0-9]{9}$/;
    if (!phoneRegex.test(phoneNumber)) {
      toast({
        title: "Invalid Phone Number",
        description: "Please enter a valid South African phone number",
        variant: "destructive",
      });
      return;
    }

    // Get final amount (either selected or custom)
    const finalAmount = selectedAmount === "custom" ? customAmount : selectedAmount;
    
    // Validate amount
    if (!finalAmount || isNaN(Number(finalAmount)) || Number(finalAmount) <= 0) {
      toast({
        title: "Invalid Amount",
        description: "Please enter a valid amount",
        variant: "destructive",
      });
      return;
    }

    // Success toast
    toast({
      title: "Airtime Purchase Successful",
      description: `R${finalAmount} airtime sent to ${phoneNumber}`,
    });

    // Reset form
    setSelectedOption(null);
    setSelectedNetwork("");
    setSelectedAmount("10");
    setCustomAmount("");
    setPhoneNumber("");
  };

  const renderOptionContent = () => {
    if (selectedOption === "airtime") {
      return (
        <Card className="mt-4">
          <CardHeader>
            <CardTitle>Purchase Airtime</CardTitle>
            <CardDescription>Buy airtime for any South African mobile network</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="network">Select Network</Label>
              <Select 
                value={selectedNetwork} 
                onValueChange={setSelectedNetwork}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select mobile network" />
                </SelectTrigger>
                <SelectContent>
                  {networks.map(network => (
                    <SelectItem key={network.id} value={network.id}>
                      {network.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2 relative">
              <Label htmlFor="phoneNumber">Phone Number</Label>
              <Input 
                id="phoneNumber" 
                type="tel" 
                placeholder="0XX XXX XXXX"
                value={phoneNumber}
                onChange={(e) => handlePhoneNumberChange(e.target.value)}
              />
              
              {/* Autocomplete dropdown */}
              {phoneNumber && filteredBeneficiaries.length > 0 && (
                <div className="absolute top-full left-0 right-0 bg-white border border-gray-200 rounded-md shadow-lg z-10 max-h-40 overflow-y-auto">
                  {filteredBeneficiaries.map((beneficiary) => (
                    <div
                      key={beneficiary.id}
                      className="p-2 hover:bg-gray-100 cursor-pointer"
                      onClick={() => handleBeneficiarySelect(beneficiary)}
                    >
                      <div className="font-medium">{beneficiary.name}</div>
                      <div className="text-sm text-gray-500">{beneficiary.phoneNumber}</div>
                    </div>
                  ))}
                </div>
              )}
              
              <p className="text-xs text-muted-foreground">Format: 0XXXXXXXXX or +27XXXXXXXXX</p>
            </div>
            
            <div className="space-y-2">
              <Label>Select Amount</Label>
              <RadioGroup 
                value={selectedAmount} 
                onValueChange={setSelectedAmount}
                className="grid grid-cols-4 gap-2"
              >
                {airtimeAmounts.slice(0, -1).map((amount) => (
                  <div key={amount.value} className="flex items-center space-x-2">
                    <RadioGroupItem value={amount.value} id={`amount-${amount.value}`} className="peer sr-only" />
                    <Label
                      htmlFor={`amount-${amount.value}`}
                      className="flex flex-col items-center justify-center rounded-md border-2 border-muted bg-popover p-2 
                        hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary 
                        [&:has([data-state=checked])]:border-primary cursor-pointer w-full text-center"
                    >
                      {amount.label}
                    </Label>
                  </div>
                ))}
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="custom" id="amount-custom" className="peer sr-only" />
                  <Label
                    htmlFor="amount-custom"
                    className="flex flex-col items-center justify-center rounded-md border-2 border-muted bg-popover p-2 
                      hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary 
                      [&:has([data-state=checked])]:border-primary cursor-pointer w-full text-center"
                  >
                    Custom
                  </Label>
                </div>
              </RadioGroup>
              
              {selectedAmount === "custom" && (
                <div className="pt-2">
                  <Label htmlFor="customAmount">Enter Amount (ZAR)</Label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2">R</span>
                    <Input 
                      id="customAmount" 
                      type="number" 
                      className="pl-7"
                      placeholder="Enter amount" 
                      value={customAmount}
                      onChange={(e) => setCustomAmount(e.target.value)}
                    />
                  </div>
                </div>
              )}
            </div>
          </CardContent>
          <CardFooter>
            <Button 
              onClick={handlePurchase}
              className="w-full"
              disabled={!selectedNetwork || !phoneNumber || (selectedAmount === "custom" && !customAmount)}
            >
              Purchase Airtime
            </Button>
          </CardFooter>
        </Card>
      );
    }
    
    // Return null for other options as they aren't implemented yet
    return null;
  };

  return (
    <div className="bg-gradient-to-br from-white to-slate-100 min-h-screen">
      <div className="container mx-auto max-w-md px-4 py-6">
        {/* Header */}
        <header className="flex items-center gap-4 mb-6">
          <Link to="/" className="p-2">
            <ArrowLeft className="h-5 w-5" />
          </Link>
          <h1 className="text-2xl font-bold">Top Up</h1>
        </header>
        
        {/* Add Beneficiary Button */}
        <div className="mb-4">
          <Dialog open={showBeneficiaryDialog} onOpenChange={setShowBeneficiaryDialog}>
            <DialogTrigger asChild>
              <Button variant="outline" className="w-full">
                <UserPlus className="h-4 w-4 mr-2" />
                Add Beneficiary
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add New Beneficiary</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="beneficiaryName">Name</Label>
                  <Input
                    id="beneficiaryName"
                    value={newBeneficiaryName}
                    onChange={(e) => setNewBeneficiaryName(e.target.value)}
                    placeholder="Beneficiary name"
                  />
                </div>
                <div>
                  <Label htmlFor="beneficiaryPhone">Phone Number</Label>
                  <Input
                    id="beneficiaryPhone"
                    value={newBeneficiaryPhone}
                    onChange={(e) => setNewBeneficiaryPhone(e.target.value)}
                    placeholder="0XX XXX XXXX"
                  />
                </div>
                <Button onClick={handleAddBeneficiary} className="w-full">
                  Add Beneficiary
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
        
        {!selectedOption ? (
          // Buy Options
          <div className="space-y-4">
            {buyOptions.map((option) => (
              <div
                key={option.id}
                className="bg-white rounded-xl shadow-sm border p-4 cursor-pointer hover:bg-slate-50 transition-colors"
                onClick={() => handleOptionClick(option)}
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-finance-blue flex items-center justify-center text-white">
                    {option.icon}
                  </div>
                  <div>
                    <div className="font-medium">{option.name}</div>
                    <div className="text-sm text-muted-foreground">{option.description}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          // Selected Option Content
          <>
            <Button 
              variant="ghost" 
              className="mb-4 -ml-2 hover:bg-transparent hover:text-primary"
              onClick={() => setSelectedOption(null)}
            >
              <ArrowLeft className="h-5 w-5 mr-1" />
              Back to options
            </Button>
            {renderOptionContent()}
          </>
        )}
      </div>
    </div>
  );
};

const Buy = () => {
  return (
    <BeneficiaryProvider>
      <BuyContent />
    </BeneficiaryProvider>
  );
};

export default Buy;
