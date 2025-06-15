
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

  // Get professional colors for business section accounts
  const getAccountColors = (account: any) => {
    // Special case: Nonprofit in business section gets Dark Green Finance theme
    if (account.type === "Nonprofit" && section === "business") {
      return {
        bgColor: "bg-slate-900",
        textColor: "text-slate-100",
        iconBg: "bg-slate-800",
        iconText: "text-emerald-400"
      };
    }

    // Special case: Business in business section gets Professional Dark theme
    if (account.type === "Business" && section === "business") {
      return {
        bgColor: "bg-neutral-900",
        textColor: "text-neutral-100",
        iconBg: "bg-neutral-800",
        iconText: "text-neutral-300"
      };
    }

    // Default colors based on account.color
    switch (account.color) {
      case "blue":
        return {
          bgColor: "bg-finance-blue",
          textColor: "text-white",
          iconBg: "",
          iconText: ""
        };
      case "green":
        return {
          bgColor: "bg-finance-green",
          textColor: "text-white",
          iconBg: "",
          iconText: ""
        };
      case "purple":
        return {
          bgColor: "bg-[#7E69AB]",
          textColor: "text-white",
          iconBg: "",
          iconText: ""
        };
      case "orange":
        return {
          bgColor: "bg-orange-500",
          textColor: "text-white",
          iconBg: "",
          iconText: ""
        };
      case "teal":
        return {
          bgColor: "bg-teal-600",
          textColor: "text-white",
          iconBg: "",
          iconText: ""
        };
      default:
        return {
          bgColor: "bg-gray-500",
          textColor: "text-white",
          iconBg: "",
          iconText: ""
        };
    }
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
          {filteredAccounts.map((account) => {
            const colors = getAccountColors(account);
            const isNonprofitBusiness = account.type === "Nonprofit" && section === "business";
            const isBusinessBusiness = account.type === "Business" && section === "business";
            
            return (
              <div
                key={account.id}
                className="bg-white rounded-xl shadow-sm border p-4 cursor-pointer hover:bg-slate-50 transition-colors"
                onClick={() => handleAccountSelect(account.id)}
              >
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${
                      isNonprofitBusiness || isBusinessBusiness
                        ? `${colors.bgColor} ${colors.iconBg} border border-slate-700`
                        : colors.bgColor
                    } ${colors.textColor}`}>
                      <span className={(isNonprofitBusiness || isBusinessBusiness) ? colors.iconText : ""}>
                        {account.type.charAt(0)}
                      </span>
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
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Accounts;
