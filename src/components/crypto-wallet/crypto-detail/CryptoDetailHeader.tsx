
import React from "react";
import { ArrowLeft, Eye, EyeOff, Sun, Moon } from "lucide-react";
import { Button } from "@/components/ui/button";

interface CryptoDetailHeaderProps {
  crypto: string;
  currentCrypto: any;
  isDarkMode: boolean;
  isBalanceVisible: boolean;
  onBack: () => void;
  onToggleDarkMode: () => void;
  onToggleBalanceVisibility: () => void;
}

const CryptoDetailHeader = ({
  crypto,
  currentCrypto,
  isDarkMode,
  isBalanceVisible,
  onBack,
  onToggleDarkMode,
  onToggleBalanceVisibility
}: CryptoDetailHeaderProps) => {
  return (
    <header className="flex items-center justify-between mb-6">
      <div className="flex items-center gap-3">
        <Button
          variant="ghost"
          size="icon"
          onClick={onBack}
          className={`hover:scale-105 transition-transform rounded-full`}
          style={{backgroundColor: `${currentCrypto.color}20`, border: `1px solid ${currentCrypto.color}30`}}
        >
          <ArrowLeft className="h-4 w-4" style={{color: currentCrypto.color}} />
        </Button>
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full flex items-center justify-center font-bold text-white text-lg"
               style={{backgroundColor: currentCrypto.color}}>
            {currentCrypto.icon}
          </div>
          <h1 className={`text-xl font-bold`} style={{color: currentCrypto.color}}>
            {crypto}
          </h1>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <Button
          variant="ghost"
          size="icon"
          onClick={onToggleDarkMode}
          className={`hover:scale-105 transition-transform rounded-full`}
          style={{backgroundColor: `${currentCrypto.color}20`, border: `1px solid ${currentCrypto.color}30`}}
        >
          {isDarkMode ? <Sun className="h-4 w-4" style={{color: currentCrypto.color}} /> : 
                       <Moon className="h-4 w-4" style={{color: currentCrypto.color}} />}
        </Button>
        <Button
          variant="ghost"
          size="icon"
          onClick={onToggleBalanceVisibility}
          className={`hover:scale-105 transition-transform rounded-full`}
          style={{backgroundColor: `${currentCrypto.color}20`, border: `1px solid ${currentCrypto.color}30`}}
        >
          {isBalanceVisible ? <Eye className="h-4 w-4" style={{color: currentCrypto.color}} /> : 
                             <EyeOff className="h-4 w-4" style={{color: currentCrypto.color}} />}
        </Button>
      </div>
    </header>
  );
};

export default CryptoDetailHeader;
