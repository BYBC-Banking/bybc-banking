
import { ArrowUpRight, Plus, Send } from "lucide-react";
import { Button } from "@/components/ui/button";

const QuickActions = () => {
  return (
    <div className="flex justify-between gap-2 px-1 my-6">
      <Button 
        variant="outline" 
        className="flex-1 rounded-full bg-white border-finance-blue border text-finance-blue hover:bg-finance-blue hover:text-white transition-colors"
      >
        <Send className="mr-2 h-4 w-4" />
        Send
      </Button>
      <Button 
        variant="outline" 
        className="flex-1 rounded-full bg-white border-finance-blue border text-finance-blue hover:bg-finance-blue hover:text-white transition-colors"
      >
        <ArrowUpRight className="mr-2 h-4 w-4" />
        Request
      </Button>
      <Button 
        variant="outline" 
        className="flex-1 rounded-full bg-white border-finance-blue border text-finance-blue hover:bg-finance-blue hover:text-white transition-colors"
      >
        <Plus className="mr-2 h-4 w-4" />
        Add Money
      </Button>
    </div>
  );
};

export default QuickActions;
