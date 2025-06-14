
import { useState } from "react";
import { Send, CreditCard, ArrowUpDown, Plus, Smartphone, Shield } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useHomePage } from "@/context/HomePageContext";

const QuickActions = () => {
  const { selectedAccount } = useHomePage();
  const isInvestmentAccount = selectedAccount.type === "Investments";
  
  return (
    <div className="animate-fade-in" style={{animationDelay: "200ms"}}>
      <h2 className="text-lg font-semibold mb-3">Quick Actions</h2>
      <div className="grid grid-cols-3 gap-3">
        <Link to="/send">
          <Button variant="outline" className="h-20 flex-col gap-1 w-full">
            <Send className="h-5 w-5" />
            <span className="text-xs">Send</span>
          </Button>
        </Link>
        
        <Link to="/receive">
          <Button variant="outline" className="h-20 flex-col gap-1 w-full">
            <ArrowUpDown className="h-5 w-5" />
            <span className="text-xs">Receive</span>
          </Button>
        </Link>
        
        <Link to="/pay-bills">
          <Button variant="outline" className="h-20 flex-col gap-1 w-full">
            <CreditCard className="h-5 w-5" />
            <span className="text-xs">Pay Bills</span>
          </Button>
        </Link>
        
        <Link to="/buy">
          <Button variant="outline" className="h-20 flex-col gap-1 w-full">
            <Plus className="h-5 w-5" />
            <span className="text-xs">Buy Airtime</span>
          </Button>
        </Link>
        
        <Link to="/qr-pay">
          <Button variant="outline" className="h-20 flex-col gap-1 w-full">
            <Smartphone className="h-5 w-5" />
            <span className="text-xs">QR Pay</span>
          </Button>
        </Link>
        
        <Link to="/compliance-center">
          <Button variant="outline" className="h-20 flex-col gap-1 w-full">
            <Shield className="h-5 w-5" />
            <span className="text-xs">Compliance</span>
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default QuickActions;
