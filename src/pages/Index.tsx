
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom"; 
import { CreditCard, File, ShoppingCart } from "lucide-react";
import DashboardHeader from "@/components/DashboardHeader";
import AccountBalance from "@/components/AccountBalance";
import QuickActions from "@/components/QuickActions";
import TransactionsList from "@/components/TransactionsList";
import AccountsSection from "@/components/AccountsSection";

const Index = () => {
  const location = useLocation();
  
  // Mock data for bybc-banking accounts
  const accounts = [
    {
      id: "1",
      name: "BYBC Spending",
      type: "Spending",
      accountNumber: "1234567890",
      balance: 2450.75,
      color: "blue",
      transactions: [
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
        }
      ]
    },
    {
      id: "2",
      name: "BYBC Savings",
      type: "Savings",
      accountNumber: "0987654321",
      balance: 15750.00,
      color: "green",
      transactions: [
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
        }
      ]
    },
    {
      id: "3",
      name: "BYBC Business",
      type: "Business",
      accountNumber: "5678901234",
      balance: 42500.00,
      color: "purple",
      transactions: [
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
      ]
    },
    {
      id: "4",
      name: "BYBC Nonprofit",
      type: "Nonprofit",
      accountNumber: "9876543210",
      balance: 78950.25,
      color: "orange",
      transactions: [
        {
          id: "tx8",
          merchant: "Donation",
          merchantIcon: <File className="h-5 w-5" />,
          date: "Mar 03, 09:45",
          amount: 5000.00,
          type: "income" as const,
          category: "Donation"
        },
        {
          id: "tx9",
          merchant: "Community Event",
          merchantIcon: <CreditCard className="h-5 w-5" />,
          date: "Mar 01, 14:20",
          amount: 1250.75,
          type: "expense" as const,
          category: "Events"
        }
      ]
    },
    {
      id: "5",
      name: "BYBC Crypto",
      type: "Crypto",
      accountNumber: "1357924680",
      balance: 3450.50,
      color: "teal",
      transactions: [
        {
          id: "tx10",
          merchant: "BTC Purchase",
          merchantIcon: <ShoppingCart className="h-5 w-5" />,
          date: "Mar 04, 11:30",
          amount: 500.00,
          type: "expense" as const,
          category: "Crypto"
        },
        {
          id: "tx11",
          merchant: "ETH Sale",
          merchantIcon: <File className="h-5 w-5" />,
          date: "Mar 01, 15:45",
          amount: 750.25,
          type: "income" as const,
          category: "Crypto"
        }
      ]
    }
  ];

  // Extract account ID from URL if present
  const params = new URLSearchParams(location.search);
  const accountIdFromUrl = params.get('account');
  
  // State for selected account
  const [selectedAccountId, setSelectedAccountId] = useState(accounts[0].id);
  
  // Update selected account when URL changes
  useEffect(() => {
    if (accountIdFromUrl && accounts.some(account => account.id === accountIdFromUrl)) {
      setSelectedAccountId(accountIdFromUrl);
    }
  }, [accountIdFromUrl]);
  
  // Find selected account
  const selectedAccount = accounts.find(account => account.id === selectedAccountId) || accounts[0];

  // Handle account selection
  const handleAccountSelect = (account: any) => {
    setSelectedAccountId(account.id);
  };

  return (
    <div className="bg-gradient-to-br from-white to-slate-100 min-h-screen">
      <div className="container mx-auto max-w-md px-4 py-6">
        {/* Header */}
        <DashboardHeader />
        
        <div className="space-y-6">
          {/* Account Balance Section */}
          <AccountBalance 
            balance={selectedAccount.balance} 
            difference={150.75} 
          />
          
          {/* Quick Actions */}
          <QuickActions />
          
          {/* Transactions List - with scrollable container */}
          <div className="animate-fade-in" style={{animationDelay: "100ms"}}>
            <h2 className="text-lg font-semibold mb-3">Recent Transactions</h2>
            <div className="bg-white rounded-xl shadow-sm border p-1 max-h-[280px] overflow-y-auto">
              <TransactionsList transactions={selectedAccount.transactions} />
            </div>
          </div>
          
          {/* Accounts Section */}
          <div className="animate-fade-in" style={{animationDelay: "200ms"}}>
            <AccountsSection 
              accounts={accounts} 
              onAccountSelect={handleAccountSelect}
              selectedAccountId={selectedAccountId}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
