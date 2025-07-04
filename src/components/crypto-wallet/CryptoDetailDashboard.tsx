
import React, { useState, useEffect } from "react";
import { ArrowDownLeft, ArrowUpRight } from "lucide-react";
import CryptoDetailHeader from "./crypto-detail/CryptoDetailHeader";
import CryptoHoldingsCard from "./crypto-detail/CryptoHoldingsCard";
import CryptoPriceChart from "./crypto-detail/CryptoPriceChart";
import CryptoTabsSection from "./crypto-detail/CryptoTabsSection";

interface CryptoDetailDashboardProps {
  crypto: string;
  onBack: () => void;
}

const cryptoData = {
  Bitcoin: {
    symbol: 'BTC',
    icon: '₿',
    color: '#FFD700',
    currentPrice: 850000,
    change24h: 3.2,
    marketCap: 16800000000000,
    volume24h: 420000000000,
    supply: 19800000,
    description: 'Bitcoin is the world\'s first cryptocurrency, created in 2009 by the pseudonymous Satoshi Nakamoto. It operates on a decentralized network using blockchain technology, enabling peer-to-peer transactions without intermediaries.',
    website: 'https://bitcoin.org',
    whitepaper: 'https://bitcoin.org/bitcoin.pdf'
  },
  Ethereum: {
    symbol: 'ETH',
    icon: 'Ξ',
    color: '#00D4FF',
    currentPrice: 52000,
    change24h: -1.8,
    marketCap: 6200000000000,
    volume24h: 180000000000,
    supply: 120000000,
    description: 'Ethereum is a decentralized platform that runs smart contracts: applications that run exactly as programmed without any possibility of downtime, censorship, fraud or third-party interference.',
    website: 'https://ethereum.org',
    whitepaper: 'https://ethereum.org/whitepaper/'
  },
  Cardano: {
    symbol: 'ADA',
    icon: '₳',
    color: '#FF6B35',
    currentPrice: 4.25,
    change24h: 2.1,
    marketCap: 150000000000,
    volume24h: 8500000000,
    supply: 35000000000,
    description: 'Cardano is a blockchain platform for changemakers, innovators, and visionaries, with the tools and technologies required to create possibility for the many, as well as the few.',
    website: 'https://cardano.org',
    whitepaper: 'https://cardano.org/ouroboros/'
  },
  Solana: {
    symbol: 'SOL',
    icon: '◎',
    color: '#9945FF',
    currentPrice: 1850,
    change24h: 4.7,
    marketCap: 850000000000,
    volume24h: 45000000000,
    supply: 460000000,
    description: 'Solana is a high-performance blockchain supporting builders around the world creating crypto apps that scale today.',
    website: 'https://solana.com',
    whitepaper: 'https://solana.com/solana-whitepaper.pdf'
  }
};

const userHoldings = {
  Bitcoin: 0.45,
  Ethereum: 2.8,
  Cardano: 1250,
  Solana: 15.3
};

const timeframes = ['1H', '1D', '1W', '1Y'];

const CryptoDetailDashboard = ({ crypto, onBack }: CryptoDetailDashboardProps) => {
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [isBalanceVisible, setIsBalanceVisible] = useState(true);
  const [activeTimeframe, setActiveTimeframe] = useState('1D');
  const [animatedPrice, setAnimatedPrice] = useState(0);
  const [activeTab, setActiveTab] = useState('activity');

  const currentCrypto = cryptoData[crypto as keyof typeof cryptoData];
  const userHolding = userHoldings[crypto as keyof typeof userHoldings];

  // Animate price on load
  useEffect(() => {
    const duration = 2000;
    const steps = 60;
    const increment = currentCrypto.currentPrice / steps;
    let currentStep = 0;

    const timer = setInterval(() => {
      currentStep++;
      setAnimatedPrice(increment * currentStep);
      
      if (currentStep >= steps) {
        setAnimatedPrice(currentCrypto.currentPrice);
        clearInterval(timer);
      }
    }, duration / steps);

    return () => clearInterval(timer);
  }, [crypto, currentCrypto.currentPrice]);

  // Generate chart data based on timeframe
  const generateChartData = (timeframe: string) => {
    const basePrice = currentCrypto.currentPrice;
    const dataPoints = timeframe === '1H' ? 12 : timeframe === '1D' ? 24 : timeframe === '1W' ? 7 : 12;
    
    return Array.from({ length: dataPoints }, (_, i) => ({
      time: timeframe === '1H' ? `${9 + i}:00` : 
            timeframe === '1D' ? `${i}:00` :
            timeframe === '1W' ? `Day ${i + 1}` : `Month ${i + 1}`,
      price: basePrice * (0.95 + Math.random() * 0.1),
      value: basePrice * (0.95 + Math.random() * 0.1)
    }));
  };

  const chartData = generateChartData(activeTimeframe);

  const formatCurrency = (value: number) => {
    return `R ${value.toLocaleString('en-ZA', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  };

  const formatLargeNumber = (value: number) => {
    if (value >= 1e12) return `R${(value / 1e12).toFixed(1)}T`;
    if (value >= 1e9) return `R${(value / 1e9).toFixed(1)}B`;
    if (value >= 1e6) return `R${(value / 1e6).toFixed(1)}M`;
    return formatCurrency(value);
  };

  const holdingValue = userHolding * currentCrypto.currentPrice;

  // Activity data with proper icons and formatting
  const activityData = [
    { 
      type: 'Buy', 
      action: `Buy ${crypto}`, 
      amount: `+0.5 ${currentCrypto.symbol}`, 
      time: '2 hours ago', 
      status: 'completed',
      icon: ArrowDownLeft,
      iconBg: 'bg-green-600',
      amountColor: 'text-green-500'
    },
    { 
      type: 'Sell', 
      action: `Sell ${crypto}`, 
      amount: `-0.2 ${currentCrypto.symbol}`, 
      time: '1 day ago', 
      status: 'completed',
      icon: ArrowUpRight,
      iconBg: 'bg-red-600',
      amountColor: 'text-red-500'
    },
    { 
      type: 'Buy', 
      action: `Buy ${crypto}`, 
      amount: `+1 ${currentCrypto.symbol}`, 
      time: '3 days ago', 
      status: 'completed',
      icon: ArrowDownLeft,
      iconBg: 'bg-green-600',
      amountColor: 'text-green-500'
    },
    { 
      type: 'Receive', 
      action: `Receive ${crypto}`, 
      amount: `+0.1 ${currentCrypto.symbol}`, 
      time: '1 week ago', 
      status: 'completed',
      icon: ArrowDownLeft,
      iconBg: 'bg-green-600',
      amountColor: 'text-green-500'
    },
    { 
      type: 'Send', 
      action: `Send ${crypto}`, 
      amount: `-0.3 ${currentCrypto.symbol}`, 
      time: '2 weeks ago', 
      status: 'completed',
      icon: ArrowUpRight,
      iconBg: 'bg-red-600',
      amountColor: 'text-red-500'
    }
  ];

  return (
    <div className={`min-h-screen transition-all duration-500 ${
      isDarkMode 
        ? "bg-gradient-to-br from-gray-900 via-black to-gray-800 text-white"
        : "bg-gradient-to-br from-yellow-50 via-white to-yellow-100 text-gray-900"
    } relative overflow-hidden`}>
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className={`absolute top-20 left-10 w-32 h-32 rounded-full blur-3xl animate-pulse`} 
             style={{backgroundColor: `${currentCrypto.color}20`, animationDelay: '0s'}}></div>
        <div className={`absolute top-40 right-20 w-40 h-40 rounded-full blur-3xl animate-pulse`} 
             style={{backgroundColor: `${currentCrypto.color}10`, animationDelay: '1s'}}></div>
        <div className={`absolute bottom-32 left-1/3 w-36 h-36 rounded-full blur-3xl animate-pulse`} 
             style={{backgroundColor: `${currentCrypto.color}15`, animationDelay: '2s'}}></div>
      </div>

      <div className="container mx-auto max-w-4xl px-4 py-4 relative z-10">
        <CryptoDetailHeader
          crypto={crypto}
          currentCrypto={currentCrypto}
          isDarkMode={isDarkMode}
          isBalanceVisible={isBalanceVisible}
          onBack={onBack}
          onToggleDarkMode={() => setIsDarkMode(!isDarkMode)}
          onToggleBalanceVisibility={() => setIsBalanceVisible(!isBalanceVisible)}
        />

        <CryptoHoldingsCard
          crypto={crypto}
          currentCrypto={currentCrypto}
          userHolding={userHolding}
          holdingValue={holdingValue}
          isDarkMode={isDarkMode}
          isBalanceVisible={isBalanceVisible}
          formatCurrency={formatCurrency}
        />

        <CryptoPriceChart
          currentCrypto={currentCrypto}
          animatedPrice={animatedPrice}
          chartData={chartData}
          timeframes={timeframes}
          activeTimeframe={activeTimeframe}
          isDarkMode={isDarkMode}
          crypto={crypto}
          formatCurrency={formatCurrency}
          formatLargeNumber={formatLargeNumber}
          onTimeframeChange={setActiveTimeframe}
        />

        <CryptoTabsSection
          activeTab={activeTab}
          onTabChange={setActiveTab}
          currentCrypto={currentCrypto}
          crypto={crypto}
          isDarkMode={isDarkMode}
          activityData={activityData}
          formatCurrency={formatCurrency}
        />
      </div>
    </div>
  );
};

export default CryptoDetailDashboard;
