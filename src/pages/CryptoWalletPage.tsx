
import { useState, useEffect } from "react";
import { ArrowLeft, Plus, TrendingUp, TrendingDown } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { HomePageProvider, useHomePage } from "@/context/HomePageContext";
import { accounts } from "@/data/accountsData";
import CryptoAccessModal from "@/components/CryptoAccessModal";

const CryptoWalletPageContent = () => {
  const { selectedAccount } = useHomePage();
  const [showAccessModal, setShowAccessModal] = useState(false);
  const navigate = useNavigate();

  const cryptoAssets = [
    {
      symbol: "BTC",
      name: "Bitcoin",
      balance: 0.05234,
      value: 65432.10,
      change: 2.5,
      changeAmount: 1598.30
    },
    {
      symbol: "ETH", 
      name: "Ethereum",
      balance: 2.3456,
      value: 4234.56,
      change: -1.2,
      changeAmount: -51.45
    },
    {
      symbol: "XRP",
      name: "Ripple", 
      balance: 1000,
      value: 850.50,
      change: 5.8,
      changeAmount: 46.72
    }
  ];

  const totalValue = cryptoAssets.reduce((sum, asset) => sum + asset.value, 0);

  // Check if user has access to crypto wallet features
  const hasInvestmentAccess = selectedAccount && selectedAccount.type === "Investments";

  // Show modal immediately if user doesn't have investment access
  useEffect(() => {
    if (!hasInvestmentAccess) {
      setShowAccessModal(true);
    }
  }, [hasInvestmentAccess]);

  const handleAssetClick = () => {
    if (!hasInvestmentAccess) {
      setShowAccessModal(true);
    } else {
      // Allow access to crypto wallet features
      console.log("Access granted to crypto wallet");
    }
  };

  const handleBuyCrypto = () => {
    if (!hasInvestmentAccess) {
      setShowAccessModal(true);
    } else {
      navigate("/buy");
    }
  };

  const handleCryptoSwap = () => {
    // Allow swap functionality regardless of account type
    navigate("/crypto-swap");
  };

  return (
    <div className="bg-gradient-to-br from-white to-slate-100 min-h-screen">
      <div className="container mx-auto max-w-md px-4 py-6">
        {/* Header */}
        <header className="flex items-center gap-4 mb-6">
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={() => navigate(-1)}
            className="h-10 w-10"
          >
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
                R{totalValue.toLocaleString('en-ZA', { minimumFractionDigits: 2 })}
              </div>
              <div className="text-green-600 text-sm">
                +R2,594.57 (+3.8%) today
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <div className="grid grid-cols-2 gap-3 mb-6">
          <Button 
            className="w-full h-12 bg-green-600 hover:bg-green-700"
            onClick={handleBuyCrypto}
          >
            <Plus className="h-4 w-4 mr-2" />
            Buy Crypto
          </Button>
          <Button 
            variant="outline" 
            className="w-full h-12"
            onClick={handleCryptoSwap}
          >
            Swap
          </Button>
        </div>

        {/* Assets List */}
        <div className="space-y-3">
          <h2 className="text-lg font-semibold">Your Assets</h2>
          
          {cryptoAssets.map((asset) => (
            <Card 
              key={asset.symbol} 
              className="hover:shadow-md transition-shadow cursor-pointer"
              onClick={handleAssetClick}
            >
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
                      R{asset.value.toLocaleString('en-ZA', { minimumFractionDigits: 2 })}
                    </div>
                    <div className={`text-sm flex items-center gap-1 ${
                      asset.change >= 0 ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {asset.change >= 0 ? (
                        <TrendingUp className="h-3 w-3" />
                      ) : (
                        <TrendingDown className="h-3 w-3" />
                      )}
                      {asset.change >= 0 ? '+' : ''}{asset.change}%
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      <CryptoAccessModal isOpen={showAccessModal} onOpenChange={setShowAccessModal} />
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
