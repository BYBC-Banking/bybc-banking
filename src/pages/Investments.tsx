import { useState } from "react";
import InvestmentHeader from "@/components/InvestmentHeader";
import PortfolioSummary from "@/components/PortfolioSummary";
import InvestmentActionBar from "@/components/InvestmentActionBar";
import AssetCardList from "@/components/AssetCardList";
import { useToast } from "@/hooks/use-toast";

// Mock crypto data (for demo)
const cryptoAssets = [{
  id: "btc",
  name: "Bitcoin",
  symbol: "BTC",
  logo: "₿",
  currentPrice: 1145632.5,
  change: 2.5,
  isPositive: true,
  sparklineData: [100, 105, 103, 110, 112, 114, 115, 114, 114.5],
  holdings: 0.08,
  holdingsValue: 91650.6
}, {
  id: "eth",
  name: "Ethereum",
  symbol: "ETH",
  logo: "Ξ",
  currentPrice: 68547.8,
  change: -1.2,
  isPositive: false,
  sparklineData: [60, 62, 61, 64, 65, 68, 69, 68, 67.8],
  holdings: 0.9,
  holdingsValue: 61692.9
}];
const Investments = () => {
  const {
    toast
  } = useToast();
  const [selectedTimeframe, setSelectedTimeframe] = useState<"1D" | "1W" | "1M" | "3M" | "1Y" | "ALL">("1W");
  const [favType, setFavType] = useState<"Stocks" | "Crypto">("Stocks");

  // Mock portfolio data
  const portfolioData = {
    totalValue: 52475.32,
    change: 1250.75,
    changePercent: 2.43,
    isPositive: true
  };

  // Mock asset data - updated to only include JSE stocks
  const assets = [{
    id: "naspers",
    name: "Naspers Ltd",
    symbol: "NPN.JO",
    logo: "N",
    currentPrice: 2475.63,
    change: 1.8,
    isPositive: true,
    sparklineData: [35, 40, 35, 50, 49, 60, 70, 91, 81],
    holdings: 5,
    holdingsValue: 12378.15
  }, {
    id: "sasol",
    name: "Sasol Ltd",
    symbol: "SOL.JO",
    logo: "S",
    currentPrice: 158.47,
    change: -2.1,
    isPositive: false,
    sparklineData: [60, 65, 75, 70, 65, 60, 55, 52, 50],
    holdings: 50,
    holdingsValue: 7923.50
  }, {
    id: "mtn",
    name: "MTN Group Ltd",
    symbol: "MTN.JO",
    logo: "M",
    currentPrice: 95.22,
    change: 0.5,
    isPositive: true,
    sparklineData: [50, 55, 45, 60, 55, 65, 70, 65, 72],
    holdings: 100,
    holdingsValue: 9522.00
  }, {
    id: "fnb",
    name: "FirstRand Ltd",
    symbol: "FSR.JO",
    logo: "F",
    currentPrice: 70.54,
    change: 1.2,
    isPositive: true,
    sparklineData: [40, 42, 45, 47, 45, 50, 53, 56, 60],
    holdings: 150,
    holdingsValue: 10581.00
  }, {
    id: "shoprite",
    name: "Shoprite Holdings",
    symbol: "SHP.JO",
    logo: "S",
    currentPrice: 245.68,
    change: -0.7,
    isPositive: false,
    sparklineData: [70, 68, 65, 66, 64, 63, 65, 64, 62],
    holdings: 25,
    holdingsValue: 6142.00
  }, {
    id: "anglogold",
    name: "AngloGold Ashanti",
    symbol: "ANG.JO",
    logo: "A",
    currentPrice: 315.22,
    change: 2.4,
    isPositive: true,
    sparklineData: [30, 35, 40, 45, 50, 55, 60, 65, 70],
    holdings: 18,
    holdingsValue: 5673.96
  }];
  const handleTimeframeChange = (timeframe: "1D" | "1W" | "1M" | "3M" | "1Y" | "ALL") => {
    setSelectedTimeframe(timeframe);
    toast({
      title: "Timeframe changed",
      description: `Chart updated to ${timeframe} view`
    });
  };
  const handleBuyClick = (assetId?: string) => {
    toast({
      title: "Buy Stock",
      description: `Proceeding to buy ${assetId ? assets.find(a => a.id === assetId)?.name : 'assets'}`
    });
  };
  const handleSellClick = (assetId?: string) => {
    toast({
      title: "Sell Stock",
      description: `Proceeding to sell ${assetId ? assets.find(a => a.id === assetId)?.name : 'assets'}`
    });
  };
  return <div className="bg-gradient-to-br from-white to-slate-100 min-h-screen">
      <div className="container mx-auto max-w-md px-4 py-6">
        {/* Header with greeting */}
        <InvestmentHeader isPositive={portfolioData.isPositive} />

        {/* Portfolio value and chart */}
        <PortfolioSummary data={portfolioData} selectedTimeframe={selectedTimeframe} onTimeframeChange={handleTimeframeChange} />

        {/* Quick action buttons */}
        <InvestmentActionBar onBuyClick={() => handleBuyClick()} onSellClick={() => handleSellClick()} />

        {/* Favourites selector and assets */}
        <div className="animate-fade-in" style={{
        animationDelay: "150ms"
      }}>
          <h2 className="text-lg font-semibold mb-3 [html[data-theme='business']_&]:text-gray-900 [html[data-theme='business']_&]:font-bold">Favourite</h2>
          <div className="flex gap-6 mb-2">
            <button className={`text-base font-medium transition-colors pb-1 border-b-2 ${favType === "Stocks" ? "text-black border-finance-green" : "text-gray-400 border-transparent"} focus:outline-none`} onClick={() => setFavType("Stocks")} aria-selected={favType === "Stocks"}>
              Stocks
            </button>
            <button className={`text-base font-medium transition-colors pb-1 border-b-2 ${favType === "Crypto" ? "text-black border-finance-green" : "text-gray-400 border-transparent"} focus:outline-none`} onClick={() => setFavType("Crypto")} aria-selected={favType === "Crypto"}>
              Crypto
            </button>
          </div>
          {favType === "Stocks" ? <AssetCardList assets={assets} onBuyClick={handleBuyClick} onSellClick={handleSellClick} /> : <AssetCardList assets={cryptoAssets} onBuyClick={assetId => toast({
          title: "Buy Crypto",
          description: `Proceeding to buy ${cryptoAssets.find(a => a.id === assetId)?.name}`
        })} onSellClick={assetId => toast({
          title: "Sell Crypto",
          description: `Proceeding to sell ${cryptoAssets.find(a => a.id === assetId)?.name}`
        })} />}
        </div>
      </div>
    </div>;
};
export default Investments;