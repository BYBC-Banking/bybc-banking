
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";

interface NetWorthCircleProps {
  currentValue: number;
  targetValue: number;
  className?: string;
}

const NetWorthCircle = ({ currentValue, targetValue, className }: NetWorthCircleProps) => {
  const percentage = Math.min(Math.round((currentValue / targetValue) * 100), 100);
  
  return (
    <div className={cn("relative flex flex-col items-center justify-center", className)}>
      {/* Circular progress with SVG */}
      <div className="relative h-44 w-44">
        <svg className="progress-ring h-full w-full" viewBox="0 0 100 100">
          {/* Background circle */}
          <circle 
            className="text-secondary"
            strokeWidth="8"
            stroke="currentColor"
            fill="transparent"
            r="40"
            cx="50"
            cy="50"
          />
          {/* Progress circle */}
          <circle 
            className="text-finance-green transition-all duration-700 ease-out"
            strokeWidth="8"
            strokeLinecap="round"
            stroke="currentColor"
            fill="transparent"
            r="40"
            cx="50"
            cy="50"
            strokeDasharray={`${2 * Math.PI * 40}`}
            strokeDashoffset={`${2 * Math.PI * 40 * (1 - percentage / 100)}`}
          />
        </svg>
        
        {/* Text in the middle */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-3xl font-bold">R{currentValue.toLocaleString()}</span>
          <span className="text-sm text-muted-foreground">Net Worth</span>
          <span className="text-xs text-finance-green">{percentage}% of goal</span>
        </div>
      </div>
    </div>
  );
};

export default NetWorthCircle;
