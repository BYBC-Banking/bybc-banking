import { ArrowLeft, Send, ArrowUpDown, CreditCard, Receipt, User, Smartphone, Zap, DollarSign, FileText, Settings, HelpCircle, Building2, Users, TrendingUp, Calculator, PieChart, BarChart3, Activity, Clock, CreditCard as CreditCardIcon, Target, Wallet, Heart, GraduationCap, Shield, Calendar, Gift, HandHeart, Database, ShoppingCart, Wifi, WifiOff, Tractor, Sprout, Banknote, BookOpen, GamepadIcon as Gamepad, AlertCircle, UserCheck, Bell, Home, Car, Plane, Timer, Share2 } from "lucide-react";
import { Link } from "react-router-dom";
import { useHomePage } from "@/context/HomePageContext";
const QuickActionsMore = () => {
  const {
    accountSection,
    selectedAccount
  } = useHomePage();

  // Quick actions - core banking functions
  const quickActions = [{
    icon: Send,
    label: "Send",
    href: "/send"
  }, {
    icon: ArrowUpDown,
    label: "Transfer",
    href: "/transfer"
  }, {
    icon: CreditCard,
    label: "Card",
    href: "/cards"
  }, {
    icon: Receipt,
    label: "Pay Bills",
    href: "/pay-bills"
  }, {
    icon: User,
    label: "Advisor",
    href: "/advisor"
  }];

  // Tools - utility and management functions based on account type
  const getToolsActions = () => {
    const commonTools = [{
      icon: Settings,
      label: "Settings",
      href: "/settings"
    }, {
      icon: HelpCircle,
      label: "Help",
      href: "/help"
    }];

    // Business Account Types
    if (accountSection === "business" || selectedAccount?.type === "Business") {
      // Small and Medium Enterprises (SMEs)
      if (selectedAccount?.name?.includes("SME") || selectedAccount?.name?.includes("Business")) {
        return [{
          icon: Activity,
          label: "Cash Flow",
          href: "/cash-flow-dashboard"
        }, {
          icon: Receipt,
          label: "Invoice Gen",
          href: "/invoice-generator"
        }, {
          icon: CreditCardIcon,
          label: "Credit Score",
          href: "/credit-score"
        }, {
          icon: Calculator,
          label: "Payroll Tax",
          href: "/payroll-tax"
        }, {
          icon: Clock,
          label: "Bulk Payments",
          href: "/bulk-payments"
        }, ...commonTools];
      }

      // Freelancers & Sole Proprietors
      if (selectedAccount?.name?.includes("Freelance") || selectedAccount?.name?.includes("Sole")) {
        return [{
          icon: FileText,
          label: "Quote to Invoice",
          href: "/quote-invoice"
        }, {
          icon: TrendingUp,
          label: "Earnings Est",
          href: "/earnings-estimator"
        }, {
          icon: Calculator,
          label: "Tax Deduction",
          href: "/tax-deduction"
        }, {
          icon: Target,
          label: "Project Budget",
          href: "/project-budget"
        }, ...commonTools];
      }

      // E-commerce & Online Businesses
      if (selectedAccount?.name?.includes("Ecommerce") || selectedAccount?.name?.includes("Online")) {
        return [{
          icon: ShoppingCart,
          label: "Sales Panel",
          href: "/sales-integration"
        }, {
          icon: BarChart3,
          label: "Payment Analytics",
          href: "/payment-analytics"
        }, {
          icon: Database,
          label: "Inventory",
          href: "/inventory-tracker"
        }, {
          icon: ArrowUpDown,
          label: "ZAR/Crypto",
          href: "/crypto-swap"
        }, ...commonTools];
      }

      // Agricultural & Rural Enterprises
      if (selectedAccount?.name?.includes("Agri") || selectedAccount?.name?.includes("Farm")) {
        return [{
          icon: Calendar,
          label: "Seasonal Budget",
          href: "/seasonal-budget"
        }, {
          icon: WifiOff,
          label: "Offline Ledger",
          href: "/offline-ledger"
        }, {
          icon: Users,
          label: "Group Lending",
          href: "/group-lending"
        }, {
          icon: Tractor,
          label: "Livestock Track",
          href: "/livestock-tracker"
        }, ...commonTools];
      }

      // Default Business tools
      return [{
        icon: Building2,
        label: "Business Hub",
        href: "/business"
      }, {
        icon: Users,
        label: "Team Mgmt",
        href: "/team"
      }, {
        icon: BarChart3,
        label: "Analytics",
        href: "/analytics"
      }, {
        icon: Calculator,
        label: "Tax Tools",
        href: "/tax-tools"
      }, {
        icon: FileText,
        label: "Reports",
        href: "/reports"
      }, ...commonTools];
    }

    // Nonprofit Account Type
    if (selectedAccount?.type === "Nonprofit") {
      return [{
        icon: HandHeart,
        label: "Donor Dashboard",
        href: "/donor-dashboard"
      }, {
        icon: Target,
        label: "Funding Tracker",
        href: "/funding-tracker"
      }, {
        icon: Heart,
        label: "Recurring Donations",
        href: "/recurring-donations"
      }, {
        icon: Shield,
        label: "Compliance Vault",
        href: "/compliance-vault"
      }, ...commonTools];
    }

    // Investment Account Types
    if (selectedAccount?.type === "Investments") {
      return [{
        icon: TrendingUp,
        label: "Market Analysis",
        href: "/market-analysis"
      }, {
        icon: PieChart,
        label: "Portfolio",
        href: "/portfolio"
      }, {
        icon: DollarSign,
        label: "Investments",
        href: "/investments"
      }, {
        icon: BarChart3,
        label: "Performance",
        href: "/performance"
      }, {
        icon: FileText,
        label: "Tax Documents",
        href: "/tax-docs"
      }, ...commonTools];
    }

    // Personal Account Types
    if (accountSection === "personal" || selectedAccount?.type === "Spending") {
      // Youth & Student Accounts
      if (selectedAccount?.name?.includes("Student") || selectedAccount?.name?.includes("Youth")) {
        return [{
          icon: GraduationCap,
          label: "Education Exp",
          href: "/education-expenses"
        }, {
          icon: Smartphone,
          label: "Airtime Wallet",
          href: "/airtime-wallet"
        }, {
          icon: Gamepad,
          label: "Savings Challenge",
          href: "/savings-challenge"
        }, {
          icon: BookOpen,
          label: "Scholarship Track",
          href: "/scholarship-tracker"
        }, ...commonTools];
      }

      // Senior Citizen Accounts
      if (selectedAccount?.name?.includes("Senior") || selectedAccount?.name?.includes("Pension")) {
        return [{
          icon: Calendar,
          label: "Pension Planner",
          href: "/pension-planner"
        }, {
          icon: UserCheck,
          label: "Trusted Contacts",
          href: "/trusted-contacts"
        }, {
          icon: Bell,
          label: "Bill Reminders",
          href: "/bill-reminders"
        }, {
          icon: Heart,
          label: "Medical Fund",
          href: "/medical-fund"
        }, ...commonTools];
      }

      // Lifestyle or Goal-Based Accounts
      if (selectedAccount?.name?.includes("Goal") || selectedAccount?.name?.includes("Lifestyle")) {
        return [{
          icon: Target,
          label: "Dream Builder",
          href: "/dream-builder"
        }, {
          icon: PieChart,
          label: "Lifestyle Budget",
          href: "/lifestyle-budget"
        }, {
          icon: Gift,
          label: "Custom Vaults",
          href: "/custom-vaults"
        }, {
          icon: Share2,
          label: "Group Goals",
          href: "/group-goals"
        }, ...commonTools];
      }

      // Joint or Family Accounts
      if (selectedAccount?.name?.includes("Joint") || selectedAccount?.name?.includes("Family")) {
        return [{
          icon: Users,
          label: "Shared Wallet",
          href: "/shared-wallet"
        }, {
          icon: AlertCircle,
          label: "Spend Approval",
          href: "/spend-approval"
        }, {
          icon: Wallet,
          label: "Allowance Mgr",
          href: "/allowance-manager"
        }, {
          icon: Calendar,
          label: "Family Budget",
          href: "/family-budget"
        }, ...commonTools];
      }

      // Default Personal tools (Basic Personal Accounts)
      return [{
        icon: PieChart,
        label: "Budget Assistant",
        href: "/budget-assistant"
      }, {
        icon: Target,
        label: "Saving Vaults",
        href: "/saving-vaults"
      }, {
        icon: ArrowUpDown,
        label: "Crypto to ZAR",
        href: "/crypto-swap"
      }, {
        icon: BarChart3,
        label: "Spend Insights",
        href: "/spending-insights"
      }, {
        icon: Smartphone,
        label: "Mobile Top Up",
        href: "/mobile-topup"
      }, {
        icon: Zap,
        label: "Utilities",
        href: "/utilities"
      }, ...commonTools];
    }

    // Fallback to default tools
    return [{
      icon: Smartphone,
      label: "Mobile Top Up",
      href: "/mobile-topup"
    }, {
      icon: Zap,
      label: "Utilities",
      href: "/utilities"
    }, {
      icon: DollarSign,
      label: "Investments",
      href: "/investments"
    }, {
      icon: FileText,
      label: "Statements",
      href: "/statements"
    }, ...commonTools];
  };
  const toolsActions = getToolsActions();
  const getActionColors = (index: number) => {
    if (accountSection === "business") {
      return {
        gradient: "from-slate-100 to-slate-200",
        iconColor: "text-slate-700"
      };
    }
    const colors = [{
      gradient: "from-blue-100 to-blue-200",
      iconColor: "text-blue-600"
    }, {
      gradient: "from-green-100 to-green-200",
      iconColor: "text-green-600"
    }, {
      gradient: "from-purple-100 to-purple-200",
      iconColor: "text-purple-600"
    }, {
      gradient: "from-orange-100 to-orange-200",
      iconColor: "text-orange-600"
    }, {
      gradient: "from-pink-100 to-pink-200",
      iconColor: "text-pink-600"
    }, {
      gradient: "from-indigo-100 to-indigo-200",
      iconColor: "text-indigo-600"
    }, {
      gradient: "from-teal-100 to-teal-200",
      iconColor: "text-teal-600"
    }, {
      gradient: "from-red-100 to-red-200",
      iconColor: "text-red-600"
    }, {
      gradient: "from-yellow-100 to-yellow-200",
      iconColor: "text-yellow-600"
    }, {
      gradient: "from-cyan-100 to-cyan-200",
      iconColor: "text-cyan-600"
    }, {
      gradient: "from-emerald-100 to-emerald-200",
      iconColor: "text-emerald-600"
    }];
    return colors[index % colors.length];
  };
  return <div className="bg-gradient-to-br from-white to-slate-100 min-h-screen">
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
          
          <div className="grid grid-cols-4 gap-4">
            {quickActions.map((action, index) => {
            const colors = getActionColors(index);
            return;
          })}
          </div>
        </div>

        {/* Tools Section */}
        <div>
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Tools</h2>
          <div className="grid grid-cols-4 gap-4">
            {toolsActions.map((action, index) => {
            const colors = getActionColors(index + quickActions.length);
            return <Link to={action.href} key={index} className="flex flex-col items-center group">
                  <div className={`w-12 h-12 rounded-full bg-gradient-to-br ${colors.gradient} flex items-center justify-center mb-2 shadow-sm group-hover:shadow-md group-hover:scale-105 transition-all duration-200 ease-out`}>
                    <action.icon className={`h-5 w-5 ${colors.iconColor} stroke-[1.5]`} />
                  </div>
                  <span className="text-xs font-medium text-gray-700 text-center leading-tight max-w-[60px]">
                    {action.label}
                  </span>
                </Link>;
          })}
          </div>
        </div>
      </div>
    </div>;
};
export default QuickActionsMore;