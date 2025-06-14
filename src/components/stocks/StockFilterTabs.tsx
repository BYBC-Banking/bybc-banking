
import { Button } from "@/components/ui/button";

interface StockFilterTabsProps {
  sectors: string[];
  selectedTab: string;
  onTabChange: (tab: string) => void;
}

const StockFilterTabs = ({ sectors, selectedTab, onTabChange }: StockFilterTabsProps) => {
  return (
    <div className="overflow-x-auto pb-2">
      <div className="flex gap-2 min-w-max">
        <Button 
          variant={selectedTab === "all" ? "default" : "outline"}
          size="sm"
          onClick={() => onTabChange("all")}
          className={selectedTab === "all" ? "bg-finance-blue" : ""}
        >
          All
        </Button>
        <Button 
          variant={selectedTab === "gainers" ? "default" : "outline"}
          size="sm"
          onClick={() => onTabChange("gainers")}
          className={selectedTab === "gainers" ? "bg-finance-green" : ""}
        >
          Gainers
        </Button>
        <Button 
          variant={selectedTab === "losers" ? "default" : "outline"}
          size="sm"
          onClick={() => onTabChange("losers")}
          className={selectedTab === "losers" ? "bg-destructive" : ""}
        >
          Losers
        </Button>
        {sectors.map(sector => (
          <Button 
            key={sector}
            variant={selectedTab === sector ? "default" : "outline"}
            size="sm"
            onClick={() => onTabChange(sector)}
          >
            {sector}
          </Button>
        ))}
      </div>
    </div>
  );
};

export default StockFilterTabs;
