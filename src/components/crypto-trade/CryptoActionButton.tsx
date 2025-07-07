
import React from 'react';
import { CryptoAsset } from './cryptoData';

interface CryptoActionButtonProps {
  activeTab: 'buy' | 'sell';
  amount: string;
  selectedCryptoData: CryptoAsset | undefined;
  onBuyClick: () => void;
}

const CryptoActionButton: React.FC<CryptoActionButtonProps> = ({
  activeTab,
  amount,
  selectedCryptoData,
  onBuyClick
}) => {
  return (
    <button
      disabled={!amount}
      onClick={onBuyClick}
      className={`w-full py-4 rounded-2xl font-bold text-lg transition-all duration-300 ${
        amount
          ? activeTab === 'buy' 
            ? 'bg-green-500 text-white shadow-lg hover:bg-green-600'
            : 'bg-red-500 text-white shadow-lg hover:bg-red-600'
          : 'bg-gray-200 text-gray-400 cursor-not-allowed'
      }`}
    >
      {activeTab === 'buy' ? `Buy ${selectedCryptoData?.symbol}` : `Sell ${selectedCryptoData?.symbol}`}
    </button>
  );
};

export default CryptoActionButton;
