
import { CreditCard, File, ShoppingCart } from "lucide-react";
import DashboardHeader from "@/components/DashboardHeader";
import FinancialInsight from "@/components/FinancialInsight";
import NetWorthCircle from "@/components/NetWorthCircle";
import QuickActions from "@/components/QuickActions";
import TransactionsList from "@/components/TransactionsList";
import WalletSection from "@/components/WalletSection";

const Index = () => {
  // Mock data for banks/wallets
  const banks = [
    {
      name: "Standard Bank",
      icon: "SB",
      accountNumber: "1234567890",
      balance: 24500,
      color: "blue"
    },
    {
      name: "Nedbank",
      icon: "NB",
      accountNumber: "0987654321",
      balance: 15750,
      color: "green"
    },
    {
      name: "FNB",
      icon: "FNB",
      accountNumber: "5678901234",
      balance: 9800,
      color: "blue"
    }
  ];

  // Mock data for transactions
  const transactions = [
    {
      id: "tx1",
      merchant: "Woolworths",
      merchantIcon: <ShoppingCart className="h-5 w-5" />,
      date: "Today, 14:30",
      amount: 450.75,
      type: "expense" as const,
      category: "Groceries"
    },
    {
      id: "tx2",
      merchant: "Salary",
      merchantIcon: <File className="h-5 w-5" />,
      date: "Mar 28, 08:15",
      amount: 32000,
      type: "income" as const,
      category: "Salary"
    },
    {
      id: "tx3",
      merchant: "Takealot",
      merchantIcon: <ShoppingCart className="h-5 w-5" />,
      date: "Mar 25, 19:45",
      amount: 1299.99,
      type: "expense" as const,
      category: "Online Shopping"
    },
    {
      id: "tx4",
      merchant: "Multichoice",
      merchantIcon: <CreditCard className="h-5 w-5" />,
      date: "Mar 23, 00:01",
      amount: 799,
      type: "expense" as const,
      category: "Entertainment"
    }
  ];

  return (
    <div className="container mx-auto max-w-md px-4 py-6">
      <DashboardHeader />
      
      <div className="space-y-6">
        {/* Net Worth Circle */}
        <div className="bg-white rounded-xl p-6 shadow-sm text-center">
          <NetWorthCircle currentValue={50050} targetValue={100000} />
        </div>
        
        {/* Quick Actions */}
        <QuickActions />
        
        {/* Financial Insight Card */}
        <FinancialInsight />
        
        {/* Wallets Section */}
        <WalletSection banks={banks} />
        
        {/* Transactions List */}
        <TransactionsList transactions={transactions} />
      </div>
    </div>
  );
};

export default Index;
