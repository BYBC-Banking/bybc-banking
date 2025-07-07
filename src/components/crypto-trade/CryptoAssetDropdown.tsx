
import React from 'react';
import { CryptoAsset } from './cryptoData';

interface CryptoAssetDropdownProps {
  cryptos: CryptoAsset[];
  selectedCrypto: string;
  setSelectedCrypto: (crypto: string) => void;
  showDropdown: boolean;
  setShowDropdown: (show: boolean) => void;
}

const CryptoAssetDropdown: React.FC<CryptoAssetDropdownProps> = ({
  cryptos,
  selectedCrypto,
  setSelectedCrypto,
  showDropdown,
  setShowDropdown
}) => {
  const selectedCryptoData = cryptos.find(crypto => crypto.symbol === selectedCrypto);

  return (
    <div className="px-6 mb-4">
      <div className="relative">
        <h3 className="text-md font-medium text-slate-800 mb-3">Available Assets</h3>
        
        {/* Dropdown Trigger */}
        <button
          onClick={() => setShowDropdown(!showDropdown)}
          className="w-full bg-slate-700 rounded-2xl p-4 flex items-center justify-between text-white hover:bg-slate-600 transition-colors"
        >
          <div className="flex items-center gap-3">
            <div 
              className="w-10 h-10 rounded-xl flex items-center justify-center text-white font-bold text-lg"
              style={{ backgroundColor: selectedCryptoData?.color }}
            >
              {selectedCryptoData?.icon}
            </div>
            <div className="text-left">
              <p className="text-white font-medium">{selectedCryptoData?.name}</p>
              <p className="text-gray-300 text-sm">
                Available: {selectedCryptoData?.available} {selectedCryptoData?.symbol}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <p className="text-amber-400 font-semibold text-sm">{selectedCryptoData?.symbol}</p>
            <div className={`transform transition-transform ${showDropdown ? 'rotate-180' : ''}`}>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M4 6L8 10L12 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
          </div>
        </button>

        {/* Dropdown Content */}
        {showDropdown && (
          <div className="absolute top-full left-0 right-0 mt-2 bg-slate-700 rounded-2xl p-2 shadow-xl z-10 max-h-64 overflow-y-auto">
            {cryptos.filter(crypto => crypto.symbol !== selectedCrypto).map((crypto) => (
              <button
                key={crypto.symbol}
                onClick={() => {
                  setSelectedCrypto(crypto.symbol);
                  setShowDropdown(false);
                }}
                className="w-full flex items-center justify-between p-3 rounded-xl hover:bg-slate-600 transition-all duration-200"
              >
                <div className="flex items-center gap-3">
                  <div 
                    className="w-10 h-10 rounded-xl flex items-center justify-center text-white font-bold text-lg"
                    style={{ backgroundColor: crypto.color }}
                  >
                    {crypto.icon}
                  </div>
                  <div className="text-left">
                    <p className="text-white font-medium">{crypto.name}</p>
                    <p className="text-gray-300 text-sm">
                      Available: {crypto.available} {crypto.symbol}
                    </p>
                  </div>
                </div>
                <p className="text-amber-400 font-semibold text-sm">{crypto.symbol}</p>
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default CryptoAssetDropdown;
