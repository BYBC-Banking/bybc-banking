
import React from "react";
import { CreditCard, File, ShoppingCart } from "lucide-react";

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

// Create merchant icons as functions to avoid JSX syntax issues in data file
const createShoppingCartIcon = () => <ShoppingCart className="h-5 w-5" />;
const createFileIcon = () => <File className="h-5 w-5" />;
const createCreditCardIcon = () => <CreditCard className="h-5 w-5" />;

// Mock data for bybc-banking accounts with updated names and new accounts
export const accounts: Account[] = [
  {
    id: "1",
    name: "Basic",
    type: "Spending",
    accountNumber: "1234567890",
    balance: 2450.75,
    color: "blue",
    transactions: [
      {
        id: "tx1",
        merchant: "Woolworths",
        merchantIcon: createShoppingCartIcon(),
        date: "Today, 14:30",
        amount: 45.75,
        type: "expense",
        category: "Groceries"
      },
      {
        id: "tx2",
        merchant: "Salary",
        merchantIcon: createFileIcon(),
        date: "Today, 08:15",
        amount: 3200.00,
        type: "income",
        category: "Salary"
      },
      {
        id: "tx3",
        merchant: "Takealot",
        merchantIcon: createShoppingCartIcon(),
        date: "Yesterday, 19:45",
        amount: 129.99,
        type: "expense",
        category: "Online Shopping"
      }
    ]
  },
  {
    id: "2",
    name: "Student",
    type: "Spending",
    accountNumber: "2345678901",
    balance: 850.25,
    color: "green",
    transactions: [
      {
        id: "tx12",
        merchant: "University Fee",
        merchantIcon: createFileIcon(),
        date: "Mar 01, 10:00",
        amount: 2500.00,
        type: "expense",
        category: "Education"
      }
    ]
  },
  {
    id: "6",
    name: "Senior Citizen",
    type: "Spending",
    accountNumber: "6789012345",
    balance: 3200.50,
    color: "purple",
    transactions: [
      {
        id: "tx13",
        merchant: "Pension",
        merchantIcon: createFileIcon(),
        date: "Mar 01, 09:00",
        amount: 1800.00,
        type: "income",
        category: "Pension"
      }
    ]
  },
  {
    id: "7",
    name: "Lifestyle",
    type: "Spending",
    accountNumber: "7890123456",
    balance: 5500.75,
    color: "orange",
    transactions: [
      {
        id: "tx14",
        merchant: "Gym Membership",
        merchantIcon: createCreditCardIcon(),
        date: "Mar 02, 14:30",
        amount: 450.00,
        type: "expense",
        category: "Fitness"
      }
    ]
  },
  {
    id: "8",
    name: "Joint",
    type: "Spending",
    accountNumber: "8901234567",
    balance: 12500.00,
    color: "teal",
    transactions: [
      {
        id: "tx15",
        merchant: "Household Expenses",
        merchantIcon: createShoppingCartIcon(),
        date: "Mar 03, 16:20",
        amount: 850.75,
        type: "expense",
        category: "Household"
      }
    ]
  },
  {
    id: "3",
    name: "S&M Business",
    type: "Business",
    accountNumber: "5678901234",
    balance: 42500.00,
    color: "purple",
    transactions: [
      {
        id: "tx6",
        merchant: "Client Payment",
        merchantIcon: createFileIcon(),
        date: "Yesterday, 16:05",
        amount: 12500.00,
        type: "income",
        category: "Sales"
      },
      {
        id: "tx7",
        merchant: "Office Supplies",
        merchantIcon: createShoppingCartIcon(),
        date: "Mar 02, 13:15",
        amount: 890.50,
        type: "expense",
        category: "Office"
      }
    ]
  },
  {
    id: "9",
    name: "Sole Proprietor",
    type: "Business",
    accountNumber: "9012345678",
    balance: 15600.25,
    color: "blue",
    transactions: [
      {
        id: "tx16",
        merchant: "Service Payment",
        merchantIcon: createFileIcon(),
        date: "Mar 01, 11:30",
        amount: 2800.00,
        type: "income",
        category: "Services"
      }
    ]
  },
  {
    id: "10",
    name: "Agricultural and Rural",
    type: "Business",
    accountNumber: "0123456789",
    balance: 28750.00,
    color: "green",
    transactions: [
      {
        id: "tx17",
        merchant: "Crop Sale",
        merchantIcon: createFileIcon(),
        date: "Mar 02, 08:45",
        amount: 5200.00,
        type: "income",
        category: "Agriculture"
      }
    ]
  },
  {
    id: "11",
    name: "E-commerce and Online",
    type: "Business",
    accountNumber: "1234509876",
    balance: 18900.50,
    color: "orange",
    transactions: [
      {
        id: "tx18",
        merchant: "Online Sales",
        merchantIcon: createShoppingCartIcon(),
        date: "Mar 03, 12:15",
        amount: 1850.25,
        type: "income",
        category: "E-commerce"
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
        merchantIcon: createFileIcon(),
        date: "Mar 03, 09:45",
        amount: 5000.00,
        type: "income",
        category: "Donation"
      },
      {
        id: "tx9",
        merchant: "Community Event",
        merchantIcon: createCreditCardIcon(),
        date: "Mar 01, 14:20",
        amount: 1250.75,
        type: "expense",
        category: "Events"
      }
    ]
  },
  {
    id: "5",
    name: "BYBC Investments",
    type: "Investments",
    accountNumber: "1357924680",
    balance: 3450.50,
    color: "teal",
    transactions: [
      {
        id: "tx10",
        merchant: "BTC Purchase",
        merchantIcon: createShoppingCartIcon(),
        date: "Mar 04, 11:30",
        amount: 500.00,
        type: "expense",
        category: "Crypto"
      },
      {
        id: "tx11",
        merchant: "ETH Sale",
        merchantIcon: createFileIcon(),
        date: "Mar 01, 15:45",
        amount: 750.25,
        type: "income",
        category: "Crypto"
      }
    ]
  }
];
