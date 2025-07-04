
import React from "react";
import { Sun, Moon, Eye, EyeOff, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

interface WalletHeaderProps {
  isDarkMode: boolean;
  isBalanceVisible: boolean;
  onToggleDarkMode: () => void;
  onToggleBalanceVisibility: () => void;
}

const WalletHeader = ({ 
  isDarkMode, 
  isBalanceVisible, 
  onToggleDarkMode, 
  onToggleBalanceVisibility 
}: WalletHeaderProps) => {
  const navigate = useNavigate();

  const handleBackClick = () => {
    navigate(-1);
  };

  return (
    <header className="flex items-center justify-between mb-4">
      <div className="flex items-center gap-3">
        <Button
          variant="ghost"
          size="icon"
          onClick={handleBackClick}
          className={`hover:scale-105 transition-transform rounded-full ${isDarkMode ? 'bg-yellow-400/20 border border-yellow-400/30' : ''}`}
        >
          <ArrowLeft className="h-4 w-4 text-yellow-400" />
        </Button>
        <h1 className={`text-lg font-bold bg-gradient-to-r ${isDarkMode ? 'from-yellow-400 to-amber-500' : 'from-yellow-600 to-amber-600'} bg-clip-text text-transparent`}>
          Crypto Wallet
        </h1>
      </div>
      <div className="flex items-center gap-2">
        <Button
          variant="ghost"
          size="icon"
          onClick={onToggleDarkMode}
          className={`hover:scale-105 transition-transform rounded-full ${isDarkMode ? 'bg-yellow-400/20 border border-yellow-400/30' : ''}`}
        >
          {isDarkMode ? <Sun className="h-4 w-4 text-yellow-400" /> : <Moon className="h-4 w-4" />}
        </Button>
        <Button
          variant="ghost"
          size="icon"
          onClick={onToggleBalanceVisibility}
          className={`hover:scale-105 transition-transform rounded-full ${isDarkMode ? 'bg-yellow-400/20 border border-yellow-400/30' : ''}`}
        >
          {isBalanceVisible ? <Eye className="h-4 w-4 text-yellow-400" /> : <EyeOff className="h-4 w-4 text-yellow-400" />}
        </Button>
      </div>
    </header>
  );
};

export default WalletHeader;
