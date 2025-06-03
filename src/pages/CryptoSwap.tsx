
import React, { useState, useEffect } from 'react';
import { ArrowLeft, ArrowUpDown, Settings, AlertTriangle, Info, Zap } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import TokenSelector from '@/components/crypto/TokenSelector';
import SwapRoute from '@/components/crypto/SwapRoute';
import { useToast } from '@/hooks/use-toast';

// Mock token data
const mockTokens = [
  { id: 'eth', symbol: 'ETH', name: 'Ethereum', balance: 2.5, price: 62000, logo: '⟡', network: 'ethereum' },
  { id: 'btc', symbol: 'BTC', name: 'Bitcoin', balance: 0.1, price: 1200000, logo: '₿', network: 'bitcoin' },
  { id: 'sol', symbol: 'SOL', name: 'Solana', balance: 50, price: 4200, logo: '◎', network: 'solana' },
  { id: 'usdc', symbol: 'USDC', name: 'USD Coin', balance: 1000, price: 18.5, logo: '⊙', network: 'ethereum' },
  { id: 'usdt', symbol: 'USDT', name: 'Tether', balance: 500, price: 18.5, logo: '₮', network: 'ethereum' },
];

const CryptoSwap = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [fromToken, setFromToken] = useState(mockTokens[0]);
  const [toToken, setToToken] = useState(mockTokens[3]);
  const [fromAmount, setFromAmount] = useState('');
  const [toAmount, setToAmount] = useState('');
  const [slippage, setSlippage] = useState(0.5);
  const [showSlippageModal, setShowSlippageModal] = useState(false);
  const [showTokenSelector, setShowTokenSelector] = useState(false);
  const [selectorType, setSelectorType] = useState<'from' | 'to'>('from');
  const [mevProtection, setMevProtection] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [priceImpact, setPriceImpact] = useState(0.1);

  const handleTokenSelect = (token: any) => {
    if (selectorType === 'from') {
      setFromToken(token);
    } else {
      setToToken(token);
    }
    setShowTokenSelector(false);
  };

  const handleFlipTokens = () => {
    const tempToken = fromToken;
    const tempAmount = fromAmount;
    setFromToken(toToken);
    setToToken(tempToken);
    setFromAmount(toAmount);
    setToAmount(tempAmount);
  };

  const handleAmountChange = (value: string, type: 'from' | 'to') => {
    if (type === 'from') {
      setFromAmount(value);
      // Mock conversion calculation
      const converted = (parseFloat(value) * fromToken.price / toToken.price).toString();
      setToAmount(converted || '');
    } else {
      setToAmount(value);
      const converted = (parseFloat(value) * toToken.price / fromToken.price).toString();
      setFromAmount(converted || '');
    }
  };

  const handleSwap = async () => {
    setIsLoading(true);
    // Simulate swap process
    await new Promise(resolve => setTimeout(resolve, 3000));
    setIsLoading(false);
    toast({
      title: "Swap Successful",
      description: `Swapped ${fromAmount} ${fromToken.symbol} for ${toAmount} ${toToken.symbol}`,
    });
  };

  const zarFromAmount = parseFloat(fromAmount) * fromToken.price || 0;
  const zarToAmount = parseFloat(toAmount) * toToken.price || 0;

  return (
    <div className="bg-gradient-to-br from-black to-[#006634] min-h-screen text-white">
      <div className="container mx-auto max-w-md px-4 py-6">
        {/* Header */}
        <header className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <Link to="/crypto-wallet" className="p-2">
              <ArrowLeft className="h-5 w-5 text-white" />
            </Link>
            <h1 className="text-2xl font-bold text-white">Swap</h1>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setShowSlippageModal(true)}
            className="text-white hover:bg-white/10"
          >
            <Settings className="h-5 w-5" />
          </Button>
        </header>

        <div className="space-y-4">
          {/* From Token Card */}
          <Card className="bg-white/10 border-white/20 backdrop-blur">
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm text-white/70">From</span>
                <span className="text-sm text-white/70">
                  Balance: {fromToken.balance} {fromToken.symbol}
                </span>
              </div>
              <div className="flex items-center gap-3">
                <Button
                  variant="ghost"
                  className="flex items-center gap-2 p-2 hover:bg-white/10"
                  onClick={() => {
                    setSelectorType('from');
                    setShowTokenSelector(true);
                  }}
                >
                  <span className="text-2xl">{fromToken.logo}</span>
                  <div className="text-left">
                    <p className="font-semibold text-white">{fromToken.symbol}</p>
                    <p className="text-xs text-white/70">{fromToken.name}</p>
                  </div>
                </Button>
                <div className="flex-1 text-right">
                  <Input
                    value={fromAmount}
                    onChange={(e) => handleAmountChange(e.target.value, 'from')}
                    placeholder="0.0"
                    className="text-right text-xl font-mono bg-transparent border-none text-white placeholder:text-white/50 p-0"
                  />
                  <p className="text-sm text-white/70 mt-1">
                    ~R{zarFromAmount.toLocaleString('en-ZA', { maximumFractionDigits: 2 })}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Flip Button */}
          <div className="flex justify-center">
            <Button
              variant="ghost"
              size="sm"
              onClick={handleFlipTokens}
              className="rounded-full w-10 h-10 p-0 bg-[#001489] hover:bg-[#001489]/80 border-4 border-black"
            >
              <ArrowUpDown className="h-4 w-4 text-white" />
            </Button>
          </div>

          {/* To Token Card */}
          <Card className="bg-white/10 border-white/20 backdrop-blur">
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm text-white/70">To</span>
                <span className="text-sm text-white/70">
                  Balance: {toToken.balance} {toToken.symbol}
                </span>
              </div>
              <div className="flex items-center gap-3">
                <Button
                  variant="ghost"
                  className="flex items-center gap-2 p-2 hover:bg-white/10"
                  onClick={() => {
                    setSelectorType('to');
                    setShowTokenSelector(true);
                  }}
                >
                  <span className="text-2xl">{toToken.logo}</span>
                  <div className="text-left">
                    <p className="font-semibold text-white">{toToken.symbol}</p>
                    <p className="text-xs text-white/70">{toToken.name}</p>
                  </div>
                </Button>
                <div className="flex-1 text-right">
                  <Input
                    value={toAmount}
                    onChange={(e) => handleAmountChange(e.target.value, 'to')}
                    placeholder="0.0"
                    className="text-right text-xl font-mono bg-transparent border-none text-white placeholder:text-white/50 p-0"
                  />
                  <p className="text-sm text-white/70 mt-1">
                    ~R{zarToAmount.toLocaleString('en-ZA', { maximumFractionDigits: 2 })}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Swap Details */}
          {fromAmount && toAmount && (
            <Card className="bg-white/5 border-white/10">
              <CardContent className="p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-white/70">Price Impact</span>
                  <span className={`text-sm ${priceImpact > 3 ? 'text-[#E03C31]' : 'text-[#FFB81C]'}`}>
                    {priceImpact}%
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-white/70">Slippage Tolerance</span>
                  <span className="text-sm text-white">{slippage}%</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-white/70">Network Fee</span>
                  <span className="text-sm text-white">~R15.50</span>
                </div>
                {mevProtection && (
                  <div className="flex items-center gap-2">
                    <Zap className="h-4 w-4 text-[#FFB81C]" />
                    <span className="text-sm text-[#FFB81C]">MEV Protection Enabled</span>
                  </div>
                )}
              </CardContent>
            </Card>
          )}

          {/* Swap Route */}
          <SwapRoute fromToken={fromToken} toToken={toToken} />

          {/* Warning */}
          {priceImpact > 3 && (
            <div className="flex items-center gap-2 p-3 bg-[#E03C31]/20 border border-[#E03C31]/30 rounded-lg">
              <AlertTriangle className="h-4 w-4 text-[#E03C31]" />
              <span className="text-sm text-[#E03C31]">High price impact warning</span>
            </div>
          )}

          {/* Swap Button */}
          <Button
            onClick={handleSwap}
            disabled={!fromAmount || !toAmount || isLoading}
            className="w-full bg-[#FFB81C] hover:bg-[#FFB81C]/90 text-black font-semibold py-6 text-lg disabled:opacity-50"
          >
            {isLoading ? 'Swapping...' : 'Swap Tokens'}
          </Button>
        </div>

        {/* Token Selector Modal */}
        <TokenSelector
          isOpen={showTokenSelector}
          onClose={() => setShowTokenSelector(false)}
          onSelect={handleTokenSelect}
          tokens={mockTokens}
          selectedToken={selectorType === 'from' ? fromToken : toToken}
        />

        {/* Slippage Settings Modal */}
        <Dialog open={showSlippageModal} onOpenChange={setShowSlippageModal}>
          <DialogContent className="bg-[#000000] border-white/20 text-white">
            <DialogHeader>
              <DialogTitle className="text-white">Advanced Settings</DialogTitle>
            </DialogHeader>
            <div className="space-y-6">
              <div>
                <label className="text-sm text-white/70 mb-2 block">Slippage Tolerance</label>
                <div className="flex gap-2 mb-3">
                  {[0.1, 0.5, 1.0].map((value) => (
                    <Button
                      key={value}
                      variant={slippage === value ? "default" : "outline"}
                      size="sm"
                      onClick={() => setSlippage(value)}
                      className={slippage === value ? "bg-[#006634] text-white" : "border-white/20 text-white hover:bg-white/10"}
                    >
                      {value}%
                    </Button>
                  ))}
                </div>
                <Input
                  value={slippage}
                  onChange={(e) => setSlippage(parseFloat(e.target.value))}
                  placeholder="Custom"
                  className="bg-white/10 border-white/20 text-white"
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-white font-medium">MEV Protection</p>
                  <p className="text-sm text-white/70">Protect against front-running</p>
                </div>
                <Switch
                  checked={mevProtection}
                  onCheckedChange={setMevProtection}
                />
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default CryptoSwap;
