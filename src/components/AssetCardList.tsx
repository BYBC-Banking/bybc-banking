
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
  onBuyClick?: (assetId?: string) => void;
  onSellClick?: (assetId?: string) => void;
}

const AssetCardList = ({ assets, onBuyClick, onSellClick }: AssetCardListProps) => {
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
      <h2 className="text-lg font-semibold mb-3 text-gray-700">Your Assets</h2>
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
              variant="neumorphism"
              className="overflow-hidden transition-all duration-300 cursor-pointer"
              style={{ maxHeight: isExpanded ? '240px' : '88px' }}
              onClick={() => toggleAssetExpanded(asset.id)}
            >
              <CardContent className="p-0">
                {/* Main card content - always visible */}
                <div className="p-4 flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="w-10 h-10 rounded-full bg-gray-200 shadow-[inset_2px_2px_4px_#d1d9e6,inset_-2px_-2px_4px_#ffffff] flex items-center justify-center mr-3 font-bold text-gray-600">
                      {asset.logo}
                    </div>
                    <div>
                      <div className="font-medium text-gray-700">{asset.name}</div>
                      <div className="text-sm text-gray-500">{asset.symbol}</div>
                    </div>
                  </div>
                  
                  <div className="flex items-end flex-col">
                    <div className="font-bold text-gray-700">R{asset.currentPrice.toLocaleString()}</div>
                    <div 
                      className={`text-xs ${
                        asset.isPositive ? "text-green-700" : "text-red-700"
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
                  <div className="p-4 border-t border-gray-300 pt-4 animate-fade-in">
                    <div className="flex justify-between mb-4">
                      <div>
                        <div className="text-sm text-gray-500">Your Holdings</div>
                        <div className="font-medium text-gray-700">{asset.holdings} {asset.symbol}</div>
                      </div>
                      <div className="text-right">
                        <div className="text-sm text-gray-500">Value</div>
                        <div className="font-medium text-gray-700">R{asset.holdingsValue.toLocaleString()}</div>
                      </div>
                    </div>
                    
                    <div className="flex gap-2">
                      <button 
                        className="flex-1 px-4 py-2 rounded-xl bg-gray-100 shadow-[4px_4px_8px_#d1d9e6,-4px_-4px_8px_#ffffff] hover:shadow-[2px_2px_4px_#d1d9e6,-2px_-2px_4px_#ffffff] text-green-700 font-medium flex items-center justify-center transition-all"
                        onClick={(e) => {
                          e.stopPropagation();
                          if (onBuyClick) {
                            onBuyClick(asset.id);
                          } else {
                            handleActionClick("Buy", asset);
                          }
                        }}
                      >
                        <ShoppingCart className="h-4 w-4 mr-1" /> Buy
                      </button>
                      <button 
                        className="flex-1 px-4 py-2 rounded-xl bg-gray-100 shadow-[4px_4px_8px_#d1d9e6,-4px_-4px_8px_#ffffff] hover:shadow-[2px_2px_4px_#d1d9e6,-2px_-2px_4px_#ffffff] text-blue-700 font-medium flex items-center justify-center transition-all"
                        onClick={(e) => {
                          e.stopPropagation();
                          if (onSellClick) {
                            onSellClick(asset.id);
                          } else {
                            handleActionClick("Sell", asset);
                          }
                        }}
                      >
                        <ArrowUp className="h-4 w-4 mr-1 rotate-180" /> Sell
                      </button>
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
