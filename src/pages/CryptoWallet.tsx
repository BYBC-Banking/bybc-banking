
import React, { useState, useEffect } from 'react';
import { ArrowLeft, TrendingUp, TrendingDown, Send, QrCode, ArrowLeftRight, CreditCard } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

// Mock crypto data
const mockPortfolioData = {
  totalBalance: 45823.67,
  percentageChange: 3.2,
  chains: [
    {
      id: 'ethereum',
      name: 'Ethereum',
      symbol: 'ETH',
      balance: 12.5,
      zarValue: 32456.89,
      change: 5.1,
      color: '#627EEA'
    },
    {
      id: 'bitcoin',
      name: 'Bitcoin',
      symbol: 'BTC',
      balance: 0.3,
      zarValue: 8934.12,
      change: -2.3,
      color: '#F7931A'
    },
    {
      id: 'solana',
      name: 'Solana',
      symbol: 'SOL',
      balance: 45.8,
      zarValue: 4432.66,
      change: 8.7,
      color: '#9945FF'
    }
  ]
};

const mockTransactions = [
  {
    id: 1,
    type: 'send',
    amount: '0.5 ETH',
    zarAmount: 'R12,456',
    status: 'completed',
    timestamp: '2024-01-15 14:30',
    hash: '0x1234...5678'
  },
  {
    id: 2,
    type: 'receive',
    amount: '0.1 BTC',
    zarAmount: 'R8,934',
    status: 'pending',
    timestamp: '2024-01-15 12:15',
    hash: '0x9abc...def0'
  },
  {
    id: 3,
    type: 'swap',
    amount: '10 SOL → 0.2 ETH',
    zarAmount: 'R2,456',
    status: 'completed',
    timestamp: '2024-01-14 16:45',
    hash: '0x5678...9abc'
  }
];

const CryptoWallet = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [animatedBalance, setAnimatedBalance] = useState(0);

  useEffect(() => {
    // Simulate loading and animate balance counter
    const timer = setTimeout(() => setIsLoading(false), 1500);
    
    // Animate balance counter
    const duration = 2000;
    const steps = 60;
    const increment = mockPortfolioData.totalBalance / steps;
    let current = 0;
    
    const counter = setInterval(() => {
      current += increment;
      if (current >= mockPortfolioData.totalBalance) {
        setAnimatedBalance(mockPortfolioData.totalBalance);
        clearInterval(counter);
      } else {
        setAnimatedBalance(current);
      }
    }, duration / steps);

    return () => {
      clearTimeout(timer);
      clearInterval(counter);
    };
  }, []);

  const BalanceCard = () => (
    <Card className="bg-gradient-to-br from-[#000000] to-[#006634] text-white border-0 shadow-lg">
      <CardContent className="p-6">
        <div className="text-center">
          <p className="text-sm opacity-80 mb-2">Total Portfolio Value</p>
          <div className="flex items-center justify-center mb-2">
            <span className="text-3xl font-bold">
              R{isLoading ? (
                <span className="animate-pulse">---,---</span>
              ) : (
                animatedBalance.toLocaleString('en-ZA', { maximumFractionDigits: 2 })
              )}
            </span>
          </div>
          <div className="flex items-center justify-center gap-1">
            {mockPortfolioData.percentageChange > 0 ? (
              <TrendingUp className="h-4 w-4 text-[#FFB81C]" />
            ) : (
              <TrendingDown className="h-4 w-4 text-[#E03C31]" />
            )}
            <span className={`text-sm font-medium ${
              mockPortfolioData.percentageChange > 0 ? 'text-[#FFB81C]' : 'text-[#E03C31]'
            }`}>
              {mockPortfolioData.percentageChange > 0 ? '+' : ''}{mockPortfolioData.percentageChange}% (24h)
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  const ChainCard = ({ chain }: { chain: any }) => (
    <Card className="hover:shadow-md transition-all duration-200">
      <CardContent className="p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div 
              className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold"
              style={{ backgroundColor: chain.color }}
            >
              {chain.symbol.charAt(0)}
            </div>
            <div>
              <p className="font-medium">{chain.name}</p>
              <p className="text-sm text-gray-500">{chain.balance} {chain.symbol}</p>
            </div>
          </div>
          <div className="text-right">
            <p className="font-semibold">R{chain.zarValue.toLocaleString()}</p>
            <div className="flex items-center gap-1">
              {chain.change > 0 ? (
                <TrendingUp className="h-3 w-3 text-[#006634]" />
              ) : (
                <TrendingDown className="h-3 w-3 text-[#E03C31]" />
              )}
              <span className={`text-xs ${
                chain.change > 0 ? 'text-[#006634]' : 'text-[#E03C31]'
              }`}>
                {chain.change > 0 ? '+' : ''}{chain.change}%
              </span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  const QuickActions = () => (
    <div className="grid grid-cols-4 gap-4">
      <Link to="/crypto/send" className="flex flex-col items-center">
        <div className="w-14 h-14 rounded-full bg-[#006634] flex items-center justify-center mb-2 shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105">
          <Send className="h-6 w-6 text-white" />
        </div>
        <span className="text-xs font-medium text-center">Send</span>
      </Link>
      
      <Link to="/crypto/receive" className="flex flex-col items-center">
        <div className="w-14 h-14 rounded-full bg-[#006634] flex items-center justify-center mb-2 shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105">
          <QrCode className="h-6 w-6 text-white" />
        </div>
        <span className="text-xs font-medium text-center">Receive</span>
      </Link>
      
      <Link to="/crypto/swap" className="flex flex-col items-center">
        <div className="w-14 h-14 rounded-full bg-[#001489] flex items-center justify-center mb-2 shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105">
          <ArrowLeftRight className="h-6 w-6 text-white" />
        </div>
        <span className="text-xs font-medium text-center">Swap</span>
      </Link>
      
      <Link to="/crypto/buy" className="flex flex-col items-center">
        <div className="w-14 h-14 rounded-full bg-[#FFB81C] flex items-center justify-center mb-2 shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105">
          <CreditCard className="h-6 w-6 text-white" />
        </div>
        <span className="text-xs font-medium text-center">Buy</span>
      </Link>
    </div>
  );

  const TransactionItem = ({ transaction }: { transaction: any }) => (
    <div className="flex items-center justify-between p-4 hover:bg-gray-50 transition-colors duration-200">
      <div className="flex items-center gap-3">
        <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
          transaction.type === 'send' ? 'bg-[#E03C31]' :
          transaction.type === 'receive' ? 'bg-[#006634]' : 'bg-[#001489]'
        }`}>
          {transaction.type === 'send' && <Send className="h-5 w-5 text-white" />}
          {transaction.type === 'receive' && <QrCode className="h-5 w-5 text-white" />}
          {transaction.type === 'swap' && <ArrowLeftRight className="h-5 w-5 text-white" />}
        </div>
        <div>
          <p className="font-medium capitalize">{transaction.type}</p>
          <p className="text-sm text-gray-500">{transaction.timestamp}</p>
        </div>
      </div>
      <div className="text-right">
        <p className="font-semibold">{transaction.amount}</p>
        <p className="text-sm text-gray-500">{transaction.zarAmount}</p>
        <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${
          transaction.status === 'completed' ? 'bg-[#006634] text-white' :
          transaction.status === 'pending' ? 'bg-[#FFB81C] text-white' : 'bg-[#E03C31] text-white'
        }`}>
          {transaction.status}
        </span>
      </div>
    </div>
  );

  if (isLoading) {
    return (
      <div className="bg-gradient-to-br from-white to-slate-100 min-h-screen">
        <div className="container mx-auto max-w-md px-4 py-6">
          {/* Loading skeleton */}
          <div className="animate-pulse space-y-6">
            <div className="h-32 bg-gray-200 rounded-xl"></div>
            <div className="space-y-3">
              <div className="h-20 bg-gray-200 rounded-xl"></div>
              <div className="h-20 bg-gray-200 rounded-xl"></div>
              <div className="h-20 bg-gray-200 rounded-xl"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-br from-white to-slate-100 min-h-screen pb-20">
      <div className="container mx-auto max-w-md px-4 py-6">
        {/* Header */}
        <header className="flex items-center gap-4 mb-6">
          <Link to="/dashboard" className="p-2">
            <ArrowLeft className="h-5 w-5" />
          </Link>
          <h1 className="text-2xl font-bold">Crypto Wallet</h1>
        </header>

        <div className="space-y-6">
          {/* Total Balance Card */}
          <BalanceCard />

          {/* Chain Cards */}
          <div className="space-y-3">
            <h2 className="text-lg font-semibold">Your Tokens</h2>
            {mockPortfolioData.chains.map((chain) => (
              <ChainCard key={chain.id} chain={chain} />
            ))}
          </div>

          {/* Quick Actions */}
          <div className="space-y-3">
            <h2 className="text-lg font-semibold">Quick Actions</h2>
            <QuickActions />
          </div>

          {/* Recent Transactions */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold">Recent Transactions</h2>
              <Link to="/crypto/transactions" className="text-[#001489] text-sm font-medium">
                View All
              </Link>
            </div>
            <Card>
              <CardContent className="p-0">
                {mockTransactions.map((transaction) => (
                  <TransactionItem key={transaction.id} transaction={transaction} />
                ))}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CryptoWallet;
