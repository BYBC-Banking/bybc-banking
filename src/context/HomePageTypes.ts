
import { ReactNode } from "react";

export interface Account {
  id: string;
  name: string;
  type: string;
  accountNumber: string;
  balance: number;
  color: string;
  transactions: Transaction[];
}

export interface Transaction {
  id: string;
  merchant: string;
  merchantIcon: React.ReactNode;
  date: string;
  amount: number;
  type: "income" | "expense";
  category: string;
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
}
