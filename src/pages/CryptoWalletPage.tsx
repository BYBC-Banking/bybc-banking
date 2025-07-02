
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { HomePageProvider, useHomePage } from "@/context/HomePageContext";
import { accounts } from "@/data/accountsData";
import CryptoLoadingScreen from "@/components/crypto/CryptoLoadingScreen";
import CryptoWalletHeader from "@/components/crypto/CryptoWalletHeader";
import CryptoPortfolioSummary from "@/components/crypto/CryptoPortfolioSummary";
import CryptoWalletActions from "@/components/crypto/CryptoWalletActions";
import CryptoAssetsList from "@/components/crypto/CryptoAssetsList";

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
        <CryptoWalletHeader onBackClick={() => navigate(-1)} />
        
        <CryptoPortfolioSummary 
          totalValue={totalValue} 
          onAssetClick={handleAssetClick} 
        />

        <CryptoWalletActions 
          onBuy={handleBuyCrypto} 
          onSwap={handleCryptoSwap} 
          onSend={handleSend} 
          onReceive={handleReceive} 
        />

        <CryptoAssetsList 
          assets={cryptoAssets} 
          onAssetClick={handleAssetClick} 
        />
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
