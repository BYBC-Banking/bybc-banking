
import React from 'react';
import { Link } from 'react-router-dom';
import { TrendingUp, RefreshCw, ArrowUpDown, LineChart, Bitcoin, BarChart3 } from 'lucide-react';

interface InvestmentActionBarProps {
  onBuyClick?: () => void;
  onSellClick?: () => void;
}

const InvestmentActionBar = ({ onBuyClick, onSellClick }: InvestmentActionBarProps) => {
  return (
    <div className="my-6">
      <div className="flex justify-between items-center mb-3">
        <h2 className="text-lg font-semibold">Quick Actions</h2>
      </div>
      
      <div className="grid grid-cols-3 gap-3">
        {onBuyClick && (
          <button 
            onClick={onBuyClick}
            className="flex flex-col items-center justify-center p-3 bg-white rounded-xl border border-slate-200 hover:bg-slate-50 transition-colors"
          >
            <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center mb-2">
              <TrendingUp className="h-5 w-5 text-green-600" strokeWidth={2.5} />
            </div>
            <span className="text-sm">Buy</span>
          </button>
        )}
        
        {onSellClick && (
          <button 
            onClick={onSellClick}
            className="flex flex-col items-center justify-center p-3 bg-white rounded-xl border border-slate-200 hover:bg-slate-50 transition-colors"
          >
            <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center mb-2">
              <ArrowUpDown className="h-5 w-5 text-red-600" strokeWidth={2.5} />
            </div>
            <span className="text-sm">Sell</span>
          </button>
        )}
        
        <Link 
          to="/crypto"
          className="flex flex-col items-center justify-center p-3 bg-white rounded-xl border border-slate-200 hover:bg-slate-50 transition-colors"
        >
          <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center mb-2">
            <Bitcoin className="h-5 w-5 text-amber-600" strokeWidth={2.5} />
          </div>
          <span className="text-sm">Crypto</span>
        </Link>

        <Link 
          to="/stocks" 
          className="flex flex-col items-center justify-center p-3 bg-white rounded-xl border border-slate-200 hover:bg-slate-50 transition-colors"
        >
          <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center mb-2">
            <BarChart3 className="h-5 w-5 text-blue-600" strokeWidth={2.5} />
          </div>
          <span className="text-sm">Stocks</span>
        </Link>
        
        <Link 
          to="/watchlist" 
          className="flex flex-col items-center justify-center p-3 bg-white rounded-xl border border-slate-200 hover:bg-slate-50 transition-colors"
        >
          <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center mb-2">
            <LineChart className="h-5 w-5 text-slate-600" strokeWidth={2.5} />
          </div>
          <span className="text-sm">Watchlist</span>
        </Link>

        <button 
          className="flex flex-col items-center justify-center p-3 bg-white rounded-xl border border-slate-200 hover:bg-slate-50 transition-colors"
        >
          <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center mb-2">
            <RefreshCw className="h-5 w-5 text-slate-600" strokeWidth={2.5} />
          </div>
          <span className="text-sm">Refresh</span>
        </button>
      </div>
    </div>
  );
};

export default InvestmentActionBar;
