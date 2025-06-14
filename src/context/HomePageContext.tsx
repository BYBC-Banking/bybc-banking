
import { createContext, useState, useContext, useEffect, ReactNode } from "react";
import { useLocation } from "react-router-dom";

interface Account {
  id: string;
  name: string;
  type: string;
  accountNumber: string;
  balance: number;
  color: string;
  transactions: Transaction[];
}

interface Transaction {
  id: string;
  merchant: string;
  merchantIcon: React.ReactNode;
  date: string;
  amount: number;
  type: "income" | "expense";
  category: string;
}

type AccountSection = 'personal' | 'business';

interface HomePageContextType {
  accounts: Account[];
  filteredAccounts: Account[];
  selectedAccountId: string;
  setSelectedAccountId: (id: string) => void;
  selectedAccount: Account;
  accountSection: AccountSection;
  setAccountSection: (section: AccountSection) => void;
}

const HomePageContext = createContext<HomePageContextType | undefined>(undefined);

export const useHomePage = () => {
  const context = useContext(HomePageContext);
  if (!context) {
    throw new Error("useHomePage must be used within a HomePageProvider");
  }
  return context;
};

interface HomePageProviderProps {
  children: ReactNode;
  accounts: Account[];
}

export const HomePageProvider = ({ children, accounts }: HomePageProviderProps) => {
  const location = useLocation();
  
  // Extract account ID from URL if present
  const params = new URLSearchParams(location.search);
  const accountIdFromUrl = params.get('account');
  
  // Determine initial section based on account type
  const getAccountSection = (accountId: string): AccountSection => {
    const account = accounts.find(acc => acc.id === accountId);
    if (!account) return 'personal';
    
    // For Investment accounts, we need to check the current section context
    // Since they can appear in both sections, we'll use the current section state
    if (account.type === 'Investments') {
      return 'personal'; // Default to personal for initial load
    }
    
    const personalTypes = ['Spending'];
    const businessTypes = ['Business', 'Nonprofit'];
    
    if (personalTypes.includes(account.type)) return 'personal';
    if (businessTypes.includes(account.type)) return 'business';
    return 'personal';
  };
  
  // State for account section (P or B)
  const [accountSection, setAccountSection] = useState<AccountSection>(() => {
    if (accountIdFromUrl) {
      return getAccountSection(accountIdFromUrl);
    }
    return 'personal';
  });
  
  // Filter accounts based on selected section
  const filteredAccounts = accounts.filter(account => {
    if (accountSection === 'personal') {
      return ['Spending', 'Investments'].includes(account.type);
    } else {
      return ['Business', 'Nonprofit', 'Investments'].includes(account.type);
    }
  });
  
  // State for selected account - default to first filtered account
  const [selectedAccountId, setSelectedAccountId] = useState<string>(() => {
    // If account ID is in URL and exists in accounts list, use it
    if (accountIdFromUrl && accounts.some(account => account.id === accountIdFromUrl)) {
      return accountIdFromUrl;
    }
    // Otherwise use the first filtered account
    return filteredAccounts[0]?.id || accounts[0]?.id || "";
  });
  
  // Update selected account when URL changes
  useEffect(() => {
    if (accountIdFromUrl && accounts.some(account => account.id === accountIdFromUrl)) {
      setSelectedAccountId(accountIdFromUrl);
      setAccountSection(getAccountSection(accountIdFromUrl));
    }
  }, [accountIdFromUrl, accounts]);
  
  // Update selected account when section changes
  useEffect(() => {
    const currentAccount = accounts.find(acc => acc.id === selectedAccountId);
    if (currentAccount) {
      // For Investment accounts, they can stay selected in either section
      if (currentAccount.type === 'Investments') {
        return; // Don't change selection for Investment accounts
      }
      
      const currentAccountSection = getAccountSection(selectedAccountId);
      if (currentAccountSection !== accountSection) {
        // Switch to first account in the new section
        const firstAccountInSection = filteredAccounts[0];
        if (firstAccountInSection) {
          setSelectedAccountId(firstAccountInSection.id);
        }
      }
    } else {
      // If no current account, select first in section
      const firstAccountInSection = filteredAccounts[0];
      if (firstAccountInSection) {
        setSelectedAccountId(firstAccountInSection.id);
      }
    }
  }, [accountSection, filteredAccounts]);
  
  // Find selected account, with fallback to first account
  const selectedAccount = accounts.find(account => account.id === selectedAccountId) || accounts[0];
  
  return (
    <HomePageContext.Provider value={{ 
      accounts, 
      filteredAccounts,
      selectedAccountId, 
      setSelectedAccountId,
      selectedAccount,
      accountSection,
      setAccountSection
    }}>
      {children}
    </HomePageContext.Provider>
  );
};
