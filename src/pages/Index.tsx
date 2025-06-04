
import { HomePageProvider } from "@/context/HomePageContext";
import { accounts } from "@/data/accountsData";
import DashboardHeader from "@/components/DashboardHeader";
import AccountBalance from "@/components/AccountBalance";
import QuickActions from "@/components/QuickActions";
import TransactionSection from "@/components/home/TransactionSection";
import AccountsSection from "@/components/AccountsSection";
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
            
            {/* Dot Navigation */}
            <DotNavigation />
            
            {/* Accounts Section - Moved above Quick Actions */}
            <AccountsSectionWithContext />
            
            {/* Quick Actions */}
            <QuickActions />
            
            {/* Transactions List */}
            <TransactionSection />
          </div>
        </div>
      </div>
    </HomePageProvider>
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

// Dot Navigation Component
const DotNavigation = () => {
  const { accounts, selectedAccountId, setSelectedAccountId } = useHomePage();
  
  return (
    <div className="flex justify-center space-x-2 animate-fade-in" style={{animationDelay: "100ms"}}>
      {accounts.map((account) => (
        <button
          key={account.id}
          onClick={() => setSelectedAccountId(account.id)}
          className={`w-2 h-2 rounded-full transition-all duration-200 ${
            selectedAccountId === account.id 
              ? 'bg-teal-500 w-6' 
              : 'bg-gray-300 hover:bg-gray-400'
          }`}
        />
      ))}
    </div>
  );
};

// Component to handle accounts section with context
const AccountsSectionWithContext = () => {
  const { accounts, selectedAccountId, setSelectedAccountId } = useHomePage();
  
  // Filter out the BYBC Savings account
  const filteredAccounts = accounts.filter(account => account.id !== "2");
  
  const handleAccountSelect = (account: any) => {
    setSelectedAccountId(account.id);
  };
  
  return (
    <div className="animate-fade-in" style={{animationDelay: "150ms"}}>
      <AccountsSection 
        accounts={filteredAccounts} 
        onAccountSelect={handleAccountSelect}
        selectedAccountId={selectedAccountId}
      />
    </div>
  );
};

export default Index;
