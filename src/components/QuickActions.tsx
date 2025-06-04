
import { useToast } from "@/hooks/use-toast";
import { Link, useNavigate } from "react-router-dom";
import { ArrowDown, Banknote, SendHorizontal, ScanLine, CreditCard, TrendingUp, BookmarkCheck, ChartPie, Bitcoin, QrCode, ArrowUpDown, MessageCircle } from "lucide-react";
import { useHomePage } from "@/context/HomePageContext";
import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog";

const QuickActions = () => {
  const { toast } = useToast();
  const { selectedAccount } = useHomePage();
  const [scanDialogOpen, setScanDialogOpen] = useState(false);
  const navigate = useNavigate();
  
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
        { id: "transfer", label: "Transfer", icon: <ArrowUpDown className="h-5 w-5" />, color: "bg-teal-500", path: "/transfer" },
        { id: "paybills", label: "Pay Bills", icon: <Banknote className="h-5 w-5" />, color: "bg-indigo-500", path: "/" },
        { id: "topup", label: "Top Up", icon: <CreditCard className="h-5 w-5" />, color: "bg-pink-500", path: "/buy" },
        { id: "cards", label: "Cards", icon: <CreditCard className="h-5 w-5" />, color: "bg-slate-500", path: "/card-controls" },
        { id: "crypto", label: "Crypto", icon: <Bitcoin className="h-5 w-5" />, color: "bg-[#006634]", path: "/crypto-wallet" },
        { id: "advisor", label: "Advisor", icon: <MessageCircle className="h-5 w-5" />, color: "bg-blue-600", path: "/advisor" },
      ],
      "Savings": [
        { id: "transfer", label: "Transfer", icon: <ArrowUpDown className="h-5 w-5" />, color: "bg-teal-500", path: "/transfer" },
      ],
      "Business": [
        { id: "scan", label: "Scan", icon: <ScanLine className="h-5 w-5" />, color: "bg-purple-500", path: "/", onClick: handleScan },
        { id: "transfer", label: "Transfer", icon: <ArrowUpDown className="h-5 w-5" />, color: "bg-teal-500", path: "/transfer" },
        { id: "paybills", label: "Pay Bills", icon: <Banknote className="h-5 w-5" />, color: "bg-indigo-500", path: "/" },
      ],
      "Nonprofit": [
        { id: "transfer", label: "Transfer", icon: <ArrowUpDown className="h-5 w-5" />, color: "bg-teal-500", path: "/transfer" },
        { id: "paybills", label: "Pay Bills", icon: <Banknote className="h-5 w-5" />, color: "bg-indigo-500", path: "/" },
      ],
      "Investments": [
        { id: "chart", label: "Analytics", icon: <ChartPie className="h-5 w-5" />, color: "bg-blue-600", path: "/investments" },
        { id: "crypto", label: "Crypto", icon: <Bitcoin className="h-5 w-5" />, color: "bg-[#006634]", path: "/crypto-wallet" },
        { id: "stocks", label: "Stocks", icon: <TrendingUp className="h-5 w-5" />, color: "bg-teal-500", path: "/stocks" },
        { id: "watchlist", label: "Watchlist", icon: <BookmarkCheck className="h-5 w-5" />, color: "bg-purple-600", path: "/watchlist" },
      ]
    };
    
    // Get the specific actions for the selected account type, or default to Spending if not found
    const accountType = selectedAccount.type || "Spending";
    const specificActions = accountSpecificActions[accountType as keyof typeof accountSpecificActions] || accountSpecificActions.Spending;
    
    // For investment accounts, don't include common send/receive actions
    if (accountType === "Investments") {
      return specificActions;
    }
    
    // Combine common actions with account-specific ones for other account types
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
        </div>
        
        <div className="grid grid-cols-4 gap-2">
          {actions.slice(0, 4).map((action) => (
            <ActionItem key={action.id} action={action} />
          ))}
        </div>
        
        {actions.length > 4 && (
          <div className="grid grid-cols-3 gap-2 mt-4">
            {actions.slice(4, 7).map((action) => (
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
