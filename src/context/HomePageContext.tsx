
import { createContext, useState, useContext, useEffect, ReactNode } from "react";
import { useLocation, useNavigate } from "react-router-dom";

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
  isBusinessSection: boolean;
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
  const navigate = useNavigate();
  
  // Extract account ID from URL if present
  const params = new URLSearchParams(location.search);
  const accountIdFromUrl = params.get('account');
  
  // Determine section from current route
  const getSectionFromRoute = (): AccountSection => {
    if (location.pathname.includes('-business')) return 'business';
    if (location.pathname.includes('-personal')) return 'personal';
    return 'personal'; // default
  };
  
  // Determine initial section based on account type
  const getAccountSection = (accountId: string): AccountSection => {
    const account = accounts.find(acc => acc.id === accountId);
    if (!account) return 'personal';
    
    // For Investment accounts, we need to check the current section context
    // Since they can appear in both sections, we'll use the current section state
    if (account.type === 'Investments') {
      return getSectionFromRoute();
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
    return getSectionFromRoute();
  });
  
  // Derived state for business section check
  const isBusinessSection = accountSection === 'business';
  
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
      const newSection = getAccountSection(accountIdFromUrl);
      // Only update section if not in business section to prevent interruption
      if (!isBusinessSection || newSection === 'business') {
        setAccountSection(newSection);
      }
    }
  }, [accountIdFromUrl, accounts, isBusinessSection]);
  
  // Update section when route changes - but protect business section users
  useEffect(() => {
    const newSection = getSectionFromRoute();
    // Only update section if:
    // 1. Not currently in business section, OR
    // 2. The new section is also business (moving within business section)
    if (!isBusinessSection || newSection === 'business') {
      if (newSection !== accountSection) {
        setAccountSection(newSection);
      }
    }
  }, [location.pathname, accountSection, isBusinessSection]);
  
  // Update selected account when section changes - but protect business section users
  useEffect(() => {
    const currentAccount = accounts.find(acc => acc.id === selectedAccountId);
    if (currentAccount) {
      // For Investment accounts, they can stay selected in either section
      if (currentAccount.type === 'Investments') {
        return; // Don't change selection for Investment accounts
      }
      
      const currentAccountSection = getAccountSection(selectedAccountId);
      // Only switch accounts if not in business section or if the account doesn't belong to current section
      if (!isBusinessSection && currentAccountSection !== accountSection) {
        // Switch to first account in the new section
        const firstAccountInSection = filteredAccounts[0];
        if (firstAccountInSection) {
          setSelectedAccountId(firstAccountInSection.id);
        }
      }
    } else if (!isBusinessSection) {
      // If no current account and not in business section, select first in section
      const firstAccountInSection = filteredAccounts[0];
      if (firstAccountInSection) {
        setSelectedAccountId(firstAccountInSection.id);
      }
    }
  }, [accountSection, filteredAccounts, isBusinessSection]);
  
  // Custom setAccountSection that also handles route updates - with business section protection
  const handleSetAccountSection = (section: AccountSection) => {
    // If user is in business section and trying to switch to personal, ask for confirmation
    if (isBusinessSection && section === 'personal') {
      console.log('User is in business section - preventing automatic switch to personal');
      return;
    }
    
    const currentPath = location.pathname;
    
    // Update routes that need section-specific paths
    if (currentPath.includes('/accounts-')) {
      navigate(`/accounts-${section}`);
    } else if (currentPath.includes('/investments-')) {
      navigate(`/investments-${section}`);
    } else if (currentPath.includes('/education-')) {
      navigate(`/education-${section}`);
    }
    
    setAccountSection(section);
  };
  
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
      setAccountSection: handleSetAccountSection,
      isBusinessSection
    }}>
      {children}
    </HomePageContext.Provider>
  );
};
