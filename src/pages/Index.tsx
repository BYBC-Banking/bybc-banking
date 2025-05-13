
import { useState } from "react";
import { accounts } from "@/data/accountsData";
import { HomePageProvider } from "@/context/HomePageContext";
import DashboardHeader from "@/components/DashboardHeader";
import AccountBalance from "@/components/AccountBalance";
import QuickActions from "@/components/QuickActions";
import TransactionSection from "@/components/home/TransactionSection";
import AccountsSection from "@/components/AccountsSection";

const Index = () => {
  // State for selected account
  const [selectedAccountId, setSelectedAccountId] = useState(accounts[0].id);
  
  // Find selected account
  const selectedAccount = accounts.find(account => account.id === selectedAccountId) || accounts[0];

  // Handle account selection
  const handleAccountSelect = (account: any) => {
    setSelectedAccountId(account.id);
  };

  return (
    <HomePageProvider accounts={accounts}>
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
            <TransactionSection />
            
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
    </HomePageProvider>
  );
};

export default Index;
