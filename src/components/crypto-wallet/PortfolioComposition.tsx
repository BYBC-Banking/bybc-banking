
import React from "react";
import { Card, CardContent } from "@/components/ui/card";

interface Asset {
  name: string;
  value: number;
  amount: number;
  color: string;
  icon: string;
  symbol: string;
}

interface PortfolioCompositionProps {
  isDarkMode: boolean;
  isBalanceVisible: boolean;
  portfolioComposition: Asset[];
  formatCurrency: (value: number) => string;
  getHoldingLevel: (percentage: number) => string;
  onAssetClick?: (assetName: string) => void;
}

const PortfolioComposition = ({
  isDarkMode,
  isBalanceVisible,
  portfolioComposition,
  formatCurrency,
  getHoldingLevel,
  onAssetClick
}: PortfolioCompositionProps) => {
  return (
    <Card className={`${isDarkMode ? 'bg-gray-800/50 border-yellow-400/30 backdrop-blur-md' : 'bg-white/60 border-yellow-600/50'} hover:scale-[1.01] transition-transform duration-300`}>
      <CardContent className="p-4">
        <h2 className={`text-lg font-bold mb-4 text-center ${isDarkMode ? 'text-yellow-400' : 'text-yellow-600'}`}>
          Portfolio Composition
        </h2>
        
        {/* Asset List */}
        <div className="space-y-2">
          {portfolioComposition.map((asset, index) => (
            <div
              key={asset.name}
              className={`flex items-center justify-between p-2 rounded-xl transition-all duration-300 hover:scale-[1.02] cursor-pointer ${
                isDarkMode ? 'bg-gray-700/30 hover:bg-gray-700/50' : 'bg-gray-50/50 hover:bg-gray-100/50'
              }`}
              onClick={() => onAssetClick && onAssetClick(asset.name)}
            >
              <div className="flex items-center gap-2">
                <div
                  className="w-8 h-8 rounded-full flex items-center justify-center text-white font-bold text-xs"
                  style={{ backgroundColor: asset.color }}
                >
                  {asset.symbol}
                </div>
                <div>
                  <div className={`font-semibold text-sm ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                    {asset.name}
                  </div>
                  <div className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                    {asset.value}% of portfolio
                  </div>
                </div>
              </div>
              <div className="text-right">
                <div className={`font-bold text-sm ${isDarkMode ? 'text-yellow-400' : 'text-yellow-600'}`}>
                  {isBalanceVisible ? formatCurrency(asset.amount) : "••••••"}
                </div>
                <div className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  {getHoldingLevel(asset.value)}
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default PortfolioComposition;
