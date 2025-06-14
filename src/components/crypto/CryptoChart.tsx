
import { useState } from "react";
import { TrendingUp, TrendingDown, BookmarkPlus } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { LineChart, Line, ResponsiveContainer, XAxis, YAxis, Tooltip } from "recharts";
import { Link } from "react-router-dom";

interface CryptoAsset {
  id: string;
  name: string;
  ticker: string;
  price: number;
  change: number;
  isPositive: boolean;
  marketCap: string;
  chartData: Array<{ time: string; price: number }>;
}

interface CryptoChartProps {
  selectedCrypto: CryptoAsset;
  hasInvestmentAccess: boolean;
  onAddToWatchlist: (crypto: CryptoAsset) => void;
  onBuy: (crypto: CryptoAsset) => void;
  onSell: (crypto: CryptoAsset) => void;
}

const CryptoChart = ({ 
  selectedCrypto, 
  hasInvestmentAccess, 
  onAddToWatchlist, 
  onBuy, 
  onSell 
}: CryptoChartProps) => {
  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 rounded shadow-md border">
          <p className="text-sm font-medium">{`Time: ${payload[0].payload.time}`}</p>
          <p className="text-sm text-orange-600">{`Price: R${payload[0].value.toLocaleString('en-ZA', { minimumFractionDigits: 2 })}`}</p>
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
              {selectedCrypto.name}
              <span className="ml-2 text-sm text-muted-foreground">
                {selectedCrypto.ticker}
              </span>
            </CardTitle>
            <div className="flex items-center mt-1">
              <span className="text-2xl font-bold">
                R{selectedCrypto.price.toLocaleString('en-ZA', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </span>
              <span
                className={`ml-2 flex items-center text-sm ${
                  selectedCrypto.isPositive ? "text-green-600" : "text-destructive"
                }`}
              >
                {selectedCrypto.isPositive ? (
                  <TrendingUp className="h-4 w-4 mr-1" />
                ) : (
                  <TrendingDown className="h-4 w-4 mr-1" />
                )}
                {selectedCrypto.isPositive ? "+" : ""}
                {selectedCrypto.change}%
              </span>
            </div>
            <div className="text-xs text-muted-foreground mt-1">
              Market Cap: R{selectedCrypto.marketCap}
            </div>
          </div>
          <Button
            variant="outline"
            size="icon"
            onClick={() => onAddToWatchlist(selectedCrypto)}
          >
            <BookmarkPlus className="h-5 w-5" />
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="h-[200px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={selectedCrypto.chartData}
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
                stroke={selectedCrypto.isPositive ? "#16a34a" : "#dc2626"} 
                strokeWidth={2} 
                dot={false}
                activeDot={{ r: 6 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
        
        <div className="grid grid-cols-3 gap-2 mt-4">
          <Button variant="default" className="bg-finance-green hover:bg-finance-green/90" onClick={() => onBuy(selectedCrypto)}>
            Buy
          </Button>
          <Button variant="outline" className="border-finance-blue text-finance-blue hover:bg-finance-blue/10" onClick={() => onSell(selectedCrypto)}>
            Sell
          </Button>
          <Link to="/crypto-wallet">
            <Button variant="outline" className="w-full border-finance-blue text-finance-blue hover:bg-finance-blue/10">
              Wallet
            </Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  );
};

export default CryptoChart;
