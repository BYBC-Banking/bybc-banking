
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Calendar, FileText, Search } from "lucide-react";
import TransactionTable from "@/components/TransactionTable";
import AllocationChart from "@/components/AllocationChart";
import WelcomeBanner from "@/components/WelcomeBanner";
import DashboardStats from "@/components/DashboardStats";
import TransactionFilters from "@/components/TransactionFilters";

const NonprofitLedger = () => {
  const [dateRange, setDateRange] = useState<{ from: Date | undefined; to: Date | undefined }>({
    from: undefined,
    to: undefined,
  });
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState<string[]>([]);
  const [amountRange, setAmountRange] = useState<{ min: number; max: number }>({
    min: 0,
    max: 100000
  });

  // Mock data for the dashboard
  const financialStats = {
    currentBalance: 245780.52,
    totalDonations: 378500.00,
    totalExpenses: 132719.48,
    allocationData: [
      { name: "Education Programs", value: 45, color: "#4CAF50" },
      { name: "Healthcare Initiatives", value: 30, color: "#2196F3" },
      { name: "Administrative", value: 15, color: "#FFC107" },
      { name: "Fundraising", value: 10, color: "#9C27B0" }
    ]
  };

  return (
    <div className="bg-gradient-to-br from-white to-slate-100 min-h-screen">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Welcome Banner */}
        <WelcomeBanner />
        
        {/* Stats and Allocation */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <div className="lg:col-span-2">
            <DashboardStats stats={financialStats} />
          </div>
          <div className="lg:col-span-1">
            <AllocationChart data={financialStats.allocationData} />
          </div>
        </div>
        
        {/* Filters and Transactions Table */}
        <Card className="mb-8">
          <CardContent className="p-6">
            <TransactionFilters 
              dateRange={dateRange}
              setDateRange={setDateRange}
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              categoryFilter={categoryFilter}
              setCategoryFilter={setCategoryFilter}
              amountRange={amountRange}
              setAmountRange={setAmountRange}
            />
            
            <TransactionTable 
              filters={{
                dateRange,
                searchQuery,
                categories: categoryFilter,
                amountRange
              }}
            />
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default NonprofitLedger;
