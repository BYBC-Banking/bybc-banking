
import React, { useState, useEffect } from "react";
import { ArrowLeft, Eye, EyeOff, Sun, Moon, TrendingUp, TrendingDown, ExternalLink } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer, Area, AreaChart } from "recharts";

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
    description: 'Bitcoin is the first decentralized cryptocurrency. It was created in 2008 by an unknown person or group of people using the name Satoshi Nakamoto.',
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
        {/* Header */}
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
              onClick={() => setIsDarkMode(!isDarkMode)}
              className={`hover:scale-105 transition-transform rounded-full`}
              style={{backgroundColor: `${currentCrypto.color}20`, border: `1px solid ${currentCrypto.color}30`}}
            >
              {isDarkMode ? <Sun className="h-4 w-4" style={{color: currentCrypto.color}} /> : 
                           <Moon className="h-4 w-4" style={{color: currentCrypto.color}} />}
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsBalanceVisible(!isBalanceVisible)}
              className={`hover:scale-105 transition-transform rounded-full`}
              style={{backgroundColor: `${currentCrypto.color}20`, border: `1px solid ${currentCrypto.color}30`}}
            >
              {isBalanceVisible ? <Eye className="h-4 w-4" style={{color: currentCrypto.color}} /> : 
                                 <EyeOff className="h-4 w-4" style={{color: currentCrypto.color}} />}
            </Button>
          </div>
        </header>

        {/* Holdings Card */}
        <Card className={`mb-6 ${isDarkMode ? 'bg-gray-800/50 backdrop-blur-md' : 'bg-white/60'} hover:scale-[1.01] transition-transform duration-300`}
              style={{border: `1px solid ${currentCrypto.color}30`}}>
          <CardContent className="p-6">
            <div className="text-center">
              <div className={`text-xs font-medium mb-1 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                Your {crypto} Holdings
              </div>
              <div className="text-3xl font-bold mb-2" style={{color: currentCrypto.color}}>
                {isBalanceVisible ? `${userHolding} ${currentCrypto.symbol}` : "••••••••"}
              </div>
              <div className="text-xl font-semibold mb-3" style={{color: currentCrypto.color}}>
                {isBalanceVisible ? formatCurrency(holdingValue) : "••••••••"}
              </div>
              <div className="flex items-center justify-center gap-4 text-sm">
                <div className={`${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  24h Change: <span className={currentCrypto.change24h > 0 ? 'text-green-500' : 'text-red-500'}>
                    {currentCrypto.change24h > 0 ? '+' : ''}{currentCrypto.change24h}%
                  </span>
                </div>
                <div className={`${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  Avg Cost: {formatCurrency(currentCrypto.currentPrice * 0.92)}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Price Section */}
        <Card className={`mb-6 ${isDarkMode ? 'bg-gray-800/50 backdrop-blur-md' : 'bg-white/60'} hover:scale-[1.01] transition-transform duration-300`}
              style={{border: `1px solid ${currentCrypto.color}30`}}>
          <CardContent className="p-6">
            <div className="text-center mb-4">
              <div className="text-4xl font-bold mb-2" style={{color: currentCrypto.color}}>
                {formatCurrency(animatedPrice)}
              </div>
              <div className="flex items-center justify-center gap-2">
                <div className={`flex items-center gap-1 px-3 py-1 rounded-full ${
                  currentCrypto.change24h > 0 ? 'bg-green-500/20' : 'bg-red-500/20'
                }`}>
                  {currentCrypto.change24h > 0 ? 
                    <TrendingUp className="h-4 w-4 text-green-500" /> : 
                    <TrendingDown className="h-4 w-4 text-red-500" />
                  }
                  <span className={`font-medium ${currentCrypto.change24h > 0 ? 'text-green-500' : 'text-red-500'}`}>
                    {currentCrypto.change24h > 0 ? '+' : ''}{currentCrypto.change24h}%
                  </span>
                </div>
                <span className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>24h</span>
              </div>
            </div>

            {/* Chart */}
            <div className="h-48 mb-4">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={chartData}>
                  <defs>
                    <linearGradient id={`gradient-${crypto}`} x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor={currentCrypto.color} stopOpacity={0.3}/>
                      <stop offset="95%" stopColor={currentCrypto.color} stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <XAxis 
                    dataKey="time" 
                    axisLine={false}
                    tickLine={false}
                    className={isDarkMode ? 'text-gray-400' : 'text-gray-600'}
                    tick={{ fontSize: 10 }}
                  />
                  <YAxis hide />
                  <Area 
                    type="monotone" 
                    dataKey="price" 
                    stroke={currentCrypto.color}
                    strokeWidth={2}
                    fill={`url(#gradient-${crypto})`}
                    dot={false}
                    activeDot={{ r: 4, stroke: currentCrypto.color, strokeWidth: 2, fill: currentCrypto.color }}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>

            {/* Timeframe Selector */}
            <div className="flex justify-center gap-1 mb-4">
              {timeframes.map((timeframe) => (
                <Button
                  key={timeframe}
                  variant="ghost"
                  size="sm"
                  onClick={() => setActiveTimeframe(timeframe)}
                  className={`transition-all duration-300 hover:scale-105 rounded-lg text-xs px-3 py-1 ${
                    activeTimeframe === timeframe 
                      ? 'font-medium text-black' 
                      : isDarkMode ? 'text-gray-400 hover:text-white' : 'text-gray-600'
                  }`}
                  style={{
                    backgroundColor: activeTimeframe === timeframe ? currentCrypto.color : 'transparent'
                  }}
                >
                  {timeframe}
                </Button>
              ))}
            </div>

            {/* Market Stats */}
            <div className="grid grid-cols-3 gap-4">
              <div className="text-center">
                <div className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>Market Cap</div>
                <div className="font-semibold text-sm" style={{color: currentCrypto.color}}>
                  {formatLargeNumber(currentCrypto.marketCap)}
                </div>
              </div>
              <div className="text-center">
                <div className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>24h Volume</div>
                <div className="font-semibold text-sm" style={{color: currentCrypto.color}}>
                  {formatLargeNumber(currentCrypto.volume24h)}
                </div>
              </div>
              <div className="text-center">
                <div className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>Supply</div>
                <div className="font-semibold text-sm" style={{color: currentCrypto.color}}>
                  {currentCrypto.supply.toLocaleString()}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Tabs Section */}
        <Card className={`${isDarkMode ? 'bg-gray-800/50 backdrop-blur-md' : 'bg-white/60'}`}
              style={{border: `1px solid ${currentCrypto.color}30`}}>
          <CardContent className="p-0">
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="w-full bg-transparent p-0 h-auto">
                <TabsTrigger 
                  value="activity" 
                  className={`flex-1 py-3 rounded-none border-b-2 transition-all ${
                    activeTab === 'activity' ? 'border-current font-medium' : 'border-transparent'
                  }`}
                  style={{color: activeTab === 'activity' ? currentCrypto.color : undefined}}
                >
                  Activity
                </TabsTrigger>
                <TabsTrigger 
                  value="about" 
                  className={`flex-1 py-3 rounded-none border-b-2 transition-all ${
                    activeTab === 'about' ? 'border-current font-medium' : 'border-transparent'
                  }`}
                  style={{color: activeTab === 'about' ? currentCrypto.color : undefined}}
                >
                  About
                </TabsTrigger>
              </TabsList>

              <TabsContent value="activity" className="p-4 space-y-3">
                {[
                  { type: 'buy', amount: '+0.05 BTC', value: '+R42,500', time: '2 hours ago', color: 'text-green-500' },
                  { type: 'send', amount: '-0.02 BTC', value: '-R17,000', time: '1 day ago', color: 'text-red-500' },
                  { type: 'receive', amount: '+0.1 BTC', value: '+R85,000', time: '3 days ago', color: 'text-green-500' }
                ].map((tx, index) => (
                  <div key={index} className={`flex items-center justify-between p-3 rounded-lg ${
                    isDarkMode ? 'bg-gray-700/30' : 'bg-gray-50/50'
                  }`}>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full flex items-center justify-center"
                           style={{backgroundColor: `${currentCrypto.color}20`}}>
                        <span className="text-xs font-bold" style={{color: currentCrypto.color}}>
                          {tx.type.charAt(0).toUpperCase()}
                        </span>
                      </div>
                      <div>
                        <div className="font-medium capitalize">{tx.type}</div>
                        <div className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>{tx.time}</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className={`font-medium ${tx.color}`}>{tx.amount}</div>
                      <div className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>{tx.value}</div>
                    </div>
                  </div>
                ))}
              </TabsContent>

              <TabsContent value="about" className="p-4">
                <div className="space-y-4">
                  <p className={`text-sm leading-relaxed ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                    {currentCrypto.description}
                  </p>
                  <div className="flex gap-3">
                    <a 
                      href={currentCrypto.website} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-3 py-2 rounded-lg transition-all hover:scale-105"
                      style={{backgroundColor: `${currentCrypto.color}20`, color: currentCrypto.color}}
                    >
                      <ExternalLink className="h-4 w-4" />
                      <span className="text-sm font-medium">Website</span>
                    </a>
                    <a 
                      href={currentCrypto.whitepaper} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-3 py-2 rounded-lg transition-all hover:scale-105"
                      style={{backgroundColor: `${currentCrypto.color}20`, color: currentCrypto.color}}
                    >
                      <ExternalLink className="h-4 w-4" />
                      <span className="text-sm font-medium">Whitepaper</span>
                    </a>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CryptoDetailDashboard;
