
import React from "react";
import { TrendingUp, TrendingDown } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis } from "recharts";

interface CryptoPriceChartProps {
  currentCrypto: any;
  animatedPrice: number;
  chartData: any[];
  timeframes: string[];
  activeTimeframe: string;
  isDarkMode: boolean;
  crypto: string;
  formatCurrency: (value: number) => string;
  formatLargeNumber: (value: number) => string;
  onTimeframeChange: (timeframe: string) => void;
}

const CryptoPriceChart = ({
  currentCrypto,
  animatedPrice,
  chartData,
  timeframes,
  activeTimeframe,
  isDarkMode,
  crypto,
  formatCurrency,
  formatLargeNumber,
  onTimeframeChange
}: CryptoPriceChartProps) => {
  return (
    <Card className={`mb-6 ${isDarkMode ? 'bg-gray-800/50 backdrop-blur-md' : 'bg-white/60'} hover:scale-[1.01] transition-transform duration-300`}
          style={{border: `1px solid ${currentCrypto.color}30`}}>
      <CardContent className="p-6">
        <div className="text-center mb-4">
          <div className="text-4xl font-bold mb-2" style={{color: currentCrypto.color}}>
            {formatCurrency(animatedPrice)}
          </div>
          <div className="flex items-center justify-center gap-2">
            <div className={`flex items-center gap-1 px-3 py-1 rounded-full ${
              currentCrypto.change24h > 0 ? 'bg-green-500/20' : 'bg-red-500/20'
            }`}>
              {currentCrypto.change24h > 0 ? 
                <TrendingUp className="h-4 w-4 text-green-500" /> : 
                <TrendingDown className="h-4 w-4 text-red-500" />
              }
              <span className={`font-medium ${currentCrypto.change24h > 0 ? 'text-green-500' : 'text-red-500'}`}>
                {currentCrypto.change24h > 0 ? '+' : ''}{currentCrypto.change24h}%
              </span>
            </div>
            <span className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>24h</span>
          </div>
        </div>

        {/* Chart */}
        <div className="h-48 mb-4">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={chartData}>
              <defs>
                <linearGradient id={`gradient-${crypto}`} x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={currentCrypto.color} stopOpacity={0.3}/>
                  <stop offset="95%" stopColor={currentCrypto.color} stopOpacity={0}/>
                </linearGradient>
              </defs>
              <XAxis 
                dataKey="time" 
                axisLine={false}
                tickLine={false}
                className={isDarkMode ? 'text-gray-400' : 'text-gray-600'}
                tick={{ fontSize: 10 }}
              />
              <YAxis hide />
              <Area 
                type="monotone" 
                dataKey="price" 
                stroke={currentCrypto.color}
                strokeWidth={2}
                fill={`url(#gradient-${crypto})`}
                dot={false}
                activeDot={{ r: 4, stroke: currentCrypto.color, strokeWidth: 2, fill: currentCrypto.color }}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Timeframe Selector */}
        <div className="flex justify-center gap-1 mb-4">
          {timeframes.map((timeframe) => (
            <Button
              key={timeframe}
              variant="ghost"
              size="sm"
              onClick={() => onTimeframeChange(timeframe)}
              className={`transition-all duration-300 hover:scale-105 rounded-lg text-xs px-3 py-1 ${
                activeTimeframe === timeframe 
                  ? 'font-medium text-black' 
                  : isDarkMode ? 'text-gray-400 hover:text-white' : 'text-gray-600'
              }`}
              style={{
                backgroundColor: activeTimeframe === timeframe ? currentCrypto.color : 'transparent'
              }}
            >
              {timeframe}
            </Button>
          ))}
        </div>

        {/* Market Stats */}
        <div className="grid grid-cols-3 gap-4">
          <div className="text-center">
            <div className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>Market Cap</div>
            <div className="font-semibold text-sm" style={{color: currentCrypto.color}}>
              {formatLargeNumber(currentCrypto.marketCap)}
            </div>
          </div>
          <div className="text-center">
            <div className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>24h Volume</div>
            <div className="font-semibold text-sm" style={{color: currentCrypto.color}}>
              {formatLargeNumber(currentCrypto.volume24h)}
            </div>
          </div>
          <div className="text-center">
            <div className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>Supply</div>
            <div className="font-semibold text-sm" style={{color: currentCrypto.color}}>
              {currentCrypto.supply.toLocaleString()}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CryptoPriceChart;
