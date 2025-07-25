
import { useState } from "react";
import { ArrowLeft, Briefcase } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { HomePageProvider, useHomePage } from "@/context/HomePageContext";
import { accounts } from "@/data/accountsData";
import StockChart from "@/components/stocks/StockChart";
import StockList from "@/components/stocks/StockList";
import { jseStocks, sectors } from "@/components/stocks/stocksData";

const StocksPageContent = () => {
  const { toast } = useToast();
  const { selectedAccount } = useHomePage();
  const navigate = useNavigate();
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
  
  return (
    <div className="bg-gradient-to-br from-white to-slate-100 min-h-screen">
      <div className="container mx-auto max-w-md px-4 py-6">
        {/* Header */}
        <header className="flex items-center gap-4 mb-6">
          <button onClick={() => navigate(-1)} className="p-2">
            <ArrowLeft className="h-5 w-5" />
          </button>
          <div className="flex items-center gap-3 flex-1">
            <h1 className="text-2xl font-bold">JSE Stocks</h1>
            <button className="flex items-center gap-2 px-3 py-1.5 bg-blue-100 text-blue-700 rounded-md hover:bg-blue-200 transition-colors">
              <Briefcase className="h-4 w-4" />
              <span className="text-sm font-medium">Holdings</span>
            </button>
          </div>
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
