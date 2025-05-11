
import { CreditCard, File, ShoppingCart } from "lucide-react";
import DashboardHeader from "@/components/DashboardHeader";
import AccountBalance from "@/components/AccountBalance";
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
      balance: 2450.75,
      color: "blue"
    },
    {
      name: "Nedbank",
      icon: "NB",
      accountNumber: "0987654321",
      balance: 1575.00,
      color: "green"
    },
    {
      name: "FNB",
      icon: "FNB",
      accountNumber: "5678901234",
      balance: 225.00,
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
      merchant: "Multichoice",
      merchantIcon: <CreditCard className="h-5 w-5" />,
      date: "Yesterday, 00:01",
      amount: 79.90,
      type: "expense" as const,
      category: "Entertainment"
    },
    {
      id: "tx5",
      merchant: "Uber",
      merchantIcon: <CreditCard className="h-5 w-5" />,
      date: "Feb 12, 19:22",
      amount: 65.50,
      type: "expense" as const,
      category: "Transportation"
    },
    {
      id: "tx6",
      merchant: "Netflix",
      merchantIcon: <CreditCard className="h-5 w-5" />,
      date: "Feb 10, 00:01",
      amount: 12.99,
      type: "expense" as const,
      category: "Entertainment"
    }
  ];

  return (
    <div className="bg-gradient-to-br from-white to-slate-100 min-h-screen">
      <div className="container mx-auto max-w-md px-4 py-6">
        {/* Header */}
        <DashboardHeader />
        
        <div className="space-y-6">
          {/* Account Balance Section */}
          <AccountBalance balance={4250.75} difference={150.75} />
          
          {/* Quick Actions */}
          <QuickActions />
          
          {/* Transactions List - with scrollable container */}
          <div className="animate-fade-in" style={{animationDelay: "100ms"}}>
            <h2 className="text-lg font-semibold mb-3">Recent Transactions</h2>
            <div className="bg-white rounded-xl shadow-sm border p-1 max-h-[280px] overflow-y-auto">
              <TransactionsList transactions={transactions} />
            </div>
          </div>
          
          {/* Wallets Section */}
          <div className="animate-fade-in" style={{animationDelay: "200ms"}}>
            <WalletSection banks={banks} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
