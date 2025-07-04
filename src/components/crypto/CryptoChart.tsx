
import { useState } from "react";
import { TrendingUp, TrendingDown, Star, StarOff } from "lucide-react";
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

  const chartData = [{
    name: "10:00",
    value: 65400
  }, {
    name: "11:00",
    value: 65420
  }, {
    name: "12:00",
    value: 65380
  }, {
    name: "13:00",
    value: 65450
  }, {
    name: "14:00",
    value: 65500
  }];

  const chartConfig = {
    value: {
      label: "Price",
      color: selectedCrypto.isPositive ? "#16a34a" : "#dc2626"
    }
  };

  const timeframes = [{
    label: "1H",
    value: "1H"
  }, {
    label: "1D",
    value: "1D"
  }, {
    label: "1W",
    value: "1W"
  }, {
    label: "1M",
    value: "1M"
  }, {
    label: "3M",
    value: "3M"
  }, {
    label: "1Y",
    value: "1Y"
  }];

  return (
    <div className="bg-white rounded-lg p-6 mb-6 shadow-sm border">
      {/* Header */}
      <div className="flex items-start justify-between mb-6">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <h2 className="text-xl font-bold text-gray-900">{selectedCrypto.name}</h2>
            <span className="text-sm text-gray-500 font-medium">{selectedCrypto.ticker}</span>
          </div>
          <div className="text-3xl font-bold text-gray-900 mb-1">
            R{selectedCrypto.price.toLocaleString('en-ZA', {
              minimumFractionDigits: 2
            })}
          </div>
          <div className={`flex items-center gap-1 text-sm font-medium ${
            selectedCrypto.isPositive ? 'text-green-600' : 'text-red-600'
          }`}>
            {selectedCrypto.isPositive ? <TrendingUp className="h-4 w-4" /> : <TrendingDown className="h-4 w-4" />}
            {selectedCrypto.isPositive ? '+' : ''}{selectedCrypto.change}%
          </div>
          <div className="text-sm text-gray-500 mt-1">Technology</div>
        </div>
        
        <Button variant="ghost" size="icon" onClick={handleWatchlistToggle} className="h-10 w-10">
          {isInWatchlist ? <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" /> : <StarOff className="h-5 w-5 text-gray-400" />}
        </Button>
      </div>

      {/* Chart */}
      <div className="h-[200px] mb-6">
        <ChartContainer config={chartConfig} id="crypto-chart">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData}>
              <XAxis 
                dataKey="name" 
                axisLine={false} 
                tickLine={false} 
                tick={{ fontSize: 12, fill: '#9CA3AF' }}
                dy={10}
              />
              <YAxis hide={true} domain={['dataMin - 10', 'dataMax + 10']} />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Line 
                type="monotone" 
                dataKey="value" 
                stroke="#16a34a"
                strokeWidth={3} 
                dot={false} 
                activeDot={{
                  r: 6,
                  strokeWidth: 0,
                  fill: "#16a34a"
                }} 
              />
            </LineChart>
          </ResponsiveContainer>
        </ChartContainer>
      </div>

      {/* Timeframe Selector */}
      <div className="flex justify-center gap-1 mb-6">
        {timeframes.map(timeframe => (
          <button
            key={timeframe.value}
            onClick={() => setSelectedTimeframe(timeframe.value as "1H" | "1D" | "1W" | "1M" | "3M" | "1Y")}
            className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${
              selectedTimeframe === timeframe.value 
                ? "bg-gray-900 text-white" 
                : "text-gray-500 hover:text-gray-700 hover:bg-gray-100"
            }`}
          >
            {timeframe.label}
          </button>
        ))}
      </div>

      {/* Action Buttons */}
      {hasInvestmentAccess && (
        <div className="flex gap-3">
          <Button 
            onClick={() => onBuy(selectedCrypto)} 
            className="flex-1 bg-green-600 hover:bg-green-700 text-white font-semibold h-12 rounded-lg"
          >
            Buy
          </Button>
          <Button 
            onClick={() => onSell(selectedCrypto)} 
            variant="outline" 
            className="flex-1 border-2 border-gray-200 text-blue-600 font-semibold h-12 rounded-lg hover:bg-gray-50"
          >
            Sell
          </Button>
        </div>
      )}
    </div>
  );
};

export default CryptoChart;
