import { useState, useEffect } from "react";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import QrCode from "@/components/QrCode";
import { supabase } from "@/integrations/supabase/client";
import { useAccounts } from "@/hooks/useAccounts";

const Receive = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [qrValue, setQrValue] = useState("");
  const [userAccount, setUserAccount] = useState<any>(null);
  
  const { accounts, loading } = useAccounts();

  useEffect(() => {
    const generateQRValue = async () => {
      try {
        const { data: { user } } = await supabase.auth.getUser();
        if (user && accounts.length > 0) {
          // Use the first active account for receiving
          const primaryAccount = accounts.find(acc => acc.is_active) || accounts[0];
          setUserAccount(primaryAccount);
          
          // Generate QR code with payment information
          const paymentData = {
            userId: user.id,
            accountId: primaryAccount.id,
            accountNumber: primaryAccount.account_number,
            accountName: primaryAccount.name
          };
          
          // In a real app, this would be a proper payment URL or encoded payment data
          setQrValue(`bybc://payment/receive/${btoa(JSON.stringify(paymentData))}`);
        }
      } catch (error) {
        console.error("Error generating QR code:", error);
        // Fallback QR value
        setQrValue("bybc://payment/receive/fallback");
      }
    };

    if (!loading && accounts.length > 0) {
      generateQRValue();
    }
  }, [accounts, loading]);
  
  const handleShare = async () => {
    try {
      if (navigator.share) {
        await navigator.share({
          title: 'Receive Payment',
          text: 'Send me money using this payment information',
          url: qrValue
        });
      } else {
        // Fallback for browsers that don't support Web Share API
        await navigator.clipboard.writeText(qrValue);
        toast({
          title: "Copied",
          description: "Payment information copied to clipboard",
        });
      }
    } catch (error) {
      toast({
        title: "Share Error",
        description: "Unable to share at this moment",
        variant: "destructive"
      });
    }
  };
  
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(qrValue);
      toast({
        title: "Copied",
        description: "Payment link copied to clipboard",
      });
    } catch (error) {
      toast({
        title: "Copy Error",
        description: "Unable to copy to clipboard",
        variant: "destructive"
      });
    }
  };

  if (loading) {
    return (
      <div className="bg-gradient-to-br from-white to-slate-100 min-h-screen">
        <div className="container mx-auto max-w-md px-4 py-6">
          <div className="flex items-center justify-center py-20">
            <div className="text-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
              <p>Loading your account information...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!userAccount) {
    return (
      <div className="bg-gradient-to-br from-white to-slate-100 min-h-screen">
        <div className="container mx-auto max-w-md px-4 py-6">
          <header className="flex items-center gap-4 mb-6">
            <button onClick={() => navigate(-1)} className="p-2">
              <ArrowLeft className="h-5 w-5" />
            </button>
            <h1 className="text-2xl font-bold">Receive Money</h1>
          </header>
          <div className="text-center py-20">
            <p>No active accounts found. Please contact support.</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-br from-white to-slate-100 min-h-screen">
      <div className="container mx-auto max-w-md px-4 py-6">
        {/* Header */}
        <header className="flex items-center gap-4 mb-6">
          <button onClick={() => navigate(-1)} className="p-2">
            <ArrowLeft className="h-5 w-5" />
          </button>
          <h1 className="text-2xl font-bold">Receive Money</h1>
        </header>
        
        {/* QR Code Display */}
        <div className="bg-white p-6 rounded-xl shadow-sm mb-6">
          <p className="text-center mb-6 text-lg font-medium">
            Share this QR code to receive money
          </p>
          
          <div className="mx-auto max-w-[250px] mb-6">
            <AspectRatio ratio={1/1} className="bg-muted/20 rounded-xl p-2">
              <QrCode value={qrValue} size={250} />
            </AspectRatio>
          </div>
          
          <div className="text-center text-sm text-muted-foreground mb-6">
            <p>Your account: {userAccount.name}</p>
            <p>Account number: •••• {userAccount.account_number.slice(-4)}</p>
            <p>Balance: R{userAccount.balance.toFixed(2)}</p>
          </div>
          
          <div className="flex gap-4">
            <Button 
              onClick={handleShare}
              className="flex-1"
              variant="outline"
            >
              Share QR
            </Button>
            <Button 
              onClick={handleCopy}
              className="flex-1"
            >
              Copy Link
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Receive;