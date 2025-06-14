
import { Card, CardContent } from "@/components/ui/card";
import { 
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface FinancialStats {
  currentBalance: number;
  totalDonations: number;
  totalExpenses: number;
  allocationData: {
    name: string;
    value: number;
    color: string;
  }[];
}

interface DashboardStatsProps {
  stats: FinancialStats;
}

const DashboardStats = ({ stats }: DashboardStatsProps) => {
  return (
    <Card variant="neumorphism">
      <CardContent className="p-6">
        <h2 className="text-2xl font-bold mb-4 text-gray-700">Financial Summary</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <TooltipProvider>
            <div className="flex flex-col p-4 rounded-xl bg-gray-100 shadow-[inset_4px_4px_8px_#d1d9e6,inset_-4px_-4px_8px_#ffffff]">
              <Tooltip>
                <TooltipTrigger asChild>
                  <div className="text-sm text-gray-600 mb-1 flex items-center">
                    Current Balance
                  </div>
                </TooltipTrigger>
                <TooltipContent className="max-w-xs">
                  <p>The total funds currently available for our mission work.</p>
                </TooltipContent>
              </Tooltip>
              <div className="text-3xl font-bold text-gray-700">
                R{stats.currentBalance.toLocaleString()}
              </div>
            </div>
            
            <div className="flex flex-col p-4 rounded-xl bg-gray-100 shadow-[inset_4px_4px_8px_#d1d9e6,inset_-4px_-4px_8px_#ffffff]">
              <Tooltip>
                <TooltipTrigger asChild>
                  <div className="text-sm text-gray-600 mb-1">
                    Total Donations
                  </div>
                </TooltipTrigger>
                <TooltipContent className="max-w-xs">
                  <p>All contributions received from our generous donors.</p>
                </TooltipContent>
              </Tooltip>
              <div className="text-3xl font-bold text-green-700">
                R{stats.totalDonations.toLocaleString()}
              </div>
            </div>
            
            <div className="flex flex-col p-4 rounded-xl bg-gray-100 shadow-[inset_4px_4px_8px_#d1d9e6,inset_-4px_-4px_8px_#ffffff]">
              <Tooltip>
                <TooltipTrigger asChild>
                  <div className="text-sm text-gray-600 mb-1">
                    Total Expenses
                  </div>
                </TooltipTrigger>
                <TooltipContent className="max-w-xs">
                  <p>Funds utilized to achieve our mission objectives.</p>
                </TooltipContent>
              </Tooltip>
              <div className="text-3xl font-bold text-amber-700">
                R{stats.totalExpenses.toLocaleString()}
              </div>
            </div>
          </TooltipProvider>
        </div>
      </CardContent>
    </Card>
  );
};

export default DashboardStats;
