
import { useToast } from "@/hooks/use-toast";

interface InvestmentHeaderProps {
  isPositive: boolean;
}

const InvestmentHeader = ({ isPositive }: InvestmentHeaderProps) => {
  // Get greeting based on time of day
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good morning";
    if (hour < 18) return "Good afternoon";
    return "Good evening";
  };
  
  return (
    <header className="flex items-center justify-between mb-6 animate-fade-in">
      <div>
        <h1 className="text-2xl font-bold">Investments</h1>
        <p className="text-muted-foreground">
          {getGreeting()}, Thabo. Your investments are
          <span className={isPositive ? "text-finance-green" : "text-destructive"}> 
            {isPositive ? " up " : " down "} 
          </span>
          today.
        </p>
      </div>
    </header>
  );
};

export default InvestmentHeader;
