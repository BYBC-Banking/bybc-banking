
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { Card, CardContent } from "@/components/ui/card";
import { LineChart, Line, ResponsiveContainer, XAxis, YAxis } from "recharts";

interface PortfolioSummaryProps {
  data: {
    totalValue: number;
    change: number;
    changePercent: number;
    isPositive: boolean;
  };
  selectedTimeframe: "1D" | "1W" | "1M" | "3M" | "1Y" | "ALL";
  onTimeframeChange: (timeframe: "1D" | "1W" | "1M" | "3M" | "1Y" | "ALL") => void;
}

const PortfolioSummary = ({ 
  data, 
  selectedTimeframe, 
  onTimeframeChange 
}: PortfolioSummaryProps) => {
  // Mock chart data - would be dynamically loaded in a real app
  const chartData = [
    { name: "Jan", value: 45000 },
    { name: "Feb", value: 47000 },
    { name: "Mar", value: 46500 },
    { name: "Apr", value: 48500 },
    { name: "May", value: 50000 },
    { name: "Jun", value: 49500 },
    { name: "Jul", value: 51000 },
    { name: "Aug", value: 52475.32 }
  ];
  
  const timeframes = ["1D", "1W", "1M", "3M", "1Y", "ALL"] as const;
  
  return (
    <div className="animate-fade-in" style={{ animationDelay: "50ms" }}>
      <Card className="bg-white mb-6">
        <CardContent className="pt-6">
          <div className="mb-4">
            <div className="text-3xl font-bold">
              R{data.totalValue.toLocaleString()}
            </div>
            <div className={`text-sm flex items-center ${data.isPositive ? "text-finance-green" : "text-destructive"}`}>
              {data.isPositive ? "+" : "-"}R{data.change.toLocaleString()} 
              <span className="ml-2">({data.changePercent.toFixed(2)}%)</span>
            </div>
          </div>
          
          <div className="h-[180px] w-full">
            <ChartContainer 
              id="portfolio-chart" 
              config={{
                positive: { color: "#38A169" },
                negative: { color: "#E53E3E" }
              }}
            >
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={chartData}>
                  <XAxis 
                    dataKey="name" 
                    axisLine={false}
                    tickLine={false}
                    tick={{ fontSize: 10 }}
                    dy={10}
                  />
                  <YAxis 
                    hide={true}
                    domain={['dataMin - 1000', 'dataMax + 1000']}
                  />
                  <ChartTooltip
                    content={<ChartTooltipContent />}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="value" 
                    stroke={data.isPositive ? "var(--color-positive)" : "var(--color-negative)"}
                    strokeWidth={2}
                    dot={false}
                    activeDot={{ r: 6, strokeWidth: 0 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </ChartContainer>
          </div>
          
          <div className="flex justify-between mt-4 overflow-x-auto">
            {timeframes.map((timeframe) => (
              <button
                key={timeframe}
                onClick={() => onTimeframeChange(timeframe)}
                className={`px-4 py-1.5 rounded-full text-xs min-w-[44px] min-h-[44px] flex items-center justify-center ${
                  selectedTimeframe === timeframe
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted hover:bg-muted/80"
                }`}
              >
                {timeframe}
              </button>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PortfolioSummary;
