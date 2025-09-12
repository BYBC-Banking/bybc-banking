
import { Link } from "react-router-dom";
import { useHomePage } from "@/context/HomePageContext";
import bybcLogo from "@/assets/bybc-logo.png";

const DashboardHeader = () => {
  const { selectedAccount, selectedAccountId, accountSection, setAccountSection } = useHomePage();
  const isInvestmentAccount = selectedAccount.type === "Investments";
  
  return (
    <header className="flex items-center justify-between mb-6 animate-fade-in px-4 lg:px-0">
      <div className="flex items-center gap-4">
        {accountSection === 'business' && (
          <div className="flex items-center gap-3">
            <img 
              src={bybcLogo} 
              alt="BYBC Logo" 
              className="w-12 h-12 rounded-lg shadow-md"
            />
            <div>
              <div className="text-lg font-bold text-finance-blue">BYBC</div>
              <div className="text-sm text-muted-foreground">Business</div>
            </div>
          </div>
        )}
        <div>
          <h1 className="text-2xl lg:text-3xl font-bold">Dashboard</h1>
          <p className="text-muted-foreground text-sm lg:text-base">
            {accountSection === 'personal' ? 'Personal Account' : 'Business Account'}
          </p>
          {isInvestmentAccount && (
            <Link to="/investments" className="text-finance-blue text-sm lg:text-base">
              View Investments
            </Link>
          )}
        </div>
      </div>
      
      {/* Pill-shaped account switcher */}
      <div className="flex bg-gray-100 rounded-full p-1 lg:p-1.5">
        <button 
          onClick={() => setAccountSection('personal')}
          className={`px-3 py-1 lg:px-4 lg:py-2 rounded-full text-sm lg:text-base font-medium transition-colors hover:bg-white hover:shadow-sm ${
            accountSection === 'personal' ? "bg-white shadow-sm text-finance-blue" : ""
          }`}
        >
          P
        </button>
        <div className="w-px bg-gray-300 my-1"></div>
        <button 
          onClick={() => setAccountSection('business')}
          className={`px-3 py-1 lg:px-4 lg:py-2 rounded-full text-sm lg:text-base font-medium transition-colors hover:bg-white hover:shadow-sm ${
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
