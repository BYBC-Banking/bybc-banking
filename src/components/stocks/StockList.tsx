
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import StockFilterTabs from "./StockFilterTabs";

interface Stock {
  id: string;
  name: string;
  ticker: string;
  price: number;
  change: number;
  isPositive: boolean;
  sector: string;
  chartData: Array<{ time: string; price: number }>;
}

interface StockListProps {
  stocks: Stock[];
  sectors: string[];
  selectedTab: string;
  searchQuery: string;
  onTabChange: (tab: string) => void;
  onSearchChange: (query: string) => void;
  onStockSelect: (stock: Stock) => void;
}

const StockList = ({
  stocks,
  sectors,
  selectedTab,
  searchQuery,
  onTabChange,
  onSearchChange,
  onStockSelect
}: StockListProps) => {
  // Filter stocks based on search and selected tab
  const filteredStocks = stocks.filter(stock => {
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
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg">JSE Market</CardTitle>
        
        {/* Search bar */}
        <div className="my-2">
          <Input 
            placeholder="Search stocks..." 
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="bg-slate-50"
          />
        </div>
        
        {/* Filter tabs */}
        <StockFilterTabs
          sectors={sectors}
          selectedTab={selectedTab}
          onTabChange={onTabChange}
        />
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          {filteredStocks.length > 0 ? (
            filteredStocks.map(stock => (
              <div 
                key={stock.id}
                className="flex items-center justify-between p-3 rounded-lg hover:bg-slate-50 cursor-pointer border"
                onClick={() => onStockSelect(stock)}
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
  );
};

export default StockList;
