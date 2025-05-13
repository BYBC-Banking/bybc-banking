
import { useToast } from "@/hooks/use-toast";
import { Link } from "react-router-dom";
import { ArrowRight, Inbox, ShoppingCart } from "lucide-react";

const QuickActions = () => {
  const { toast } = useToast();
  
  const handleActionClick = (action: string) => {
    toast({
      title: action,
      description: `${action} action selected`,
    });
  };
  
  const actions = [
    { id: "send", label: "Send", icon: "→", color: "bg-blue-500", path: "/send" },
    { id: "receive", label: "Receive", icon: "←", color: "bg-green-500", path: "/" },
    { id: "scan", label: "Scan", icon: "⊙", color: "bg-purple-500", path: "/" },
    { id: "transactions", label: "Transactions", icon: "≡", color: "bg-teal-500", path: "/transactions" },
    { id: "inbox", label: "Inbox", icon: <Inbox className="h-5 w-5" />, color: "bg-indigo-500", path: "/" },
    { id: "buy", label: "Buy", icon: <ShoppingCart className="h-5 w-5" />, color: "bg-pink-500", path: "/buy" },
  ];
  
  return (
    <div className="mb-6 animate-fade-in" style={{animationDelay: "50ms"}}>
      <div className="flex justify-between items-center mb-3">
        <h2 className="text-lg font-semibold">Quick Actions</h2>
        <Link to="/transactions" className="text-sm text-primary flex items-center">
          More <ArrowRight className="h-4 w-4 ml-1" />
        </Link>
      </div>
      
      <div className="grid grid-cols-4 gap-2">
        {actions.slice(0, 4).map((action) => (
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
        ))}
      </div>
      
      <div className="grid grid-cols-2 gap-2 mt-4">
        {actions.slice(4, 6).map((action) => (
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
        ))}
      </div>
    </div>
  );
};

export default QuickActions;
