import { HomePageProvider } from "@/context/HomePageContext";
import { accounts } from "@/data/accountsData";
import DashboardHeader from "@/components/DashboardHeader";
import AccountBalance from "@/components/AccountBalance";
import QuickActions from "@/components/QuickActions";
import TransactionSection from "@/components/home/TransactionSection";
import { useHomePage } from "@/context/HomePageContext";
import { useEffect } from "react";

const Index = () => {
  return (
    <HomePageProvider accounts={accounts}>
      <DashboardContent />
    </HomePageProvider>
  );
};

const DashboardContent = () => {
  const { selectedAccountId } = useHomePage();
  
  // Apply business theme when business account is selected
  useEffect(() => {
    const root = document.documentElement;
    if (selectedAccountId === "3") {
      root.setAttribute('data-theme', 'business');
    } else {
      root.removeAttribute('data-theme');
    }
  }, [selectedAccountId]);

  // Use different background based on selected account
  const backgroundClass = selectedAccountId === "3" 
    ? "bg-background min-h-screen" 
    : "bg-gradient-to-br from-white to-slate-100 min-h-screen";

  return (
    <div className={backgroundClass}>
      <div className="container mx-auto max-w-md px-4 py-6">
        {/* Header */}
        <DashboardHeader />
        
        <div className="space-y-6">
          {/* Account Balance Section - Now using context */}
          <AccountBalanceFromContext />
          
          {/* Dot Navigation */}
          <DotNavigation />
          
          {/* Quick Actions */}
          <QuickActions />
          
          {/* Transactions List */}
          <TransactionSection />
        </div>
      </div>
    </div>
  );
};

// Component to get account balance from context
const AccountBalanceFromContext = () => {
  const { selectedAccount, accounts, selectedAccountId, setSelectedAccountId } = useHomePage();
  
  const currentIndex = accounts.findIndex(acc => acc.id === selectedAccountId);
  
  const handlePreviousAccount = () => {
    if (currentIndex > 0) {
      setSelectedAccountId(accounts[currentIndex - 1].id);
    }
  };
  
  const handleNextAccount = () => {
    if (currentIndex < accounts.length - 1) {
      setSelectedAccountId(accounts[currentIndex + 1].id);
    }
  };
  
  return (
    <AccountBalance 
      balance={selectedAccount.balance} 
      difference={150.75}
      onPreviousAccount={handlePreviousAccount}
      onNextAccount={handleNextAccount}
      canNavigatePrevious={currentIndex > 0}
      canNavigateNext={currentIndex < accounts.length - 1}
      accountType={selectedAccount.type}
      accountName={selectedAccount.name}
    />
  );
};

// Dot Navigation Component with dynamic colors
const DotNavigation = () => {
  const { accounts, selectedAccountId, setSelectedAccountId, selectedAccount } = useHomePage();
  
  // Helper function to get the appropriate background color for each account
  const getAccountDotColor = (account: any, isSelected: boolean) => {
    if (!isSelected) {
      return 'bg-gray-300 hover:bg-gray-400';
    }
    
    switch (account.color) {
      case 'blue':
        return 'bg-finance-blue';
      case 'green':
        return 'bg-finance-green';
      case 'purple':
        return 'bg-[#7E69AB]';
      case 'orange':
        return 'bg-orange-500';
      case 'teal':
        return 'bg-teal-600';
      default:
        return 'bg-teal-500';
    }
  };
  
  return (
    <div className="flex justify-center space-x-2 animate-fade-in" style={{animationDelay: "100ms"}}>
      {accounts.map((account) => (
        <button
          key={account.id}
          onClick={() => setSelectedAccountId(account.id)}
          className={`w-2 h-2 rounded-full transition-all duration-200 ${
            selectedAccountId === account.id 
              ? `${getAccountDotColor(account, true)} w-6` 
              : getAccountDotColor(account, false)
          }`}
        />
      ))}
    </div>
  );
};

export default Index;
