
import { ShoppingCart, Bell, BookmarkCheck, FileText, ArrowUp, Bitcoin, TrendingUp } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";

const InvestmentActionBar = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  
  const handleActionClick = (action: string) => {
    switch (action) {
      case "Buy":
        navigate("/buy");
        break;
      case "Sell":
        toast({
          title: "Sell",
          description: "Sell action selected",
        });
        break;
      case "Watchlist":
        navigate("/watchlist");
        break;
      case "News":
        navigate("/financial-news");
        break;
      case "Set Alert":
        toast({
          title: "Alert",
          description: "Alert action selected",
        });
        break;
      case "Crypto":
        navigate("/crypto");
        break;
      case "Stocks":
        navigate("/stocks");
        break;
      case "Forex":
        toast({
          title: "Forex",
          description: "Foreign exchange markets selected",
        });
        break;
      case "Commodities":
        toast({
          title: "Commodities",
          description: "Commodities markets selected",
        });
        break;
      default:
        toast({
          title: action,
          description: `${action} action selected`,
        });
    }
  };
  
  const actions = [
    { id: "buy", label: "Buy", icon: <ShoppingCart className="h-5 w-5" />, color: "bg-finance-green text-white" },
    { id: "sell", label: "Sell", icon: <ArrowUp className="h-5 w-5 rotate-180" />, color: "bg-finance-blue text-white" },
    { id: "crypto", label: "Crypto", icon: <Bitcoin className="h-5 w-5" />, color: "bg-amber-500 text-white" },
    { id: "stocks", label: "Stocks", icon: <TrendingUp className="h-5 w-5" />, color: "bg-teal-500 text-white" },
    { id: "forex", label: "Forex", icon: <TrendingUp className="h-5 w-5" />, color: "bg-white" },
    { id: "commodities", label: "Commodities", icon: <TrendingUp className="h-5 w-5" />, color: "bg-white" },
    { id: "watchlist", label: "Watchlist", icon: <BookmarkCheck className="h-5 w-5" />, color: "bg-white" },
    { id: "news", label: "News", icon: <FileText className="h-5 w-5" />, color: "bg-white" },
    { id: "alert", label: "Set Alert", icon: <Bell className="h-5 w-5" />, color: "bg-white" }
  ];
  
  return (
    <div className="animate-fade-in mb-6" style={{ animationDelay: "100ms" }}>
      <div className="overflow-x-auto pb-2">
        <div className="flex gap-2 min-w-max">
          {actions.map((action) => (
            <button
              key={action.id}
              onClick={() => handleActionClick(action.label)}
              className={`flex items-center gap-2 px-4 py-2 rounded-full shadow-sm border min-w-[44px] min-h-[44px] ${
                action.color
              } ${
                action.color === "bg-white" ? "hover:bg-slate-50" : "hover:opacity-90"
              } transition-colors`}
            >
              {action.icon}
              <span className="text-sm font-medium">{action.label}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default InvestmentActionBar;
