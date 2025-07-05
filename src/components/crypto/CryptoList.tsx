
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { LineChart, Line, ResponsiveContainer } from "recharts";
import { ShoppingCart, ArrowDownLeft } from "lucide-react";
import CryptoFilterTabs from "./CryptoFilterTabs";

interface CryptoAsset {
  id: string;
  name: string;
  ticker: string;
  price: number;
  change: number;
  isPositive: boolean;
  marketCap: string;
  chartData: Array<{
    time: string;
    price: number;
  }>;
  holdings?: number;
  holdingsValue?: number;
}

interface CryptoListProps {
  cryptoAssets: CryptoAsset[];
  categories: string[];
  selectedTab: string;
  searchQuery: string;
  onTabChange: (tab: string) => void;
  onSearchChange: (query: string) => void;
  onCryptoSelect?: (crypto: CryptoAsset) => void;
}

const CryptoList = ({
  cryptoAssets,
  categories,
  selectedTab,
  searchQuery,
  onTabChange,
  onSearchChange,
  onCryptoSelect
}: CryptoListProps) => {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  // Filter crypto based on search and selected tab
  const filteredCryptos = cryptoAssets.filter(crypto => {
    const matchesSearch = searchQuery === '' || 
      crypto.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
      crypto.ticker.toLowerCase().includes(searchQuery.toLowerCase());
    
    let matchesTab = true;
    if (selectedTab === 'Gainers') matchesTab = crypto.isPositive;
    else if (selectedTab === 'Losers') matchesTab = !crypto.isPositive;
    
    return matchesSearch && matchesTab;
  });

  return (
    <Card className="bg-white">
      {/* Header */}
      <div className="p-4 border-b border-gray-200">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Crypto Market</h2>
        
        {/* Search bar */}
        <div className="mb-4">
          <input
            placeholder="Search cryptocurrencies..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full px-4 py-3 bg-gray-50 rounded-lg border border-gray-200 focus:border-blue-400 outline-none text-sm"
          />
        </div>
        
        {/* Filter tabs */}
        <CryptoFilterTabs 
          categories={categories} 
          selectedTab={selectedTab} 
          onTabChange={onTabChange} 
        />
      </div>

      {/* Asset list */}
      <div className="p-4">
        <div className="space-y-3">
          {filteredCryptos.length > 0 ? (
            filteredCryptos.map(crypto => {
              const isExpanded = expandedId === crypto.id;
              
              // Prepare sparkline data
              const sparkData = crypto.chartData?.length ? 
                crypto.chartData.map((c, idx) => ({
                  name: idx.toString(),
                  value: c.price
                })) : 
                [{ name: "0", value: crypto.price }, { name: "1", value: crypto.price }];

              return (
                <div 
                  key={crypto.id} 
                  className="bg-gray-50 rounded-lg p-4 cursor-pointer transition-all hover:bg-gray-100"
                  onClick={() => setExpandedId(isExpanded ? null : crypto.id)}
                >
                  {/* Main crypto row */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center font-bold text-gray-700">
                        {crypto.ticker.substring(0, 1)}
                      </div>
                      <div>
                        <div className="font-semibold text-gray-900">{crypto.name}</div>
                        <div className="text-sm text-gray-500">{crypto.ticker}</div>
                      </div>
                    </div>
                    
                    <div className="text-right">
                      <div className="font-bold text-gray-900">
                        R{crypto.price.toLocaleString('en-ZA', { minimumFractionDigits: 2 })}
                      </div>
                      <div className={`text-sm font-medium ${
                        crypto.isPositive ? "text-green-600" : "text-red-600"
                      }`}>
                        {crypto.isPositive ? "+" : ""}{crypto.change}%
                      </div>
                    </div>
                  </div>

                  {/* Sparkline */}
                  <div className="h-8 mt-3">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={sparkData}>
                        <Line 
                          type="monotone" 
                          dataKey="value" 
                          stroke={crypto.isPositive ? "#16a34a" : "#dc2626"} 
                          strokeWidth={2} 
                          dot={false} 
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>

                  {/* Expanded actions */}
                  {isExpanded && (
                    <div className="mt-4 pt-4 border-t border-gray-200">
                      <div className="flex gap-3">
                        <Button 
                          className="flex-1 bg-green-600 hover:bg-green-700 text-white"
                          onClick={(e) => {
                            e.stopPropagation();
                            if (onCryptoSelect) onCryptoSelect(crypto);
                          }}
                        >
                          <ShoppingCart className="h-4 w-4 mr-2" /> Buy
                        </Button>
                        <Button 
                          variant="outline"
                          className="flex-1 border-blue-500 text-blue-600 hover:bg-blue-50"
                          onClick={(e) => {
                            e.stopPropagation();
                            if (onCryptoSelect) onCryptoSelect(crypto);
                          }}
                        >
                          <ArrowDownLeft className="h-4 w-4 mr-2" /> Sell
                        </Button>
                      </div>
                    </div>
                  )}
                </div>
              );
            })
          ) : (
            <div className="text-center py-6 text-gray-500">
              No cryptocurrencies matching your criteria
            </div>
          )}
        </div>
      </div>
    </Card>
  );
};

export default CryptoList;
