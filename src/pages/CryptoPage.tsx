import { useState } from "react";
import { ArrowLeft, TrendingUp, TrendingDown, Wallet, BookmarkPlus } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { LineChart, Line, ResponsiveContainer, XAxis, YAxis, Tooltip } from "recharts";

// Mock crypto data
const cryptoData = [
  {
    id: "btc",
    name: "Bitcoin",
    symbol: "BTC",
    price: 62834.21,
    change: 3.2,
    isPositive: true,
    chartData: [
      { time: "00:00", price: 60000 },
      { time: "04:00", price: 61200 },
      { time: "08:00", price: 60800 },
      { time: "12:00", price: 62400 },
      { time: "16:00", price: 61900 },
      { time: "20:00", price: 62834 },
    ],
  },
  {
    id: "eth",
    name: "Ethereum",
    symbol: "ETH",
    price: 3412.65,
    change: -1.4,
    isPositive: false,
    chartData: [
      { time: "00:00", price: 3500 },
      { time: "04:00", price: 3480 },
      { time: "08:00", price: 3420 },
      { time: "12:00", price: 3380 },
      { time: "16:00", price: 3400 },
      { time: "20:00", price: 3413 },
    ],
  },
  {
    id: "bnb",
    name: "Binance Coin",
    symbol: "BNB",
    price: 621.83,
    change: 1.5,
    isPositive: true,
    chartData: [
      { time: "00:00", price: 610 },
      { time: "04:00", price: 615 },
      { time: "08:00", price: 618 },
      { time: "12:00", price: 620 },
      { time: "16:00", price: 619 },
      { time: "20:00", price: 622 },
    ],
  },
  {
    id: "sol",
    name: "Solana",
    symbol: "SOL",
    price: 156.92,
    change: 5.2,
    isPositive: true,
    chartData: [
      { time: "00:00", price: 148 },
      { time: "04:00", price: 150 },
      { time: "08:00", price: 153 },
      { time: "12:00", price: 155 },
      { time: "16:00", price: 154 },
      { time: "20:00", price: 157 },
    ],
  },
  {
    id: "xrp",
    name: "Ripple",
    symbol: "XRP",
    price: 0.5863,
    change: -0.8,
    isPositive: false,
    chartData: [
      { time: "00:00", price: 0.59 },
      { time: "04:00", price: 0.588 },
      { time: "08:00", price: 0.585 },
      { time: "12:00", price: 0.583 },
      { time: "16:00", price: 0.587 },
      { time: "20:00", price: 0.586 },
    ],
  }
];

const CryptoPage = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [selectedTab, setSelectedTab] = useState("all");
  const [selectedCrypto, setSelectedCrypto] = useState(cryptoData[0]);
  
  const handleAddToWatchlist = (crypto: any) => {
    toast({
      title: "Added to Watchlist",
      description: `${crypto.name} (${crypto.symbol}) has been added to your watchlist.`
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

  const handleWallet = (crypto: any) => {
    // Navigate to crypto wallet page
    navigate('/crypto-wallet');
  };
  
  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 rounded shadow-md border">
          <p className="text-sm font-medium">{`Time: ${payload[0].payload.time}`}</p>
          <p className="text-sm text-finance-blue">{`Price: $${payload[0].value.toFixed(2)}`}</p>
        </div>
      );
    }
    return null;
  };
  
  return (
    <div className="bg-gradient-to-br from-white to-slate-100 min-h-screen">
      <div className="container mx-auto max-w-md px-4 py-6">
        {/* Header */}
        <header className="flex items-center gap-4 mb-6">
          <Link to="/investments" className="p-2">
            <ArrowLeft className="h-5 w-5" />
          </Link>
          <h1 className="text-2xl font-bold">Cryptocurrency</h1>
        </header>
        
        {/* Crypto Price Chart */}
        <Card className="mb-6">
          <CardHeader className="pb-2">
            <div className="flex justify-between items-center">
              <div>
                <CardTitle className="text-xl flex items-center">
                  {selectedCrypto.name}
                  <span className="ml-2 text-sm text-muted-foreground">
                    {selectedCrypto.symbol}
                  </span>
                </CardTitle>
                <div className="flex items-center mt-1">
                  <span className="text-2xl font-bold">
                    ${selectedCrypto.price.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </span>
                  <span
                    className={`ml-2 flex items-center text-sm ${
                      selectedCrypto.isPositive ? "text-finance-green" : "text-destructive"
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
            
            <div className="grid grid-cols-3 gap-2 mt-4">
              <Button variant="default" className="bg-finance-green hover:bg-finance-green/90" onClick={() => handleBuy(selectedCrypto)}>
                Buy
              </Button>
              <Button variant="outline" className="border-finance-blue text-finance-blue hover:bg-finance-blue/10" onClick={() => handleSell(selectedCrypto)}>
                Sell
              </Button>
              <Button variant="outline" className="border-amber-500 text-amber-500 hover:bg-amber-500/10" onClick={() => handleWallet(selectedCrypto)}>
                <Wallet className="mr-2 h-4 w-4" />
                Wallet
              </Button>
            </div>
          </CardContent>
        </Card>
        
        {/* Crypto List */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Market</CardTitle>
            <Tabs defaultValue="all" value={selectedTab} onValueChange={setSelectedTab}>
              <TabsList className="grid grid-cols-3">
                <TabsTrigger value="all">All</TabsTrigger>
                <TabsTrigger value="gainers">Top Gainers</TabsTrigger>
                <TabsTrigger value="losers">Top Losers</TabsTrigger>
              </TabsList>
            </Tabs>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {cryptoData
                .filter(crypto => {
                  if (selectedTab === "gainers") return crypto.isPositive;
                  if (selectedTab === "losers") return !crypto.isPositive;
                  return true;
                })
                .map(crypto => (
                  <div 
                    key={crypto.id}
                    className="flex items-center justify-between p-3 rounded-lg hover:bg-slate-50 cursor-pointer border"
                    onClick={() => setSelectedCrypto(crypto)}
                  >
                    <div className="flex items-center">
                      <div className="w-8 h-8 rounded-full bg-finance-blue/10 text-finance-blue flex items-center justify-center mr-3">
                        {crypto.symbol.charAt(0)}
                      </div>
                      <div>
                        <div className="font-medium">{crypto.name}</div>
                        <div className="text-xs text-muted-foreground">{crypto.symbol}</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-medium">${crypto.price.toLocaleString('en-US', { 
                        minimumFractionDigits: 2, 
                        maximumFractionDigits: crypto.price < 1 ? 4 : 2
                      })}</div>
                      <div className={`text-xs ${crypto.isPositive ? "text-finance-green" : "text-destructive"}`}>
                        {crypto.isPositive ? "+" : ""}{crypto.change}%
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CryptoPage;
