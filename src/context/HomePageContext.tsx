
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

interface HomePageContextType {
  accounts: Account[];
  selectedAccountId: string;
  setSelectedAccountId: (id: string) => void;
  selectedAccount: Account;
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
  
  // State for selected account
  const [selectedAccountId, setSelectedAccountId] = useState(accounts[0].id);
  
  // Update selected account when URL changes
  useEffect(() => {
    if (accountIdFromUrl && accounts.some(account => account.id === accountIdFromUrl)) {
      setSelectedAccountId(accountIdFromUrl);
    }
  }, [accountIdFromUrl, accounts]);
  
  // Find selected account
  const selectedAccount = accounts.find(account => account.id === selectedAccountId) || accounts[0];
  
  return (
    <HomePageContext.Provider value={{ 
      accounts, 
      selectedAccountId, 
      setSelectedAccountId,
      selectedAccount 
    }}>
      {children}
    </HomePageContext.Provider>
  );
};
