
import React from "react";
import { TrendingUp } from "lucide-react";

import { Button } from "@/components/ui/button";
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer } from "recharts";

interface PortfolioCardProps {
  isDarkMode: boolean;
  isBalanceVisible: boolean;
  animatedValue: number;
  formatCurrency: (value: number) => string;
  portfolioData: Array<{ time: string; value: number }>;
  timeframes: readonly string[];
  activeTimeframe: string;
  onTimeframeChange: (timeframe: string) => void;
}

const PortfolioCard = ({
  isDarkMode,
  isBalanceVisible,
  animatedValue,
  formatCurrency,
  portfolioData,
  timeframes,
  activeTimeframe,
  onTimeframeChange
}: PortfolioCardProps) => {
  return (
    <>
      <div className="text-center mb-3">
        <div className={`text-xs font-medium mb-1 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
          Total Portfolio Value
        </div>
        <div className={`text-2xl font-bold mb-2 ${isDarkMode ? 'text-yellow-400' : 'text-yellow-600'}`}>
          {isBalanceVisible ? formatCurrency(animatedValue) : "••••••••"}
        </div>
        <div className="flex items-center justify-center gap-2 mb-3">
          <div className="flex items-center gap-1 bg-green-500/20 px-2 py-1 rounded-full">
            <TrendingUp className="h-3 w-3 text-green-500" />
            <span className="text-green-500 font-medium text-xs">+R2,594.57 (+3.8%)</span>
          </div>
          <span className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>today</span>
        </div>
      </div>

      {/* Chart */}
      <div className="h-32 mb-3">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={portfolioData}>
            <XAxis 
              dataKey="time" 
              axisLine={false}
              tickLine={false}
              className={isDarkMode ? 'text-gray-400' : 'text-gray-600'}
              tick={{ fontSize: 9 }}
            />
            <YAxis hide />
            <Line 
              type="monotone" 
              dataKey="value" 
              stroke="#FFD700" 
              strokeWidth={2}
              dot={false}
              activeDot={{ r: 3, stroke: '#FFD700', strokeWidth: 2, fill: '#FFD700' }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Timeframe Selector */}
      <div className="flex justify-center gap-1">
        {timeframes.map((timeframe) => (
          <Button
            key={timeframe}
            variant="ghost"
            size="sm"
            onClick={() => onTimeframeChange(timeframe)}
            className={`transition-all duration-300 hover:scale-105 rounded-lg text-xs px-2 py-1 ${
              activeTimeframe === timeframe 
                ? 'bg-yellow-400 text-black font-medium' 
                : isDarkMode ? 'text-gray-400 hover:text-white' : 'text-gray-600'
            }`}
          >
            {timeframe}
          </Button>
        ))}
      </div>
    </>
  );
};

export default PortfolioCard;
