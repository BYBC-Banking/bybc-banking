import React from "react";
import { TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer } from "recharts";
interface PortfolioCardProps {
  isDarkMode: boolean;
  isBalanceVisible: boolean;
  animatedValue: number;
  formatCurrency: (value: number) => string;
  portfolioData: Array<{
    time: string;
    value: number;
  }>;
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
  return <>
      

      {/* Chart */}
      <div className="h-32 mb-3">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={portfolioData}>
            <YAxis hide />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Timeframe Selector */}
      
    </>;
};
export default PortfolioCard;