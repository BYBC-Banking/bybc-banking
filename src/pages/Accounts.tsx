
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
  
  const filteredAccounts = accounts.filter(account => {
    if (section === 'personal') {
      return ['Spending', 'Investments'].includes(account.type);
    } else {
      return ['Business', 'Nonprofit', 'Investments'].includes(account.type);
    }
  });
  
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

    // NEW: Special case: BYBC Investments (Investments type) in business section uses Account Balance card color scheme (teal)
    if (account.type === "Investments" && section === "business") {
      return {
        bgColor: "bg-teal-600",
        textColor: "text-white",
        iconBg: "bg-teal-700",
        iconText: "text-white"
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

  const handleAccountClick = (accountId: string) => {
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
          {filteredAccounts.map((account) => {
            const colors = getAccountColors(account);
            const isNonprofitBusiness = account.type === "Nonprofit" && section === "business";
            const isBusinessBusiness = account.type === "Business" && section === "business";
            const isInvestmentsBusiness = account.type === "Investments" && section === "business";
            
            return (
              <button
                key={account.id}
                onClick={() => handleAccountClick(account.id)}
                className="w-full bg-white rounded-xl shadow-sm border p-4 hover:shadow-md transition-shadow"
              >
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${
                      (isNonprofitBusiness || isBusinessBusiness)
                        ? `${colors.bgColor} ${colors.iconBg} border border-slate-700`
                        : isInvestmentsBusiness
                          ? `${colors.bgColor} border border-teal-700`
                          : colors.bgColor
                    } ${colors.textColor}`}>
                      <span className={
                        (isNonprofitBusiness || isBusinessBusiness)
                          ? colors.iconText
                          : isInvestmentsBusiness
                            ? colors.iconText
                            : ""
                      }>
                        {account.type.charAt(0)}
                      </span>
                    </div>
                    <div className="text-left">
                      <div className="font-medium">{account.name}</div>
                      <div className="text-xs text-muted-foreground">•••• {account.accountNumber.slice(-4)}</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-semibold">R{account.balance.toLocaleString()}</div>
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Accounts;
