
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
    </header>
  );
};

export default DashboardHeader;
