
import { useState } from "react";
import { ArrowLeft } from "lucide-react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { accounts } from "@/data/accountsData";

const Accounts = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  // Determine section from route
  const isBusinessSection = location.pathname.includes('-business');
  const section = isBusinessSection ? 'business' : 'personal';
  
  // Filter accounts based on section
  const filteredAccounts = accounts.filter(account => {
    if (section === 'personal') {
      return ['Spending', 'Investments'].includes(account.type);
    } else {
      return ['Business', 'Nonprofit', 'Investments'].includes(account.type);
    }
  });
  
  // Handle account selection - navigate to dashboard with selected account ID
  const handleAccountSelect = (accountId: string) => {
    navigate(`/dashboard?account=${accountId}`);
  };

  return (
    <div className="bg-gradient-to-br from-white to-slate-100 min-h-screen">
      <div className="container mx-auto max-w-md px-4 py-6">
        {/* Header */}
        <header className="flex items-center gap-4 mb-6">
          <Link to="/dashboard" className="p-2">
            <ArrowLeft className="h-5 w-5" />
          </Link>
          <h1 className="text-2xl font-bold">
            {section === 'personal' ? 'Personal Accounts' : 'Business Accounts'}
          </h1>
        </header>
        
        {/* Accounts List */}
        <div className="space-y-4">
          {filteredAccounts.map((account) => (
            <div
              key={account.id}
              className="bg-white rounded-xl shadow-sm border p-4 cursor-pointer hover:bg-slate-50 transition-colors"
              onClick={() => handleAccountSelect(account.id)}
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
