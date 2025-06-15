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
    const matchesSearch = searchQuery === '' || crypto.name.toLowerCase().includes(searchQuery.toLowerCase()) || crypto.ticker.toLowerCase().includes(searchQuery.toLowerCase());
    let matchesTab = true;
    if (selectedTab === 'Gainers') matchesTab = crypto.isPositive;else if (selectedTab === 'Losers') matchesTab = !crypto.isPositive;
    return matchesSearch && matchesTab;
  });
  return <Card className="p-0 bg-transparent border-0 shadow-none">
      {/* Filter and Search controls */}
      <div className="px-4 pt-4">
        <div className="mb-2">
          <input placeholder="Search cryptocurrencies..." value={searchQuery} onChange={e => onSearchChange(e.target.value)} className="bg-slate-50 rounded px-3 py-2 w-full text-sm border border-slate-200 focus:border-blue-400 outline-none" />
        </div>
        <CryptoFilterTabs categories={categories} selectedTab={selectedTab} onTabChange={onTabChange} />
      </div>
      {/* Asset list */}
      <div className="space-y-4 px-2 pb-4">
        {filteredCryptos.length > 0 ? filteredCryptos.map(crypto => {
        const isExpanded = expandedId === crypto.id;
        // Prepare a sparkline based on chartData, otherwise a dummy flat line
        const sparkData = crypto.chartData?.length ? crypto.chartData.map((c, idx) => ({
          name: idx.toString(),
          value: c.price
        })) : [{
          name: "0",
          value: crypto.price
        }, {
          name: "1",
          value: crypto.price
        }];
        return <div key={crypto.id} className="bg-white rounded-xl shadow-sm border border-slate-100 cursor-pointer transition-all hover:shadow-md" onClick={() => setExpandedId(isExpanded ? null : crypto.id)}>
                {/* Main line of the card */}
                <div className="flex items-center justify-between px-4 pt-4 pb-0">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center font-bold text-lg text-slate-700">
                      {crypto.ticker.substring(0, 1)}
                    </div>
                    <div>
                      <div className="font-medium">{crypto.name}</div>
                      <div className="text-xs text-slate-400">{crypto.ticker}</div>
                    </div>
                  </div>
                  <div className="text-right space-y-0.5">
                    <div className="font-semibold text-lg text-slate-900">
                      R{crypto.price.toLocaleString('en-ZA', {
                  minimumFractionDigits: 2
                })}
                    </div>
                    <div className={`text-sm ${crypto.isPositive ? "text-green-600" : "text-destructive"}`}>
                      {crypto.isPositive ? "+" : ""}{crypto.change}%
                    </div>
                  </div>
                </div>
                {/* Sparkline */}
                <div className="h-5 px-4">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={sparkData}>
                      <Line type="monotone" dataKey="value" stroke={crypto.isPositive ? "#16a34a" : "#dc2626"} strokeWidth={2} dot={false} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
                {/* Expanded: holdings and actions (only if expanded) */}
                {isExpanded && <div className="border-t mt-2 p-4 pt-3">
                    
                    <div className="flex gap-2">
                      <Button className="flex-1 bg-finance-green hover:bg-finance-green/90 text-white" onClick={e => {
                e.stopPropagation();
                if (onCryptoSelect) onCryptoSelect(crypto);
                // else could call a buy callback if provided in the future
              }}>
                        <ShoppingCart className="h-4 w-4 mr-1" /> Buy
                      </Button>
                      <Button className="flex-1 bg-finance-blue hover:bg-finance-blue/90 text-white" onClick={e => {
                e.stopPropagation();
                if (onCryptoSelect) onCryptoSelect(crypto);
                // else could call a sell callback if provided in the future
              }}>
                        <ArrowDownLeft className="h-4 w-4 mr-1" /> Sell
                      </Button>
                    </div>
                  </div>}
              </div>;
      }) : <div className="text-center py-6 text-muted-foreground">
            No cryptocurrencies matching your criteria
          </div>}
      </div>
    </Card>;
};
export default CryptoList;