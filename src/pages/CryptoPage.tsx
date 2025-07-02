
import { useState } from "react";
import { ArrowLeft, Wallet } from "lucide-react";
import { Link } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { HomePageProvider, useHomePage } from "@/context/HomePageContext";
import { accounts } from "@/data/accountsData";
import CryptoChart from "@/components/crypto/CryptoChart";
import CryptoList from "@/components/crypto/CryptoList";
import { cryptoAssets, categories } from "@/components/crypto/cryptoData";
import { Button } from "@/components/ui/button";

const CryptoPageContent = () => {
  const { toast } = useToast();
  const { selectedAccount } = useHomePage();
  const [selectedTab, setSelectedTab] = useState("All");
  const [selectedCrypto, setSelectedCrypto] = useState(cryptoAssets[0]);
  const [searchQuery, setSearchQuery] = useState('');
  
  // Check if user has investment account access
  const hasInvestmentAccess = selectedAccount && selectedAccount.type === "Investments";
  
  const handleAddToWatchlist = (crypto: any) => {
    toast({
      title: "Added to Watchlist",
      description: `${crypto.name} (${crypto.ticker}) has been added to your crypto watchlist.`
    });
  };

  const handleBuy = (crypto: any) => {
    toast({
      title: "Buy Crypto",
      description: `Redirecting to buy ${crypto.name}.`
    });
  };
  
  const handleSell = (crypto: any) => {
    toast({
      title: "Sell Crypto",
      description: `Redirecting to sell ${crypto.name}.`
    });
  };
  
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
          <Link to="/crypto-wallet">
            <Button variant="outline" className="flex items-center gap-2">
              <Wallet className="h-4 w-4" />
              Wallet
            </Button>
          </Link>
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
