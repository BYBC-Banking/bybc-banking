import React, { useState } from 'react';
import { ArrowLeft, TrendingUp, Delete } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const CryptoSend = () => {
  const navigate = useNavigate();
  const [amount, setAmount] = useState('0');
  const [balance] = useState(2.50); // XRP balance
  const xrpPrice = 2.19; // ZAR per XRP
  const networkFee = 0.2; // XRP
  const networkFeeZAR = networkFee * xrpPrice;

  const formatAmount = (value: string) => {
    // Remove leading zeros but keep single zero before decimal
    if (value === '0' || value === '') return '0';
    if (value.startsWith('0') && value.length > 1 && !value.startsWith('0.')) {
      return value.substring(1);
    }
    return value;
  };

  const handleNumberPress = (num: number) => {
    setAmount(prev => {
      const newAmount = prev === '0' ? num.toString() : prev + num;
      return formatAmount(newAmount);
    });
  };

  const handleDecimalPress = () => {
    setAmount(prev => {
      if (prev.includes('.')) return prev;
      return prev + '.';
    });
  };

  const handleBackspace = () => {
    setAmount(prev => {
      if (prev.length <= 1) return '0';
      return prev.slice(0, -1);
    });
  };

  const handleAllPress = () => {
    const maxAmount = Math.max(0, balance - networkFee);
    setAmount(maxAmount.toString());
  };

  const currentAmountNum = parseFloat(amount || '0');
  const zarValue = currentAmountNum * xrpPrice;
  const remaining = balance - currentAmountNum;
  const remainingZAR = remaining * xrpPrice;

  interface NumberButtonProps {
    children: React.ReactNode;
    onClick: () => void;
    className?: string;
  }

  const NumberButton: React.FC<NumberButtonProps> = ({
    children,
    onClick,
    className = ""
  }) => (
    <button
      onClick={onClick}
      className={`w-16 h-16 rounded-full bg-gray-800/50 border border-gray-700/50 text-white text-xl font-medium hover:bg-gray-700/50 active:bg-gray-600/50 transition-all duration-150 active:scale-95 ${className}`}
    >
      {children}
    </button>
  );

  return (
    <div className="min-h-screen bg-slate-900 text-white overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-6 pt-12">
        <button 
          onClick={() => navigate(-1)}
          className="p-2 hover:bg-gray-800/50 rounded-lg transition-colors"
          aria-label="Go back"
        >
          <ArrowLeft className="w-6 h-6" />
        </button>
        <span className="text-gray-400 text-sm">1/3</span>
        <div className="w-6 h-6"></div>
      </div>

      {/* Amount Display */}
      <div className="text-center px-4 mt-8 mb-8">
        <div className="text-6xl font-light text-cyan-400 mb-2">
          {amount}
        </div>
        <div className="flex items-center justify-center gap-2 text-gray-400">
          <span className="text-lg">R{zarValue.toFixed(2)}</span>
          <TrendingUp className="w-4 h-4 text-green-400" />
        </div>
      </div>

      {/* Crypto Selection */}
      <div className="px-4 mb-6">
        <div className="bg-gray-800/30 rounded-2xl p-4 border border-gray-700/30">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-red-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
                XRP
              </div>
              <div>
                <div className="text-white font-medium">XRP</div>
                <div className="text-gray-400 text-sm">{balance} XRP</div>
              </div>
            </div>
            <button
              onClick={handleAllPress}
              className="bg-gray-700/50 px-4 py-2 rounded-full text-sm text-gray-300 hover:bg-gray-600/50 transition-colors"
            >
              All
            </button>
          </div>
        </div>
      </div>

      {/* Transaction Details */}
      <div className="px-4 mb-8">
        <div className="bg-gray-800/30 rounded-2xl p-4 border border-gray-700/30 space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-gray-400">Remaining</span>
            <span className="text-white">
              R{remainingZAR.toFixed(2)} / {remaining.toFixed(2)} XRP
            </span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-400">Network Fee</span>
            <span className="text-white">
              R{networkFeeZAR.toFixed(2)} / {networkFee} XRP
            </span>
          </div>
        </div>
      </div>

      {/* Number Pad - Hidden on large screens */}
      <div className="px-4 mb-6 lg:hidden">
        <div className="grid grid-cols-3 gap-4 justify-items-center max-w-xs mx-auto">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
            <NumberButton key={num} onClick={() => handleNumberPress(num)}>
              {num}
            </NumberButton>
          ))}
          <NumberButton onClick={handleDecimalPress}>
            .
          </NumberButton>
          <NumberButton onClick={() => handleNumberPress(0)}>
            0
          </NumberButton>
          <NumberButton onClick={handleBackspace}>
            <Delete className="w-5 h-5 mx-[20px]" />
          </NumberButton>
        </div>
      </div>

      {/* Continue Button */}
      <div className="px-4 pb-8">
        <button
          className={`w-full py-4 rounded-2xl text-white font-medium text-lg transition-all duration-200 ${
            currentAmountNum > 0 && currentAmountNum <= balance - networkFee
              ? 'bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 active:scale-[0.98]'
              : 'bg-gray-700/50 text-gray-400 cursor-not-allowed'
          }`}
          disabled={currentAmountNum <= 0 || currentAmountNum > balance - networkFee}
        >
          Continue
        </button>
      </div>
    </div>
  );
};

export default CryptoSend;
