import { useState } from "react";
import { ArrowLeft, User, DollarSign } from "lucide-react";
import { Link, useSearchParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
const SendMoney = () => {
  const {
    toast
  } = useToast();
  const [searchParams] = useSearchParams();
  const [amount, setAmount] = useState("");
  const [reference, setReference] = useState("");

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
    toast({
      title: "Money Sent Successfully",
      description: `R${parseFloat(amount).toFixed(2)} sent to ${beneficiaryName}`
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
              Send R{amount || "0.00"}
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>;
};
export default SendMoney;