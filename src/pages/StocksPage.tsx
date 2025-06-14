import { useState } from "react";
import { ArrowLeft, TrendingUp, TrendingDown, Briefcase, BookmarkPlus } from "lucide-react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { LineChart, Line, ResponsiveContainer, XAxis, YAxis, Tooltip } from "recharts";
import { Input } from "@/components/ui/input";
import { HomePageProvider, useHomePage } from "@/context/HomePageContext";
import { accounts } from "@/data/accountsData";

// Mock JSE stocks data
const jseStocks = [
  {
    id: "naspers",
    name: "Naspers Ltd",
    ticker: "NPN.JO",
    price: 2475.63,
    change: 1.8,
    isPositive: true,
    sector: "Technology",
    chartData: [
      { time: "09:00", price: 2430.00 },
      { time: "10:00", price: 2445.25 },
      { time: "11:00", price: 2452.10 },
      { time: "12:00", price: 2468.35 },
      { time: "13:00", price: 2470.12 },
      { time: "14:00", price: 2475.63 },
    ],
  },
  {
    id: "sasol",
    name: "Sasol Ltd",
    ticker: "SOL.JO",
    price: 158.47,
    change: -2.1,
    isPositive: false,
    sector: "Energy",
    chartData: [
      { time: "09:00", price: 162.30 },
      { time: "10:00", price: 161.75 },
      { time: "11:00", price: 160.45 },
      { time: "12:00", price: 159.80 },
      { time: "13:00", price: 159.15 },
      { time: "14:00", price: 158.47 },
    ],
  },
  {
    id: "mtn",
    name: "MTN Group Ltd",
    ticker: "MTN.JO",
    price: 95.22,
    change: 0.5,
    isPositive: true,
    sector: "Telecommunications",
    chartData: [
      { time: "09:00", price: 94.50 },
      { time: "10:00", price: 94.75 },
      { time: "11:00", price: 95.10 },
      { time: "12:00", price: 95.15 },
      { time: "13:00", price: 95.05 },
      { time: "14:00", price: 95.22 },
    ],
  },
  {
    id: "fnb",
    name: "FirstRand Ltd",
    ticker: "FSR.JO",
    price: 70.54,
    change: 1.2,
    isPositive: true,
    sector: "Financial Services",
    chartData: [
      { time: "09:00", price: 69.70 },
      { time: "10:00", price: 69.95 },
      { time: "11:00", price: 70.20 },
      { time: "12:00", price: 70.35 },
      { time: "13:00", price: 70.45 },
      { time: "14:00", price: 70.54 },
    ],
  },
  {
    id: "shoprite",
    name: "Shoprite Holdings",
    ticker: "SHP.JO",
    price: 245.68,
    change: -0.7,
    isPositive: false,
    sector: "Consumer Staples",
    chartData: [
      { time: "09:00", price: 247.50 },
      { time: "10:00", price: 246.80 },
      { time: "11:00", price: 246.35 },
      { time: "12:00", price: 246.10 },
      { time: "13:00", price: 245.90 },
      { time: "14:00", price: 245.68 },
    ],
  },
  {
    id: "anglogold",
    name: "AngloGold Ashanti",
    ticker: "ANG.JO",
    price: 315.22,
    change: 2.4,
    isPositive: true,
    sector: "Mining",
    chartData: [
      { time: "09:00", price: 308.25 },
      { time: "10:00", price: 310.45 },
      { time: "11:00", price: 312.80 },
      { time: "12:00", price: 314.15 },
      { time: "13:00", price: 315.30 },
      { time: "14:00", price: 315.22 },
    ],
  },
  {
    id: "discovery",
    name: "Discovery Ltd",
    ticker: "DSY.JO",
    price: 135.47,
    change: -1.5,
    isPositive: false,
    sector: "Financial Services",
    chartData: [
      { time: "09:00", price: 137.50 },
      { time: "10:00", price: 136.85 },
      { time: "11:00", price: 136.40 },
      { time: "12:00", price: 136.10 },
      { time: "13:00", price: 135.70 },
      { time: "14:00", price: 135.47 },
    ],
  }
];

const sectors = [...new Set(jseStocks.map(stock => stock.sector))];

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
  
  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 rounded shadow-md border">
          <p className="text-sm font-medium">{`Time: ${payload[0].payload.time}`}</p>
          <p className="text-sm text-finance-blue">{`Price: R${payload[0].value.toFixed(2)}`}</p>
        </div>
      );
    }
    return null;
  };
  
  // Filter stocks based on search and selected tab
  const filteredStocks = jseStocks.filter(stock => {
    // Search filter
    const matchesSearch = 
      searchQuery === '' || 
      stock.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      stock.ticker.toLowerCase().includes(searchQuery.toLowerCase());
    
    // Tab filter
    let matchesTab = true;
    if (selectedTab === 'gainers') matchesTab = stock.isPositive;
    else if (selectedTab === 'losers') matchesTab = !stock.isPositive;
    else if (selectedTab !== 'all') matchesTab = stock.sector === selectedTab;
    
    return matchesSearch && matchesTab;
  });
  
  return (
    <div className="bg-gradient-to-br from-white to-slate-100 min-h-screen">
      <div className="container mx-auto max-w-md px-4 py-6">
        {/* Header */}
        <header className="flex items-center gap-4 mb-6">
          <Link to="/investments" className="p-2">
            <ArrowLeft className="h-5 w-5" />
          </Link>
          <h1 className="text-2xl font-bold">JSE Stocks</h1>
        </header>
        
        {/* Stock Price Chart */}
        <Card className="mb-6">
          <CardHeader className="pb-2">
            <div className="flex justify-between items-center">
              <div>
                <CardTitle className="text-xl flex items-center">
                  {selectedStock.name}
                  <span className="ml-2 text-sm text-muted-foreground">
                    {selectedStock.ticker}
                  </span>
                </CardTitle>
                <div className="flex items-center mt-1">
                  <span className="text-2xl font-bold">
                    R{selectedStock.price.toLocaleString('en-ZA', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </span>
                  <span
                    className={`ml-2 flex items-center text-sm ${
                      selectedStock.isPositive ? "text-finance-green" : "text-destructive"
                    }`}
                  >
                    {selectedStock.isPositive ? (
                      <TrendingUp className="h-4 w-4 mr-1" />
                    ) : (
                      <TrendingDown className="h-4 w-4 mr-1" />
                    )}
                    {selectedStock.isPositive ? "+" : ""}
                    {selectedStock.change}%
                  </span>
                </div>
                <div className="text-xs text-muted-foreground mt-1">
                  {selectedStock.sector}
                </div>
              </div>
              <Button
                variant="outline"
                size="icon"
                onClick={() => handleAddToWatchlist(selectedStock)}
              >
                <BookmarkPlus className="h-5 w-5" />
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="h-[200px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={selectedStock.chartData}
                  margin={{ top: 5, right: 20, bottom: 5, left: 0 }}
                >
                  <XAxis 
                    dataKey="time" 
                    axisLine={false} 
                    tickLine={false}
                    tick={{ fontSize: 12 }}
                  />
                  <YAxis 
                    domain={['dataMin', 'dataMax']} 
                    axisLine={false} 
                    tickLine={false}
                    tick={{ fontSize: 12 }}
                    hide
                  />
                  <Tooltip content={<CustomTooltip />} />
                  <Line 
                    type="monotone" 
                    dataKey="price" 
                    stroke={selectedStock.isPositive ? "#16a34a" : "#dc2626"} 
                    strokeWidth={2} 
                    dot={false}
                    activeDot={{ r: 6 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
            
            <div className={`grid gap-2 mt-4 ${hasInvestmentAccess ? 'grid-cols-3' : 'grid-cols-2'}`}>
              <Button variant="default" className="bg-finance-green hover:bg-finance-green/90" onClick={() => handleBuy(selectedStock)}>
                Buy
              </Button>
              <Button variant="outline" className="border-finance-blue text-finance-blue hover:bg-finance-blue/10" onClick={() => handleSell(selectedStock)}>
                Sell
              </Button>
              {hasInvestmentAccess && (
                <Button variant="outline" className="border-amber-500 text-amber-500 hover:bg-amber-500/10">
                  <Briefcase className="h-4 w-4" />
                  Holdings
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
        
        {/* Stock List */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">JSE Market</CardTitle>
            
            {/* Search bar */}
            <div className="my-2">
              <Input 
                placeholder="Search stocks..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="bg-slate-50"
              />
            </div>
            
            {/* Filter tabs */}
            <div className="overflow-x-auto pb-2">
              <div className="flex gap-2 min-w-max">
                <Button 
                  variant={selectedTab === "all" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedTab("all")}
                  className={selectedTab === "all" ? "bg-finance-blue" : ""}
                >
                  All
                </Button>
                <Button 
                  variant={selectedTab === "gainers" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedTab("gainers")}
                  className={selectedTab === "gainers" ? "bg-finance-green" : ""}
                >
                  Gainers
                </Button>
                <Button 
                  variant={selectedTab === "losers" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedTab("losers")}
                  className={selectedTab === "losers" ? "bg-destructive" : ""}
                >
                  Losers
                </Button>
                {sectors.map(sector => (
                  <Button 
                    key={sector}
                    variant={selectedTab === sector ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedTab(sector)}
                  >
                    {sector}
                  </Button>
                ))}
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {filteredStocks.length > 0 ? (
                filteredStocks.map(stock => (
                  <div 
                    key={stock.id}
                    className="flex items-center justify-between p-3 rounded-lg hover:bg-slate-50 cursor-pointer border"
                    onClick={() => setSelectedStock(stock)}
                  >
                    <div className="flex items-center">
                      <div className="w-8 h-8 rounded-full bg-finance-blue/10 text-finance-blue flex items-center justify-center mr-3">
                        {stock.ticker.substring(0, 3)}
                      </div>
                      <div>
                        <div className="font-medium">{stock.name}</div>
                        <div className="text-xs text-muted-foreground">
                          {stock.ticker} • {stock.sector}
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-medium">
                        R{stock.price.toLocaleString('en-ZA', { minimumFractionDigits: 2 })}
                      </div>
                      <div className={`text-xs ${stock.isPositive ? "text-finance-green" : "text-destructive"}`}>
                        {stock.isPositive ? "+" : ""}{stock.change}%
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-6 text-muted-foreground">
                  No stocks matching your criteria
                </div>
              )}
            </div>
          </CardContent>
        </Card>
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
