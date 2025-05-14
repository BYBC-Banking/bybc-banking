
import { useState, useEffect } from "react";
import { ArrowLeft, Filter, ShoppingCart, CreditCard, File } from "lucide-react";
import { Link } from "react-router-dom";
import TransactionsList from "@/components/TransactionsList";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";

const Transactions = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Sample transaction data (similar structure to what's in Index.tsx)
  const allTransactions = [
    {
      id: "tx1",
      merchant: "Woolworths",
      merchantIcon: <ShoppingCart className="h-5 w-5" />,
      date: "Today, 14:30",
      amount: 45.75,
      type: "expense" as const,
      category: "Groceries"
    },
    {
      id: "tx2",
      merchant: "Salary",
      merchantIcon: <File className="h-5 w-5" />,
      date: "Today, 08:15",
      amount: 3200.00,
      type: "income" as const,
      category: "Salary"
    },
    {
      id: "tx3",
      merchant: "Takealot",
      merchantIcon: <ShoppingCart className="h-5 w-5" />,
      date: "Yesterday, 19:45",
      amount: 129.99,
      type: "expense" as const,
      category: "Online Shopping"
    },
    {
      id: "tx4",
      merchant: "Interest",
      merchantIcon: <File className="h-5 w-5" />,
      date: "Mar 01, 00:01",
      amount: 125.45,
      type: "income" as const,
      category: "Interest"
    },
    {
      id: "tx5",
      merchant: "Transfer to Spending",
      merchantIcon: <CreditCard className="h-5 w-5" />,
      date: "Feb 15, 10:22",
      amount: 500.00,
      type: "expense" as const,
      category: "Transfer"
    },
    {
      id: "tx6",
      merchant: "Client Payment",
      merchantIcon: <File className="h-5 w-5" />,
      date: "Yesterday, 16:05",
      amount: 12500.00,
      type: "income" as const,
      category: "Sales"
    },
    {
      id: "tx7",
      merchant: "Office Supplies",
      merchantIcon: <ShoppingCart className="h-5 w-5" />,
      date: "Mar 02, 13:15",
      amount: 890.50,
      type: "expense" as const,
      category: "Office"
    }
  ];

  // Filter transactions based on the selected tab
  const incomeTransactions = allTransactions.filter(tx => tx.type === "income");
  const expenseTransactions = allTransactions.filter(tx => tx.type === "expense");
  
  const [activeTab, setActiveTab] = useState<string>("all");
  const [filteredTransactions, setFilteredTransactions] = useState(allTransactions);
  
  useEffect(() => {
    switch (activeTab) {
      case "money-in":
        setFilteredTransactions(incomeTransactions);
        break;
      case "money-out":
        setFilteredTransactions(expenseTransactions);
        break;
      default:
        setFilteredTransactions(allTransactions);
    }
  }, [activeTab]);

  return (
    <div className="bg-gradient-to-br from-white to-slate-100 min-h-screen">
      <div className="container mx-auto max-w-md px-4 py-6">
        {/* Header */}
        <header className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <Link to="/" className="p-2">
              <ArrowLeft className="h-5 w-5" />
            </Link>
            <h1 className="text-2xl font-bold">Transactions</h1>
          </div>
          
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" className="rounded-full">
                <Filter className="h-4 w-4" />
              </Button>
            </SheetTrigger>
            <SheetContent>
              <SheetHeader>
                <SheetTitle>Filter Transactions</SheetTitle>
              </SheetHeader>
              <div className="py-4">
                <div className="space-y-4">
                  <div>
                    <h3 className="text-sm font-medium mb-2">Date Range</h3>
                    <div className="grid grid-cols-3 gap-2">
                      <Button variant="outline" size="sm">Today</Button>
                      <Button variant="outline" size="sm">This Week</Button>
                      <Button variant="outline" size="sm">This Month</Button>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-sm font-medium mb-2">Categories</h3>
                    <div className="grid grid-cols-2 gap-2">
                      <Button variant="outline" size="sm">Groceries</Button>
                      <Button variant="outline" size="sm">Shopping</Button>
                      <Button variant="outline" size="sm">Salary</Button>
                      <Button variant="outline" size="sm">Transfer</Button>
                    </div>
                  </div>
                  
                  <div className="pt-2">
                    <Button className="w-full">Apply Filters</Button>
                  </div>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </header>
        
        {/* Tabs for Money In/Out */}
        <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab} className="mb-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="money-in">Money In</TabsTrigger>
            <TabsTrigger value="money-out">Money Out</TabsTrigger>
          </TabsList>
          
          <TabsContent value="all" className="mt-4">
            <div className="bg-white rounded-xl shadow-sm border p-1">
              <TransactionsList transactions={filteredTransactions} redirectToTransactionsPage={false} />
            </div>
          </TabsContent>
          
          <TabsContent value="money-in" className="mt-4">
            <div className="bg-white rounded-xl shadow-sm border p-1">
              <TransactionsList transactions={filteredTransactions} redirectToTransactionsPage={false} />
            </div>
          </TabsContent>
          
          <TabsContent value="money-out" className="mt-4">
            <div className="bg-white rounded-xl shadow-sm border p-1">
              <TransactionsList transactions={filteredTransactions} redirectToTransactionsPage={false} />
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Transactions;
