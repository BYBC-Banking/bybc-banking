
import { useState } from "react";
import { ArrowLeft, Briefcase } from "lucide-react";
import { Link } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { HomePageProvider, useHomePage } from "@/context/HomePageContext";
import { accounts } from "@/data/accountsData";
import StockChart from "@/components/stocks/StockChart";
import StockList from "@/components/stocks/StockList";
import { jseStocks, sectors } from "@/components/stocks/stocksData";

const StocksPageContent = () => {
  const { toast } = useToast();
  const { selectedAccount } = useHomePage();
  const [selectedTab, setSelectedTab] = useState("all");
  const [selectedStock, setSelectedStock] = useState(jseStocks[0]);
  const [searchQuery, setSearchQuery] = useState('');
  
  // Check if user has investment account access
  const hasInvestmentAccess = selectedAccount && selectedAccount.type === "Investments";
  
  const handleAddToWatchlist = (stock: any) => {
    toast({
      title: "Added to Watchlist",
      description: `${stock.name} (${stock.ticker}) has been added to your watchlist.`
    });
  };

  const handleBuy = (stock: any) => {
    toast({
      title: "Buy Stock",
      description: `Redirecting to buy ${stock.name}.`
    });
  };
  
  const handleSell = (stock: any) => {
    toast({
      title: "Sell Stock",
      description: `Redirecting to sell ${stock.name}.`
    });
  };

  const handleHoldingsClick = () => {
    toast({
      title: "Holdings",
      description: "Viewing your stock holdings."
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
            <h1 className="text-2xl font-bold">JSE Stocks</h1>
          </div>
          
          {/* Holdings button - only show if user has investment access */}
          {hasInvestmentAccess && (
            <Button
              variant="outline"
              size="sm"
              onClick={handleHoldingsClick}
              className="flex items-center gap-2"
            >
              <Briefcase className="h-4 w-4" />
              Holdings
            </Button>
          )}
        </header>
        
        {/* Stock Price Chart */}
        <StockChart
          selectedStock={selectedStock}
          hasInvestmentAccess={hasInvestmentAccess}
          onAddToWatchlist={handleAddToWatchlist}
          onBuy={handleBuy}
          onSell={handleSell}
        />
        
        {/* Stock List */}
        <StockList
          stocks={jseStocks}
          sectors={sectors}
          selectedTab={selectedTab}
          searchQuery={searchQuery}
          onTabChange={setSelectedTab}
          onSearchChange={setSearchQuery}
          onStockSelect={setSelectedStock}
        />
      </div>
    </div>
  );
};

const StocksPage = () => {
  return (
    <HomePageProvider accounts={accounts}>
      <StocksPageContent />
    </HomePageProvider>
  );
};

export default StocksPage;
