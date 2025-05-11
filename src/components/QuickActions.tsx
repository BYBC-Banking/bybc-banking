
import { Send, ArrowRight, Plus } from "lucide-react";

const QuickActions = () => {
  return (
    <div className="animate-fade-in" style={{animationDelay: "50ms"}}>
      <div className="flex justify-between gap-3 my-6">
        <ActionButton 
          icon={<Send className="h-5 w-5" />}
          label="Send"
        />
        <ActionButton 
          icon={<ArrowRight className="h-5 w-5" />}
          label="Request"
        />
        <ActionButton 
          icon={<Plus className="h-5 w-5" />}
          label="Add Money"
        />
      </div>
    </div>
  );
};

interface ActionButtonProps {
  icon: React.ReactNode;
  label: string;
}

const ActionButton = ({ icon, label }: ActionButtonProps) => {
  return (
    <button className="flex flex-col items-center gap-2 group">
      <div className="w-[60px] h-[60px] flex items-center justify-center rounded-full bg-white shadow-sm border border-gray-100 group-hover:bg-finance-blue group-hover:text-white transition-colors">
        {icon}
      </div>
      <span className="text-xs font-medium">{label}</span>
    </button>
  );
};

export default QuickActions;
