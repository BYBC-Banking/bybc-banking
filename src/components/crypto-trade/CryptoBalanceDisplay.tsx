
import React from 'react';
import { CryptoAsset } from './cryptoData';

interface CryptoBalanceDisplayProps {
  activeTab: 'buy' | 'sell';
  selectedCryptoData: CryptoAsset | undefined;
}

const CryptoBalanceDisplay: React.FC<CryptoBalanceDisplayProps> = ({
  activeTab,
  selectedCryptoData
}) => {
  return (
    <div className="mb-3">
      <p className="text-gray-600 text-sm mb-1">Available Balance:</p>
      <div className="flex items-center justify-between">
        <span className="text-gray-600 text-sm">
          {activeTab === 'buy' ? 'Cash:' : `${selectedCryptoData?.symbol}:`}
        </span>
        <span className="font-semibold text-slate-800">
          {activeTab === 'buy' ? 'R25,430.50' : `${selectedCryptoData?.available} ${selectedCryptoData?.symbol}`}
        </span>
      </div>
    </div>
  );
};

export default CryptoBalanceDisplay;
