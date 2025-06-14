
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, Clock, DollarSign, Shield } from "lucide-react";

const SwapAnalytics = () => {
  const analyticsData = {
    successRate: { value: 95.8, trend: '+2.1%' },
    totalConverted: { value: 60000, trend: '+15%' },
    bestWindow: '08:00-10:00 SAST',
    networkSavings: 145,
    ratePerformance: '+2.1%'
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-semibold mb-3">Analytics Dashboard</h2>
        <p className="text-sm text-muted-foreground">Performance metrics for your scheduled swaps</p>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {/* Success Rate */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm flex items-center gap-2">
              <Shield className="h-4 w-4 text-green-600" />
              Success Rate
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">
              {analyticsData.successRate.value}%
            </div>
            <Badge variant="outline" className="text-xs mt-1">
              {analyticsData.successRate.trend} vs last month
            </Badge>
          </CardContent>
        </Card>

        {/* Total Converted */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm flex items-center gap-2">
              <DollarSign className="h-4 w-4 text-blue-600" />
              Total Converted
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              R{analyticsData.totalConverted.toLocaleString()}
            </div>
            <Badge variant="outline" className="text-xs mt-1">
              {analyticsData.totalConverted.trend} this month
            </Badge>
          </CardContent>
        </Card>

        {/* Best Execution Window */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm flex items-center gap-2">
              <Clock className="h-4 w-4 text-purple-600" />
              Best Window
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-lg font-bold">
              {analyticsData.bestWindow}
            </div>
            <div className="text-xs text-muted-foreground mt-1">
              Optimal execution time
            </div>
          </CardContent>
        </Card>

        {/* Rate Performance */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm flex items-center gap-2">
              <TrendingUp className="h-4 w-4 text-orange-600" />
              Rate Performance
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-lg font-bold text-green-600">
              {analyticsData.ratePerformance}
            </div>
            <div className="text-xs text-muted-foreground mt-1">
              vs market average
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Network Fee Savings */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Network Fee Savings</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div>
              <div className="text-2xl font-bold text-green-600">
                R{analyticsData.networkSavings}
              </div>
              <div className="text-sm text-muted-foreground">
                Saved through scheduled swaps vs individual transactions
              </div>
            </div>
            <Badge className="bg-green-100 text-green-800">
              Efficient
            </Badge>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SwapAnalytics;
