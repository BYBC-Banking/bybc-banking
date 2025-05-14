
import { useToast } from "@/hooks/use-toast";
import { Link } from "react-router-dom";
import { ArrowRight, Inbox, QrCode, ArrowDown, Banknote, SendHorizontal, ScanLine, CreditCard } from "lucide-react";
import { useHomePage } from "@/context/HomePageContext";
import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog";

const QuickActions = () => {
  const { toast } = useToast();
  const { selectedAccount } = useHomePage();
  const [scanDialogOpen, setScanDialogOpen] = useState(false);
  
  const handleActionClick = (action: string) => {
    toast({
      title: action,
      description: `${action} action selected`,
    });
  };

  const handleScan = () => {
    setScanDialogOpen(true);
    // In a real app, we would request camera permissions here
    navigator.mediaDevices?.getUserMedia({ video: true })
      .then((stream) => {
        toast({
          title: "Camera Permission",
          description: "Camera permission granted",
        });
        // Would handle the camera stream for QR code scanning here
        // Clean up by stopping all tracks
        stream.getTracks().forEach(track => track.stop());
      })
      .catch((err) => {
        toast({
          title: "Camera Permission Denied",
          description: "Please allow camera access to scan QR codes",
        });
      });
  };
  
  // Define account-specific actions
  const getAccountActions = () => {
    const commonActions = [
      { id: "send", label: "Send", icon: <SendHorizontal className="h-5 w-5" />, color: "bg-blue-500", path: "/send" },
      { id: "receive", label: "Receive", icon: <ArrowDown className="h-5 w-5" />, color: "bg-green-500", path: "/receive" },
    ];
    
    const accountSpecificActions = {
      "Spending": [
        { id: "scan", label: "Scan", icon: <ScanLine className="h-5 w-5" />, color: "bg-purple-500", path: "/", onClick: handleScan },
        { id: "transfer", label: "Transfer", icon: <SendHorizontal className="h-5 w-5" />, color: "bg-teal-500", path: "/transfer" },
        { id: "paybills", label: "Pay Bills", icon: <Banknote className="h-5 w-5" />, color: "bg-indigo-500", path: "/" },
        { id: "topup", label: "Top Up", icon: <CreditCard className="h-5 w-5" />, color: "bg-pink-500", path: "/buy" },
      ],
      "Savings": [
        { id: "transfer", label: "Transfer", icon: <SendHorizontal className="h-5 w-5" />, color: "bg-teal-500", path: "/transfer" },
        { id: "inbox", label: "Inbox", icon: <Inbox className="h-5 w-5" />, color: "bg-indigo-500", path: "/inbox" },
      ],
      "Business": [
        { id: "scan", label: "Scan", icon: <ScanLine className="h-5 w-5" />, color: "bg-purple-500", path: "/", onClick: handleScan },
        { id: "transfer", label: "Transfer", icon: <SendHorizontal className="h-5 w-5" />, color: "bg-teal-500", path: "/transfer" },
        { id: "paybills", label: "Pay Bills", icon: <Banknote className="h-5 w-5" />, color: "bg-indigo-500", path: "/" },
        { id: "topup", label: "Top Up", icon: <CreditCard className="h-5 w-5" />, color: "bg-pink-500", path: "/buy" },
      ],
      "Nonprofit": [
        { id: "transfer", label: "Transfer", icon: <SendHorizontal className="h-5 w-5" />, color: "bg-teal-500", path: "/transfer" },
        { id: "paybills", label: "Pay Bills", icon: <Banknote className="h-5 w-5" />, color: "bg-indigo-500", path: "/" },
      ],
      "Investments": [
        { id: "transfer", label: "Transfer", icon: <SendHorizontal className="h-5 w-5" />, color: "bg-teal-500", path: "/transfer" },
        { id: "inbox", label: "Inbox", icon: <Inbox className="h-5 w-5" />, color: "bg-indigo-500", path: "/inbox" },
      ]
    };
    
    // Get the specific actions for the selected account type, or default to Spending if not found
    const accountType = selectedAccount.type || "Spending";
    const specificActions = accountSpecificActions[accountType as keyof typeof accountSpecificActions] || accountSpecificActions.Spending;
    
    // Combine common actions with account-specific ones
    return [...commonActions, ...specificActions];
  };
  
  const actions = getAccountActions();
  
  const ActionItem = ({ action }: { action: any }) => {
    if (action.onClick) {
      return (
        <div
          className="flex flex-col items-center cursor-pointer"
          onClick={action.onClick}
        >
          <div className={`${action.color} text-white w-14 h-14 rounded-full flex items-center justify-center text-xl mb-1 shadow-sm`}>
            {typeof action.icon === 'string' ? action.icon : action.icon}
          </div>
          <span className="text-xs font-medium">{action.label}</span>
        </div>
      );
    }
    
    return (
      <Link
        key={action.id}
        to={action.path}
        className="flex flex-col items-center"
      >
        <div className={`${action.color} text-white w-14 h-14 rounded-full flex items-center justify-center text-xl mb-1 shadow-sm`}>
          {typeof action.icon === 'string' ? action.icon : action.icon}
        </div>
        <span className="text-xs font-medium">{action.label}</span>
      </Link>
    );
  };
  
  return (
    <>
      <div className="mb-6 animate-fade-in" style={{animationDelay: "50ms"}}>
        <div className="flex justify-between items-center mb-3">
          <h2 className="text-lg font-semibold">Quick Actions</h2>
          <Link to="/transactions" className="text-sm text-primary flex items-center">
            More <ArrowRight className="h-4 w-4 ml-1" />
          </Link>
        </div>
        
        <div className="grid grid-cols-4 gap-2">
          {actions.slice(0, 4).map((action) => (
            <ActionItem key={action.id} action={action} />
          ))}
        </div>
        
        {actions.length > 4 && (
          <div className="grid grid-cols-2 gap-2 mt-4">
            {actions.slice(4, 6).map((action) => (
              <ActionItem key={action.id} action={action} />
            ))}
          </div>
        )}
      </div>
      
      {/* Camera Permission Dialog */}
      <Dialog open={scanDialogOpen} onOpenChange={setScanDialogOpen}>
        <DialogContent>
          <DialogTitle>Camera Access Required</DialogTitle>
          <DialogDescription>
            To scan QR codes, BYBC Banking needs permission to use your camera. Please allow camera access when prompted.
          </DialogDescription>
          <div className="mt-4 flex justify-center">
            <QrCode className="w-24 h-24 text-primary" />
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default QuickActions;
