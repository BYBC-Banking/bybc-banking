
import React from 'react';
import { Clock } from 'lucide-react';
import { CryptoAsset } from './cryptoData';

interface CryptoTradingHeaderProps {
  activeTab: 'buy' | 'sell';
  selectedCryptoData: CryptoAsset | undefined;
}

const CryptoTradingHeader: React.FC<CryptoTradingHeaderProps> = ({
  activeTab,
  selectedCryptoData
}) => {
  return (
    <div className="flex items-center justify-between mb-4">
      <h3 className="font-semibold text-slate-800">
        {activeTab === 'buy' ? 'Buy' : 'Sell'} {selectedCryptoData?.name}
      </h3>
      <div className="flex items-center gap-2 text-sm text-gray-500">
        <Clock size={16} />
        Live Price
      </div>
    </div>
  );
};

export default CryptoTradingHeader;
