import DashboardHeader from "@/components/DashboardHeader";
import AccountBalance from "@/components/AccountBalance";
import QuickActions from "@/components/QuickActions";
import TransactionSection from "@/components/home/TransactionSection";
import { useHomePage } from "@/context/HomePageContext";
import { useEffect } from "react";

const Index = () => {
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

  // Use professional background for business theme
  const backgroundClass = selectedAccountId === "3" 
    ? "bg-gray-50 min-h-screen [html[data-theme='business']_&]:bg-gray-50" 
    : "bg-gradient-to-br from-white to-slate-100 min-h-screen";

  return (
    <div className={backgroundClass}>
      {/* Mobile Layout */}
      <div className="block lg:hidden">
        <div className="container mx-auto max-w-md px-4 py-6">
          <DashboardHeader />
          
          <div className="space-y-6">
            <AccountBalanceFromContext />
            <DotNavigation />
            <QuickActions />
            <TransactionSection />
          </div>
        </div>
      </div>

      {/* Desktop Layout */}
      <div className="hidden lg:block">
        <div className="container mx-auto max-w-7xl px-6 py-8">
          <div className="grid grid-cols-12 gap-8">
            {/* Left Column - Account Balance & Navigation */}
            <div className="col-span-4 space-y-6">
              <DashboardHeader />
              <AccountBalanceFromContext />
              <DotNavigation />
            </div>
            
            {/* Center Column - Quick Actions */}
            <div className="col-span-4">
              <QuickActions />
            </div>
            
            {/* Right Column - Transactions */}
            <div className="col-span-4">
              <TransactionSection />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Component to get account balance from context
const AccountBalanceFromContext = () => {
  const { selectedAccount, filteredAccounts, selectedAccountId, setSelectedAccountId, accountSection } = useHomePage();
  
  const currentIndex = filteredAccounts.findIndex(acc => acc.id === selectedAccountId);
  
  const handlePreviousAccount = () => {
    if (currentIndex > 0) {
      setSelectedAccountId(filteredAccounts[currentIndex - 1].id);
    }
  };
  
  const handleNextAccount = () => {
    if (currentIndex < filteredAccounts.length - 1) {
      setSelectedAccountId(filteredAccounts[currentIndex + 1].id);
    }
  };
  
  return (
    <AccountBalance 
      balance={selectedAccount.balance} 
      difference={150.75}
      onPreviousAccount={handlePreviousAccount}
      onNextAccount={handleNextAccount}
      canNavigatePrevious={currentIndex > 0}
      canNavigateNext={currentIndex < filteredAccounts.length - 1}
      accountType={selectedAccount.type}
      accountName={selectedAccount.name}
      accountSection={accountSection}
    />
  );
};

// Dot Navigation Component with morphing pagination indicators
const DotNavigation = () => {
  const { filteredAccounts, selectedAccountId, setSelectedAccountId, accountSection } = useHomePage();

  // Helper function to get the appropriate background color for each account
  const getAccountDotColor = (account: any, isSelected: boolean) => {
    // If BYBC Investments (Investments type) in business section, dot is teal
    if (
      isSelected &&
      account.type === "Investments" &&
      accountSection === "business"
    ) {
      return "bg-teal-600 w-6 border-2 border-teal-700 transform scale-125";
    }

    if (!isSelected) {
      return 'bg-gray-300 hover:bg-gray-400 [html[data-theme="business"]_&]:bg-gray-400 [html[data-theme="business"]_&]:hover:bg-gray-500 transform scale-100';
    }

    switch (account.color) {
      case 'blue':
        return 'bg-finance-blue [html[data-theme="business"]_&]:bg-business-primary w-6 transform scale-125';
      case 'green':
        return 'bg-finance-green [html[data-theme="business"]_&]:bg-business-primary w-6 transform scale-125';
      case 'purple':
        return 'bg-[#7E69AB] [html[data-theme="business"]_&]:bg-business-primary w-6 transform scale-125';
      case 'orange':
        return 'bg-orange-500 [html[data-theme="business"]_&]:bg-business-primary w-6 transform scale-125';
      case 'teal':
        return 'bg-teal-600 [html[data-theme="business"]_&]:bg-business-primary w-6 transform scale-125';
      default:
        return 'bg-teal-500 [html[data-theme="business"]_&]:bg-business-primary w-6 transform scale-125';
    }
  };

  return (
    <div className="flex justify-center space-x-2 animate-fade-in" style={{animationDelay: "100ms"}}>
      {filteredAccounts.map((account) => (
        <button
          key={account.id}
          onClick={() => setSelectedAccountId(account.id)}
          className={`h-2 rounded-full transition-all duration-300 ease-in-out ${
            selectedAccountId === account.id 
              ? getAccountDotColor(account, true)
              : getAccountDotColor(account, false)
          } ${selectedAccountId === account.id ? '' : 'w-2'}`}
        />
      ))}
    </div>
  );
};

export default Index;
