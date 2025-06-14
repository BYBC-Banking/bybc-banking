
import { Button } from "@/components/ui/button";

interface CryptoFilterTabsProps {
  categories: string[];
  selectedTab: string;
  onTabChange: (tab: string) => void;
}

const CryptoFilterTabs = ({ categories, selectedTab, onTabChange }: CryptoFilterTabsProps) => {
  return (
    <div className="overflow-x-auto pb-2">
      <div className="flex gap-2 min-w-max">
        {categories.map(category => (
          <Button 
            key={category}
            variant={selectedTab === category ? "default" : "outline"}
            size="sm"
            onClick={() => onTabChange(category)}
            className={selectedTab === category ? "bg-finance-blue hover:bg-finance-blue/90" : ""}
          >
            {category}
          </Button>
        ))}
      </div>
    </div>
  );
};

export default CryptoFilterTabs;
