
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { MessageCircle } from "lucide-react";
import MoyaAvatar from "@/components/MoyaAvatar";
import MoyaChat from "@/components/MoyaChat";
import { cn } from "@/lib/utils";

interface MoyaButtonProps {
  className?: string;
}

const MoyaButton = ({ className }: MoyaButtonProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  
  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <div
        className={cn(
          "fixed bottom-6 right-6 z-40",
          className
        )}
      >
        {/* Chat button with tooltip */}
        <div className="relative">
          <Button
            size="lg"
            className="rounded-full h-14 w-14 shadow-lg flex items-center justify-center relative z-10 bg-[#7E69AB] hover:bg-[#9b87f5]"
            onClick={toggleChat}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            {isOpen ? (
              <MessageCircle className="h-6 w-6" />
            ) : (
              <MoyaAvatar size="sm" />
            )}
          </Button>
          
          {/* Animated pulse ring */}
          <div 
            className={cn(
              "absolute inset-0 rounded-full pointer-events-none",
              isHovered ? "animate-ping bg-[#9b87f5]/20" : "opacity-0"
            )}
          />
          
          {/* Tooltip */}
          {isHovered && !isOpen && (
            <div className="absolute bottom-full mb-2 right-0 bg-[#1A1F2C] text-white text-sm py-1 px-3 rounded-md shadow-md whitespace-nowrap">
              Chat with Moya
            </div>
          )}
        </div>
      </div>
      
      {/* Chat interface */}
      <MoyaChat isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </>
  );
};

export default MoyaButton;
