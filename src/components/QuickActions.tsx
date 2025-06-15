
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowUpDown, Send, CreditCard, Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useHomePage } from "@/context/HomePageContext";

interface QuickActionsProps {
  variant?: "default" | "professional";
}

const QuickActions = ({ variant = "default" }: QuickActionsProps) => {
  const navigate = useNavigate();
  const { selectedAccount } = useHomePage();

  const getButtonStyles = () => {
    if (variant === "professional") {
      return {
        send: "h-14 sm:h-16 flex-col gap-1 text-xs sm:text-sm touch-target bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200",
        transfer: "h-14 sm:h-16 flex-col gap-1 text-xs sm:text-sm touch-target bg-gray-100 hover:bg-gray-200 text-gray-700 border border-gray-200",
        pay: "h-14 sm:h-16 flex-col gap-1 text-xs sm:text-sm touch-target bg-stone-100 hover:bg-stone-200 text-stone-700 border border-stone-200",
        more: "h-14 sm:h-16 flex-col gap-1 text-xs sm:text-sm touch-target bg-neutral-100 hover:bg-neutral-200 text-neutral-700 border border-neutral-200"
      };
    }
    return {
      send: "h-14 sm:h-16 flex-col gap-1 text-xs sm:text-sm touch-target",
      transfer: "h-14 sm:h-16 flex-col gap-1 text-xs sm:text-sm touch-target",
      pay: "h-14 sm:h-16 flex-col gap-1 text-xs sm:text-sm touch-target",
      more: "h-14 sm:h-16 flex-col gap-1 text-xs sm:text-sm touch-target"
    };
  };

  const getIconColor = (iconType: string) => {
    if (variant === "professional") {
      switch (iconType) {
        case "send": return "text-slate-600";
        case "transfer": return "text-gray-600"; 
        case "pay": return "text-stone-600";
        case "more": return "text-neutral-600";
        default: return "";
      }
    }
    return "";
  };

  const buttonStyles = getButtonStyles();

  const handleSend = () => {
    if (selectedAccount?.type === "crypto") {
      navigate("/crypto-wallet");
    } else {
      navigate("/send");
    }
  };

  return (
    <Card className="animate-fade-in" style={{animationDelay: "200ms"}}>
      <CardContent className="p-4">
        <div className="grid grid-cols-4 gap-3">
          <Button 
            variant="outline" 
            className={buttonStyles.send}
            onClick={handleSend}
          >
            <Send className={`h-4 w-4 sm:h-5 sm:w-5 ${getIconColor("send")}`} />
            <span>Send</span>
          </Button>
          
          <Button 
            variant="outline" 
            className={buttonStyles.transfer}
            onClick={() => navigate("/transfer")}
          >
            <ArrowUpDown className={`h-4 w-4 sm:h-5 sm:w-5 ${getIconColor("transfer")}`} />
            <span>Transfer</span>
          </Button>
          
          <Button 
            variant="outline" 
            className={buttonStyles.pay}
            onClick={() => navigate("/pay-bills")}
          >
            <CreditCard className={`h-4 w-4 sm:h-5 sm:w-5 ${getIconColor("pay")}`} />
            <span>Pay</span>
          </Button>
          
          <Button 
            variant="outline" 
            className={buttonStyles.more}
            onClick={() => navigate("/accounts")}
          >
            <Plus className={`h-4 w-4 sm:h-5 sm:w-5 ${getIconColor("more")}`} />
            <span>More</span>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default QuickActions;
