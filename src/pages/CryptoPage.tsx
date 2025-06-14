import { useState } from "react";
import { ArrowLeft, TrendingUp, TrendingDown, Briefcase, BookmarkPlus } from "lucide-react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { LineChart, Line, ResponsiveContainer, XAxis, YAxis, Tooltip } from "recharts";
import { Input } from "@/components/ui/input";
import { HomePageProvider, useHomePage } from "@/context/HomePageContext";
import { accounts } from "@/data/accountsData";

// Mock crypto data
const cryptoAssets = [
  {
    id: "bitcoin",
    name: "Bitcoin",
    ticker: "BTC",
    price: 1145632.50,
    change: 2.5,
    isPositive: true,
    marketCap: "22.4T",
    chartData: [
      { time: "09:00", price: 1120000.00 },
      { time: "10:00", price: 1125500.25 },
      { time: "11:00", price: 1132000.10 },
      { time: "12:00", price: 1138500.35 },
      { time: "13:00", price: 1142000.12 },
      { time: "14:00", price: 1145632.50 },
    ],
  },
  {
    id: "ethereum",
    name: "Ethereum",
    ticker: "ETH",
    price: 68547.80,
    change: -1.2,
    isPositive: false,
    marketCap: "8.2T",
    chartData: [
      { time: "09:00", price: 69500.30 },
      { time: "10:00", price: 69200.75 },
      { time: "11:00", price: 68900.45 },
      { time: "12:00", price: 68750.80 },
      { time: "13:00", price: 68600.15 },
      { time: "14:00", price: 68547.80 },
    ],
  },
  {
    id: "ripple",
    name: "Ripple",
    ticker: "XRP",
    price: 8.52,
    change: 5.8,
    isPositive: true,
    marketCap: "480B",
    chartData: [
      { time: "09:00", price: 8.05 },
      { time: "10:00", price: 8.15 },
      { time: "11:00", price: 8.25 },
      { time: "12:00", price: 8.35 },
      { time: "13:00", price: 8.45 },
      { time: "14:00", price: 8.52 },
    ],
  },
  {
    id: "cardano",
    name: "Cardano",
    ticker: "ADA",
    price: 6.22,
    change: 0.8,
    isPositive: true,
    marketCap: "220B",
    chartData: [
      { time: "09:00", price: 6.17 },
      { time: "10:00", price: 6.18 },
      { time: "11:00", price: 6.19 },
      { time: "12:00", price: 6.20 },
      { time: "13:00", price: 6.21 },
      { time: "14:00", price: 6.22 },
    ],
  },
  {
    id: "polkadot",
    name: "Polkadot",
    ticker: "DOT",
    price: 95.45,
    change: -2.1,
    isPositive: false,
    marketCap: "125B",
    chartData: [
      { time: "09:00", price: 97.50 },
      { time: "10:00", price: 96.85 },
      { time: "11:00", price: 96.40 },
      { time: "12:00", price: 96.10 },
      { time: "13:00", price: 95.70 },
      { time: "14:00", price: 95.45 },
    ],
  }
];

const categories = ["All", "Gainers", "Losers", "DeFi", "Layer 1", "Meme"];

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
  
  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 rounded shadow-md border">
          <p className="text-sm font-medium">{`Time: ${payload[0].payload.time}`}</p>
          <p className="text-sm text-orange-600">{`Price: R${payload[0].value.toLocaleString('en-ZA', { minimumFractionDigits: 2 })}`}</p>
        </div>
      );
    }
    return null;
  };
  
  // Filter crypto based on search and selected tab
  const filteredCryptos = cryptoAssets.filter(crypto => {
    // Search filter
    const matchesSearch = 
      searchQuery === '' || 
      crypto.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      crypto.ticker.toLowerCase().includes(searchQuery.toLowerCase());
    
    // Tab filter
    let matchesTab = true;
    if (selectedTab === 'Gainers') matchesTab = crypto.isPositive;
    else if (selectedTab === 'Losers') matchesTab = !crypto.isPositive;
    // For other categories, show all for now (can be enhanced with actual categorization)
    
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
          <h1 className="text-2xl font-bold">Crypto Market</h1>
        </header>
        
        {/* Crypto Price Chart */}
        <Card className="mb-6">
          <CardHeader className="pb-2">
            <div className="flex justify-between items-center">
              <div>
                <CardTitle className="text-xl flex items-center">
                  {selectedCrypto.name}
                  <span className="ml-2 text-sm text-muted-foreground">
                    {selectedCrypto.ticker}
                  </span>
                </CardTitle>
                <div className="flex items-center mt-1">
                  <span className="text-2xl font-bold">
                    R{selectedCrypto.price.toLocaleString('en-ZA', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </span>
                  <span
                    className={`ml-2 flex items-center text-sm ${
                      selectedCrypto.isPositive ? "text-green-600" : "text-destructive"
                    }`}
                  >
                    {selectedCrypto.isPositive ? (
                      <TrendingUp className="h-4 w-4 mr-1" />
                    ) : (
                      <TrendingDown className="h-4 w-4 mr-1" />
                    )}
                    {selectedCrypto.isPositive ? "+" : ""}
                    {selectedCrypto.change}%
                  </span>
                </div>
                <div className="text-xs text-muted-foreground mt-1">
                  Market Cap: R{selectedCrypto.marketCap}
                </div>
              </div>
              <Button
                variant="outline"
                size="icon"
                onClick={() => handleAddToWatchlist(selectedCrypto)}
              >
                <BookmarkPlus className="h-5 w-5" />
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="h-[200px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={selectedCrypto.chartData}
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
                    stroke={selectedCrypto.isPositive ? "#16a34a" : "#dc2626"} 
                    strokeWidth={2} 
                    dot={false}
                    activeDot={{ r: 6 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
            
            <div className={`grid gap-2 mt-4 ${hasInvestmentAccess ? 'grid-cols-3' : 'grid-cols-2'}`}>
              <Button variant="default" className="bg-finance-green hover:bg-finance-green/90" onClick={() => handleBuy(selectedCrypto)}>
                Buy
              </Button>
              <Button variant="outline" className="border-finance-blue text-finance-blue hover:bg-finance-blue/10" onClick={() => handleSell(selectedCrypto)}>
                Sell
              </Button>
              {hasInvestmentAccess && (
                <Link to="/crypto-wallet">
                  <Button variant="outline" className="w-full border-finance-blue text-finance-blue hover:bg-finance-blue/10">
                    <Briefcase className="h-4 w-4" />
                    Wallet
                  </Button>
                </Link>
              )}
            </div>
          </CardContent>
        </Card>
        
        {/* Crypto List */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Crypto Market</CardTitle>
            
            {/* Search bar */}
            <div className="my-2">
              <Input 
                placeholder="Search cryptocurrencies..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="bg-slate-50"
              />
            </div>
            
            {/* Filter tabs */}
            <div className="overflow-x-auto pb-2">
              <div className="flex gap-2 min-w-max">
                {categories.map(category => (
                  <Button 
                    key={category}
                    variant={selectedTab === category ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedTab(category)}
                    className={selectedTab === category ? "bg-finance-blue hover:bg-finance-blue/90" : ""}
                  >
                    {category}
                  </Button>
                ))}
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {filteredCryptos.length > 0 ? (
                filteredCryptos.map(crypto => (
                  <div 
                    key={crypto.id}
                    className="flex items-center justify-between p-3 rounded-lg hover:bg-slate-50 cursor-pointer border"
                    onClick={() => setSelectedCrypto(crypto)}
                  >
                    <div className="flex items-center">
                      <div className="w-8 h-8 rounded-full bg-finance-blue/10 text-finance-blue flex items-center justify-center mr-3">
                        {crypto.ticker.substring(0, 3)}
                      </div>
                      <div>
                        <div className="font-medium">{crypto.name}</div>
                        <div className="text-xs text-muted-foreground">
                          {crypto.ticker} • {crypto.marketCap}
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-medium">
                        R{crypto.price.toLocaleString('en-ZA', { minimumFractionDigits: 2 })}
                      </div>
                      <div className={`text-xs ${crypto.isPositive ? "text-green-600" : "text-destructive"}`}>
                        {crypto.isPositive ? "+" : ""}{crypto.change}%
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-6 text-muted-foreground">
                  No cryptocurrencies matching your criteria
                </div>
              )}
            </div>
          </CardContent>
        </Card>
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
