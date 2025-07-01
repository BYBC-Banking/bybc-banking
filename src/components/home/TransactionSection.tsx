
import { useNavigate } from "react-router-dom";
import TransactionsList from "@/components/TransactionsList";
import { useHomePage } from "@/context/HomePageContext";

const TransactionSection = () => {
  const { selectedAccount } = useHomePage();
  const navigate = useNavigate();
  
  const handleViewAllClick = () => {
    navigate('/transactions');
  };
  
  return (
    <div className="animate-fade-in" style={{animationDelay: "100ms"}}>
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-lg font-semibold">Recent Transactions</h2>
        <button 
          onClick={handleViewAllClick}
          className="text-sm text-finance-blue hover:text-finance-blue/80 font-medium transition-colors"
        >
          View All
        </button>
      </div>
      <div className="bg-white rounded-xl shadow-sm border p-1 max-h-[280px] overflow-y-auto">
        <TransactionsList transactions={selectedAccount.transactions} />
      </div>
    </div>
  );
};

export default TransactionSection;
