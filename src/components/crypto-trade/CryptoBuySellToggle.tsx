
import React from 'react';

interface CryptoBuySellToggleProps {
  activeTab: 'buy' | 'sell';
  setActiveTab: (tab: 'buy' | 'sell') => void;
}

const CryptoBuySellToggle: React.FC<CryptoBuySellToggleProps> = ({ activeTab, setActiveTab }) => {
  return (
    <div className="w-full">
      <div className="bg-slate-700 rounded-full p-1 flex relative">
        <button
          onClick={() => setActiveTab('buy')}
          className={`flex-1 py-2 px-4 rounded-full font-medium transition-all duration-300 relative z-10 text-sm ${
            activeTab === 'buy'
              ? 'text-white'
              : 'text-gray-400'
          }`}
        >
          Buy
        </button>
        <button
          onClick={() => setActiveTab('sell')}
          className={`flex-1 py-2 px-4 rounded-full font-medium transition-all duration-300 relative z-10 text-sm ${
            activeTab === 'sell'
              ? 'text-white'
              : 'text-gray-400'
          }`}
        >
          Sell
        </button>
        <div
          className={`absolute top-1 bottom-1 w-1/2 rounded-full transition-all duration-300 ease-in-out ${
            activeTab === 'buy' 
              ? 'left-1 bg-green-500' 
              : 'left-1/2 bg-red-500'
          }`}
          style={{ 
            transform: activeTab === 'buy' ? 'translateX(0)' : 'translateX(-1px)'
          }}
        />
      </div>
    </div>
  );
};

export default CryptoBuySellToggle;
