
import React from 'react';
import { CryptoAsset } from './cryptoData';

interface CryptoAmountInputProps {
  amount: string;
  setAmount: (amount: string) => void;
  amountType: 'crypto' | 'fiat';
  setAmountType: (type: 'crypto' | 'fiat') => void;
  selectedCryptoData: CryptoAsset | undefined;
}

const CryptoAmountInput: React.FC<CryptoAmountInputProps> = ({
  amount,
  setAmount,
  amountType,
  setAmountType,
  selectedCryptoData
}) => {
  return (
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
          placeholder={`Enter ${amountType === 'crypto' ? (selectedCryptoData?.symbol || 'ZAR') : 'ZAR'} amount`}
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
  );
};

export default CryptoAmountInput;
