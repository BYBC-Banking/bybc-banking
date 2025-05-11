
import { ShoppingCart, Bell, BookmarkCheck, FileText, ArrowUp } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const InvestmentActionBar = () => {
  const { toast } = useToast();
  
  const handleActionClick = (action: string) => {
    toast({
      title: action,
      description: `${action} action selected`,
    });
  };
  
  const actions = [
    { id: "buy", label: "Buy", icon: <ShoppingCart className="h-5 w-5" />, color: "bg-finance-green text-white" },
    { id: "sell", label: "Sell", icon: <ArrowUp className="h-5 w-5 rotate-180" />, color: "bg-finance-blue text-white" },
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
