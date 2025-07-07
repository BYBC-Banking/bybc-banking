
import React from 'react';
import { CryptoAsset } from './cryptoData';

interface CryptoAmountSliderProps {
  amount: string;
  setAmount: (amount: string) => void;
  amountType: 'crypto' | 'fiat';
  setAmountType: (type: 'crypto' | 'fiat') => void;
  selectedCryptoData: CryptoAsset | undefined;
}

const CryptoAmountSlider: React.FC<CryptoAmountSliderProps> = ({
  amount,
  setAmount,
  amountType,
  setAmountType,
  selectedCryptoData
}) => {
  return (
    <div className="relative mb-6">
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
  );
};

export default CryptoAmountSlider;
