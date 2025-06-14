
import { TrendingUp, TrendingDown, BookmarkPlus, Briefcase } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { LineChart, Line, ResponsiveContainer, XAxis, YAxis, Tooltip } from "recharts";

interface Stock {
  id: string;
  name: string;
  ticker: string;
  price: number;
  change: number;
  isPositive: boolean;
  sector: string;
  chartData: Array<{ time: string; price: number }>;
}

interface StockChartProps {
  selectedStock: Stock;
  hasInvestmentAccess: boolean;
  onAddToWatchlist: (stock: Stock) => void;
  onBuy: (stock: Stock) => void;
  onSell: (stock: Stock) => void;
}

const StockChart = ({ 
  selectedStock, 
  hasInvestmentAccess, 
  onAddToWatchlist, 
  onBuy, 
  onSell 
}: StockChartProps) => {
  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 rounded shadow-md border">
          <p className="text-sm font-medium">{`Time: ${payload[0].payload.time}`}</p>
          <p className="text-sm text-finance-blue">{`Price: R${payload[0].value.toFixed(2)}`}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <Card className="mb-6">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center">
          <div>
            <CardTitle className="text-xl flex items-center">
              {selectedStock.name}
              <span className="ml-2 text-sm text-muted-foreground">
                {selectedStock.ticker}
              </span>
            </CardTitle>
            <div className="flex items-center mt-1">
              <span className="text-2xl font-bold">
                R{selectedStock.price.toLocaleString('en-ZA', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </span>
              <span
                className={`ml-2 flex items-center text-sm ${
                  selectedStock.isPositive ? "text-finance-green" : "text-destructive"
                }`}
              >
                {selectedStock.isPositive ? (
                  <TrendingUp className="h-4 w-4 mr-1" />
                ) : (
                  <TrendingDown className="h-4 w-4 mr-1" />
                )}
                {selectedStock.isPositive ? "+" : ""}
                {selectedStock.change}%
              </span>
            </div>
            <div className="text-xs text-muted-foreground mt-1">
              {selectedStock.sector}
            </div>
          </div>
          <Button
            variant="outline"
            size="icon"
            onClick={() => onAddToWatchlist(selectedStock)}
          >
            <BookmarkPlus className="h-5 w-5" />
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="h-[200px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={selectedStock.chartData}
              margin={{ top: 5, right: 20, bottom: 5, left: 0 }}
            >
              <XAxis 
                dataKey="time" 
                axisLine={false} 
                tickLine={false}
                tick={{ fontSize: 12 }}
              />
              <YAxis 
                domain={['dataMin', 'dataMax']} 
                axisLine={false} 
                tickLine={false}
                tick={{ fontSize: 12 }}
                hide
              />
              <Tooltip content={<CustomTooltip />} />
              <Line 
                type="monotone" 
                dataKey="price" 
                stroke={selectedStock.isPositive ? "#16a34a" : "#dc2626"} 
                strokeWidth={2} 
                dot={false}
                activeDot={{ r: 6 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
        
        <div className={`grid gap-2 mt-4 ${hasInvestmentAccess ? 'grid-cols-3' : 'grid-cols-2'}`}>
          <Button variant="default" className="bg-finance-green hover:bg-finance-green/90" onClick={() => onBuy(selectedStock)}>
            Buy
          </Button>
          <Button variant="outline" className="border-finance-blue text-finance-blue hover:bg-finance-blue/10" onClick={() => onSell(selectedStock)}>
            Sell
          </Button>
          {hasInvestmentAccess && (
            <Button variant="outline" className="border-amber-500 text-amber-500 hover:bg-amber-500/10">
              <Briefcase className="h-4 w-4" />
              Holdings
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default StockChart;
