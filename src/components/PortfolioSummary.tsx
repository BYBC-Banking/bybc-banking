import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { Card, CardContent } from "@/components/ui/card";
import { LineChart, Line, ResponsiveContainer, XAxis, YAxis } from "recharts";
import { useMemo } from "react";
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
  // Mock chart data that changes based on the selected timeframe
  const chartData = useMemo(() => {
    switch (selectedTimeframe) {
      case "1D":
        return [{
          name: "9AM",
          value: 51000
        }, {
          name: "11AM",
          value: 52000
        }, {
          name: "1PM",
          value: 51500
        }, {
          name: "3PM",
          value: 52475.32
        }];
      case "1W":
        return [{
          name: "Mon",
          value: 50000
        }, {
          name: "Tue",
          value: 50500
        }, {
          name: "Wed",
          value: 51200
        }, {
          name: "Thu",
          value: 51800
        }, {
          name: "Fri",
          value: 52475.32
        }];
      case "1M":
        return [{
          name: "Week 1",
          value: 48000
        }, {
          name: "Week 2",
          value: 49500
        }, {
          name: "Week 3",
          value: 51000
        }, {
          name: "Week 4",
          value: 52475.32
        }];
      case "3M":
        return [{
          name: "Jan",
          value: 45000
        }, {
          name: "Feb",
          value: 47000
        }, {
          name: "Mar",
          value: 52475.32
        }];
      case "1Y":
        return [{
          name: "Jan",
          value: 45000
        }, {
          name: "Feb",
          value: 47000
        }, {
          name: "Mar",
          value: 46500
        }, {
          name: "Apr",
          value: 48500
        }, {
          name: "May",
          value: 50000
        }, {
          name: "Jun",
          value: 49500
        }, {
          name: "Jul",
          value: 51000
        }, {
          name: "Aug",
          value: 52475.32
        }];
      case "ALL":
        return [{
          name: "2021",
          value: 30000
        }, {
          name: "2022",
          value: 38000
        }, {
          name: "2023",
          value: 45000
        }, {
          name: "2024",
          value: 52475.32
        }];
      default:
        return [{
          name: "Jan",
          value: 45000
        }, {
          name: "Feb",
          value: 47000
        }, {
          name: "Mar",
          value: 46500
        }, {
          name: "Apr",
          value: 48500
        }, {
          name: "May",
          value: 50000
        }, {
          name: "Jun",
          value: 49500
        }, {
          name: "Jul",
          value: 51000
        }, {
          name: "Aug",
          value: 52475.32
        }];
    }
  }, [selectedTimeframe]);
  const timeframes = ["1D", "1W", "1M", "3M", "1Y", "ALL"] as const;
  return <div className="animate-fade-in" style={{
    animationDelay: "50ms"
  }}>
      <Card className="bg-white mb-6">
        <CardContent className="pt-6 py-[20px]">
          <div className="mb-4">
            <div className="text-3xl font-bold [html[data-theme='business']_&]:text-gray-900">
              R{data.totalValue.toLocaleString()}
            </div>
            <div className={`text-sm flex items-center ${data.isPositive ? "text-finance-green [html[data-theme='business']_&]:text-green-700" : "text-destructive [html[data-theme='business']_&]:text-red-700"}`}>
              {data.isPositive ? "+" : "-"}R{data.change.toLocaleString()} 
              <span className="ml-2">({data.changePercent.toFixed(2)}%)</span>
            </div>
          </div>
          
          <div className="h-[150px] w-full">
            <ChartContainer id="portfolio-chart" config={{
            positive: {
              color: "#38A169"
            },
            negative: {
              color: "#E53E3E"
            }
          }}>
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={chartData}>
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{
                  fontSize: 10
                }} dy={10} />
                  <YAxis hide={true} domain={['dataMin - 1000', 'dataMax + 1000']} />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Line type="monotone" dataKey="value" stroke={data.isPositive ? "var(--color-positive)" : "var(--color-negative)"} strokeWidth={2} dot={false} activeDot={{
                  r: 6,
                  strokeWidth: 0
                }} />
                </LineChart>
              </ResponsiveContainer>
            </ChartContainer>
          </div>
          
          <div className="flex justify-between mt-4 overflow-x-auto my-0">
            {timeframes.map(timeframe => <button key={timeframe} onClick={() => onTimeframeChange(timeframe)} className={`px-4 py-1.5 rounded-full text-xs min-w-[44px] min-h-[44px] flex items-center justify-center transition-colors ${selectedTimeframe === timeframe ? "bg-primary text-primary-foreground [html[data-theme='business']_&]:bg-business-primary [html[data-theme='business']_&]:text-white" : "bg-muted hover:bg-muted/80 [html[data-theme='business']_&]:bg-gray-100 [html[data-theme='business']_&]:hover:bg-gray-200 [html[data-theme='business']_&]:text-gray-700"}`}>
                {timeframe}
              </button>)}
          </div>
        </CardContent>
      </Card>
    </div>;
};
export default PortfolioSummary;