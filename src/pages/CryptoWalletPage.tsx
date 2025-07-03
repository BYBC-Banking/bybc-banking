
import React, { useState, useEffect } from "react";
import { ArrowLeft, Eye, EyeOff, Sun, Moon, TrendingUp } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";

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
  const navigate = useNavigate();
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

      <div className="container mx-auto max-w-4xl px-4 py-6 relative z-10">
        {/* Header */}
        <header className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" onClick={() => navigate(-1)} className="hover:scale-105 transition-transform">
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <h1 className={`text-2xl font-bold bg-gradient-to-r ${isDarkMode ? 'from-yellow-400 to-amber-500' : 'from-yellow-600 to-amber-600'} bg-clip-text text-transparent`}>
              Crypto Wallet
            </h1>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsDarkMode(!isDarkMode)}
              className={`hover:scale-105 transition-transform rounded-full ${isDarkMode ? 'bg-yellow-400/20 border border-yellow-400/30' : ''}`}
            >
              {isDarkMode ? <Sun className="h-5 w-5 text-yellow-400" /> : <Moon className="h-5 w-5" />}
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsBalanceVisible(!isBalanceVisible)}
              className={`hover:scale-105 transition-transform rounded-full ${isDarkMode ? 'bg-yellow-400/20 border border-yellow-400/30' : ''}`}
            >
              {isBalanceVisible ? <Eye className="h-5 w-5 text-yellow-400" /> : <EyeOff className="h-5 w-5 text-yellow-400" />}
            </Button>
          </div>
        </header>

        {/* Main Portfolio Card */}
        <Card className={`mb-8 ${isDarkMode ? 'bg-gray-800/50 border-yellow-400/30 backdrop-blur-md' : 'bg-white/60 border-yellow-600/50'} hover:scale-[1.01] transition-transform duration-300`}>
          <CardContent className="p-8">
            <div className="text-center mb-6">
              <div className={`text-sm font-medium mb-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                Total Portfolio Value
              </div>
              <div className={`text-5xl font-bold mb-4 ${isDarkMode ? 'text-yellow-400' : 'text-yellow-600'}`}>
                {isBalanceVisible ? formatCurrency(animatedValue) : "••••••••"}
              </div>
              <div className="flex items-center justify-center gap-2 mb-6">
                <div className="flex items-center gap-1 bg-green-500/20 px-3 py-1 rounded-full">
                  <TrendingUp className="h-4 w-4 text-green-500" />
                  <span className="text-green-500 font-medium">+R2,594.57 (+3.8%)</span>
                </div>
                <span className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>today</span>
              </div>
            </div>

            {/* Chart */}
            <div className="h-48 mb-6">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={portfolioData}>
                  <XAxis 
                    dataKey="time" 
                    axisLine={false}
                    tickLine={false}
                    className={isDarkMode ? 'text-gray-400' : 'text-gray-600'}
                  />
                  <YAxis hide />
                  <Line 
                    type="monotone" 
                    dataKey="value" 
                    stroke="#FFD700" 
                    strokeWidth={2}
                    dot={false}
                    activeDot={{ r: 4, stroke: '#FFD700', strokeWidth: 2, fill: '#FFD700' }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>

            {/* Timeframe Selector */}
            <div className="flex justify-center gap-2">
              {timeframes.map((timeframe) => (
                <Button
                  key={timeframe}
                  variant="ghost"
                  size="sm"
                  onClick={() => setActiveTimeframe(timeframe)}
                  className={`transition-all duration-300 hover:scale-105 rounded-lg ${
                    activeTimeframe === timeframe 
                      ? 'bg-yellow-400 text-black font-medium' 
                      : isDarkMode ? 'text-gray-400 hover:text-white' : 'text-gray-600'
                  }`}
                >
                  {timeframe}
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Portfolio Composition */}
        <Card className={`${isDarkMode ? 'bg-gray-800/50 border-yellow-400/30 backdrop-blur-md' : 'bg-white/60 border-yellow-600/50'} hover:scale-[1.01] transition-transform duration-300`}>
          <CardContent className="p-8">
            <h2 className={`text-2xl font-bold mb-8 text-center ${isDarkMode ? 'text-yellow-400' : 'text-yellow-600'}`}>
              Portfolio Composition
            </h2>
            
            {/* Asset List */}
            <div className="space-y-4">
              {portfolioComposition.map((asset, index) => (
                <div
                  key={asset.name}
                  className={`flex items-center justify-between p-4 rounded-xl transition-all duration-300 hover:scale-[1.02] ${
                    isDarkMode ? 'bg-gray-700/30 hover:bg-gray-700/50' : 'bg-gray-50/50 hover:bg-gray-100/50'
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <div
                      className="w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-lg"
                      style={{ backgroundColor: asset.color }}
                    >
                      {asset.symbol}
                    </div>
                    <div>
                      <div className={`font-semibold text-lg ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                        {asset.name}
                      </div>
                      <div className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                        {asset.value}% of portfolio
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className={`font-bold text-lg ${isDarkMode ? 'text-yellow-400' : 'text-yellow-600'}`}>
                      {isBalanceVisible ? formatCurrency(asset.amount) : "••••••"}
                    </div>
                    <div className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                      {getHoldingLevel(asset.value)}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CryptoWalletPage;
