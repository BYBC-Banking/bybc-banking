
import { ArrowUp } from "lucide-react";
import { cn } from "@/lib/utils";

interface AccountBalanceProps {
  balance: number;
  difference: number;
  className?: string;
}

const AccountBalance = ({ balance, difference, className }: AccountBalanceProps) => {
  const isPositive = difference >= 0;
  
  return (
    <div className={cn(
      "bg-gradient-to-br from-teal-500 to-teal-600 p-6 rounded-xl shadow-sm border animate-fade-in text-white",
      className
    )}>
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
        <h1 className="text-3xl font-bold text-white">
          R{balance.toLocaleString('en-ZA', { minimumFractionDigits: 1, maximumFractionDigits: 1 })}
        </h1>
      </div>
    </div>
  );
};

export default AccountBalance;
