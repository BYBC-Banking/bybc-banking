
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
  { name: 'Bitcoin', value: 45, amount: 31732.71, color: '#FFD700', icon: '₿' },
  { name: 'Ethereum', value: 30, amount: 21155.15, color: '#00D4FF', icon: 'Ξ' },
  { name: 'Cardano', value: 12, amount: 8462.06, color: '#FF6B35', icon: '₳' },
  { name: 'Solana', value: 8, amount: 5641.37, color: '#9945FF', icon: '◎' },
  { name: 'Others', value: 5, amount: 3525.87, color: '#10B981', icon: '⚡' }
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
    const duration = 2000; // 2 seconds
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
    return `R${value.toLocaleString('en-ZA', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  };

  const themeClasses = isDarkMode 
    ? "bg-gradient-to-br from-gray-900 via-black to-gray-800 text-white"
    : "bg-gradient-to-br from-yellow-50 via-white to-yellow-100 text-gray-900";

  return (
    <div className={`min-h-screen transition-all duration-500 ${themeClasses} relative overflow-hidden`}>
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className={`absolute top-20 left-10 w-32 h-32 rounded-full blur-3xl animate-pulse ${isDarkMode ? 'bg-yellow-400/20' : 'bg-yellow-300/30'}`} style={{animationDelay: '0s'}}></div>
        <div className={`absolute top-40 right-20 w-40 h-40 rounded-full blur-3xl animate-pulse ${isDarkMode ? 'bg-blue-500/20' : 'bg-blue-300/30'}`} style={{animationDelay: '1s'}}></div>
        <div className={`absolute bottom-32 left-1/3 w-36 h-36 rounded-full blur-3xl animate-pulse ${isDarkMode ? 'bg-purple-500/20' : 'bg-purple-300/30'}`} style={{animationDelay: '2s'}}></div>
      </div>

      <div className="container mx-auto max-w-6xl px-4 py-6 relative z-10">
        {/* Header */}
        <header className={`flex items-center justify-between mb-8 p-4 rounded-2xl backdrop-blur-md ${isDarkMode ? 'bg-black/20 border border-yellow-400/30' : 'bg-white/40 border border-yellow-600/30'}`}>
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
              className="hover:scale-105 transition-transform"
            >
              {isDarkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsBalanceVisible(!isBalanceVisible)}
              className="hover:scale-105 transition-transform"
            >
              {isBalanceVisible ? <Eye className="h-5 w-5" /> : <EyeOff className="h-5 w-5" />}
            </Button>
          </div>
        </header>

        {/* Main Portfolio Card */}
        <Card className={`mb-8 backdrop-blur-md ${isDarkMode ? 'bg-black/40 border-yellow-400/50' : 'bg-white/60 border-yellow-600/50'} hover:scale-[1.02] transition-transform duration-300`}>
          <CardContent className="p-8">
            <div className="text-center mb-6">
              <div className="text-4xl md:text-5xl font-bold mb-2">
                {isBalanceVisible ? formatCurrency(animatedValue) : "••••••••"}
              </div>
              <div className="flex items-center justify-center gap-2 text-green-500">
                <TrendingUp className="h-4 w-4" />
                <span>+R2,594.57 (+3.8%) today</span>
              </div>
            </div>

            {/* Chart */}
            <div className="h-64 mb-6">
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
                    stroke="url(#gradient)" 
                    strokeWidth={3}
                    dot={{ fill: '#FFD700', strokeWidth: 2, r: 4 }}
                    activeDot={{ r: 6, stroke: '#FFD700', strokeWidth: 2, fill: '#FFD700' }}
                  />
                  <defs>
                    <linearGradient id="gradient" x1="0" y1="0" x2="1" y2="0">
                      <stop offset="0%" stopColor="#FFD700" />
                      <stop offset="100%" stopColor="#FFA500" />
                    </linearGradient>
                  </defs>
                </LineChart>
              </ResponsiveContainer>
            </div>

            {/* Timeframe Selector */}
            <div className="flex justify-center gap-2">
              {timeframes.map((timeframe) => (
                <Button
                  key={timeframe}
                  variant={activeTimeframe === timeframe ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setActiveTimeframe(timeframe)}
                  className={`transition-all duration-300 hover:scale-105 ${
                    activeTimeframe === timeframe 
                      ? 'bg-gradient-to-r from-yellow-400 to-amber-500 text-black' 
                      : ''
                  }`}
                >
                  {timeframe}
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Portfolio Composition */}
        <Card className={`backdrop-blur-md ${isDarkMode ? 'bg-black/40 border-yellow-400/50' : 'bg-white/60 border-yellow-600/50'} hover:scale-[1.01] transition-transform duration-300`}>
          <CardContent className="p-8">
            <h2 className="text-2xl font-bold mb-6 text-center">Portfolio Composition</h2>
            
            <div className="grid md:grid-cols-2 gap-8">
              {/* Pie Chart */}
              <div className="flex justify-center">
                <ResponsiveContainer width={300} height={300}>
                  <PieChart>
                    <Pie
                      data={portfolioComposition}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={120}
                      paddingAngle={2}
                      dataKey="value"
                    >
                      {portfolioComposition.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
              </div>

              {/* Asset List */}
              <div className="space-y-4">
                {portfolioComposition.map((asset, index) => (
                  <div
                    key={asset.name}
                    className={`flex items-center justify-between p-3 rounded-lg transition-all duration-300 hover:scale-105 ${isDarkMode ? 'bg-white/5 hover:bg-white/10' : 'bg-black/5 hover:bg-black/10'}`}
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className="w-8 h-8 rounded-full flex items-center justify-center text-white font-bold text-sm"
                        style={{ backgroundColor: asset.color }}
                      >
                        {asset.icon}
                      </div>
                      <div>
                        <div className="font-medium">{asset.name}</div>
                        <div className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                          {asset.value}%
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-medium">
                        {isBalanceVisible ? formatCurrency(asset.amount) : "••••••"}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CryptoWalletPage;
