
import React, { useState, useEffect } from "react";
import WalletHeader from "@/components/crypto-wallet/WalletHeader";
import PortfolioCard from "@/components/crypto-wallet/PortfolioCard";
import PortfolioComposition from "@/components/crypto-wallet/PortfolioComposition";
import DonutChart from "@/components/crypto-wallet/DonutChart";
import CryptoDetailDashboard from "@/components/crypto-wallet/CryptoDetailDashboard";
import CryptoWalletActions from "@/components/crypto-wallet/CryptoWalletActions";

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
  const [selectedCrypto, setSelectedCrypto] = useState<string | null>(null);
  const [selectedSegment, setSelectedSegment] = useState<string | null>(null);
  const [hoveredSegment, setHoveredSegment] = useState<string | null>(null);
  const [reorderedComposition, setReorderedComposition] = useState(portfolioComposition);

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

  const handleAssetClick = (assetName: string) => {
    setSelectedCrypto(assetName);
  };

  const handleBackToPortfolio = () => {
    setSelectedCrypto(null);
  };

  const handleSegmentClick = (assetName: string) => {
    setSelectedSegment(assetName);
    
    // Move the selected asset to the top
    const selectedAsset = portfolioComposition.find(asset => asset.name === assetName);
    const otherAssets = portfolioComposition.filter(asset => asset.name !== assetName);
    
    if (selectedAsset) {
      setReorderedComposition([selectedAsset, ...otherAssets]);
    }

    // Reset after 3 seconds
    setTimeout(() => {
      setSelectedSegment(null);
      setReorderedComposition(portfolioComposition);
    }, 3000);
  };

  const handleSegmentHover = (assetName: string | null) => {
    setHoveredSegment(assetName);
    
    if (assetName) {
      // Move the hovered asset to the top
      const hoveredAsset = portfolioComposition.find(asset => asset.name === assetName);
      const otherAssets = portfolioComposition.filter(asset => asset.name !== assetName);
      
      if (hoveredAsset) {
        setReorderedComposition([hoveredAsset, ...otherAssets]);
      }
    } else {
      // Reset to original order when hover ends
      setReorderedComposition(portfolioComposition);
    }
  };

  // If a crypto is selected, show the detailed dashboard
  if (selectedCrypto) {
    return <CryptoDetailDashboard crypto={selectedCrypto} onBack={handleBackToPortfolio} />;
  }

  return (
    <div className={`min-h-screen transition-all duration-500 ${
      isDarkMode 
        ? "bg-gradient-to-br from-gray-900 via-black to-gray-800 text-white"
        : "bg-gradient-to-br from-yellow-50 via-white to-yellow-100 text-gray-900"
    } relative overflow-hidden pb-20`}>
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

        <div className={`${isDarkMode ? 'bg-gray-800/50 border-yellow-400/30 backdrop-blur-md' : 'bg-white/60 border-yellow-600/50'} hover:scale-[1.01] transition-transform duration-300 rounded-lg border p-4 mb-4`}>
          <h2 className={`text-lg font-bold mb-4 text-center ${isDarkMode ? 'text-yellow-400' : 'text-yellow-600'}`}>
            Portfolio Composition
          </h2>
          
          <DonutChart 
            isDarkMode={isDarkMode}
            portfolioComposition={portfolioComposition}
            onSegmentClick={handleSegmentClick}
            onSegmentHover={handleSegmentHover}
            selectedAsset={selectedSegment}
          />
          
          {/* Asset List */}
          <div className="space-y-2">
            {reorderedComposition.map((asset, index) => (
              <div
                key={asset.name}
                className={`flex items-center justify-between p-2 rounded-xl transition-all duration-300 hover:scale-[1.02] cursor-pointer ${
                  isDarkMode ? 'bg-gray-700/30 hover:bg-gray-700/50' : 'bg-gray-50/50 hover:bg-gray-100/50'
                } ${selectedSegment === asset.name ? 'ring-2 ring-yellow-400 bg-yellow-400/10' : ''}`}
                onClick={() => handleAssetClick(asset.name)}
              >
                <div className="flex items-center gap-2">
                  <div
                    className="w-8 h-8 rounded-full flex items-center justify-center text-white font-bold text-xs"
                    style={{ backgroundColor: asset.color }}
                  >
                    {asset.symbol}
                  </div>
                  <div>
                    <div className={`font-semibold text-sm ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                      {asset.name}
                    </div>
                    <div className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                      {asset.value}% of portfolio
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className={`font-bold text-sm ${isDarkMode ? 'text-yellow-400' : 'text-yellow-600'}`}>
                    {isBalanceVisible ? formatCurrency(asset.amount) : "••••••"}
                  </div>
                  <div className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                    {getHoldingLevel(asset.value)}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <CryptoWalletActions />
    </div>
  );
};

export default CryptoWalletPage;
