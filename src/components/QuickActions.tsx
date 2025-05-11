
import { useToast } from "@/hooks/use-toast";
import { Link } from "react-router-dom";
import { ArrowRight, BookOpen } from "lucide-react";

const QuickActions = () => {
  const { toast } = useToast();
  
  const handleActionClick = (action: string) => {
    toast({
      title: action,
      description: `${action} action selected`,
    });
  };
  
  const actions = [
    { id: "send", label: "Send", icon: "→", color: "bg-blue-500" },
    { id: "receive", label: "Receive", icon: "←", color: "bg-green-500" },
    { id: "scan", label: "Scan", icon: "⊙", color: "bg-purple-500" },
    { id: "invest", label: "Invest", icon: "↗", color: "bg-orange-500" },
  ];
  
  return (
    <div className="mb-6 animate-fade-in" style={{animationDelay: "50ms"}}>
      <div className="flex justify-between items-center mb-3">
        <h2 className="text-lg font-semibold">Quick Actions</h2>
        <Link to="/investments" className="text-sm text-primary flex items-center">
          More <ArrowRight className="h-4 w-4 ml-1" />
        </Link>
      </div>
      
      <div className="grid grid-cols-4 gap-2">
        {actions.map((action) => (
          <button
            key={action.id}
            onClick={() => handleActionClick(action.label)}
            className="flex flex-col items-center"
          >
            <div className={`${action.color} text-white w-14 h-14 rounded-full flex items-center justify-center text-xl mb-1 shadow-sm`}>
              {action.icon}
            </div>
            <span className="text-xs font-medium">{action.label}</span>
          </button>
        ))}
        
        <Link 
          to="/education"
          className="flex flex-col items-center"
        >
          <div className="bg-primary text-white w-14 h-14 rounded-full flex items-center justify-center text-xl mb-1 shadow-sm">
            <BookOpen className="h-6 w-6" />
          </div>
          <span className="text-xs font-medium">Learn</span>
        </Link>
      </div>
    </div>
  );
};

export default QuickActions;
