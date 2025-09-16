
import React from 'react';
import { useNavigate } from "react-router-dom";
import { Loader2 } from "lucide-react";

interface Transaction {
  id: string;
  merchant: string;
  merchantIcon: React.ReactNode;
  date: string;
  amount: number;
  type: 'income' | 'expense';
  category: string;
}

interface Props {
  transactions: Transaction[];
  redirectToTransactionsPage?: boolean;
  loading?: boolean;
}

const TransactionsList = ({ transactions, redirectToTransactionsPage = true, loading = false }: Props) => {
  const navigate = useNavigate();
  
  const handleTransactionClick = () => {
    if (redirectToTransactionsPage) {
      navigate('/transactions');
    }
  };
  
  if (loading) {
    return (
      <div className="flex items-center justify-center py-8">
        <Loader2 className="h-6 w-6 animate-spin" />
        <span className="ml-2">Loading transactions...</span>
      </div>
    );
  }

  return (
    <div className="divide-y divide-gray-100">
      {transactions.map((transaction) => (
        <div 
          key={transaction.id} 
          className="flex items-center justify-between py-3 px-3 cursor-pointer hover:bg-slate-50 rounded-lg transition-colors"
          onClick={handleTransactionClick}
        >
          <div className="flex items-center">
            <div className="bg-slate-100 rounded-full p-2 mr-3">
              {transaction.merchantIcon}
            </div>
            <div>
              <div className="font-medium">{transaction.merchant}</div>
              <div className="text-xs text-muted-foreground">{transaction.date}</div>
            </div>
          </div>
          <div className={`text-right font-medium ${
            transaction.type === 'income' ? 'text-finance-green' : 'text-finance-expense'
          }`}>
            {transaction.type === 'income' ? '+' : '-'}R{transaction.amount.toFixed(2)}
          </div>
        </div>
      ))}
      
      {transactions.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          No transactions yet
        </div>  
      )}
    </div>
  );
};

export default TransactionsList;
