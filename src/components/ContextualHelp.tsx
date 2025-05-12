
import { useState } from "react";
import { HelpCircle } from "lucide-react";
import { 
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";

interface ContextualHelpProps {
  topic: string;
  children: React.ReactNode;
}

const ContextualHelp = ({ topic, children }: ContextualHelpProps) => {
  const [isOpen, setIsOpen] = useState(false);
  
  // This function would trigger the Moya assistant with context
  // In a real implementation, it would communicate with the chat interface
  const handleAskMoya = () => {
    console.log(`Asking Moya about: ${topic}`);
    // Here you would trigger the Moya chat to open with this topic
  };

  return (
    <TooltipProvider>
      <Tooltip open={isOpen} onOpenChange={setIsOpen}>
        <TooltipTrigger asChild>
          <Button 
            variant="ghost" 
            size="icon"
            className="h-5 w-5 text-muted-foreground hover:text-primary"
          >
            <HelpCircle className="h-4 w-4" />
          </Button>
        </TooltipTrigger>
        <TooltipContent className="w-64 p-0" align="center" side="bottom">
          <div className="p-3 text-sm">
            {children}
            <Button 
              variant="link" 
              size="sm" 
              className="mt-1 p-0 h-auto text-[#7E69AB]"
              onClick={() => {
                setIsOpen(false);
                handleAskMoya();
              }}
            >
              Ask Moya more about this
            </Button>
          </div>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default ContextualHelp;
