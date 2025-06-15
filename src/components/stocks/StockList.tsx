
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { LineChart, Line, ResponsiveContainer } from "recharts";
import { ShoppingCart, ArrowUp } from "lucide-react";
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
  const [expandedStockId, setExpandedStockId] = useState<string | null>(null);

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

  const handleStockClick = (stock: Stock) => {
    setExpandedStockId(expandedStockId === stock.id ? null : stock.id);
    onStockSelect(stock);
  };

  const handleBuy = (stock: Stock, e: React.MouseEvent) => {
    e.stopPropagation();
    // Handle buy action
  };

  const handleSell = (stock: Stock, e: React.MouseEvent) => {
    e.stopPropagation();
    // Handle sell action
  };

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
            filteredStocks.map(stock => {
              const isExpanded = expandedStockId === stock.id;
              const sparklineData = stock.chartData.map((point, index) => ({
                name: index.toString(),
                value: point.price
              }));

              return (
                <div 
                  key={stock.id}
                  className="cursor-pointer border rounded-lg overflow-hidden bg-white"
                  onClick={() => handleStockClick(stock)}
                >
                  {/* Main stock row */}
                  <div className="flex items-center justify-between p-3">
                    <div className="flex items-center">
                      <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center mr-3 font-bold text-slate-700">
                        {stock.ticker.substring(0, 1)}
                      </div>
                      <div>
                        <div className="font-medium">{stock.name}</div>
                        <div className="text-sm text-muted-foreground">
                          {stock.ticker}
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-medium">
                        R{stock.price.toLocaleString('en-ZA', { minimumFractionDigits: 2 })}
                      </div>
                      <div className={`text-sm ${stock.isPositive ? "text-finance-green" : "text-destructive"}`}>
                        {stock.isPositive ? "+" : ""}{stock.change}%
                      </div>
                    </div>
                  </div>

                  {/* Sparkline chart */}
                  <div className="h-8 px-3 pb-2">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={sparklineData}>
                        <Line 
                          type="monotone" 
                          dataKey="value" 
                          stroke={stock.isPositive ? "#38A169" : "#E53E3E"} 
                          strokeWidth={2} 
                          dot={false} 
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>

                  {/* Expanded section with Buy/Sell buttons */}
                  {isExpanded && (
                    <div className="border-t p-3 bg-slate-50">
                      <div className="flex gap-2">
                        <Button 
                          className="flex-1 bg-finance-green hover:bg-finance-green/90"
                          onClick={(e) => handleBuy(stock, e)}
                        >
                          <ShoppingCart className="h-4 w-4 mr-1" />
                          Buy
                        </Button>
                        <Button 
                          className="flex-1 bg-finance-blue hover:bg-finance-blue/90"
                          onClick={(e) => handleSell(stock, e)}
                        >
                          <ArrowUp className="h-4 w-4 mr-1 rotate-180" />
                          Sell
                        </Button>
                      </div>
                    </div>
                  )}
                </div>
              );
            })
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
