
import { useState } from "react";
import { ArrowLeft } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import TransactionsList from "@/components/TransactionsList";
import { File, ShoppingCart, CreditCard } from "lucide-react";

const Transactions = () => {
  // Sample transaction data (similar structure to what's in Index.tsx)
  const allTransactions = [
    {
      id: "tx1",
      merchant: "Woolworths",
      merchantIcon: <ShoppingCart className="h-5 w-5" />,
      date: "Today, 14:30",
      amount: 45.75,
      type: "expense" as const,
      category: "Groceries"
    },
    {
      id: "tx2",
      merchant: "Salary",
      merchantIcon: <File className="h-5 w-5" />,
      date: "Today, 08:15",
      amount: 3200.00,
      type: "income" as const,
      category: "Salary"
    },
    {
      id: "tx3",
      merchant: "Takealot",
      merchantIcon: <ShoppingCart className="h-5 w-5" />,
      date: "Yesterday, 19:45",
      amount: 129.99,
      type: "expense" as const,
      category: "Online Shopping"
    },
    {
      id: "tx4",
      merchant: "Interest",
      merchantIcon: <File className="h-5 w-5" />,
      date: "Mar 01, 00:01",
      amount: 125.45,
      type: "income" as const,
      category: "Interest"
    },
    {
      id: "tx5",
      merchant: "Transfer to Spending",
      merchantIcon: <CreditCard className="h-5 w-5" />,
      date: "Feb 15, 10:22",
      amount: 500.00,
      type: "expense" as const,
      category: "Transfer"
    },
    {
      id: "tx6",
      merchant: "Client Payment",
      merchantIcon: <File className="h-5 w-5" />,
      date: "Yesterday, 16:05",
      amount: 12500.00,
      type: "income" as const,
      category: "Sales"
    },
    {
      id: "tx7",
      merchant: "Office Supplies",
      merchantIcon: <ShoppingCart className="h-5 w-5" />,
      date: "Mar 02, 13:15",
      amount: 890.50,
      type: "expense" as const,
      category: "Office"
    }
  ];

  return (
    <div className="bg-gradient-to-br from-white to-slate-100 min-h-screen">
      <div className="container mx-auto max-w-md px-4 py-6">
        {/* Header */}
        <header className="flex items-center gap-4 mb-6">
          <Link to="/" className="p-2">
            <ArrowLeft className="h-5 w-5" />
          </Link>
          <h1 className="text-2xl font-bold">Transactions</h1>
        </header>
        
        {/* Transactions List */}
        <div className="bg-white rounded-xl shadow-sm border p-1 mb-6">
          <TransactionsList transactions={allTransactions} redirectToTransactionsPage={false} />
        </div>
      </div>
    </div>
  );
};

export default Transactions;
