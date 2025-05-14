
import { useState } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";

interface Account {
  id: string;
  name: string;
  type: string;
  accountNumber: string;
  balance: number;
  color: string;
}

interface AccountsSectionProps {
  accounts: Account[];
  onAccountSelect: (account: Account) => void;
  selectedAccountId: string;
}

const AccountsSection = ({ accounts, onAccountSelect, selectedAccountId }: AccountsSectionProps) => {
  return (
    <div className="mb-6">
      <div className="flex justify-between items-center mb-3">
        <h2 className="text-lg font-semibold">Your Accounts</h2>
        <Link to="/accounts" className="text-finance-blue text-sm font-medium">View All</Link>
      </div>
      
      {/* Wrap the accounts in a ScrollArea for horizontal scrolling */}
      <ScrollArea className="w-full" orientation="horizontal">
        <div className="flex gap-3 pb-2 px-0.5 min-w-max">
          {accounts.map((account) => (
            <AccountCard 
              key={account.id}
              account={account}
              isSelected={selectedAccountId === account.id}
              onClick={() => onAccountSelect(account)}
            />
          ))}
        </div>
      </ScrollArea>
    </div>
  );
};

interface AccountCardProps {
  account: Account;
  isSelected: boolean;
  onClick: () => void;
}

const AccountCard = ({ account, isSelected, onClick }: AccountCardProps) => {
  return (
    <div 
      className={cn(
        "account-card min-w-[220px] h-[130px] rounded-xl shadow-sm p-4 cursor-pointer transition-transform relative",
        isSelected ? "scale-[1.02] ring-2 ring-finance-blue" : "hover:scale-[1.02]",
        account.color === "blue" && "bg-gradient-to-br from-finance-blue to-finance-blue-light text-white",
        account.color === "green" && "bg-gradient-to-br from-finance-green to-finance-green-light text-white",
        account.color === "purple" && "bg-gradient-to-br from-[#7E69AB] to-[#9b87f5] text-white",
        account.color === "orange" && "bg-gradient-to-br from-orange-500 to-orange-400 text-white",
        account.color === "teal" && "bg-gradient-to-br from-teal-600 to-teal-400 text-white"
      )}
      onClick={onClick}
    >
      <div className="flex items-center justify-between mb-2">
        <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center font-bold">
          {account.type.charAt(0)}
        </div>
        <span className="text-white/90 text-sm">{account.name}</span>
      </div>
      
      <div className="mt-4">
        <div className="text-xs opacity-80 mb-1">
          •••• {account.accountNumber.slice(-4)}
        </div>
        
        <div className="font-bold text-xl">
          R{account.balance.toLocaleString()}
        </div>
      </div>

      {isSelected && (
        <div className="absolute bottom-2 right-2 w-3 h-3 rounded-full bg-white" />
      )}
    </div>
  );
};

export default AccountsSection;
