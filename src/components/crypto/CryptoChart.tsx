
import { useState } from "react";
import { TrendingUp, TrendingDown, BookmarkPlus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LineChart, Line, ResponsiveContainer, XAxis, YAxis } from "recharts";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";

interface CryptoChartProps {
  selectedCrypto: any;
  hasInvestmentAccess: boolean;
  onAddToWatchlist: (crypto: any) => void;
  onBuy: (crypto: any) => void;
  onSell: (crypto: any) => void;
}

const CryptoChart = ({
  selectedCrypto,
  hasInvestmentAccess,
  onAddToWatchlist,
  onBuy,
  onSell
}: CryptoChartProps) => {
  const [isInWatchlist, setIsInWatchlist] = useState(false);
  const [selectedTimeframe, setSelectedTimeframe] = useState<"1H" | "1D" | "1W" | "1M" | "3M" | "1Y">("1D");

  const handleWatchlistToggle = () => {
    setIsInWatchlist(!isInWatchlist);
    onAddToWatchlist(selectedCrypto);
  };

  const chartData = [
    { name: "10:00", value: 65400 },
    { name: "11:00", value: 65420 },
    { name: "12:00", value: 65380 },
    { name: "13:00", value: 65450 },
    { name: "14:00", value: 65530 }
  ];

  const chartConfig = {
    value: {
      label: "Price",
      color: selectedCrypto.isPositive ? "#16a34a" : "#dc2626"
    }
  };

  const timeframes = [
    { label: "1H", value: "1H" },
    { label: "1D", value: "1D" },
    { label: "1W", value: "1W" },
    { label: "1M", value: "1M" },
    { label: "3M", value: "3M" },
    { label: "1Y", value: "1Y" }
  ];

  return (
    <Card className="mb-6 bg-white">
      <CardContent className="p-6">
        {/* Header */}
        <div className="flex items-start justify-between mb-6">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <h2 className="text-2xl font-bold text-gray-900">{selectedCrypto.name}</h2>
              <span className="text-sm text-gray-500 font-medium">{selectedCrypto.ticker}</span>
            </div>
            <div className="flex items-center gap-3 mb-2">
              <span className="text-3xl font-bold text-gray-900">
                R{selectedCrypto.price.toLocaleString('en-ZA', { minimumFractionDigits: 2 })}
              </span>
              <div className={`flex items-center gap-1 text-sm font-medium ${
                selectedCrypto.isPositive ? 'text-green-600' : 'text-red-600'
              }`}>
                {selectedCrypto.isPositive ? 
                  <TrendingUp className="h-4 w-4" /> : 
                  <TrendingDown className="h-4 w-4" />
                }
                {selectedCrypto.isPositive ? '+' : ''}{selectedCrypto.change}%
              </div>
            </div>
            <div className="text-sm text-gray-500">Technology</div>
          </div>
          
          <Button variant="ghost" size="icon" onClick={handleWatchlistToggle} className="h-8 w-8">
            <BookmarkPlus className="h-5 w-5" />
          </Button>
        </div>

        {/* Chart */}
        <div className="h-[200px] mb-4">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData}>
              <XAxis 
                dataKey="name" 
                axisLine={false} 
                tickLine={false} 
                tick={{ fontSize: 12, fill: '#6b7280' }}
                dy={10}
              />
              <YAxis hide={true} domain={['dataMin - 10', 'dataMax + 10']} />
              <Line 
                type="monotone" 
                dataKey="value" 
                stroke={selectedCrypto.isPositive ? "#16a34a" : "#dc2626"} 
                strokeWidth={3} 
                dot={false}
                activeDot={{ r: 6, strokeWidth: 0 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Action Buttons */}
        {hasInvestmentAccess && (
          <div className="flex gap-3">
            <Button 
              onClick={() => onBuy(selectedCrypto)} 
              className="flex-1 bg-green-600 hover:bg-green-700 text-white font-medium py-3"
            >
              Buy
            </Button>
            <Button 
              onClick={() => onSell(selectedCrypto)} 
              variant="outline" 
              className="flex-1 border-blue-500 text-blue-600 hover:bg-blue-50 font-medium py-3"
            >
              Sell
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default CryptoChart;
