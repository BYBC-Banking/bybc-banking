
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface WalletProps {
  banks: Bank[];
}

interface Bank {
  name: string;
  icon: string;
  accountNumber: string;
  balance: number;
  color: string;
}

const WalletSection = ({ banks }: WalletProps) => {
  return (
    <div className="mb-6">
      <div className="flex justify-between items-center mb-3">
        <h2 className="text-lg font-semibold">Your Wallets</h2>
        <button className="text-finance-blue text-sm font-medium">View All</button>
      </div>
      
      <div className="overflow-x-auto pb-2">
        <div className="flex gap-3">
          {banks.map((bank) => (
            <WalletCard key={bank.accountNumber} bank={bank} />
          ))}
        </div>
      </div>
    </div>
  );
};

const WalletCard = ({ bank }: { bank: Bank }) => {
  return (
    <Card className={cn(
      "wallet-card bg-white shadow-md rounded-xl",
      bank.color === "blue" && "border-t-4 border-t-finance-blue",
      bank.color === "green" && "border-t-4 border-t-finance-green"
    )}>
      <CardContent className="p-4">
        <div className="flex items-center gap-2 mb-3">
          <div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center">
            {bank.icon}
          </div>
          <span className="font-medium text-sm">{bank.name}</span>
        </div>
        
        <div className="text-xs text-muted-foreground mb-1">
          •••• {bank.accountNumber.slice(-4)}
        </div>
        
        <div className="font-bold">
          R{bank.balance.toLocaleString()}
        </div>
      </CardContent>
    </Card>
  );
};

export default WalletSection;
