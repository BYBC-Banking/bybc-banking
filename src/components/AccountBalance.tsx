import { ArrowLeft, ArrowRight, Eye, EyeOff } from "lucide-react";
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
  accountSection?: string;
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
  accountName = "BYBC Investments",
  accountSection = "personal"
}: AccountBalanceProps) => {
  const [showNavigation, setShowNavigation] = useState(false);
  const [isBalanceVisible, setIsBalanceVisible] = useState(true);
  const isPositive = difference >= 0;

  // Professional/dark color scheme for business section and business account type
  const getAccountStyles = (type: string, section: string) => {
    // Special case: Nonprofit in business section gets Dark Green Finance theme
    if (type.toLowerCase() === "nonprofit" && section === "business") {
      return {
        bgColor: "bg-slate-900 border border-slate-700", // Dark Navy
        textColor: "text-slate-100", // Soft White
        icon: "N",
        iconBg: "bg-slate-800", // Very Dark Blue-Grey
        iconText: "text-emerald-400" // Emerald Green
      };
    }

    if (type.toLowerCase() === "business" && section === "business") {
      return {
        bgColor: "bg-neutral-900 border border-neutral-800",
        textColor: "text-neutral-100",
        icon: "B",
        iconBg: "bg-neutral-800",
        iconText: "text-neutral-300"
      };
    }

    switch (type.toLowerCase()) {
      case "spending":
        return {
          bgColor: "bg-blue-50",
          textColor: "text-blue-900",
          icon: "S",
          iconBg: "bg-blue-100",
          iconText: "text-blue-700"
        };
      case "savings":
        return {
          bgColor: "bg-green-50",
          textColor: "text-green-900",
          icon: "S",
          iconBg: "bg-green-100",
          iconText: "text-green-700"
        };
      case "business":
        return {
          bgColor: "bg-purple-50",
          textColor: "text-purple-900",
          icon: "B",
          iconBg: "bg-purple-100",
          iconText: "text-purple-700"
        };
      case "nonprofit":
        return {
          bgColor: "bg-orange-50",
          textColor: "text-orange-900",
          icon: "N",
          iconBg: "bg-orange-100",
          iconText: "text-orange-700"
        };
      case "investments":
      default:
        return {
          bgColor: "bg-slate-100",
          textColor: "text-slate-900",
          icon: "I",
          iconBg: "bg-slate-200",
          iconText: "text-slate-700"
        };
    }
  };

  const accountStyles = getAccountStyles(accountType, accountSection);

  const handleTouchStart = () => {
    setShowNavigation(true);
  };

  const handleTouchEnd = () => {
    setTimeout(() => setShowNavigation(false), 2000);
  };

  const formatBalance = (amount: number) => {
    if (!isBalanceVisible) {
      return "••••••";
    }
    return `R${amount.toLocaleString("en-ZA", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })}`;
  };

  return (
    <div
      className={cn(
        `${accountStyles.bgColor} p-6 lg:p-8 rounded-2xl lg:rounded-3xl shadow-[8px_8px_16px_rgba(0,0,0,0.1),-8px_-8px_16px_rgba(255,255,255,0.7)] animate-fade-in ${accountStyles.textColor} relative overflow-hidden mx-4 lg:mx-0 ${
          accountStyles.bgColor.includes("neutral-900") || accountStyles.bgColor.includes("slate-900")
            ? "border border-neutral-800"
            : "border border-white/20"
        }`,
        className
      )}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      onMouseEnter={() => setShowNavigation(true)}
      onMouseLeave={() => setShowNavigation(false)}
    >
      {/* Eye icon for balance visibility toggle */}
      <button
        onClick={() => setIsBalanceVisible(!isBalanceVisible)}
        className="absolute top-4 right-4 p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors z-10"
      >
        {isBalanceVisible ? (
          <Eye className="h-4 w-4 text-current opacity-70" />
        ) : (
          <EyeOff className="h-4 w-4 text-current opacity-70" />
        )}
      </button>

      {/* Navigation arrows with neumorphism style */}
      {showNavigation && canNavigatePrevious && (
        <button
          onClick={onPreviousAccount}
          className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-[inset_4px_4px_8px_rgba(0,0,0,0.1),inset_-4px_-4px_8px_rgba(255,255,255,0.9)] hover:shadow-[inset_2px_2px_4px_rgba(0,0,0,0.1),inset_-2px_-2px_4px_rgba(255,255,255,0.9)] transition-all z-10"
        >
          <ArrowLeft className="h-5 w-5 text-slate-600" />
        </button>
      )}
      {showNavigation && canNavigateNext && (
        <button
          onClick={onNextAccount}
          className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-[inset_4px_4px_8px_rgba(0,0,0,0.1),inset_-4px_-4px_8px_rgba(255,255,255,0.9)] hover:shadow-[inset_2px_2px_4px_rgba(0,0,0,0.1),inset_-2px_-2px_4px_rgba(255,255,255,0.9)] transition-all z-10"
        >
          <ArrowRight className="h-5 w-5 text-slate-600" />
        </button>
      )}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center">
          <div
            className={`w-10 h-10 ${accountStyles.iconBg} rounded-full flex items-center justify-center mr-3 shadow-[inset_2px_2px_4px_rgba(0,0,0,0.1),inset_-2px_-2px_4px_rgba(255,255,255,0.9)]`}
          >
            <span className={`${accountStyles.iconText} font-bold text-lg`}>
              {accountStyles.icon}
            </span>
          </div>
          <span className={`${accountStyles.textColor} font-medium`}>
            {accountName}
          </span>
        </div>
      </div>
      <div className="mb-2">
        <div
          className={`flex items-center ${accountStyles.textColor}/70 text-sm mb-1`}
        >
          <span>••••</span>
          <span className="ml-2">4680</span>
        </div>
        <div className="mb-1">
          <span className={`${accountStyles.textColor}/80 text-sm`}>
            Available Balance:
          </span>
        </div>
        <h1 className={`text-3xl lg:text-4xl xl:text-5xl font-bold ${accountStyles.textColor}`}>
          {formatBalance(balance)}
        </h1>
      </div>
    </div>
  );
};

export default AccountBalance;
