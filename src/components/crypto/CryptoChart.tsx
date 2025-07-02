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

const CryptoChart = ({ selectedCrypto, hasInvestmentAccess, onAddToWatchlist, onBuy, onSell }: CryptoChartProps) => {
  const [isInWatchlist, setIsInWatchlist] = useState(false);
  const [selectedTimeframe, setSelectedTimeframe] = useState<"1H" | "1D" | "1W" | "1M" | "3M" | "1Y">("1D");

  const handleWatchlistToggle = () => {
    setIsInWatchlist(!isInWatchlist);
    onAddToWatchlist(selectedCrypto);
  };

  const chartData = [
    { name: "00:00", value: 65400 },
    { name: "03:00", value: 65420 },
    { name: "06:00", value: 65380 },
    { name: "09:00", value: 65450 },
    { name: "12:00", value: 65500 },
    { name: "15:00", value: 65480 },
    { name: "18:00", value: 65520 },
    { name: "21:00", value: 65550 },
    { name: "24:00", value: 65530 },
  ];

  const timeframes = [
    { label: "1H", value: "1H" },
    { label: "1D", value: "1D" },
    { label: "1W", value: "1W" },
    { label: "1M", value: "1M" },
    { label: "3M", value: "3M" },
    { label: "1Y", value: "1Y" },
  ];

  return (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-orange-100 flex items-center justify-center">
              <span className="text-orange-600 font-bold text-sm">₿</span>
            </div>
            <div>
              <h3 className="font-semibold">{selectedCrypto.name}</h3>
              <p className="text-sm text-muted-foreground">{selectedCrypto.ticker}</p>
            </div>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={handleWatchlistToggle}
            className="h-8 w-8"
          >
            {isInWatchlist ? (
              <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
            ) : (
              <StarOff className="h-4 w-4" />
            )}
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="mb-4">
          <div className="text-2xl font-bold">
            R{selectedCrypto.price.toLocaleString('en-ZA', { minimumFractionDigits: 2 })}
          </div>
          <div className={`text-sm flex items-center gap-1 ${selectedCrypto.isPositive ? 'text-green-600' : 'text-red-600'}`}>
            {selectedCrypto.isPositive ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
            {selectedCrypto.isPositive ? '+' : ''}{selectedCrypto.change}%
          </div>
        </div>

        <div className="h-[200px]">
          <ChartContainer id="crypto-chart">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData}>
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 10 }} dy={10} />
                <YAxis hide={true} domain={['dataMin - 10', 'dataMax + 10']} />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Line
                  type="monotone"
                  dataKey="value"
                  stroke={selectedCrypto.isPositive ? "var(--color-positive)" : "var(--color-negative)"}
                  strokeWidth={2}
                  dot={false}
                  activeDot={{ r: 6, strokeWidth: 0 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </ChartContainer>
        </div>

        <div className="flex justify-between mt-2">
          {timeframes.map((timeframe) => (
            <button
              key={timeframe.value}
              onClick={() => setSelectedTimeframe(timeframe.value as "1H" | "1D" | "1W" | "1M" | "3M" | "1Y")}
              className={`px-3 py-1 rounded-full text-xs ${selectedTimeframe === timeframe.value
                ? "bg-primary text-primary-foreground"
                : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
                }`}
            >
              {timeframe.label}
            </button>
          ))}
        </div>

        {/* Action Buttons */}
        {hasInvestmentAccess && (
          <div className="flex gap-2 mt-4">
            <Button 
              onClick={() => onBuy(selectedCrypto)}
              className="flex-1"
            >
              Buy
            </Button>
            <Button 
              onClick={() => onSell(selectedCrypto)}
              variant="destructive"
              className="flex-1 bg-red-600 hover:bg-red-700"
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
