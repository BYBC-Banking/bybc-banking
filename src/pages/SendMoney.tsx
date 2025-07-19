import { useState } from "react";
import { ArrowLeft, User, Check, Share } from "lucide-react";
import { Link, useSearchParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
const SendMoney = () => {
  const {
    toast
  } = useToast();
  const [searchParams] = useSearchParams();
  const [amount, setAmount] = useState("");
  const [reference, setReference] = useState("");
  const [showConfirmation, setShowConfirmation] = useState(false);

  // Get beneficiary info from URL params
  const beneficiaryName = searchParams.get("name") || "Unknown";
  const beneficiaryBank = searchParams.get("bank") || "Unknown Bank";
  const beneficiaryAccount = searchParams.get("account") || "Unknown";
  const handleSendMoney = () => {
    if (!amount || parseFloat(amount) <= 0) {
      toast({
        title: "Invalid Amount",
        description: "Please enter a valid amount to send",
        variant: "destructive"
      });
      return;
    }
    setShowConfirmation(true);
  };

  const getCurrentDate = () => {
    const now = new Date();
    return now.toLocaleDateString('en-ZA', { 
      day: '2-digit', 
      month: 'short', 
      year: 'numeric' 
    });
  };
  return <div className="bg-gradient-to-br from-white to-slate-100 min-h-screen">
      <div className="container mx-auto max-w-md px-4 py-6">
        {/* Header */}
        <header className="flex items-center gap-4 mb-6">
          <Link to="/send" className="p-2">
            <ArrowLeft className="h-5 w-5" />
          </Link>
          <h1 className="text-2xl font-bold">Send Money</h1>
        </header>

        {/* Beneficiary Card */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center">
                <User className="h-5 w-5 text-gray-600" />
              </div>
              <div>
                <div className="font-medium">{beneficiaryName}</div>
                <div className="text-sm text-muted-foreground font-normal">
                  {beneficiaryBank} •••• {beneficiaryAccount.slice(-4)}
                </div>
              </div>
            </CardTitle>
          </CardHeader>
        </Card>

        {/* Send Money Form */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              
              Transfer Details
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="amount">Amount (R)</Label>
              <Input id="amount" type="number" placeholder="0.00" value={amount} onChange={e => setAmount(e.target.value)} min="0" step="0.01" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="reference">Reference (Optional)</Label>
              <Input id="reference" placeholder="Payment reference" value={reference} onChange={e => setReference(e.target.value)} />
            </div>

            <Button onClick={handleSendMoney} className="w-full mt-6" disabled={!amount || parseFloat(amount) <= 0}>
              Send Money
            </Button>
          </CardContent>
        </Card>

        {/* Payment Confirmation Modal */}
        <Dialog open={showConfirmation} onOpenChange={setShowConfirmation}>
          <DialogContent className="max-w-sm mx-auto p-0 gap-0">
            <DialogHeader className="sr-only">
              <DialogTitle>Payment Confirmation</DialogTitle>
            </DialogHeader>
            
            {/* Success Header */}
            <div className="bg-primary text-primary-foreground text-center py-6 px-4">
              <div className="text-lg font-medium mb-4">Successful</div>
              <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto">
                <Check className="h-8 w-8 text-primary" />
              </div>
            </div>

            {/* Confirmation Details */}
            <div className="p-6 text-center space-y-4">
              <div className="text-foreground">
                You've made an immediate payment of{" "}
                <span className="font-semibold">R{parseFloat(amount || "0").toFixed(2)}</span> to{" "}
                <span className="font-semibold">{beneficiaryName}</span>
              </div>
              
              <div className="text-sm text-muted-foreground">
                Effective date: {getCurrentDate()}
              </div>

              <div className="space-y-3 pt-4">
                <Button 
                  onClick={() => setShowConfirmation(false)} 
                  className="w-full"
                >
                  Done
                </Button>
                
                <Button 
                  variant="ghost" 
                  className="w-full flex items-center gap-2"
                  onClick={() => {
                    // Share functionality would go here
                    toast({
                      title: "Share functionality coming soon",
                      description: "This feature will be available in the next update"
                    });
                  }}
                >
                  <Share className="h-4 w-4" />
                  Share Payment Notification
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>;
};
export default SendMoney;