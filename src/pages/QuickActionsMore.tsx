
import { ArrowLeft, Send, ArrowUpDown, CreditCard, Receipt, User, Smartphone, Zap, DollarSign, FileText, Settings, HelpCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { useHomePage } from "@/context/HomePageContext";

const QuickActionsMore = () => {
  const { accountSection } = useHomePage();

  // Quick actions - core banking functions
  const quickActions = [
    { icon: Send, label: "Send", href: "/send" },
    { icon: ArrowUpDown, label: "Transfer", href: "/transfer" },
    { icon: CreditCard, label: "Card", href: "/cards" },
    { icon: Receipt, label: "Pay Bills", href: "/pay-bills" },
    { icon: User, label: "Advisor", href: "/advisor" },
  ];

  // Tools - utility and management functions
  const toolsActions = [
    { icon: Smartphone, label: "Mobile Top Up", href: "/mobile-topup" },
    { icon: Zap, label: "Utilities", href: "/utilities" },
    { icon: DollarSign, label: "Investments", href: "/investments" },
    { icon: FileText, label: "Statements", href: "/statements" },
    { icon: Settings, label: "Settings", href: "/settings" },
    { icon: HelpCircle, label: "Help", href: "/help" },
  ];

  const getActionColors = (index: number) => {
    if (accountSection === "business") {
      return {
        gradient: "from-slate-100 to-slate-200",
        iconColor: "text-slate-700"
      };
    }
    
    const colors = [
      { gradient: "from-blue-100 to-blue-200", iconColor: "text-blue-600" },
      { gradient: "from-green-100 to-green-200", iconColor: "text-green-600" },
      { gradient: "from-purple-100 to-purple-200", iconColor: "text-purple-600" },
      { gradient: "from-orange-100 to-orange-200", iconColor: "text-orange-600" },
      { gradient: "from-pink-100 to-pink-200", iconColor: "text-pink-600" },
      { gradient: "from-indigo-100 to-indigo-200", iconColor: "text-indigo-600" },
      { gradient: "from-teal-100 to-teal-200", iconColor: "text-teal-600" },
      { gradient: "from-red-100 to-red-200", iconColor: "text-red-600" },
      { gradient: "from-yellow-100 to-yellow-200", iconColor: "text-yellow-600" },
      { gradient: "from-cyan-100 to-cyan-200", iconColor: "text-cyan-600" },
      { gradient: "from-emerald-100 to-emerald-200", iconColor: "text-emerald-600" },
    ];
    return colors[index % colors.length];
  };

  return (
    <div className="bg-gradient-to-br from-white to-slate-100 min-h-screen">
      <div className="container mx-auto max-w-md px-4 py-6">
        {/* Header */}
        <header className="flex items-center gap-4 mb-6">
          <Link to="/dashboard" className="p-2">
            <ArrowLeft className="h-5 w-5" />
          </Link>
          <h1 className="text-2xl font-bold">Quick Actions</h1>
        </header>

        {/* Quick Actions Section */}
        <div className="mb-8">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Quick Actions</h2>
          <div className="grid grid-cols-3 gap-6">
            {quickActions.map((action, index) => {
              const colors = getActionColors(index);
              return (
                <Link to={action.href} key={index} className="flex flex-col items-center group">
                  <div className={`w-16 h-16 rounded-full bg-gradient-to-br ${colors.gradient} flex items-center justify-center mb-3 shadow-sm group-hover:shadow-md group-hover:scale-105 transition-all duration-200 ease-out`}>
                    <action.icon className={`h-7 w-7 ${colors.iconColor} stroke-[1.5]`} />
                  </div>
                  <span className="text-sm font-medium text-gray-700 text-center leading-tight max-w-[70px]">
                    {action.label}
                  </span>
                </Link>
              );
            })}
          </div>
        </div>

        {/* Tools Section */}
        <div>
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Tools</h2>
          <div className="grid grid-cols-3 gap-6">
            {toolsActions.map((action, index) => {
              const colors = getActionColors(index + quickActions.length);
              return (
                <Link to={action.href} key={index} className="flex flex-col items-center group">
                  <div className={`w-16 h-16 rounded-full bg-gradient-to-br ${colors.gradient} flex items-center justify-center mb-3 shadow-sm group-hover:shadow-md group-hover:scale-105 transition-all duration-200 ease-out`}>
                    <action.icon className={`h-7 w-7 ${colors.iconColor} stroke-[1.5]`} />
                  </div>
                  <span className="text-sm font-medium text-gray-700 text-center leading-tight max-w-[70px]">
                    {action.label}
                  </span>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuickActionsMore;
