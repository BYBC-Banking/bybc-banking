
import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";

interface Transaction {
  id: string;
  merchant: string;
  merchantIcon: React.ReactNode;
  date: string;
  amount: number;
  type: 'income' | 'expense';
  category: string;
}

interface TransactionsListProps {
  transactions: Transaction[];
  redirectToTransactionsPage?: boolean;
}

const TransactionsList = ({ transactions, redirectToTransactionsPage = true }: TransactionsListProps) => {
  return (
    <div className="divide-y divide-gray-100">
      {transactions.map((transaction) => (
        <TransactionItem 
          key={transaction.id} 
          transaction={transaction} 
          redirectToTransactionsPage={redirectToTransactionsPage}
        />
      ))}
    </div>
  );
};

const TransactionItem = ({ 
  transaction, 
  redirectToTransactionsPage 
}: { 
  transaction: Transaction;
  redirectToTransactionsPage: boolean;
}) => {
  const content = (
    <div className="flex items-center justify-between py-3 px-4 hover:bg-muted/30 transition-colors">
      <div className="flex items-center">
        <div className="w-10 h-10 min-w-[40px] rounded-full bg-muted flex items-center justify-center mr-3">
          {transaction.merchantIcon}
        </div>
        <div>
          <div className="font-medium">{transaction.merchant}</div>
          <div className="text-xs text-muted-foreground">{transaction.date} • {transaction.category}</div>
        </div>
      </div>
      
      <div className={cn(
        "font-semibold",
        transaction.type === 'income' ? "text-finance-income" : "text-finance-expense"
      )}>
        {transaction.type === 'income' ? '+' : '-'} R{Math.abs(transaction.amount).toLocaleString()}
      </div>
    </div>
  );

  return redirectToTransactionsPage ? (
    <Link to="/transactions" className="block">
      {content}
    </Link>
  ) : (
    content
  );
};

export default TransactionsList;
