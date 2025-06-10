
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
  const [fromAsset, setFromAsset] = useState<string>("BTC");
  const [fromAmount, setFromAmount] = useState<string>("");
  const [toAmount, setToAmount] = useState<string>("");
  const [exchangeRate, setExchangeRate] = useState<number>(1250000);
  const [isConfirming, setIsConfirming] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [riskLevel, setRiskLevel] = useState<"low" | "medium" | "high">("low");
  const { toast } = useToast();

  const cryptoAssets: CryptoAsset[] = [
    { symbol: "BTC", name: "Bitcoin", balance: 0.05, price: 1250000 },
    { symbol: "ETH", name: "Ethereum", balance: 2.3, price: 45000 },
    { symbol: "XRP", name: "Ripple", balance: 1000, price: 8.5 },
  ];

  const selectedAsset = cryptoAssets.find(asset => asset.symbol === fromAsset);

  useEffect(() => {
    if (fromAmount && selectedAsset) {
      const amount = parseFloat(fromAmount);
      const zarValue = amount * selectedAsset.price;
      setToAmount(zarValue.toLocaleString('en-ZA', { 
        style: 'currency', 
        currency: 'ZAR',
        minimumFractionDigits: 2 
      }));
    } else {
      setToAmount("");
    }
  }, [fromAmount, selectedAsset]);

  const handleQuickAmount = (zarAmount: number) => {
    if (selectedAsset) {
      const cryptoAmount = zarAmount / selectedAsset.price;
      setFromAmount(cryptoAmount.toFixed(8));
    }
  };

  const handleMaxAmount = () => {
    if (selectedAsset) {
      setFromAmount(selectedAsset.balance.toString());
    }
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

    if (selectedAsset && parseFloat(fromAmount) > selectedAsset.balance) {
      toast({
        title: "Insufficient Balance",
        description: `You only have ${selectedAsset.balance} ${selectedAsset.symbol}`,
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
                Balance: {selectedAsset?.balance} {fromAsset}
              </span>
            </div>
            
            <div className="flex gap-3">
              <Select value={fromAsset} onValueChange={setFromAsset}>
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
        >
          <ArrowUpDown className="h-5 w-5" />
        </Button>
      </div>

      {/* To Section */}
      <Card>
        <CardContent className="p-6">
          <div className="space-y-4">
            <div className="text-sm font-medium text-muted-foreground">TO:</div>
            <div className="text-center">
              <div className="text-sm text-muted-foreground mb-2">South African Rand</div>
              <div className="text-3xl font-bold text-center p-4 bg-secondary/50 rounded-lg min-h-[80px] flex items-center justify-center">
                {toAmount ? `≈ ${toAmount}` : "R0.00"}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Quick Amount Buttons */}
      <div className="grid grid-cols-4 gap-2">
        <Button
          variant="outline"
          size="sm"
          onClick={() => handleQuickAmount(1000)}
        >
          R1,000
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => handleQuickAmount(5000)}
        >
          R5,000
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => handleQuickAmount(10000)}
        >
          R10,000
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={handleMaxAmount}
        >
          Max
        </Button>
      </div>

      {/* Market Info */}
      <Card>
        <CardContent className="p-4">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">💹 Rate:</span>
              <span className="text-sm font-medium">1 {fromAsset} = R{selectedAsset?.price.toLocaleString()}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">📊 Fee:</span>
              <span className="text-sm font-medium">R12.50 (1%)</span>
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
