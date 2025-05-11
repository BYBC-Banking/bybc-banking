
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
      "bg-gradient-to-br from-white to-slate-100 p-6 rounded-xl shadow-sm border animate-fade-in",
      className
    )}>
      <div className="flex flex-col items-center justify-center space-y-2">
        <p className="text-sm text-muted-foreground">Available Balance</p>
        <h1 className="text-4xl font-bold">${balance.toLocaleString()}</h1>
        
        <div className={cn(
          "flex items-center gap-1 text-sm rounded-full px-3 py-1",
          isPositive ? "bg-finance-green/10 text-finance-green" : "bg-finance-expense/10 text-finance-expense"
        )}>
          {isPositive ? (
            <ArrowUp className="h-3 w-3" />
          ) : (
            <ArrowUp className="h-3 w-3 transform rotate-180" />
          )}
          <span>
            {isPositive ? "+" : "-"}${Math.abs(difference).toLocaleString()} since yesterday
          </span>
        </div>
      </div>
    </div>
  );
};

export default AccountBalance;
