
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
  accountType?: string;
  accountName?: string;
}

const AccountBalance = ({
  balance,
  difference,
  className,
  onPreviousAccount,
  onNextAccount,
  canNavigatePrevious = false,
  canNavigateNext = false,
  accountType = "Investments",
  accountName = "BYBC Investments"
}: AccountBalanceProps) => {
  const [showNavigation, setShowNavigation] = useState(false);
  const isPositive = difference >= 0;

  // Define colors and styles based on account type
  const getAccountStyles = (type: string) => {
    switch (type.toLowerCase()) {
      case 'spending':
        return {
          gradient: 'from-blue-500 to-blue-600',
          icon: 'S',
          iconBg: 'bg-white/20'
        };
      case 'savings':
        return {
          gradient: 'from-green-500 to-green-600',
          icon: 'S',
          iconBg: 'bg-white/20'
        };
      case 'business':
        return {
          gradient: 'from-purple-500 to-purple-600',
          icon: 'B',
          iconBg: 'bg-white/20'
        };
      case 'nonprofit':
        return {
          gradient: 'from-orange-500 to-orange-600',
          icon: 'N',
          iconBg: 'bg-white/20'
        };
      case 'investments':
      default:
        return {
          gradient: 'from-teal-500 to-teal-600',
          icon: 'I',
          iconBg: 'bg-white/20'
        };
    }
  };

  const accountStyles = getAccountStyles(accountType);

  const handleTouchStart = () => {
    setShowNavigation(true);
  };

  const handleTouchEnd = () => {
    setTimeout(() => setShowNavigation(false), 2000);
  };

  return (
    <div 
      className={cn(
        `bg-gradient-to-br ${accountStyles.gradient} p-6 rounded-xl shadow-sm border animate-fade-in text-white relative overflow-hidden mx-4`,
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
          <div className={`w-10 h-10 ${accountStyles.iconBg} rounded-full flex items-center justify-center mr-3`}>
            <span className="text-white font-bold text-lg">{accountStyles.icon}</span>
          </div>
          <span className="text-white font-medium">{accountName}</span>
        </div>
      </div>
      
      <div className="mb-2">
        <div className="flex items-center text-white/80 text-sm mb-1">
          <span>••••</span>
          <span className="ml-2">4680</span>
        </div>
        <div className="mb-1">
          <span className="text-white/90 text-sm">Available Balance:</span>
        </div>
        <h1 className="text-3xl font-bold text-white">
          R{balance.toLocaleString('en-ZA', {
            minimumFractionDigits: 1,
            maximumFractionDigits: 1
          })}
        </h1>
      </div>
    </div>
  );
};

export default AccountBalance;
