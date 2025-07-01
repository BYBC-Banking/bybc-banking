
import { useState } from "react";
import { ChevronLeft, ChevronRight, Eye, EyeOff } from "lucide-react";

interface AccountBalanceProps {
  balance: number;
  difference: number;
  onPreviousAccount?: () => void;
  onNextAccount?: () => void;
  canNavigatePrevious?: boolean;
  canNavigateNext?: boolean;
  accountType?: string;
  accountName?: string;
  accountSection?: string;
}

const AccountBalance = ({ 
  balance, 
  difference, 
  onPreviousAccount, 
  onNextAccount, 
  canNavigatePrevious = false, 
  canNavigateNext = false,
  accountType = "",
  accountName = "",
  accountSection = "personal" 
}: AccountBalanceProps) => {
  const [isBalanceVisible, setIsBalanceVisible] = useState(true);

  // Special case: BYBC Investments (Investments type) in business section uses teal theme
  const isInvestmentsBusiness = accountType === "Investments" && accountSection === "business";

  const getCardColors = () => {
    if (isInvestmentsBusiness) {
      return {
        bgColor: "bg-teal-600",
        textColor: "text-white"
      };
    }
    
    // Default business theme colors
    return {
      bgColor: "bg-finance-blue [html[data-theme='business']_&]:bg-business-primary",
      textColor: "text-white"
    };
  };

  const { bgColor, textColor } = getCardColors();

  const formatBalance = (amount: number) => {
    if (!isBalanceVisible) {
      return "R••••••";
    }
    return `R${amount.toLocaleString()}`;
  };

  const formatDifference = (amount: number) => {
    if (!isBalanceVisible) {
      return "••••••";
    }
    const sign = amount >= 0 ? "+" : "";
    return `${sign}R${amount.toLocaleString()}`;
  };

  return (
    <div className={`${bgColor} ${textColor} rounded-xl p-6 animate-fade-in`}>
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-sm opacity-90">{accountName || "Available Balance"}</h3>
        <button
          onClick={() => setIsBalanceVisible(!isBalanceVisible)}
          className="p-1 hover:bg-white/20 rounded-full transition-colors"
        >
          {isBalanceVisible ? (
            <Eye className="h-4 w-4" />
          ) : (
            <EyeOff className="h-4 w-4" />
          )}
        </button>
      </div>
      
      <div className="flex items-center justify-between">
        <button 
          onClick={onPreviousAccount}
          disabled={!canNavigatePrevious}
          className={`p-2 rounded-full transition-colors ${
            canNavigatePrevious 
              ? 'hover:bg-white/20' 
              : 'opacity-40 cursor-not-allowed'
          }`}
        >
          <ChevronLeft className="h-5 w-5" />
        </button>
        
        <div className="text-center flex-1">
          <div className="text-3xl font-bold mb-1">
            {formatBalance(balance)}
          </div>
          <div className="text-sm opacity-90">
            {formatDifference(difference)} from last month
          </div>
        </div>
        
        <button 
          onClick={onNextAccount}
          disabled={!canNavigateNext}
          className={`p-2 rounded-full transition-colors ${
            canNavigateNext 
              ? 'hover:bg-white/20' 
              : 'opacity-40 cursor-not-allowed'
          }`}
        >
          <ChevronRight className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
};

export default AccountBalance;
