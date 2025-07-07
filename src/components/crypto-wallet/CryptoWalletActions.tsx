
import React from "react";
import { ArrowUp, ArrowRightLeft, DollarSign, ArrowDown } from "lucide-react";
import { useNavigate } from "react-router-dom";

const CryptoWalletActions = () => {
  const navigate = useNavigate();

  const handleBuySellClick = () => {
    navigate("/crypto-trade");
  };

  const handleSwapClick = () => {
    navigate("/crypto-swap");
  };

  return (
    <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-50">
      <div className={`bg-gray-700 rounded-2xl p-2 flex items-center gap-1 shadow-lg`}>
        {/* Send */}
        <button className="flex flex-col items-center justify-center px-4 py-3 rounded-xl hover:bg-gray-600 transition-colors">
          <ArrowUp className="h-5 w-5 text-gray-300 mb-1" />
          <span className="text-xs text-gray-300 font-medium">Send</span>
        </button>
        
        {/* Swap */}
        <button 
          onClick={handleSwapClick}
          className="flex flex-col items-center justify-center px-4 py-3 rounded-xl hover:bg-gray-600 transition-colors"
        >
          <ArrowRightLeft className="h-5 w-5 text-gray-300 mb-1" />
          <span className="text-xs text-gray-300 font-medium">Swap</span>
        </button>
        
        {/* Buy / Sell */}
        <button 
          onClick={handleBuySellClick}
          className="flex flex-col items-center justify-center px-4 py-3 rounded-xl bg-amber-500 hover:bg-amber-600 transition-colors"
        >
          <DollarSign className="h-5 w-5 text-black mb-1" />
          <span className="text-xs text-black font-medium whitespace-nowrap">Buy/Sell</span>
        </button>
        
        {/* Receive */}
        <button className="flex flex-col items-center justify-center px-4 py-3 rounded-xl hover:bg-gray-600 transition-colors">
          <ArrowDown className="h-5 w-5 text-gray-300 mb-1" />
          <span className="text-xs text-gray-300 font-medium">Receive</span>
        </button>
      </div>
    </div>
  );
};

export default CryptoWalletActions;
