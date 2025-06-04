
import { ArrowLeft, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { useState } from "react";

interface AccountBalanceProps {
  balance: number;
  difference: number;
  className?: string;
  onPreviousAccount?: () => void;
  onNextAccount?: () => void;
  canNavigatePrevious?: boolean;
  canNavigateNext?: boolean;
}

const AccountBalance = ({ 
  balance, 
  difference, 
  className,
  onPreviousAccount,
  onNextAccount,
  canNavigatePrevious = false,
  canNavigateNext = false
}: AccountBalanceProps) => {
  const [showNavigation, setShowNavigation] = useState(false);
  const isPositive = difference >= 0;
  
  const handleTouchStart = () => {
    setShowNavigation(true);
  };
  
  const handleTouchEnd = () => {
    setTimeout(() => setShowNavigation(false), 2000);
  };
  
  return (
    <div 
      className={cn(
        "bg-gradient-to-br from-teal-500 to-teal-600 p-6 rounded-xl shadow-sm border animate-fade-in text-white relative overflow-hidden",
        className
      )}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      onMouseEnter={() => setShowNavigation(true)}
      onMouseLeave={() => setShowNavigation(false)}
    >
      {/* Navigation arrows */}
      {showNavigation && canNavigatePrevious && (
        <button
          onClick={onPreviousAccount}
          className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center shadow-lg hover:bg-blue-600 transition-colors z-10"
        >
          <ArrowLeft className="h-5 w-5 text-white" />
        </button>
      )}
      
      {showNavigation && canNavigateNext && (
        <button
          onClick={onNextAccount}
          className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center shadow-lg hover:bg-blue-600 transition-colors z-10"
        >
          <ArrowRight className="h-5 w-5 text-white" />
        </button>
      )}
      
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center">
          <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center mr-3">
            <span className="text-white font-bold text-lg">I</span>
          </div>
          <span className="text-white font-medium">BYBC Investments</span>
        </div>
      </div>
      
      <div className="mb-2">
        <div className="flex items-center text-white/80 text-sm mb-1">
          <span>••••</span>
          <span className="ml-2">4680</span>
        </div>
        <div className="mb-1">
          <span className="text-white/90 text-sm">Available Balance</span>
        </div>
        <h1 className="text-3xl font-bold text-white">
          R{balance.toLocaleString('en-ZA', { minimumFractionDigits: 1, maximumFractionDigits: 1 })}
        </h1>
      </div>
    </div>
  );
};

export default AccountBalance;
