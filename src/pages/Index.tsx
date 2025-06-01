
import { HomePageProvider } from "@/context/HomePageContext";
import { accounts } from "@/data/accountsData";
import DashboardHeader from "@/components/DashboardHeader";
import AccountBalance from "@/components/AccountBalance";
import QuickActions from "@/components/QuickActions";
import TransactionSection from "@/components/home/TransactionSection";
import AccountsSection from "@/components/AccountsSection";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { PlusCircle } from "lucide-react";
import { useHomePage } from "@/context/HomePageContext";

const Index = () => {
  return (
    <HomePageProvider accounts={accounts}>
      <div className="bg-gradient-to-br from-white to-slate-100 min-h-screen">
        <div className="container mx-auto max-w-md px-4 py-6">
          {/* Header */}
          <DashboardHeader />
          
          <div className="space-y-6">
            {/* Account Balance Section - Now using context */}
            <AccountBalanceFromContext />
            
            {/* Accounts Section - Moved above Quick Actions */}
            <AccountsSectionWithContext />
            
            {/* Quick Actions */}
            <QuickActions />
            
            {/* Transactions List */}
            <TransactionSection />
            
            {/* Create Account Button */}
            <div className="flex justify-center mt-8 animate-fade-in" style={{animationDelay: "300ms"}}>
              <Link to="/create-account">
                <Button className="flex items-center gap-2">
                  <PlusCircle className="h-5 w-5" />
                  Create New Account
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </HomePageProvider>
  );
};

// Component to get account balance from context
const AccountBalanceFromContext = () => {
  const { selectedAccount } = useHomePage();
  
  return (
    <AccountBalance 
      balance={selectedAccount.balance} 
      difference={150.75} 
    />
  );
};

// Component to handle accounts section with context
const AccountsSectionWithContext = () => {
  const { accounts, selectedAccountId, setSelectedAccountId } = useHomePage();
  
  const handleAccountSelect = (account: any) => {
    setSelectedAccountId(account.id);
  };
  
  return (
    <div className="animate-fade-in" style={{animationDelay: "150ms"}}>
      <AccountsSection 
        accounts={accounts} 
        onAccountSelect={handleAccountSelect}
        selectedAccountId={selectedAccountId}
      />
    </div>
  );
};

export default Index;
