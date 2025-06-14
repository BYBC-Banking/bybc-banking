
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import CryptoFilterTabs from "./CryptoFilterTabs";

interface CryptoAsset {
  id: string;
  name: string;
  ticker: string;
  price: number;
  change: number;
  isPositive: boolean;
  marketCap: string;
  chartData: Array<{ time: string; price: number }>;
}

interface CryptoListProps {
  cryptoAssets: CryptoAsset[];
  categories: string[];
  selectedTab: string;
  searchQuery: string;
  onTabChange: (tab: string) => void;
  onSearchChange: (query: string) => void;
  onCryptoSelect: (crypto: CryptoAsset) => void;
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
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg">Crypto Market</CardTitle>
        
        {/* Search bar */}
        <div className="my-2">
          <Input 
            placeholder="Search cryptocurrencies..." 
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="bg-slate-50"
          />
        </div>
        
        {/* Filter tabs */}
        <CryptoFilterTabs
          categories={categories}
          selectedTab={selectedTab}
          onTabChange={onTabChange}
        />
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          {filteredCryptos.length > 0 ? (
            filteredCryptos.map(crypto => (
              <div 
                key={crypto.id}
                className="flex items-center justify-between p-3 rounded-lg hover:bg-slate-50 cursor-pointer border"
                onClick={() => onCryptoSelect(crypto)}
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
  );
};

export default CryptoList;
