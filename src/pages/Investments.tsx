
import { useState } from "react";
import InvestmentHeader from "@/components/InvestmentHeader";
import PortfolioSummary from "@/components/PortfolioSummary";
import InvestmentActionBar from "@/components/InvestmentActionBar";
import AssetCardList from "@/components/AssetCardList";
import { useToast } from "@/hooks/use-toast";

const Investments = () => {
  const { toast } = useToast();
  const [selectedTimeframe, setSelectedTimeframe] = useState<"1D" | "1W" | "1M" | "3M" | "1Y" | "ALL">("1W");
  
  // Mock portfolio data
  const portfolioData = {
    totalValue: 52475.32,
    change: 1250.75,
    changePercent: 2.43,
    isPositive: true
  };
  
  // Mock asset data
  const assets = [
    {
      id: "btc",
      name: "Bitcoin",
      symbol: "BTC",
      logo: "₿",
      currentPrice: 62834.21,
      change: 3.2,
      isPositive: true,
      sparklineData: [35, 40, 35, 50, 49, 60, 70, 91, 81],
      holdings: 0.15,
      holdingsValue: 9425.13
    },
    {
      id: "eth",
      name: "Ethereum",
      symbol: "ETH",
      logo: "Ξ",
      currentPrice: 3412.65,
      change: -1.4,
      isPositive: false,
      sparklineData: [60, 65, 75, 70, 85, 75, 80, 65, 75],
      holdings: 2.5,
      holdingsValue: 8531.62
    },
    {
      id: "aapl",
      name: "Apple Inc.",
      symbol: "AAPL",
      logo: "A",
      currentPrice: 182.52,
      change: 0.8,
      isPositive: true,
      sparklineData: [50, 55, 45, 60, 55, 65, 70, 65, 72],
      holdings: 20,
      holdingsValue: 3650.40
    },
    {
      id: "msft",
      name: "Microsoft",
      symbol: "MSFT",
      logo: "M",
      currentPrice: 417.88,
      change: 1.2,
      isPositive: true,
      sparklineData: [40, 42, 45, 47, 45, 50, 53, 56, 60],
      holdings: 12,
      holdingsValue: 5014.56
    }
  ];
  
  const handleTimeframeChange = (timeframe: "1D" | "1W" | "1M" | "3M" | "1Y" | "ALL") => {
    setSelectedTimeframe(timeframe);
    toast({
      title: "Timeframe changed",
      description: `Chart updated to ${timeframe} view`,
    });
  };
  
  return (
    <div className="bg-gradient-to-br from-white to-slate-100 min-h-screen">
      <div className="container mx-auto max-w-md px-4 py-6">
        {/* Header with greeting */}
        <InvestmentHeader isPositive={portfolioData.isPositive} />
        
        {/* Portfolio value and chart */}
        <PortfolioSummary 
          data={portfolioData} 
          selectedTimeframe={selectedTimeframe}
          onTimeframeChange={handleTimeframeChange}
        />
        
        {/* Quick action buttons */}
        <InvestmentActionBar />
        
        {/* Asset cards */}
        <AssetCardList assets={assets} />
      </div>
    </div>
  );
};

export default Investments;
