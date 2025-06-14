import { Send, ArrowUpDown, CreditCard, Receipt, MessageCircle } from "lucide-react";
import { Link } from "react-router-dom";
const quickActions = [{
  icon: Send,
  label: "Send",
  href: "/send",
  gradient: "from-blue-100 to-blue-200",
  iconColor: "text-blue-600"
}, {
  icon: ArrowUpDown,
  label: "Transfer",
  href: "/transfer",
  gradient: "from-green-100 to-green-200",
  iconColor: "text-green-600"
}, {
  icon: CreditCard,
  label: "Card",
  href: "/cards",
  gradient: "from-purple-100 to-purple-200",
  iconColor: "text-purple-600"
}, {
  icon: Receipt,
  label: "Pay Bills",
  href: "/pay-bills",
  gradient: "from-orange-100 to-orange-200",
  iconColor: "text-orange-600"
}, {
  icon: MessageCircle,
  label: "Advisor",
  href: "/advisor",
  gradient: "from-pink-100 to-pink-200",
  iconColor: "text-pink-600"
}];
const QuickActions = () => {
  return <div className="px-4">
      <h2 className="text-lg font-semibold mb-4 text-gray-800">Quick Actions</h2>
      <div style={{
      animationDelay: "200ms"
    }} className="flex justify-between items-center gap-2.5 gap-2.5 ">
        {quickActions.map((action, index) => <Link to={action.href} key={index} className="flex flex-col items-center group">
            <div className={`w-14 h-14 rounded-full bg-gradient-to-br ${action.gradient} flex items-center justify-center mb-3 shadow-sm group-hover:shadow-md group-hover:scale-105 transition-all duration-200 ease-out`}>
              <action.icon className={`h-6 w-6 ${action.iconColor} stroke-[1.5]`} />
            </div>
            <span className="text-xs font-medium text-gray-700 text-center leading-tight max-w-[60px]">{action.label}</span>
          </Link>)}
      </div>
    </div>;
};
export default QuickActions;