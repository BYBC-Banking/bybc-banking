
import { useState } from "react";
import { ArrowLeft, Signal, Zap } from "lucide-react";
import { Link } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { CreditCard } from "lucide-react";

type BuyOption = {
  id: string;
  name: string;
  icon: React.ReactNode;
  description: string;
};

const Buy = () => {
  const { toast } = useToast();
  
  // Buy options
  const buyOptions: BuyOption[] = [
    {
      id: "airtime",
      name: "Airtime",
      icon: <Signal className="h-5 w-5" />,
      description: "Purchase airtime for any mobile network"
    },
    {
      id: "data",
      name: "Data",
      icon: <CreditCard className="h-5 w-5" />,
      description: "Buy data bundles for your mobile device"
    },
    {
      id: "electricity",
      name: "Electricity",
      icon: <Zap className="h-5 w-5" />,
      description: "Pay for prepaid electricity"
    }
  ];
  
  const handleOptionClick = (option: BuyOption) => {
    toast({
      title: `Top Up ${option.name}`,
      description: `You selected to top up ${option.name}`,
    });
  };

  return (
    <div className="bg-gradient-to-br from-white to-slate-100 min-h-screen">
      <div className="container mx-auto max-w-md px-4 py-6">
        {/* Header */}
        <header className="flex items-center gap-4 mb-6">
          <Link to="/" className="p-2">
            <ArrowLeft className="h-5 w-5" />
          </Link>
          <h1 className="text-2xl font-bold">Top Up</h1>
        </header>
        
        {/* Buy Options */}
        <div className="space-y-4">
          {buyOptions.map((option) => (
            <div
              key={option.id}
              className="bg-white rounded-xl shadow-sm border p-4 cursor-pointer hover:bg-slate-50 transition-colors"
              onClick={() => handleOptionClick(option)}
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-finance-blue flex items-center justify-center text-white">
                  {option.icon}
                </div>
                <div>
                  <div className="font-medium">{option.name}</div>
                  <div className="text-sm text-muted-foreground">{option.description}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Buy;
