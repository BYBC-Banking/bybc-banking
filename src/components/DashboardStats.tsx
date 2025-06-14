
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
    <Card>
      <CardContent className="p-6">
        <h2 className="text-2xl font-bold mb-4 [html[data-theme='business']_&]:text-gray-900">Financial Summary</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <TooltipProvider>
            <div className="flex flex-col">
              <Tooltip>
                <TooltipTrigger asChild>
                  <div className="text-sm text-muted-foreground mb-1 flex items-center [html[data-theme='business']_&]:text-gray-600">
                    Current Balance
                  </div>
                </TooltipTrigger>
                <TooltipContent className="max-w-xs">
                  <p>The total funds currently available for our mission work.</p>
                </TooltipContent>
              </Tooltip>
              <div className="text-3xl font-bold text-primary [html[data-theme='business']_&]:text-business-primary">
                R{stats.currentBalance.toLocaleString()}
              </div>
            </div>
            
            <div className="flex flex-col">
              <Tooltip>
                <TooltipTrigger asChild>
                  <div className="text-sm text-muted-foreground mb-1 [html[data-theme='business']_&]:text-gray-600">
                    Total Donations
                  </div>
                </TooltipTrigger>
                <TooltipContent className="max-w-xs">
                  <p>All contributions received from our generous donors.</p>
                </TooltipContent>
              </Tooltip>
              <div className="text-3xl font-bold text-green-600 [html[data-theme='business']_&]:text-green-700">
                R{stats.totalDonations.toLocaleString()}
              </div>
            </div>
            
            <div className="flex flex-col">
              <Tooltip>
                <TooltipTrigger asChild>
                  <div className="text-sm text-muted-foreground mb-1 [html[data-theme='business']_&]:text-gray-600">
                    Total Expenses
                  </div>
                </TooltipTrigger>
                <TooltipContent className="max-w-xs">
                  <p>Funds utilized to achieve our mission objectives.</p>
                </TooltipContent>
              </Tooltip>
              <div className="text-3xl font-bold text-amber-600 [html[data-theme='business']_&]:text-orange-600">
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
