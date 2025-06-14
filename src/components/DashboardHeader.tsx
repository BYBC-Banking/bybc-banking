
import { Link } from "react-router-dom";
import { useHomePage } from "@/context/HomePageContext";

const DashboardHeader = () => {
  const { selectedAccount } = useHomePage();
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
        <Link 
          to="/?account=1" 
          className="px-3 py-1 rounded-full text-sm font-medium transition-colors hover:bg-white hover:shadow-sm"
        >
          P
        </Link>
        <div className="w-px bg-gray-300 my-1"></div>
        <Link 
          to="/?account=3" 
          className="px-3 py-1 rounded-full text-sm font-medium transition-colors hover:bg-white hover:shadow-sm"
        >
          B
        </Link>
      </div>
    </header>
  );
};

export default DashboardHeader;
