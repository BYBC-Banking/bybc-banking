
import { Link } from "react-router-dom";
import { useHomePage } from "@/context/HomePageContext";
import { useState } from "react";
import BusinessLoadingScreen from "./BusinessLoadingScreen";
import PersonalLoadingScreen from "./PersonalLoadingScreen";

const DashboardHeader = () => {
  const { selectedAccount, selectedAccountId, accountSection, setAccountSection } = useHomePage();
  const isInvestmentAccount = selectedAccount.type === "Investments";
  const [showBusinessLoading, setShowBusinessLoading] = useState(false);
  const [showPersonalLoading, setShowPersonalLoading] = useState(false);

  const handlePersonalClick = () => {
    setShowPersonalLoading(true);
  };

  const handleBusinessClick = () => {
    setShowBusinessLoading(true);
  };

  const handlePersonalLoadingComplete = () => {
    setShowPersonalLoading(false);
    setAccountSection('personal');
  };

  const handleBusinessLoadingComplete = () => {
    setShowBusinessLoading(false);
    setAccountSection('business');
  };
  
  return (
    <>
      {showPersonalLoading && (
        <PersonalLoadingScreen onLoadingComplete={handlePersonalLoadingComplete} />
      )}
      {showBusinessLoading && (
        <BusinessLoadingScreen onLoadingComplete={handleBusinessLoadingComplete} />
      )}
      <header className="flex items-center justify-between mb-6 animate-fade-in px-4 lg:px-0">
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
      
      {/* Pill-shaped account switcher */}
      <div className="flex bg-gray-100 rounded-full p-1 lg:p-1.5">
        <button 
          onClick={handlePersonalClick}
          className={`px-3 py-1 lg:px-4 lg:py-2 rounded-full text-sm lg:text-base font-medium transition-colors hover:bg-white hover:shadow-sm ${
            accountSection === 'personal' ? "bg-white shadow-sm text-finance-blue" : ""
          }`}
        >
          P
        </button>
        <div className="w-px bg-gray-300 my-1"></div>
        <button 
          onClick={handleBusinessClick}
          className={`px-3 py-1 lg:px-4 lg:py-2 rounded-full text-sm lg:text-base font-medium transition-colors hover:bg-white hover:shadow-sm ${
            accountSection === 'business' ? "bg-white shadow-sm text-finance-blue" : ""
          }`}
        >
          B
        </button>
      </div>
      </header>
    </>
  );
};

export default DashboardHeader;
