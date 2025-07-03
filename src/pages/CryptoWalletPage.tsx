
import React, { useState, useEffect } from "react";
import WalletHeader from "@/components/crypto-wallet/WalletHeader";
import PortfolioCard from "@/components/crypto-wallet/PortfolioCard";
import PortfolioComposition from "@/components/crypto-wallet/PortfolioComposition";

const portfolioData = [
  { time: '00:00', value: 68200 },
  { time: '04:00', value: 67800 },
  { time: '08:00', value: 69100 },
  { time: '12:00', value: 68900 },
  { time: '16:00', value: 70200 },
  { time: '20:00', value: 70517 }
];

const portfolioComposition = [
  { name: 'Bitcoin', value: 45, amount: 31732.71, color: '#FFD700', icon: '₿', symbol: 'B' },
  { name: 'Ethereum', value: 30, amount: 21155.15, color: '#00D4FF', icon: 'Ξ', symbol: 'Ξ' },
  { name: 'Cardano', value: 12, amount: 8462.06, color: '#FF6B35', icon: '₳', symbol: '₳' },
  { name: 'Solana', value: 8, amount: 5641.37, color: '#9945FF', icon: '◎', symbol: '◎' },
  { name: 'Others', value: 5, amount: 3525.87, color: '#10B981', icon: '⚡', symbol: '⚡' }
];

const timeframes = ['1H', '1D', '1W', '1M', '1Y'];

const CryptoWalletPage = () => {
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [isBalanceVisible, setIsBalanceVisible] = useState(true);
  const [activeTimeframe, setActiveTimeframe] = useState('1D');
  const [animatedValue, setAnimatedValue] = useState(0);

  const targetValue = 70517.16;

  // Animate portfolio value on page load
  useEffect(() => {
    const duration = 2000;
    const steps = 60;
    const increment = targetValue / steps;
    let currentStep = 0;

    const timer = setInterval(() => {
      currentStep++;
      setAnimatedValue(increment * currentStep);
      
      if (currentStep >= steps) {
        setAnimatedValue(targetValue);
        clearInterval(timer);
      }
    }, duration / steps);

    return () => clearInterval(timer);
  }, []);

  const formatCurrency = (value: number) => {
    return `R ${value.toLocaleString('en-ZA', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  };

  const getHoldingLevel = (percentage: number) => {
    if (percentage >= 30) return "Major holding";
    if (percentage >= 10) return "Moderate";
    return "Minor holding";
  };

  return (
    <div className={`min-h-screen transition-all duration-500 ${
      isDarkMode 
        ? "bg-gradient-to-br from-gray-900 via-black to-gray-800 text-white"
        : "bg-gradient-to-br from-yellow-50 via-white to-yellow-100 text-gray-900"
    } relative overflow-hidden`}>
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className={`absolute top-20 left-10 w-32 h-32 rounded-full blur-3xl animate-pulse ${isDarkMode ? 'bg-yellow-400/10' : 'bg-yellow-300/30'}`} style={{animationDelay: '0s'}}></div>
        <div className={`absolute top-40 right-20 w-40 h-40 rounded-full blur-3xl animate-pulse ${isDarkMode ? 'bg-blue-500/10' : 'bg-blue-300/30'}`} style={{animationDelay: '1s'}}></div>
        <div className={`absolute bottom-32 left-1/3 w-36 h-36 rounded-full blur-3xl animate-pulse ${isDarkMode ? 'bg-purple-500/10' : 'bg-purple-300/30'}`} style={{animationDelay: '2s'}}></div>
      </div>

      <div className="container mx-auto max-w-4xl px-4 py-4 relative z-10">
        <WalletHeader
          isDarkMode={isDarkMode}
          isBalanceVisible={isBalanceVisible}
          onToggleDarkMode={() => setIsDarkMode(!isDarkMode)}
          onToggleBalanceVisibility={() => setIsBalanceVisible(!isBalanceVisible)}
        />

        <PortfolioCard
          isDarkMode={isDarkMode}
          isBalanceVisible={isBalanceVisible}
          animatedValue={animatedValue}
          formatCurrency={formatCurrency}
          portfolioData={portfolioData}
          timeframes={timeframes}
          activeTimeframe={activeTimeframe}
          onTimeframeChange={setActiveTimeframe}
        />

        <PortfolioComposition
          isDarkMode={isDarkMode}
          isBalanceVisible={isBalanceVisible}
          portfolioComposition={portfolioComposition}
          formatCurrency={formatCurrency}
          getHoldingLevel={getHoldingLevel}
        />
      </div>
    </div>
  );
};

export default CryptoWalletPage;
