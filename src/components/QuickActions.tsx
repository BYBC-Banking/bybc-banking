import { Send, ArrowDownUp, CreditCard, Receipt, MessageCircle } from "lucide-react";
import { Link } from "react-router-dom";

const quickActions = [
  {
    icon: Send,
    label: "Send",
    href: "/send",
    color: "bg-blue-100 text-blue-600"
  },
  {
    icon: ArrowDownUp,
    label: "Transfer", 
    href: "/transfer",
    color: "bg-green-100 text-green-600"
  },
  {
    icon: CreditCard,
    label: "Card",
    href: "/cards",
    color: "bg-purple-100 text-purple-600"
  },
  {
    icon: Receipt,
    label: "Pay Bills",
    href: "/pay-bills", 
    color: "bg-orange-100 text-orange-600"
  },
  {
    icon: MessageCircle,
    label: "Advisor",
    href: "/advisor",
    color: "bg-pink-100 text-pink-600"
  }
];

const QuickActions = () => {
  return (
    <div className="grid grid-cols-5 gap-4 animate-fade-in" style={{animationDelay: "200ms"}}>
      {quickActions.map((action, index) => (
        <Link to={action.href} key={index} className="flex flex-col items-center justify-center p-3 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200">
          <div className={`w-10 h-10 rounded-full flex items-center justify-center ${action.color} mb-2`}>
            <action.icon className="h-5 w-5" />
          </div>
          <span className="text-xs font-medium text-gray-700">{action.label}</span>
        </Link>
      ))}
    </div>
  );
};

export default QuickActions;
