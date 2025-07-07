
import React from 'react';

interface CryptoReceiptModalProps {
  showConfirmation: boolean;
  setShowConfirmation: (show: boolean) => void;
  activeTab: 'buy' | 'sell';
  receiveAmount: string;
  payAmount: string;
  conversion: { crypto: string; fiat: string };
  selectedCrypto: string;
}

const CryptoReceiptModal: React.FC<CryptoReceiptModalProps> = ({
  showConfirmation,
  setShowConfirmation,
  activeTab,
  receiveAmount,
  payAmount,
  conversion,
  selectedCrypto
}) => {
  if (!showConfirmation) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-end sm:items-center justify-center z-50 p-0 sm:p-4">
      <div className="bg-white rounded-t-3xl sm:rounded-2xl p-0 w-full sm:max-w-md sm:w-full max-h-[90vh] overflow-y-auto shadow-2xl transform transition-all duration-300 scale-100">
        {/* Header Section */}
        <div className="bg-gradient-to-r from-amber-500 to-amber-600 p-4 sm:p-6 text-center">
          <div className="w-12 h-12 sm:w-16 sm:h-16 bg-white rounded-full mx-auto mb-2 sm:mb-3 flex items-center justify-center">
            <svg className="w-6 h-6 sm:w-8 sm:h-8 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path>
            </svg>
          </div>
          <h2 className="text-lg sm:text-xl font-bold text-white mb-1">Transaction Successful</h2>
          <p className="text-amber-100 text-sm">Order Completed</p>
          <div className="mt-2 sm:mt-3 bg-white bg-opacity-20 rounded-lg p-2">
            <p className="text-xs text-white opacity-90">Transaction Reference</p>
            <p className="text-xs sm:text-sm font-mono text-white">#TX{Math.random().toString(36).substr(2, 9).toUpperCase()}</p>
          </div>
        </div>

        {/* Receipt Body */}
        <div className="p-4 sm:p-6 bg-white">
          {/* BYBC Header */}
          <div className="text-center mb-4 sm:mb-6 border-b border-dashed border-gray-300 pb-3 sm:pb-4">
            <h3 className="text-base sm:text-lg font-bold text-slate-800">BYBC</h3>
            <p className="text-xs text-gray-500">Digital Asset Exchange</p>
            <p className="text-xs text-gray-400 mt-1">{new Date().toLocaleString()}</p>
          </div>

          {/* Transaction Details */}
          <div className="space-y-2 sm:space-y-3 mb-4 sm:mb-6">
            <div className="flex justify-between items-center">
              <span className="text-xs sm:text-sm text-gray-600">Transaction Reference</span>
              <span className="font-mono text-xs text-slate-800">#TX{Math.random().toString(36).substr(2, 9).toUpperCase()}</span>
            </div>
            
            <div className="flex justify-between items-center">
              <span className="text-xs sm:text-sm text-gray-600">Status</span>
              <span className="font-semibold text-green-600 text-sm">Completed</span>
            </div>

            <div className="flex justify-between items-center">
              <span className="text-xs sm:text-sm text-gray-600">Date</span>
              <span className="font-semibold text-slate-800 text-sm">
                {new Date().toLocaleDateString('en-ZA')}
              </span>
            </div>

            <div className="flex justify-between items-center">
              <span className="text-xs sm:text-sm text-gray-600">Purchased</span>
              <span className="font-semibold text-slate-800 text-sm">
                {activeTab === 'buy' 
                  ? (receiveAmount || conversion.crypto + ' ' + selectedCrypto)
                  : (payAmount || conversion.crypto + ' ' + selectedCrypto)
                }
              </span>
            </div>

            <div className="flex justify-between items-center">
              <span className="text-xs sm:text-sm text-gray-600">Amount Paid (ZAR)</span>
              <span className="font-bold text-slate-800 text-base sm:text-lg">
                {activeTab === 'buy' 
                  ? (payAmount || conversion.fiat)
                  : (receiveAmount || conversion.fiat)
                }
              </span>
            </div>
          </div>

          {/* Fees & Charges Section */}
          <div className="mb-4 sm:mb-6">
            <h4 className="text-sm sm:text-md font-semibold text-slate-800 mb-2 sm:mb-3 border-b border-dashed border-gray-300 pb-2">
              Fees & Charges
            </h4>
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-xs sm:text-sm text-gray-600">Platform/Exchange Fee</span>
                <span className="font-semibold text-slate-800 text-sm">R25.00</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-xs sm:text-sm text-gray-600">Network/Gas Fee</span>
                <span className="font-semibold text-slate-800 text-sm">R8.50</span>
              </div>
              <div className="border-t border-dashed border-gray-300 pt-2">
                <div className="flex justify-between items-center">
                  <span className="text-xs sm:text-sm font-semibold text-gray-700">Total Fees</span>
                  <span className="font-bold text-slate-800 text-sm">R33.50</span>
                </div>
              </div>
            </div>
          </div>

          {/* Compliance Notes */}
          <div className="bg-amber-50 border border-amber-200 rounded-lg p-3 mb-4 sm:mb-6">
            <div className="text-xs text-amber-800 space-y-1">
              <p><strong>Important:</strong> Cryptocurrency is volatile. Ensure wallet details are correct.</p>
              <p><strong>Tax Note:</strong> Capital gains may apply. Consult a tax professional.</p>
            </div>
          </div>

          {/* Footer */}
          <div className="text-center border-t border-dashed border-gray-300 pt-3 sm:pt-4">
            <p className="text-xs text-gray-500 mb-2">BYBC Ltd. FSCA Reg: XYZ123</p>
            <p className="text-xs text-gray-400">Thank you for using BYBC</p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 mt-4 sm:mt-6">
            <button
              onClick={() => setShowConfirmation(false)}
              className="w-full sm:flex-1 py-3 px-4 rounded-xl bg-gray-100 text-gray-700 font-medium hover:bg-gray-200 transition-colors text-sm"
            >
              Save Receipt
            </button>
            <button
              onClick={() => {
                setShowConfirmation(false);
                // Here you would typically handle the transaction completion
              }}
              className="w-full sm:flex-1 py-3 px-4 rounded-xl bg-amber-500 text-white font-bold hover:bg-amber-600 transition-colors"
            >
              Done
            </button>
          </div>

          <button
            onClick={() => setShowConfirmation(false)}
            className="w-full mt-2 py-2 px-4 text-xs text-gray-500 hover:text-amber-600 transition-colors"
          >
            View on Blockchain →
          </button>
        </div>
      </div>
    </div>
  );
};

export default CryptoReceiptModal;
