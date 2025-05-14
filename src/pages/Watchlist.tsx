
import React from 'react';
import { ArrowLeft, Bell, BellOff } from "lucide-react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/hooks/use-toast";
import { LineChart, Line, ResponsiveContainer } from "recharts";

// Mock watchlist data
const watchlistItems = [
  {
    id: "btc",
    name: "Bitcoin",
    symbol: "BTC",
    currentPrice: 62834.21,
    change: 3.2,
    isPositive: true,
    sparklineData: [35, 40, 35, 50, 49, 60, 70, 91, 81],
    alertsActive: true
  },
  {
    id: "aapl",
    name: "Apple Inc.",
    symbol: "AAPL",
    currentPrice: 182.52,
    change: 0.8,
    isPositive: true,
    sparklineData: [50, 55, 45, 60, 55, 65, 70, 65, 72],
    alertsActive: true
  },
  {
    id: "tsla",
    name: "Tesla Inc.",
    symbol: "TSLA",
    currentPrice: 237.49,
    change: -1.2,
    isPositive: false,
    sparklineData: [80, 75, 69, 70, 65, 60, 70, 65, 62],
    alertsActive: false
  },
  {
    id: "amzn",
    name: "Amazon",
    symbol: "AMZN",
    currentPrice: 178.15,
    change: 1.5,
    isPositive: true,
    sparklineData: [40, 45, 50, 49, 55, 58, 62, 60, 65],
    alertsActive: true
  },
  {
    id: "eth",
    name: "Ethereum",
    symbol: "ETH",
    currentPrice: 3412.65,
    change: -1.4,
    isPositive: false,
    sparklineData: [60, 65, 75, 70, 85, 75, 80, 65, 75],
    alertsActive: true
  }
];

const Watchlist = () => {
  const { toast } = useToast();
  const [assets, setAssets] = React.useState(watchlistItems);
  
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const toggleAlert = (id: string) => {
    setAssets(assets.map(asset => 
      asset.id === id 
        ? { ...asset, alertsActive: !asset.alertsActive } 
        : asset
    ));
    
    const asset = assets.find(a => a.id === id);
    
    toast({
      title: `Alerts ${asset?.alertsActive ? 'disabled' : 'enabled'}`,
      description: `You will ${asset?.alertsActive ? 'no longer' : 'now'} receive notifications for ${asset?.name}`,
    });
  };
  
  // Format the data for the sparkline charts
  const formatSparklineData = (data: number[]) => {
    return data.map((value, index) => ({ value }));
  };

  return (
    <div className="bg-gradient-to-br from-white to-slate-100 min-h-screen">
      <div className="container mx-auto max-w-md px-4 py-6">
        {/* Header */}
        <header className="flex items-center gap-4 mb-6">
          <Link to="/investments" className="p-2">
            <ArrowLeft className="h-5 w-5" />
          </Link>
          <h1 className="text-2xl font-bold">Watchlist</h1>
        </header>
        
        {/* Watchlist Items */}
        <div className="space-y-4">
          {assets.map((asset) => (
            <Card key={asset.id} className="hover:shadow-md transition-shadow">
              <CardHeader className="pb-2">
                <div className="flex justify-between items-center">
                  <CardTitle className="text-lg flex items-center gap-2">
                    {asset.name}
                    <span className="text-sm text-muted-foreground font-normal">
                      {asset.symbol}
                    </span>
                  </CardTitle>
                  <button 
                    onClick={() => toggleAlert(asset.id)}
                    className="flex items-center"
                    aria-label={`${asset.alertsActive ? 'Disable' : 'Enable'} alerts for ${asset.name}`}
                  >
                    {asset.alertsActive ? (
                      <Bell className="h-5 w-5 text-amber-500" />
                    ) : (
                      <BellOff className="h-5 w-5 text-gray-400" />
                    )}
                  </button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex justify-between items-center">
                  <div>
                    <div className="text-xl font-semibold">
                      ${asset.currentPrice.toLocaleString()}
                    </div>
                    <div className={`text-sm ${asset.isPositive ? 'text-green-600' : 'text-red-600'}`}>
                      {asset.isPositive ? '+' : ''}{asset.change}%
                    </div>
                  </div>
                  <div className="w-24 h-16">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={formatSparklineData(asset.sparklineData)}>
                        <Line 
                          type="monotone" 
                          dataKey="value" 
                          stroke={asset.isPositive ? '#16a34a' : '#dc2626'} 
                          strokeWidth={2} 
                          dot={false}
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </div>
                
                <div className="mt-2 flex items-center gap-2">
                  <span className="text-xs text-muted-foreground">Price alerts:</span>
                  <Switch 
                    checked={asset.alertsActive} 
                    onCheckedChange={() => toggleAlert(asset.id)}
                    aria-label={`Toggle alerts for ${asset.name}`}
                  />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Watchlist;
