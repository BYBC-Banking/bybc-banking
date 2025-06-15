
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowUpDown, TrendingUp, AlertTriangle, CheckCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import SwapConfirmation from "./SwapConfirmation";
import SwapProcessing from "./SwapProcessing";

interface CryptoAsset {
  symbol: string;
  name: string;
  balance: number;
  price: number;
}

const SwapInterface = () => {
  // Asset selection for crypto-to-crypto swap
  const [fromAsset, setFromAsset] = useState<string>("BTC");
  const [toAsset, setToAsset] = useState<string>("ETH");
  const [fromAmount, setFromAmount] = useState<string>("");
  const [toAmount, setToAmount] = useState<string>("");
  const [exchangeRate, setExchangeRate] = useState<number>(0); // units of toAsset per 1 fromAsset
  const [isConfirming, setIsConfirming] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [riskLevel, setRiskLevel] = useState<"low" | "medium" | "high">("low");
  const { toast } = useToast();

  const cryptoAssets: CryptoAsset[] = [
    { symbol: "BTC", name: "Bitcoin", balance: 0.05, price: 1250000 },
    { symbol: "ETH", name: "Ethereum", balance: 2.3, price: 45000 },
    { symbol: "XRP", name: "Ripple", balance: 1000, price: 8.5 },
  ];

  const fromAssetObj = cryptoAssets.find(asset => asset.symbol === fromAsset);
  const toAssetObj = cryptoAssets.find(asset => asset.symbol === toAsset);

  // Calculate exchange rate (toAsset per 1 fromAsset)
  useEffect(() => {
    if (fromAssetObj && toAssetObj) {
      const rate = fromAssetObj.price / toAssetObj.price;
      setExchangeRate(rate);
    }
  }, [fromAssetObj, toAssetObj]);

  // Calculate toAmount whenever fromAmount or assets change
  useEffect(() => {
    if (fromAmount && fromAssetObj && toAssetObj) {
      const amount = parseFloat(fromAmount);
      if (!isNaN(amount)) {
        const toAmt = amount * (fromAssetObj.price / toAssetObj.price);
        // Use up to 8 decimal places for small balances
        setToAmount(toAmt.toFixed(8));
      } else {
        setToAmount("");
      }
    } else {
      setToAmount("");
    }
  }, [fromAmount, fromAssetObj, toAssetObj]);

  // Quick amount buttons suggest fractions of balance
  const handleQuickAmount = (fraction: number) => {
    if (fromAssetObj) {
      const cryptoAmount = fromAssetObj.balance * fraction;
      setFromAmount(cryptoAmount.toFixed(8));
    }
  };

  const handleMaxAmount = () => {
    if (fromAssetObj) {
      setFromAmount(fromAssetObj.balance.toString());
    }
  };

  // Prevent selection of the same asset for from/to
  const getAvailableToAssets = () =>
    cryptoAssets.filter(a => a.symbol !== fromAsset);

  // Swap assets handler (switch from and to assets)
  const handleSwapAssets = () => {
    setFromAsset(toAsset);
    setToAsset(fromAsset);
    setFromAmount(toAmount);
  };

  const getRiskIndicator = () => {
    switch (riskLevel) {
      case "low":
        return (
          <div className="flex items-center gap-2 text-green-600 bg-green-50 p-3 rounded-lg">
            <CheckCircle className="h-4 w-4" />
            <div>
              <div className="font-semibold">✅ Standard Transaction</div>
              <div className="text-sm">Slippage: &lt;0.1% • Time: ~30s</div>
            </div>
          </div>
        );
      case "medium":
        return (
          <div className="flex items-center gap-2 text-amber-600 bg-amber-50 p-3 rounded-lg">
            <AlertTriangle className="h-4 w-4" />
            <div>
              <div className="font-semibold">⚠️ Market Alert</div>
              <div className="text-sm">Higher volatility • Slippage: 0.3-0.8%</div>
            </div>
          </div>
        );
      case "high":
        return (
          <div className="flex items-center gap-2 text-red-600 bg-red-50 p-3 rounded-lg">
            <AlertTriangle className="h-4 w-4" />
            <div>
              <div className="font-semibold">🚨 High Risk Transaction</div>
              <div className="text-sm">Significant volatility • Slippage: 1.2-3.5%</div>
            </div>
          </div>
        );
    }
  };

  const handleContinue = () => {
    if (!fromAmount || parseFloat(fromAmount) <= 0) {
      toast({
        title: "Invalid Amount",
        description: "Please enter a valid amount to swap",
        variant: "destructive"
      });
      return;
    }

    if (
      fromAssetObj &&
      parseFloat(fromAmount) > fromAssetObj.balance
    ) {
      toast({
        title: "Insufficient Balance",
        description: `You only have ${fromAssetObj.balance} ${fromAssetObj.symbol}`,
        variant: "destructive"
      });
      return;
    }

    setIsConfirming(true);
  };

  if (isProcessing) {
    return <SwapProcessing onComplete={() => setIsProcessing(false)} />;
  }

  if (isConfirming) {
    return (
      <SwapConfirmation
        fromAsset={fromAsset}
        fromAmount={fromAmount}
        toAmount={toAmount}
        exchangeRate={exchangeRate}
        onConfirm={() => {
          setIsConfirming(false);
          setIsProcessing(true);
        }}
        onCancel={() => setIsConfirming(false)}
      />
    );
  }

  return (
    <div className="space-y-6">
      {/* From Section */}
      <Card>
        <CardContent className="p-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-muted-foreground">FROM:</span>
              <span className="text-sm text-muted-foreground">
                Balance: {fromAssetObj?.balance} {fromAsset}
              </span>
            </div>
            <div className="flex gap-3">
              <Select value={fromAsset} onValueChange={val => {
                setFromAsset(val);
                // If selecting the same as toAsset, auto-cycle to another available asset
                if (val === toAsset) {
                  const altTo = cryptoAssets.find(a => a.symbol !== val);
                  setToAsset(altTo ? altTo.symbol : "");
                }
              }}>
                <SelectTrigger className="w-32">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {cryptoAssets.map(asset => (
                    <SelectItem key={asset.symbol} value={asset.symbol}>
                      {asset.symbol}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Input
                placeholder="0.001"
                value={fromAmount}
                onChange={(e) => setFromAmount(e.target.value)}
                className="text-2xl h-14 text-center font-mono"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Swap Button */}
      <div className="flex justify-center">
        <Button
          variant="outline"
          size="icon"
          className="h-12 w-12 rounded-full border-2 border-primary/20 hover:border-primary"
          type="button"
          onClick={handleSwapAssets}
        >
          <ArrowUpDown className="h-5 w-5" />
        </Button>
      </div>

      {/* To Section */}
      <Card>
        <CardContent className="p-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-muted-foreground">TO:</span>
              <span className="text-sm text-muted-foreground">
                {toAssetObj ? `Balance: ${toAssetObj.balance} ${toAssetObj.symbol}` : ""}
              </span>
            </div>
            <div className="flex gap-3">
              <Select value={toAsset} onValueChange={val => setToAsset(val)}>
                <SelectTrigger className="w-32">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {getAvailableToAssets().map(asset => (
                    <SelectItem key={asset.symbol} value={asset.symbol}>
                      {asset.symbol}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Input
                placeholder="Calculated"
                value={toAmount}
                readOnly
                className="text-2xl h-14 text-center font-mono bg-gray-100"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Quick Amount Buttons - % of balance */}
      <div className="grid grid-cols-4 gap-2">
        <Button variant="outline" size="sm" type="button" onClick={() => handleQuickAmount(0.25)}>25%</Button>
        <Button variant="outline" size="sm" type="button" onClick={() => handleQuickAmount(0.5)}>50%</Button>
        <Button variant="outline" size="sm" type="button" onClick={() => handleQuickAmount(0.75)}>75%</Button>
        <Button variant="outline" size="sm" type="button" onClick={handleMaxAmount}>Max</Button>
      </div>

      {/* Market Info */}
      <Card>
        <CardContent className="p-4">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">💹 Rate:</span>
              <span className="text-sm font-medium">
                1 {fromAsset} = {exchangeRate.toFixed(8)} {toAsset}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">📊 Fee:</span>
              <span className="text-sm font-medium">1% of from-asset amount</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Risk Assessment */}
      {fromAmount && getRiskIndicator()}

      {/* Continue Button */}
      <Button
        onClick={handleContinue}
        className="w-full h-12 text-lg font-semibold"
        disabled={!fromAmount || parseFloat(fromAmount) <= 0}
      >
        Continue to Review
      </Button>
    </div>
  );
};

export default SwapInterface;
