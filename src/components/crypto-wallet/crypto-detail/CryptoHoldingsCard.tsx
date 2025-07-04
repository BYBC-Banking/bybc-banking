
import React from "react";
import { Card, CardContent } from "@/components/ui/card";

interface CryptoHoldingsCardProps {
  crypto: string;
  currentCrypto: any;
  userHolding: number;
  holdingValue: number;
  isDarkMode: boolean;
  isBalanceVisible: boolean;
  formatCurrency: (value: number) => string;
}

const CryptoHoldingsCard = ({
  crypto,
  currentCrypto,
  userHolding,
  holdingValue,
  isDarkMode,
  isBalanceVisible,
  formatCurrency
}: CryptoHoldingsCardProps) => {
  return (
    <Card className={`mb-6 ${isDarkMode ? 'bg-gray-800/50 backdrop-blur-md' : 'bg-white/60'} hover:scale-[1.01] transition-transform duration-300`}
          style={{border: `1px solid ${currentCrypto.color}30`}}>
      <CardContent className="p-6">
        <div className="text-center">
          <div className={`text-xs font-medium mb-1 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
            Your {crypto} Holdings
          </div>
          <div className="text-3xl font-bold mb-2" style={{color: currentCrypto.color}}>
            {isBalanceVisible ? `${userHolding} ${currentCrypto.symbol}` : "••••••••"}
          </div>
          <div className="text-xl font-semibold mb-3" style={{color: currentCrypto.color}}>
            {isBalanceVisible ? formatCurrency(holdingValue) : "••••••••"}
          </div>
          <div className="flex items-center justify-center gap-4 text-sm">
            <div className={`${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              24h Change: <span className={currentCrypto.change24h > 0 ? 'text-green-500' : 'text-red-500'}>
                {currentCrypto.change24h > 0 ? '+' : ''}{currentCrypto.change24h}%
              </span>
            </div>
            <div className={`${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              Avg Cost: {formatCurrency(currentCrypto.currentPrice * 0.92)}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CryptoHoldingsCard;
