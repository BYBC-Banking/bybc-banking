
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";

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
        <Link to="/accounts" className="text-finance-blue text-sm font-medium">View All</Link>
      </div>
      
      <ScrollArea className="w-full whitespace-nowrap pb-4">
        <div className="flex gap-3 pb-2 px-0.5">
          {banks.map((bank) => (
            <WalletCard key={bank.accountNumber} bank={bank} />
          ))}
        </div>
      </ScrollArea>
    </div>
  );
};

const WalletCard = ({ bank }: { bank: Bank }) => {
  return (
    <div 
      className={cn(
        "wallet-card min-w-[220px] h-[130px] rounded-xl shadow-sm p-4 cursor-pointer hover:scale-[1.02] transition-transform",
        bank.color === "blue" && "bg-gradient-to-br from-finance-blue to-finance-blue-light text-white",
        bank.color === "green" && "bg-gradient-to-br from-finance-green to-finance-green-light text-white"
      )}
    >
      <div className="flex items-center justify-between mb-2">
        <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center font-bold">
          {bank.icon}
        </div>
        <span className="text-white/90 text-sm">{bank.name}</span>
      </div>
      
      <div className="mt-4">
        <div className="text-xs opacity-80 mb-1">
          •••• {bank.accountNumber.slice(-4)}
        </div>
        
        <div className="font-bold text-xl">
          R{bank.balance.toLocaleString()}
        </div>
      </div>
    </div>
  );
};

export default WalletSection;
