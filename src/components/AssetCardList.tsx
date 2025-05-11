
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { LineChart, Line, ResponsiveContainer } from "recharts";
import { useToast } from "@/hooks/use-toast";
import { ArrowUp, ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Asset {
  id: string;
  name: string;
  symbol: string;
  logo: string;
  currentPrice: number;
  change: number;
  isPositive: boolean;
  sparklineData: number[];
  holdings: number;
  holdingsValue: number;
}

interface AssetCardListProps {
  assets: Asset[];
}

const AssetCardList = ({ assets }: AssetCardListProps) => {
  const [expandedAssetId, setExpandedAssetId] = useState<string | null>(null);
  const { toast } = useToast();
  
  const toggleAssetExpanded = (assetId: string) => {
    setExpandedAssetId(expandedAssetId === assetId ? null : assetId);
  };
  
  const handleActionClick = (action: string, asset: Asset) => {
    toast({
      title: `${action} ${asset.symbol}`,
      description: `${action} ${asset.symbol} at R${asset.currentPrice.toLocaleString()}`,
    });
  };
  
  return (
    <div className="animate-fade-in" style={{ animationDelay: "150ms" }}>
      <h2 className="text-lg font-semibold mb-3">Your Assets</h2>
      <div className="space-y-3">
        {assets.map((asset) => {
          const isExpanded = expandedAssetId === asset.id;
          const chartData = asset.sparklineData.map((value, index) => ({ 
            name: index.toString(), 
            value 
          }));
          
          return (
            <Card 
              key={asset.id} 
              className="overflow-hidden transition-all duration-300 cursor-pointer bg-white"
              style={{ maxHeight: isExpanded ? '240px' : '88px' }}
              onClick={() => toggleAssetExpanded(asset.id)}
            >
              <CardContent className="p-0">
                {/* Main card content - always visible */}
                <div className="p-4 flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center mr-3 font-bold">
                      {asset.logo}
                    </div>
                    <div>
                      <div className="font-medium">{asset.name}</div>
                      <div className="text-sm text-muted-foreground">{asset.symbol}</div>
                    </div>
                  </div>
                  
                  <div className="flex items-end flex-col">
                    <div className="font-bold">R{asset.currentPrice.toLocaleString()}</div>
                    <div 
                      className={`text-xs ${
                        asset.isPositive ? "text-finance-green" : "text-destructive"
                      }`}
                    >
                      {asset.isPositive ? "+" : ""}{asset.change}%
                    </div>
                  </div>
                </div>
                
                {/* Mini chart - always visible */}
                <div className="h-10 px-4 pb-2">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={chartData}>
                      <Line 
                        type="monotone" 
                        dataKey="value" 
                        stroke={asset.isPositive ? "#38A169" : "#E53E3E"} 
                        strokeWidth={1.5}
                        dot={false}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
                
                {/* Expanded content */}
                {isExpanded && (
                  <div className="p-4 border-t pt-4 animate-fade-in">
                    <div className="flex justify-between mb-4">
                      <div>
                        <div className="text-sm text-muted-foreground">Your Holdings</div>
                        <div className="font-medium">{asset.holdings} {asset.symbol}</div>
                      </div>
                      <div className="text-right">
                        <div className="text-sm text-muted-foreground">Value</div>
                        <div className="font-medium">R{asset.holdingsValue.toLocaleString()}</div>
                      </div>
                    </div>
                    
                    <div className="flex gap-2">
                      <Button 
                        className="flex-1 bg-finance-green hover:bg-finance-green/90"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleActionClick("Buy", asset);
                        }}
                      >
                        <ShoppingCart className="h-4 w-4 mr-1" /> Buy
                      </Button>
                      <Button 
                        className="flex-1 bg-finance-blue hover:bg-finance-blue/90"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleActionClick("Sell", asset);
                        }}
                      >
                        <ArrowUp className="h-4 w-4 mr-1 rotate-180" /> Sell
                      </Button>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default AssetCardList;
