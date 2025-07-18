
import { useState } from "react";
import { ArrowLeft, Wallet } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { HomePageProvider, useHomePage } from "@/context/HomePageContext";
import { accounts } from "@/data/accountsData";
import CryptoChart from "@/components/crypto/CryptoChart";
import CryptoList from "@/components/crypto/CryptoList";
import { cryptoAssets, categories } from "@/components/crypto/cryptoData";
import { Button } from "@/components/ui/button";
import CryptoWalletLoading from "@/components/CryptoWalletLoading";

const CryptoPageContent = () => {
  const { toast } = useToast();
  const { selectedAccount } = useHomePage();
  const navigate = useNavigate();
  const [selectedTab, setSelectedTab] = useState("All");
  const [selectedCrypto, setSelectedCrypto] = useState(cryptoAssets[0]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoadingWallet, setIsLoadingWallet] = useState(false);
  
  // Check if user has investment account access
  const hasInvestmentAccess = selectedAccount && selectedAccount.type === "Investments";
  
  const handleAddToWatchlist = (crypto: any) => {
    toast({
      title: "Added to Watchlist",
      description: `${crypto.name} (${crypto.ticker}) has been added to your crypto watchlist.`
    });
  };

  const handleBuy = (crypto: any) => {
    navigate("/crypto-trade");
  };
  
  const handleSell = (crypto: any) => {
    toast({
      title: "Sell Crypto",
      description: `Redirecting to sell ${crypto.name}.`
    });
  };

  const handleWalletClick = () => {
    setIsLoadingWallet(true);
    // Simulate loading time
    setTimeout(() => {
      navigate("/crypto-wallet");
    }, 2000);
  };

  if (isLoadingWallet) {
    return <CryptoWalletLoading />;
  }
  
  return (
    <div className="bg-gradient-to-br from-white to-slate-100 min-h-screen">
      <div className="container mx-auto max-w-md px-4 py-6">
        {/* Header */}
        <header className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <Link to="/investments" className="p-2">
              <ArrowLeft className="h-5 w-5" />
            </Link>
            <h1 className="text-2xl font-bold">Crypto Market</h1>
          </div>
          
          {/* Wallet Button with Icon */}
          <Button variant="outline" className="flex items-center gap-2" onClick={handleWalletClick}>
            <Wallet className="h-4 w-4" />
            Wallet
          </Button>
        </header>
        
        {/* Crypto Price Chart */}
        <CryptoChart
          selectedCrypto={selectedCrypto}
          hasInvestmentAccess={hasInvestmentAccess}
          onAddToWatchlist={handleAddToWatchlist}
          onBuy={handleBuy}
          onSell={handleSell}
        />
        
        {/* Crypto List */}
        <CryptoList
          cryptoAssets={cryptoAssets}
          categories={categories}
          selectedTab={selectedTab}
          searchQuery={searchQuery}
          onTabChange={setSelectedTab}
          onSearchChange={setSearchQuery}
          onCryptoSelect={setSelectedCrypto}
        />
      </div>
    </div>
  );
};

const CryptoPage = () => {
  return (
    <HomePageProvider accounts={accounts}>
      <CryptoPageContent />
    </HomePageProvider>
  );
};

export default CryptoPage;
