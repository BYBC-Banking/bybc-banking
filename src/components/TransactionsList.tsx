
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface Transaction {
  id: string;
  merchant: string;
  merchantIcon: React.ReactNode; // Changed from string to React.ReactNode
  date: string;
  amount: number;
  type: 'income' | 'expense';
  category: string;
}

interface TransactionsListProps {
  transactions: Transaction[];
}

const TransactionsList = ({ transactions }: TransactionsListProps) => {
  return (
    <div className="mb-4">
      <div className="flex justify-between items-center mb-3">
        <h2 className="text-lg font-semibold">Recent Transactions</h2>
        <button className="text-finance-blue text-sm font-medium">See All</button>
      </div>
      
      <Card className="border shadow-sm">
        <CardHeader className="px-4 py-3">
          <CardTitle className="text-base">Transaction History</CardTitle>
          <CardDescription>Your recent financial activity</CardDescription>
        </CardHeader>
        <CardContent className="px-0 py-1">
          {transactions.map((transaction) => (
            <TransactionItem key={transaction.id} transaction={transaction} />
          ))}
        </CardContent>
      </Card>
    </div>
  );
};

const TransactionItem = ({ transaction }: { transaction: Transaction }) => {
  return (
    <div className="flex items-center justify-between py-3 px-4 border-b last:border-0 hover:bg-muted/30 transition-colors">
      <div className="flex items-center">
        <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center mr-3">
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
};

export default TransactionsList;
