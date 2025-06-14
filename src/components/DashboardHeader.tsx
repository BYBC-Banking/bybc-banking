
import { Link } from "react-router-dom";
import { useHomePage } from "@/context/HomePageContext";

const DashboardHeader = () => {
  const { selectedAccount, selectedAccountId, accountSection, setAccountSection } = useHomePage();
  const isInvestmentAccount = selectedAccount.type === "Investments";
  
  return (
    <header className="flex items-center justify-between mb-6 animate-fade-in">
      <div>
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <p className="text-muted-foreground">Welcome back, Sipho</p>
        {isInvestmentAccount && (
          <Link to="/investments" className="text-finance-blue text-sm">
            View Investments
          </Link>
        )}
      </div>
      
      {/* Pill-shaped account switcher */}
      <div className="flex bg-gray-100 rounded-full p-1">
        <button 
          onClick={() => setAccountSection('personal')}
          className={`px-3 py-1 rounded-full text-sm font-medium transition-colors hover:bg-white hover:shadow-sm ${
            accountSection === 'personal' ? "bg-white shadow-sm text-finance-blue" : ""
          }`}
        >
          P
        </button>
        <div className="w-px bg-gray-300 my-1"></div>
        <button 
          onClick={() => setAccountSection('business')}
          className={`px-3 py-1 rounded-full text-sm font-medium transition-colors hover:bg-white hover:shadow-sm ${
            accountSection === 'business' ? "bg-white shadow-sm text-finance-blue" : ""
          }`}
        >
          B
        </button>
      </div>
    </header>
  );
};

export default DashboardHeader;
