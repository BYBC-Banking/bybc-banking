
import { Calendar, Filter, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { 
  Popover, 
  PopoverContent, 
  PopoverTrigger 
} from "@/components/ui/popover";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { Slider } from "@/components/ui/slider";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { 
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useState } from "react";

interface TransactionFiltersProps {
  dateRange: { from: Date | undefined; to: Date | undefined };
  setDateRange: React.Dispatch<React.SetStateAction<{
    from: Date | undefined;
    to: Date | undefined;
  }>>;
  searchQuery: string;
  setSearchQuery: React.Dispatch<React.SetStateAction<string>>;
  categoryFilter: string[];
  setCategoryFilter: React.Dispatch<React.SetStateAction<string[]>>;
  amountRange: { min: number; max: number };
  setAmountRange: React.Dispatch<React.SetStateAction<{
    min: number;
    max: number;
  }>>;
}

const TransactionFilters = ({
  dateRange,
  setDateRange,
  searchQuery,
  setSearchQuery,
  categoryFilter,
  setCategoryFilter,
  amountRange,
  setAmountRange
}: TransactionFiltersProps) => {
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);
  
  const categories = [
    "Education Programs",
    "Healthcare Initiatives",
    "Administrative",
    "Fundraising",
    "Staff Salaries",
    "Supplies",
    "Technology",
    "Events",
    "Donations"
  ];
  
  // Helper to format date range for display
  const formatDateRange = () => {
    if (!dateRange.from && !dateRange.to) return "All Time";
    
    const formatDate = (date: Date | undefined) => {
      if (!date) return "";
      return date.toLocaleDateString("en-ZA", {
        day: "numeric",
        month: "short",
        year: "numeric"
      });
    };
    
    if (dateRange.from && dateRange.to) {
      return `${formatDate(dateRange.from)} - ${formatDate(dateRange.to)}`;
    }
    
    return dateRange.from ? `From ${formatDate(dateRange.from)}` : `Until ${formatDate(dateRange.to)}`;
  };
  
  const toggleCategory = (category: string) => {
    if (categoryFilter.includes(category)) {
      setCategoryFilter(categoryFilter.filter(c => c !== category));
    } else {
      setCategoryFilter([...categoryFilter, category]);
    }
  };
  
  const clearFilters = () => {
    setDateRange({ from: undefined, to: undefined });
    setCategoryFilter([]);
    setAmountRange({ min: 0, max: 100000 });
    setSearchQuery("");
  };

  return (
    <div className="mb-6">
      <div className="flex flex-col space-y-4 md:flex-row md:items-center md:space-y-0 md:space-x-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input 
            placeholder="Search transactions..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9"
          />
        </div>
        
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Popover open={isCalendarOpen} onOpenChange={setIsCalendarOpen}>
                <PopoverTrigger asChild>
                  <Button variant="outline" className="flex gap-2">
                    <Calendar className="h-4 w-4" />
                    <span className="hidden md:inline">{formatDateRange()}</span>
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="end">
                  <CalendarComponent
                    mode="range"
                    selected={{
                      from: dateRange.from,
                      to: dateRange.to,
                    }}
                    onSelect={(range) => {
                      setDateRange({
                        from: range?.from,
                        to: range?.to,
                      });
                      setIsCalendarOpen(false);
                    }}
                    numberOfMonths={2}
                  />
                </PopoverContent>
              </Popover>
            </TooltipTrigger>
            <TooltipContent>
              <p>Filter by date range</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Popover open={isFiltersOpen} onOpenChange={setIsFiltersOpen}>
                <PopoverTrigger asChild>
                  <Button variant="outline" className="flex gap-2">
                    <Filter className="h-4 w-4" />
                    <span className="hidden md:inline">Filters</span>
                    {(categoryFilter.length > 0 || amountRange.min > 0 || amountRange.max < 100000) && (
                      <Badge variant="secondary" className="ml-1 h-5 w-5 rounded-full p-0 flex items-center justify-center">
                        {categoryFilter.length + (amountRange.min > 0 || amountRange.max < 100000 ? 1 : 0)}
                      </Badge>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-80" align="end">
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-medium mb-2">Amount Range (R)</h4>
                      <div className="px-1">
                        <Slider
                          defaultValue={[amountRange.min, amountRange.max]}
                          max={100000}
                          step={500}
                          onValueChange={(values) => {
                            setAmountRange({ min: values[0], max: values[1] });
                          }}
                        />
                        <div className="flex justify-between text-xs text-muted-foreground mt-2">
                          <div>R{amountRange.min.toLocaleString()}</div>
                          <div>R{amountRange.max.toLocaleString()}</div>
                        </div>
                      </div>
                    </div>
                    
                    <Separator />
                    
                    <div>
                      <h4 className="font-medium mb-2">Categories</h4>
                      <div className="grid grid-cols-2 gap-2">
                        {categories.map((category) => (
                          <div key={category} className="flex items-center space-x-2">
                            <Checkbox 
                              id={`category-${category}`}
                              checked={categoryFilter.includes(category)}
                              onCheckedChange={() => toggleCategory(category)}
                            />
                            <Label htmlFor={`category-${category}`} className="text-sm">
                              {category}
                            </Label>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <Separator />
                    
                    <div className="flex justify-between">
                      <Button variant="outline" size="sm" onClick={clearFilters}>
                        Clear Filters
                      </Button>
                      <Button size="sm" onClick={() => setIsFiltersOpen(false)}>
                        Apply Filters
                      </Button>
                    </div>
                  </div>
                </PopoverContent>
              </Popover>
            </TooltipTrigger>
            <TooltipContent>
              <p>Filter by category and amount</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
      
      {/* Active filters display */}
      {(categoryFilter.length > 0 || dateRange.from || dateRange.to || amountRange.min > 0 || amountRange.max < 100000) && (
        <div className="flex flex-wrap gap-2 mt-4">
          {dateRange.from && (
            <Badge variant="secondary" className="flex items-center gap-1">
              Date Range: {formatDateRange()}
              <button 
                onClick={() => setDateRange({ from: undefined, to: undefined })}
                className="ml-1 hover:text-destructive"
              >
                ×
              </button>
            </Badge>
          )}
          
          {(amountRange.min > 0 || amountRange.max < 100000) && (
            <Badge variant="secondary" className="flex items-center gap-1">
              Amount: R{amountRange.min.toLocaleString()} - R{amountRange.max.toLocaleString()}
              <button 
                onClick={() => setAmountRange({ min: 0, max: 100000 })}
                className="ml-1 hover:text-destructive"
              >
                ×
              </button>
            </Badge>
          )}
          
          {categoryFilter.map(category => (
            <Badge key={category} variant="secondary" className="flex items-center gap-1">
              {category}
              <button 
                onClick={() => setCategoryFilter(categoryFilter.filter(c => c !== category))}
                className="ml-1 hover:text-destructive"
              >
                ×
              </button>
            </Badge>
          ))}
          
          {(categoryFilter.length > 0 || dateRange.from || dateRange.to || amountRange.min > 0 || amountRange.max < 100000) && (
            <Button variant="ghost" size="sm" onClick={clearFilters} className="h-6 text-xs">
              Clear All
            </Button>
          )}
        </div>
      )}
    </div>
  );
};

export default TransactionFilters;
