
import { useState } from "react";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import AccountsSection from "@/components/AccountsSection";

const Accounts = () => {
  // Mock data for accounts (using the same data structure as in Index.tsx)
  const accounts = [
    {
      id: "1",
      name: "BYBC Spending",
      type: "Spending",
      accountNumber: "1234567890",
      balance: 2450.75,
      color: "blue",
    },
    {
      id: "2",
      name: "BYBC Savings",
      type: "Savings",
      accountNumber: "0987654321",
      balance: 15750.00,
      color: "green",
    },
    {
      id: "3",
      name: "BYBC Business",
      type: "Business",
      accountNumber: "5678901234",
      balance: 42500.00,
      color: "purple",
    },
    {
      id: "4",
      name: "BYBC Nonprofit",
      type: "Nonprofit",
      accountNumber: "9876543210",
      balance: 78950.25,
      color: "orange",
    },
    {
      id: "5",
      name: "BYBC Crypto",
      type: "Crypto",
      accountNumber: "1357924680",
      balance: 3450.50,
      color: "teal",
    }
  ];

  // State for selected account
  const [selectedAccountId, setSelectedAccountId] = useState(accounts[0].id);
  
  // Handle account selection
  const handleAccountSelect = (account: any) => {
    setSelectedAccountId(account.id);
  };

  return (
    <div className="bg-gradient-to-br from-white to-slate-100 min-h-screen">
      <div className="container mx-auto max-w-md px-4 py-6">
        {/* Header */}
        <header className="flex items-center gap-4 mb-6">
          <Link to="/" className="p-2">
            <ArrowLeft className="h-5 w-5" />
          </Link>
          <h1 className="text-2xl font-bold">All Accounts</h1>
        </header>
        
        {/* Accounts List */}
        <div className="space-y-4">
          {accounts.map((account) => (
            <div
              key={account.id}
              className="bg-white rounded-xl shadow-sm border p-4"
              onClick={() => handleAccountSelect(account)}
            >
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold 
                    ${account.color === "blue" ? "bg-finance-blue text-white" : ""}
                    ${account.color === "green" ? "bg-finance-green text-white" : ""}
                    ${account.color === "purple" ? "bg-[#7E69AB] text-white" : ""}
                    ${account.color === "orange" ? "bg-orange-500 text-white" : ""}
                    ${account.color === "teal" ? "bg-teal-600 text-white" : ""}
                  `}>
                    {account.type.charAt(0)}
                  </div>
                  <div>
                    <div className="font-medium">{account.name}</div>
                    <div className="text-xs text-muted-foreground">•••• {account.accountNumber.slice(-4)}</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-semibold">R{account.balance.toLocaleString()}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Accounts;
