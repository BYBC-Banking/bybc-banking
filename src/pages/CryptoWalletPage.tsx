import { useState, useEffect } from "react";
import { ArrowLeft, TrendingUp, TrendingDown } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { HomePageProvider, useHomePage } from "@/context/HomePageContext";
import { accounts } from "@/data/accountsData";
import CryptoWalletActions from "@/components/crypto/CryptoWalletActions";

const CryptoLoadingScreen = () => {
  return (
    <div className="fixed inset-0 bg-black flex flex-col items-center justify-center z-50">
      <div className="flex flex-col items-center">
        <img 
          src="/lovable-uploads/6093fac6-2c85-4690-b750-573e64b3f410.png" 
          alt="BYBC Banking Logo" 
          className="w-48 h-48 object-contain mb-8"
        />
        <div className="flex space-x-2">
          <div className="w-3 h-3 bg-amber-500 rounded-full animate-pulse"></div>
          <div className="w-3 h-3 bg-amber-600 rounded-full animate-pulse" style={{animationDelay: '0.1s'}}></div>
          <div className="w-3 h-3 bg-amber-700 rounded-full animate-pulse" style={{animationDelay: '0.2s'}}></div>
          <div className="w-3 h-3 bg-amber-800 rounded-full animate-pulse" style={{animationDelay: '0.3s'}}></div>
        </div>
      </div>
    </div>
  );
};

const CryptoWalletPageContent = () => {
  const { selectedAccount } = useHomePage();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);

  // Hide navigation when component mounts
  useEffect(() => {
    // Hide bottom navigation
    const bottomNav = document.querySelector('[class*="fixed bottom-0"]');
    if (bottomNav) {
      (bottomNav as HTMLElement).style.display = 'none';
    }
    
    // Hide top navigation
    const topNav = document.querySelector('[class*="sticky top-0"]');
    if (topNav) {
      (topNav as HTMLElement).style.display = 'none';
    }

    // Simulate loading time for assets
    const loadingTimer = setTimeout(() => {
      setIsLoading(false);
    }, 3000); // 3 seconds loading time

    // Cleanup function to restore navigation when leaving
    return () => {
      const bottomNav = document.querySelector('[class*="fixed bottom-0"]');
      if (bottomNav) {
        (bottomNav as HTMLElement).style.display = '';
      }
      
      const topNav = document.querySelector('[class*="sticky top-0"]');
      if (topNav) {
        (topNav as HTMLElement).style.display = '';
      }

      clearTimeout(loadingTimer);
    };
  }, []);

  // Show loading screen while assets are loading
  if (isLoading) {
    return <CryptoLoadingScreen />;
  }

  const cryptoAssets = [{
    symbol: "BTC",
    name: "Bitcoin",
    balance: 0.05234,
    value: 65432.10,
    change: 2.5,
    changeAmount: 1598.30
  }, {
    symbol: "ETH",
    name: "Ethereum",
    balance: 2.3456,
    value: 4234.56,
    change: -1.2,
    changeAmount: -51.45
  }, {
    symbol: "XRP",
    name: "Ripple",
    balance: 1000,
    value: 850.50,
    change: 5.8,
    changeAmount: 46.72
  }];

  const totalValue = cryptoAssets.reduce((sum, asset) => sum + asset.value, 0);

  const handleAssetClick = () => {
    console.log("Asset clicked");
  };

  const handleBuyCrypto = () => {
    navigate("/crypto-trade");
  };

  const handleCryptoSwap = () => {
    navigate("/crypto-swap");
  };

  const handleSend = () => {
    navigate("/send");
  };

  const handleReceive = () => {
    navigate("/receive");
  };

  return (
    <div className="bg-gradient-to-br from-white to-slate-100 min-h-screen">
      <div className="container mx-auto max-w-md px-4 py-6">
        {/* Header */}
        <header className="flex items-center gap-4 mb-6">
          <Button variant="ghost" size="icon" onClick={() => navigate(-1)} className="h-10 w-10">
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-2xl font-bold">Crypto Wallet</h1>
        </header>

        {/* Portfolio Summary */}
        <Card className="mb-6" onClick={handleAssetClick}>
          <CardHeader>
            <CardTitle className="text-center">Total Portfolio Value</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center">
              <div className="text-3xl font-bold mb-2">
                R{totalValue.toLocaleString('en-ZA', {
                minimumFractionDigits: 2
              })}
              </div>
              <div className="text-green-600 text-sm">
                +R2,594.57 (+3.8%) today
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Custom Crypto Action Bar */}
        <CryptoWalletActions 
          onBuy={handleBuyCrypto} 
          onSwap={handleCryptoSwap} 
          onSend={handleSend} 
          onReceive={handleReceive} 
        />

        {/* Assets List */}
        <div className="space-y-3">
          <h2 className="text-lg font-semibold">Wallets</h2>
          {cryptoAssets.map(asset => 
            <Card key={asset.symbol} className="hover:shadow-md transition-shadow cursor-pointer" onClick={handleAssetClick}>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center">
                      <span className="font-bold text-orange-600">{asset.symbol[0]}</span>
                    </div>
                    <div>
                      <div className="font-semibold">{asset.name}</div>
                      <div className="text-sm text-muted-foreground">
                        {asset.balance} {asset.symbol}
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-semibold">
                      R{asset.value.toLocaleString('en-ZA', {
                    minimumFractionDigits: 2
                  })}
                    </div>
                    <div className={`text-sm flex items-center gap-1 ${asset.change >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                      {asset.change >= 0 ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
                      {asset.change >= 0 ? '+' : ''}{asset.change}%
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

const CryptoWalletPage = () => {
  return (
    <HomePageProvider accounts={accounts}>
      <CryptoWalletPageContent />
    </HomePageProvider>
  );
};

export default CryptoWalletPage;
