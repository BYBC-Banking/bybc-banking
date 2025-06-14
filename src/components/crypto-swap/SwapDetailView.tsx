
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Clock, TrendingUp, History, Copy, Edit, Trash2 } from "lucide-react";

interface SwapDetailViewProps {
  swap: {
    id: string;
    fromAsset: string;
    amount: string;
    frequency: string;
    nextExecution: string;
    status: string;
    successRate: { successful: number; total: number };
    totalConverted: number;
    avgRate: number;
    executionHistory: Array<{
      date: string;
      status: 'success' | 'failed';
      amount: number;
      rate: number;
      reason?: string;
    }>;
  };
  onBack: () => void;
  onEdit: () => void;
  onDuplicate: () => void;
  onDelete: () => void;
}

const SwapDetailView = ({ swap, onBack, onEdit, onDuplicate, onDelete }: SwapDetailViewProps) => {
  const successPercentage = swap.successRate.total > 0 
    ? Math.round((swap.successRate.successful / swap.successRate.total) * 100)
    : 0;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" onClick={onBack}>
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <div>
          <h2 className="text-xl font-bold">{swap.fromAsset} → ZAR Schedule</h2>
          <p className="text-muted-foreground">{swap.amount} {swap.fromAsset} • {swap.frequency}</p>
        </div>
      </div>

      {/* Swap Details */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="h-5 w-5" />
            Swap Details
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <div className="text-sm text-muted-foreground">Amount</div>
              <div className="font-semibold">{swap.amount} {swap.fromAsset}</div>
            </div>
            <div>
              <div className="text-sm text-muted-foreground">Currency Pair</div>
              <div className="font-semibold">{swap.fromAsset}/ZAR</div>
            </div>
            <div>
              <div className="text-sm text-muted-foreground">Frequency</div>
              <div className="font-semibold">{swap.frequency}</div>
            </div>
            <div>
              <div className="text-sm text-muted-foreground">Next Execution</div>
              <div className="font-semibold">{swap.nextExecution}</div>
            </div>
            <div>
              <div className="text-sm text-muted-foreground">Timezone</div>
              <div className="font-semibold">SAST (UTC+2)</div>
            </div>
            <div>
              <div className="text-sm text-muted-foreground">Rate Type</div>
              <div className="font-semibold">Market Rate</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Performance */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5" />
            Performance
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <div className="text-sm text-muted-foreground">Success Rate</div>
              <div className={`text-2xl font-bold ${successPercentage >= 95 ? 'text-green-600' : successPercentage >= 80 ? 'text-yellow-600' : 'text-red-600'}`}>
                {successPercentage}%
              </div>
              <div className="text-sm text-muted-foreground">
                {swap.successRate.successful}/{swap.successRate.total} successful
              </div>
            </div>
            <div>
              <div className="text-sm text-muted-foreground">Total Converted</div>
              <div className="text-2xl font-bold">R{swap.totalConverted.toLocaleString()}</div>
              <div className="text-sm text-muted-foreground">This month</div>
            </div>
            <div>
              <div className="text-sm text-muted-foreground">Average Rate</div>
              <div className="text-xl font-semibold">R{swap.avgRate.toLocaleString()}</div>
              <div className="text-sm text-green-600">+2.1% vs market</div>
            </div>
            <div>
              <div className="text-sm text-muted-foreground">Network Fees Saved</div>
              <div className="text-xl font-semibold">R145</div>
              <div className="text-sm text-muted-foreground">vs individual swaps</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Recent History */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <History className="h-5 w-5" />
            Recent History
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {swap.executionHistory.slice(0, 5).map((execution, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-3">
                  <Badge variant={execution.status === 'success' ? 'default' : 'destructive'}>
                    {execution.status === 'success' ? '✅' : '❌'}
                  </Badge>
                  <div>
                    <div className="font-medium">{execution.date}</div>
                    {execution.reason && (
                      <div className="text-sm text-muted-foreground">{execution.reason}</div>
                    )}
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-semibold">R{execution.amount.toLocaleString()}</div>
                  <div className="text-sm text-muted-foreground">@R{execution.rate}</div>
                </div>
              </div>
            ))}
          </div>
          <Button variant="outline" className="w-full mt-4">
            View Full History
          </Button>
        </CardContent>
      </Card>

      {/* Actions */}
      <div className="grid grid-cols-3 gap-3">
        <Button variant="outline" onClick={onDuplicate}>
          <Copy className="h-4 w-4 mr-2" />
          Duplicate
        </Button>
        <Button variant="outline" onClick={onEdit}>
          <Edit className="h-4 w-4 mr-2" />
          Edit
        </Button>
        <Button variant="destructive" onClick={onDelete}>
          <Trash2 className="h-4 w-4 mr-2" />
          Delete
        </Button>
      </div>
    </div>
  );
};

export default SwapDetailView;
