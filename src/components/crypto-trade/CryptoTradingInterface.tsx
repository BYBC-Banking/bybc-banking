import React from 'react';
import { Clock, ArrowUpDown } from 'lucide-react';
import { CryptoAsset } from './cryptoData';

interface CryptoTradingInterfaceProps {
  activeTab: 'buy' | 'sell';
  selectedCryptoData: CryptoAsset | undefined;
  amount: string;
  setAmount: (amount: string) => void;
  amountType: 'crypto' | 'fiat';
  setAmountType: (type: 'crypto' | 'fiat') => void;
  payAmount: string;
  setPayAmount: (amount: string) => void;
  receiveAmount: string;
  setReceiveAmount: (amount: string) => void;
  conversion: { crypto: string; fiat: string };
  onBuyClick: () => void;
}

const CryptoTradingInterface: React.FC<CryptoTradingInterfaceProps> = ({
  activeTab,
  selectedCryptoData,
  amount,
  setAmount,
  amountType,
  setAmountType,
  payAmount,
  setPayAmount,
  receiveAmount,
  setReceiveAmount,
  conversion,
  onBuyClick
}) => {
  return (
    <div className="px-6 mb-6">
      <style>{`
        .slider::-webkit-slider-thumb {
          appearance: none;
          height: 20px;
          width: 20px;
          border-radius: 50%;
          background: #f59e0b;
          cursor: pointer;
          border: 2px solid white;
          box-shadow: 0 2px 4px rgba(0,0,0,0.2);
        }
        .slider::-moz-range-thumb {
          height: 20px;
          width: 20px;
          border-radius: 50%;
          background: #f59e0b;
          cursor: pointer;
          border: 2px solid white;
          box-shadow: 0 2px 4px rgba(0,0,0,0.2);
        }
      `}</style>
      
      <div className="bg-white rounded-2xl p-6 shadow-lg">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold text-slate-800">
            {activeTab === 'buy' ? 'Buy' : 'Sell'} {selectedCryptoData?.name}
          </h3>
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <Clock size={16} />
            Live Price
          </div>
        </div>

        <div className="mb-4">
          <div className="flex rounded-2xl border-2 border-gray-200 overflow-hidden">
            <button
              onClick={() => setAmountType('fiat')}
              className={`px-4 py-3 font-medium transition-colors ${
                amountType === 'fiat'
                  ? 'bg-amber-500 text-white'
                  : 'bg-gray-50 text-gray-600 hover:bg-gray-100'
              }`}
            >
              ZAR
            </button>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder={`Enter ${amountType === 'crypto' ? selectedCryptoData?.symbol : 'ETH'} amount`}
              className="flex-1 px-4 py-3 border-none outline-none text-lg font-semibold"
            />
            <button
              onClick={() => setAmountType('crypto')}
              className={`px-4 py-3 font-medium transition-colors ${
                amountType === 'crypto'
                  ? 'bg-amber-500 text-white'
                  : 'bg-gray-50 text-gray-600 hover:bg-gray-100'
              }`}
            >
              {selectedCryptoData?.symbol}
            </button>
          </div>
        </div>

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

        {/* Amount Range with Slider */}
        <div className="relative mb-6">
          <div className="flex items-center justify-between text-xs text-gray-600 mb-2">
            <span>R100</span>
            <span>R2,500</span>
            <span>R5,000</span>
            <span>R7,500</span>
            <span>R10,000</span>
          </div>
          <div className="relative">
            <input
              type="range"
              min="100"
              max="10000"
              step="100"
              value={(() => {
                if (amountType === 'fiat' && amount) {
                  return Math.min(parseFloat(amount) || 0, 10000);
                } else if (amountType === 'crypto' && amount && selectedCryptoData) {
                  return Math.min((parseFloat(amount) || 0) * selectedCryptoData.price, 10000);
                }
                return 2500;
              })()}
              onChange={(e) => {
                const fiatValue = parseFloat(e.target.value);
                
                // Always switch to ZAR amount type when slider is used
                setAmountType('fiat');
                setAmount(fiatValue.toString());
              }}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
              style={{
                background: (() => {
                  let currentValue;
                  if (amountType === 'fiat' && amount) {
                    currentValue = Math.min(parseFloat(amount) || 0, 10000);
                  } else if (amountType === 'crypto' && amount && selectedCryptoData) {
                    currentValue = Math.min((parseFloat(amount) || 0) * selectedCryptoData.price, 10000);
                  } else {
                    currentValue = 2500;
                  }
                  const percentage = ((currentValue - 100) / (10000 - 100)) * 100;
                  return `linear-gradient(to right, #f59e0b 0%, #f59e0b ${percentage}%, #e5e7eb ${percentage}%, #e5e7eb 100%)`;
                })()
              }}
            />
            <div className="flex items-center justify-between mt-1">
              <div className="w-1 h-1 bg-gray-400 rounded-full"></div>
              <div className="w-1 h-1 bg-gray-400 rounded-full"></div>
              <div className="w-1 h-1 bg-gray-400 rounded-full"></div>
              <div className="w-1 h-1 bg-gray-400 rounded-full"></div>
              <div className="w-1 h-1 bg-gray-400 rounded-full"></div>
            </div>
          </div>
        </div>

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
      </div>
    </div>
  );
};

export default CryptoTradingInterface;
