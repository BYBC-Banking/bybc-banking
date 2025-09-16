import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { useAccounts, type Account as DatabaseAccount } from "@/hooks/useAccounts";
import { useTransactions, type Transaction as DatabaseTransaction } from "@/hooks/useTransactions";
import { File, ShoppingCart, CreditCard } from "lucide-react";

// Transform database account to HomePageContext format
interface Transaction {
  id: string;
  merchant: string;
  merchantIcon: React.ReactNode;
  date: string;
  amount: number;
  type: "income" | "expense";
  category: string;
}

interface Account {
  id: string;
  name: string;
  type: string;
  accountNumber: string;
  balance: number;
  color: string;
  transactions: Transaction[];
}

export type AccountSection = 'personal' | 'business';

export interface HomePageContextType {
  accounts: Account[];
  filteredAccounts: Account[];
  selectedAccountId: string;
  setSelectedAccountId: (id: string) => void;
  selectedAccount: Account;
  accountSection: AccountSection;
  setAccountSection: (section: AccountSection) => void;
  loading: boolean;
  error: string | null;
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
}

// Helper function to get merchant icon
const getMerchantIcon = (category?: string) => {
  switch (category?.toLowerCase()) {
    case 'groceries':
    case 'shopping':
    case 'e-commerce':
      return <ShoppingCart className="h-5 w-5" />;
    case 'salary':
    case 'income':
    case 'transfer':
      return <File className="h-5 w-5" />;
    default:
      return <CreditCard className="h-5 w-5" />;
  }
};

// Helper function to format date
const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  const now = new Date();
  const diffTime = Math.abs(now.getTime() - date.getTime());
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
  
  if (diffDays === 0) {
    return `Today, ${date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}`;
  } else if (diffDays === 1) {
    return `Yesterday, ${date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}`;
  } else {
    return date.toLocaleDateString('en-US', { month: 'short', day: '2-digit' });
  }
};

// Helper function to get account color
const getAccountColor = (type: string, index: number) => {
  const colors = ['blue', 'green', 'purple', 'orange', 'teal'];
  if (type.toLowerCase().includes('business')) return 'purple';
  if (type.toLowerCase().includes('investment')) return 'teal';
  return colors[index % colors.length];
};

export const RealHomePageProvider = ({ children }: HomePageProviderProps) => {
  const [selectedAccountId, setSelectedAccountId] = useState<string>("");
  const [accountSection, setAccountSection] = useState<AccountSection>('personal');
  
  const { accounts: dbAccounts, loading: accountsLoading, error: accountsError } = useAccounts();
  const { transactions: dbTransactions, loading: transactionsLoading } = useTransactions();

  // Transform database accounts to HomePageContext format
  const accounts: Account[] = dbAccounts.map((dbAccount, index) => {
    const accountTransactions = dbTransactions
      .filter(transaction => transaction.account_id === dbAccount.id)
      .map((dbTransaction): Transaction => ({
        id: dbTransaction.id,
        merchant: dbTransaction.merchant || dbTransaction.description,
        merchantIcon: getMerchantIcon(dbTransaction.category),
        date: formatDate(dbTransaction.created_at),
        amount: parseFloat(dbTransaction.amount.toString()),
        type: dbTransaction.type === 'income' || dbTransaction.type === 'transfer_in' ? 'income' : 'expense',
        category: dbTransaction.category || 'Other'
      }))
      .slice(0, 10); // Limit to recent transactions

    return {
      id: dbAccount.id,
      name: dbAccount.name,
      type: dbAccount.type === 'business' ? 'Business' : dbAccount.type === 'investment' ? 'Investments' : 'Spending',
      accountNumber: dbAccount.account_number,
      balance: parseFloat(dbAccount.balance.toString()),
      color: getAccountColor(dbAccount.type, index),
      transactions: accountTransactions
    };
  });

  // Filter accounts by section
  const filteredAccounts = accounts.filter(account => {
    if (accountSection === 'personal') {
      return account.type === 'Spending' || account.type === 'Investments';
    } else {
      return account.type === 'Business';
    }
  });

  // Set default selected account
  useEffect(() => {
    if (filteredAccounts.length > 0 && !selectedAccountId) {
      setSelectedAccountId(filteredAccounts[0].id);
    }
  }, [filteredAccounts, selectedAccountId]);

  // Update selected account if it's not in filtered accounts
  useEffect(() => {
    if (selectedAccountId && !filteredAccounts.find(acc => acc.id === selectedAccountId)) {
      if (filteredAccounts.length > 0) {
        setSelectedAccountId(filteredAccounts[0].id);
      }
    }
  }, [accountSection, filteredAccounts, selectedAccountId]);

  const selectedAccount = filteredAccounts.find(acc => acc.id === selectedAccountId) || filteredAccounts[0] || {
    id: '',
    name: 'No Account',
    type: 'Spending',
    accountNumber: '0000000000',
    balance: 0,
    color: 'blue',
    transactions: []
  };

  const loading = accountsLoading || transactionsLoading;
  const error = accountsError;

  return (
    <HomePageContext.Provider 
      value={{
        accounts,
        filteredAccounts,
        selectedAccountId,
        setSelectedAccountId,
        selectedAccount,
        accountSection,
        setAccountSection,
        loading,
        error
      }}
    >
      {children}
    </HomePageContext.Provider>
  );
};