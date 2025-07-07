
import React from 'react';
import { ArrowUpDown } from 'lucide-react';
import { CryptoAsset } from './cryptoData';

interface CryptoPayReceiveSectionProps {
  activeTab: 'buy' | 'sell';
  payAmount: string;
  receiveAmount: string;
  setReceiveAmount: (amount: string) => void;
  selectedCryptoData: CryptoAsset | undefined;
}

const CryptoPayReceiveSection: React.FC<CryptoPayReceiveSectionProps> = ({
  activeTab,
  payAmount,
  receiveAmount,
  setReceiveAmount,
  selectedCryptoData
}) => {
  return (
    <div className="space-y-4 mb-6">
      <div className="flex items-center justify-between py-2">
        <span className="text-gray-600 text-base font-medium">You pay:</span>
        <span className="text-right font-bold text-slate-800 text-xl">
          {payAmount || (activeTab === 'buy' ? 'R0.00' : `0 ${selectedCryptoData?.symbol}`)}
        </span>
      </div>
      
      <div className="flex items-center justify-center py-1">
        <div className="w-6 h-6 rounded-full bg-gray-100 flex items-center justify-center">
          <ArrowUpDown size={12} className="text-gray-400" />
        </div>
      </div>
      
      <div className="flex items-center justify-between py-2">
        <span className="text-gray-600 text-base font-medium">You receive:</span>
        <div>
          <input
            type="text"
            value={receiveAmount || (activeTab === 'buy' ? `0 ${selectedCryptoData?.symbol}` : 'R0.00')}
            onChange={(e) => setReceiveAmount(e.target.value)}
            placeholder={activeTab === 'buy' ? `0 ${selectedCryptoData?.symbol}` : 'R0.00'}
            className="text-right font-bold text-slate-800 text-xl bg-transparent border-none outline-none"
          />
        </div>
      </div>
    </div>
  );
};

export default CryptoPayReceiveSection;
