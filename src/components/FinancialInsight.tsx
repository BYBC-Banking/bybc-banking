
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { TrendingUp } from "lucide-react";

const FinancialInsight = () => {
  return (
    <Card className="mb-6 border bg-white/50 backdrop-blur-sm">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-sm font-medium">Financial Insight</CardTitle>
            <CardDescription>Your monthly progress</CardDescription>
          </div>
          <div className="rounded-full bg-green-100 p-2">
            <TrendingUp className="h-4 w-4 text-finance-green" />
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          <div className="space-y-1">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Savings Goal</span>
              <span className="font-medium">R2,500 / R5,000</span>
            </div>
            <Progress value={50} className="h-2" />
          </div>
          
          <div className="space-y-1">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Budget Used</span>
              <span className="font-medium">R15,300 / R20,000</span>
            </div>
            <Progress value={75} className="h-2" />
          </div>
        </div>
      </CardContent>
      <CardFooter className="pt-0 text-xs text-muted-foreground">
        Updated 2 hours ago
      </CardFooter>
    </Card>
  );
};

export default FinancialInsight;
