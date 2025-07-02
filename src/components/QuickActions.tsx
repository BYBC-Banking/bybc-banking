
import { Send, ArrowUpDown, CreditCard, Receipt, User } from "lucide-react";
import { Link } from "react-router-dom";
import { useHomePage } from "@/context/HomePageContext";

// Professional color scheme for business section
const businessActions = [{
  icon: Send,
  label: "Send",
  href: "/send",
  gradient: "from-slate-100 to-slate-200",
  iconColor: "text-slate-700"
}, {
  icon: ArrowUpDown,
  label: "Transfer",
  href: "/transfer",
  gradient: "from-gray-100 to-gray-200",
  iconColor: "text-gray-700"
}, {
  icon: CreditCard,
  label: "Card",
  href: "/cards",
  gradient: "from-stone-100 to-stone-200",
  iconColor: "text-stone-700"
}, {
  icon: Receipt,
  label: "Pay Bills",
  href: "/pay-bills",
  gradient: "from-neutral-100 to-neutral-200",
  iconColor: "text-neutral-700"
}, {
  icon: User,
  label: "Advisor",
  href: "/advisor",
  gradient: "from-zinc-100 to-zinc-200",
  iconColor: "text-zinc-700"
}];

const personalActions = [{
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
  icon: User,
  label: "Advisor",
  href: "/advisor",
  gradient: "from-slate-100 to-slate-200",
  iconColor: "text-slate-600"
}];

const QuickActions = () => {
  const { accountSection } = useHomePage();
  const quickActions = accountSection === "business" ? businessActions : personalActions;

  return (
    <div className="px-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold text-gray-800">Quick Actions</h2>
        <span className="text-sm text-gray-600">More</span>
      </div>
      <div style={{
        animationDelay: "200ms"
      }} className="flex justify-between items-center gap-1 ">
        {quickActions.map((action, index) => (
          <Link to={action.href} key={index} className="flex flex-col items-center group">
            <div className={`w-14 h-14 rounded-full bg-gradient-to-br ${action.gradient} flex items-center justify-center mb-3 shadow-sm group-hover:shadow-md group-hover:scale-105 transition-all duration-200 ease-out`}>
              <action.icon className={`h-6 w-6 ${action.iconColor} stroke-[1.5]`} />
            </div>
            <span className="text-xs font-medium text-gray-700 text-center leading-tight max-w-[60px]">
              {action.label}
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default QuickActions;
