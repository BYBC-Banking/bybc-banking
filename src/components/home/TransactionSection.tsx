
import { useNavigate } from "react-router-dom";
import TransactionsList from "@/components/TransactionsList";
import { useHomePage } from "@/context/HomePageContext";

const TransactionSection = () => {
  const { selectedAccount } = useHomePage();
  
  return (
    <div className="animate-fade-in" style={{animationDelay: "100ms"}}>
      <h2 className="text-lg font-semibold mb-3">Recent Transactions</h2>
      <div className="bg-white rounded-xl shadow-sm border p-1 max-h-[280px] overflow-y-auto">
        <TransactionsList transactions={selectedAccount.transactions} />
      </div>
    </div>
  );
};

export default TransactionSection;
