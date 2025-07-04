
import React from "react";
import { Globe, FileText } from "lucide-react";

interface CryptoAboutTabProps {
  crypto: string;
  currentCrypto: any;
  isDarkMode: boolean;
  formatCurrency: (value: number) => string;
}

const CryptoAboutTab = ({ crypto, currentCrypto, isDarkMode, formatCurrency }: CryptoAboutTabProps) => {
  return (
    <div className="p-4">
      <h3 className={`text-lg font-bold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
        About {crypto}
      </h3>
      <div className="space-y-6">
        <p className={`text-sm leading-relaxed ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
          {currentCrypto.description}
        </p>
        
        {/* Quick Stats Section */}
        <div className={`p-4 rounded-lg ${isDarkMode ? 'bg-gray-700/30' : 'bg-gray-50/50'}`}>
          <h4 className={`text-base font-semibold mb-3 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
            Quick Stats
          </h4>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>Symbol:</span>
              <span className={`text-sm font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                {currentCrypto.symbol}
              </span>
            </div>
            <div className="flex justify-between">
              <span className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>Current Price:</span>
              <span className={`text-sm font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                {formatCurrency(currentCrypto.currentPrice)}
              </span>
            </div>
            <div className="flex justify-between">
              <span className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>24h Change:</span>
              <span className={`text-sm font-medium ${currentCrypto.change24h > 0 ? 'text-green-500' : 'text-red-500'}`}>
                {currentCrypto.change24h > 0 ? '+' : ''}{currentCrypto.change24h}%
              </span>
            </div>
          </div>
        </div>

        {/* Resources Section */}
        <div className={`p-4 rounded-lg ${isDarkMode ? 'bg-gray-700/30' : 'bg-gray-50/50'}`}>
          <h4 className={`text-base font-semibold mb-3 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
            Resources
          </h4>
          <div className="space-y-2">
            <a 
              href={currentCrypto.website} 
              target="_blank" 
              rel="noopener noreferrer"
              className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all hover:scale-[1.02] ${
                isDarkMode ? 'bg-gray-600/50 hover:bg-gray-600/70' : 'bg-gray-100/50 hover:bg-gray-100/70'
              }`}
            >
              <Globe className="h-4 w-4" style={{color: currentCrypto.color}} />
              <span className="text-sm font-medium" style={{color: currentCrypto.color}}>
                Official Website
              </span>
            </a>
            <a 
              href={currentCrypto.whitepaper} 
              target="_blank" 
              rel="noopener noreferrer"
              className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all hover:scale-[1.02] ${
                isDarkMode ? 'bg-gray-600/50 hover:bg-gray-600/70' : 'bg-gray-100/50 hover:bg-gray-100/70'
              }`}
            >
              <FileText className="h-4 w-4" style={{color: currentCrypto.color}} />
              <span className="text-sm font-medium" style={{color: currentCrypto.color}}>
                Whitepaper
              </span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CryptoAboutTab;
