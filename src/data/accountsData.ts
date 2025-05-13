
import { CreditCard, File, ShoppingCart } from "lucide-react";
import React from "react";

export interface Transaction {
  id: string;
  merchant: string;
  merchantIcon: React.ReactNode;
  date: string;
  amount: number;
  type: "income" | "expense";
  category: string;
}

export interface Account {
  id: string;
  name: string;
  type: string;
  accountNumber: string;
  balance: number;
  color: string;
  transactions: Transaction[];
}

// Mock data for bybc-banking accounts
export const accounts: Account[] = [
  {
    id: "1",
    name: "BYBC Spending",
    type: "Spending",
    accountNumber: "1234567890",
    balance: 2450.75,
    color: "blue",
    transactions: [
      {
        id: "tx1",
        merchant: "Woolworths",
        merchantIcon: <ShoppingCart className="h-5 w-5" />,
        date: "Today, 14:30",
        amount: 45.75,
        type: "expense",
        category: "Groceries"
      },
      {
        id: "tx2",
        merchant: "Salary",
        merchantIcon: <File className="h-5 w-5" />,
        date: "Today, 08:15",
        amount: 3200.00,
        type: "income",
        category: "Salary"
      },
      {
        id: "tx3",
        merchant: "Takealot",
        merchantIcon: <ShoppingCart className="h-5 w-5" />,
        date: "Yesterday, 19:45",
        amount: 129.99,
        type: "expense",
        category: "Online Shopping"
      }
    ]
  },
  {
    id: "2",
    name: "BYBC Savings",
    type: "Savings",
    accountNumber: "0987654321",
    balance: 15750.00,
    color: "green",
    transactions: [
      {
        id: "tx4",
        merchant: "Interest",
        merchantIcon: <File className="h-5 w-5" />,
        date: "Mar 01, 00:01",
        amount: 125.45,
        type: "income",
        category: "Interest"
      },
      {
        id: "tx5",
        merchant: "Transfer to Spending",
        merchantIcon: <CreditCard className="h-5 w-5" />,
        date: "Feb 15, 10:22",
        amount: 500.00,
        type: "expense",
        category: "Transfer"
      }
    ]
  },
  {
    id: "3",
    name: "BYBC Business",
    type: "Business",
    accountNumber: "5678901234",
    balance: 42500.00,
    color: "purple",
    transactions: [
      {
        id: "tx6",
        merchant: "Client Payment",
        merchantIcon: <File className="h-5 w-5" />,
        date: "Yesterday, 16:05",
        amount: 12500.00,
        type: "income",
        category: "Sales"
      },
      {
        id: "tx7",
        merchant: "Office Supplies",
        merchantIcon: <ShoppingCart className="h-5 w-5" />,
        date: "Mar 02, 13:15",
        amount: 890.50,
        type: "expense",
        category: "Office"
      }
    ]
  },
  {
    id: "4",
    name: "BYBC Nonprofit",
    type: "Nonprofit",
    accountNumber: "9876543210",
    balance: 78950.25,
    color: "orange",
    transactions: [
      {
        id: "tx8",
        merchant: "Donation",
        merchantIcon: <File className="h-5 w-5" />,
        date: "Mar 03, 09:45",
        amount: 5000.00,
        type: "income",
        category: "Donation"
      },
      {
        id: "tx9",
        merchant: "Community Event",
        merchantIcon: <CreditCard className="h-5 w-5" />,
        date: "Mar 01, 14:20",
        amount: 1250.75,
        type: "expense",
        category: "Events"
      }
    ]
  },
  {
    id: "5",
    name: "BYBC Crypto",
    type: "Crypto",
    accountNumber: "1357924680",
    balance: 3450.50,
    color: "teal",
    transactions: [
      {
        id: "tx10",
        merchant: "BTC Purchase",
        merchantIcon: <ShoppingCart className="h-5 w-5" />,
        date: "Mar 04, 11:30",
        amount: 500.00,
        type: "expense",
        category: "Crypto"
      },
      {
        id: "tx11",
        merchant: "ETH Sale",
        merchantIcon: <File className="h-5 w-5" />,
        date: "Mar 01, 15:45",
        amount: 750.25,
        type: "income",
        category: "Crypto"
      }
    ]
  }
];
