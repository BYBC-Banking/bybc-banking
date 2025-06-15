
import { useState } from "react";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import QrCode from "@/components/QrCode";

const Receive = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  
  // In a real app, this would be generated dynamically based on the user's account
  const [qrValue] = useState("bybc://payment/receive/user123");
  
  const handleShare = () => {
    toast({
      title: "Share",
      description: "Sharing QR code functionality would be implemented here",
    });
  };
  
  const handleCopy = () => {
    // In a real app, we would use the clipboard API
    navigator.clipboard.writeText(qrValue).then(() => {
      toast({
        title: "Copied",
        description: "Payment link copied to clipboard",
      });
    });
  };

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
            <p>Your account: BYBC Spending</p>
            <p>Account number: •••• 7890</p>
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
