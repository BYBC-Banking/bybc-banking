
import React from 'react';
import { Clock, Copy, Shield, AlertTriangle } from 'lucide-react';
import { CryptoAsset } from './cryptoData';
import { generateWalletAddress, getNetworkName, copyToClipboard } from './cryptoUtils';

interface CryptoPreApprovalModalProps {
  showPreApproval: boolean;
  setShowPreApproval: (show: boolean) => void;
  setShowConfirmation: (show: boolean) => void;
  activeTab: 'buy' | 'sell';
  selectedCryptoData: CryptoAsset | undefined;
  selectedCrypto: string;
  countdown: number;
  setCountdown: (countdown: number) => void;
  payAmount: string;
  receiveAmount: string;
  conversion: { crypto: string; fiat: string };
}

const CryptoPreApprovalModal: React.FC<CryptoPreApprovalModalProps> = ({
  showPreApproval,
  setShowPreApproval,
  setShowConfirmation,
  activeTab,
  selectedCryptoData,
  selectedCrypto,
  countdown,
  setCountdown,
  payAmount,
  receiveAmount,
  conversion
}) => {
  if (!showPreApproval) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-3xl p-0 w-full max-w-md max-h-[95vh] overflow-y-auto shadow-2xl transform transition-all duration-300 scale-100">
        
        {/* Header Section */}
        <div className="bg-gradient-to-r from-slate-800 to-slate-700 p-6 text-center relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-amber-400/10 to-transparent"></div>
          <div className="relative z-10">
            <div className="w-16 h-16 bg-white rounded-full mx-auto mb-3 flex items-center justify-center shadow-lg">
              <div 
                className="w-10 h-10 rounded-xl flex items-center justify-center text-white font-bold text-lg"
                style={{ backgroundColor: selectedCryptoData?.color }}
              >
                {selectedCryptoData?.icon}
              </div>
            </div>
            <h2 className="text-xl font-bold text-white mb-1">
              Confirm Your {activeTab === 'buy' ? 'Purchase' : 'Sale'}
            </h2>
            <p className="text-slate-300 text-sm">
              {selectedCryptoData?.name} ({selectedCrypto})
            </p>
            
            {/* Countdown Timer */}
            <div className="mt-4 bg-white bg-opacity-15 rounded-lg p-3 backdrop-blur-sm">
              <div className="flex items-center justify-center gap-2 text-white">
                <Clock size={16} className="text-amber-300" />
                <span className="text-sm">Offer valid for</span>
                <span className="font-bold text-amber-300">{countdown}s</span>
              </div>
              <div className="w-full bg-white bg-opacity-20 rounded-full h-1 mt-2">
                <div 
                  className="bg-amber-400 h-1 rounded-full transition-all duration-1000 ease-linear"
                  style={{ width: `${(countdown / 30) * 100}%` }}
                ></div>
              </div>
            </div>
          </div>
        </div>

        {/* Receipt Body */}
        <div className="p-6 bg-white">
          
          {/* Transaction Summary */}
          <div className="bg-slate-50 rounded-2xl p-4 mb-6 border border-slate-200">
            <h3 className="font-semibold text-slate-800 mb-3 flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              Transaction Summary
            </h3>
            
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm text-slate-600">Amount to {activeTab === 'buy' ? 'Buy' : 'Sell'}</span>
                <span className="font-bold text-slate-800">
                  {activeTab === 'buy' 
                    ? (receiveAmount || conversion.crypto + ' ' + selectedCrypto)
                    : (payAmount || conversion.crypto + ' ' + selectedCrypto)
                  }
                </span>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-sm text-slate-600">Amount to {activeTab === 'buy' ? 'Pay' : 'Receive'}</span>
                <span className="font-bold text-lg text-slate-800">
                  {activeTab === 'buy' 
                    ? (payAmount || conversion.fiat)
                    : (receiveAmount || conversion.fiat)
                  }
                </span>
              </div>
            </div>
          </div>

          {/* Detailed Breakdown */}
          <div className="mb-6">
            <h4 className="font-semibold text-slate-800 mb-4 border-b border-dashed border-slate-300 pb-2">
              Detailed Breakdown
            </h4>
            
            <div className="space-y-3 text-sm">
              <div className="flex justify-between items-center">
                <span className="text-slate-600">Exchange Rate</span>
                <span className="font-semibold text-slate-800">
                  1 {selectedCrypto} = R{selectedCryptoData?.price.toLocaleString('en-ZA', { minimumFractionDigits: 2 })}
                </span>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-slate-600">Platform/Service Fee</span>
                <span className="font-semibold text-slate-800">R60.00</span>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-slate-600">Network Fee</span>
                <span className="font-semibold text-slate-800">R50.00</span>
              </div>
              
              <div className="border-t border-dashed border-slate-300 pt-3">
                <div className="flex justify-between items-center">
                  <span className="font-semibold text-slate-700">Total Fees</span>
                  <span className="font-bold text-slate-800">R110.00</span>
                </div>
              </div>
              
              <div className="bg-amber-50 border border-amber-200 rounded-lg p-3 mt-3">
                <div className="flex justify-between items-center">
                  <span className="font-semibold text-amber-800">Final {activeTab === 'buy' ? 'Crypto' : 'Fiat'} to Receive</span>
                  <span className="font-bold text-amber-800">
                    {activeTab === 'buy' 
                      ? ((parseFloat(conversion.crypto) * 0.99).toFixed(8) + ' ' + selectedCrypto)
                      : ('R' + (parseFloat(conversion.fiat.replace('R', '').replace(',', '')) * 0.95).toLocaleString('en-ZA', { minimumFractionDigits: 2 }))
                    }
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Receiving Wallet Information */}
          <div className="mb-6">
            <h4 className="font-semibold text-slate-800 mb-4 border-b border-dashed border-slate-300 pb-2">
              {activeTab === 'buy' ? 'Receiving' : 'From'} Wallet Information
            </h4>
            
            <div className="bg-slate-50 rounded-lg p-4 space-y-3">
              <div>
                <span className="text-xs text-slate-600 block mb-1">Wallet Address</span>
                <div className="flex items-center justify-between bg-white rounded-lg p-3 border">
                  <span className="font-mono text-sm text-slate-800 truncate mr-2">
                    {generateWalletAddress(selectedCrypto).substring(0, 20)}...{generateWalletAddress(selectedCrypto).slice(-6)}
                  </span>
                  <button 
                    onClick={() => copyToClipboard(generateWalletAddress(selectedCrypto))}
                    className="text-amber-600 hover:text-amber-700 transition-colors p-1"
                  >
                    <Copy size={16} />
                  </button>
                </div>
              </div>
              
              <div>
                <span className="text-xs text-slate-600 block mb-1">Network</span>
                <div className="bg-white rounded-lg p-3 border">
                  <span className="text-sm font-medium text-slate-800">{getNetworkName(selectedCrypto)}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Compliance Warnings */}
          <div className="mb-6">
            <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
              <div className="flex items-start gap-3 mb-3">
                <AlertTriangle size={20} className="text-amber-600 mt-0.5 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold text-amber-800 text-sm mb-2">Important Notices</h4>
                  <div className="space-y-2 text-xs text-amber-800">
                    <p>• Crypto purchases are final. Ensure wallet address is correct.</p>
                    <p>• Crypto markets are volatile. Rates may fluctuate during processing.</p>
                    <p>• Network fees may adjust due to blockchain congestion.</p>
                    <p>• This transaction may be subject to tax obligations.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Security Badge */}
          <div className="flex items-center justify-center gap-2 mb-6 text-slate-600">
            <Shield size={16} className="text-green-600" />
            <span className="text-sm font-medium">Secure Transaction</span>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col gap-3">
            <button
              onClick={() => {
                setShowPreApproval(false);
                setShowConfirmation(true);
                setCountdown(30);
              }}
              className={`w-full py-4 rounded-2xl font-bold text-lg transition-all duration-300 ${
                activeTab === 'buy' 
                  ? 'bg-green-500 text-white shadow-lg hover:bg-green-600'
                  : 'bg-red-500 text-white shadow-lg hover:bg-red-600'
              }`}
            >
              ✅ Confirm {activeTab === 'buy' ? 'Purchase' : 'Sale'}
            </button>
            
            <div className="flex gap-3">
              <button
                onClick={() => {
                  setShowPreApproval(false);
                  setCountdown(30);
                }}
                className="flex-1 py-3 px-4 rounded-xl bg-slate-100 text-slate-700 font-medium hover:bg-slate-200 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  setShowPreApproval(false);
                  setCountdown(30);
                }}
                className="flex-1 py-3 px-4 rounded-xl border border-slate-300 text-slate-700 font-medium hover:bg-slate-50 transition-colors"
              >
                Edit Amount
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CryptoPreApprovalModal;
