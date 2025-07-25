
import { Home, Wallet2, TrendingUp, GraduationCap, Plus } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { useIsMobile } from "@/hooks/use-mobile";
import { useHomePage } from "@/context/HomePageContext";

type NavItem = {
  icon: React.ElementType;
  label: string;
  getHref: (section: 'personal' | 'business') => string;
};

const navItems: NavItem[] = [
  {
    icon: Home,
    label: "Home",
    getHref: () => "/dashboard"
  },
  {
    icon: Wallet2,
    label: "Accounts",
    getHref: (section) => `/accounts-${section}`
  },
  {
    icon: TrendingUp,
    label: "Invest",
    getHref: (section) => `/investments-${section}`
  },
  {
    icon: GraduationCap,
    label: "Learn",
    getHref: (section) => `/education-${section}`
  }
];

export default function BottomNav() {
  const location = useLocation();
  const isMobile = useIsMobile();
  const { accountSection } = useHomePage();
  
  if (!isMobile) return null;
  
  return (
    <div className="fixed bottom-0 left-0 right-0 z-50">
      {/* Floating Plus Button */}
      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 z-10">
        <Link 
          to="/create-account" 
          className="flex items-center justify-center w-12 h-12 bg-amber-400 rounded-full shadow-lg hover:bg-amber-500 transition-colors my-[14px]"
        >
          <Plus className="h-7 w-7 text-black font-bold" strokeWidth={3} />
        </Link>
      </div>
      
      {/* Navigation Bar */}
      <div className="bg-[#1A1F2C] border-t border-white/10">
        <div className="max-w-screen-lg mx-auto">
          <nav className="flex justify-center items-center px-6 py-3">
            <div className="flex justify-between items-center w-full max-w-xs">
              {/* First two nav items */}
              {navItems.slice(0, 2).map((item) => {
                const href = item.getHref(accountSection);
                const isActive = location.pathname === href;
                const IconComponent = item.icon;
                return (
                  <Link 
                    key={href} 
                    to={href} 
                    className="flex flex-col items-center py-1 px-2 min-w-[60px]"
                  >
                    <IconComponent 
                      className={cn(
                        "h-6 w-6 mb-1", 
                        isActive ? "text-amber-400" : "text-gray-400"
                      )} 
                    />
                    <span className={cn(
                      "text-xs font-medium", 
                      isActive ? "text-amber-400" : "text-gray-400"
                    )}>
                      {item.label}
                    </span>
                  </Link>
                );
              })}
              
              {/* Spacer for center button */}
              <div className="w-14" />
              
              {/* Last two nav items */}
              {navItems.slice(2).map((item) => {
                const href = item.getHref(accountSection);
                const isActive = location.pathname === href;
                const IconComponent = item.icon;
                return (
                  <Link 
                    key={href} 
                    to={href} 
                    className="flex flex-col items-center py-1 px-2 min-w-[60px]"
                  >
                    <IconComponent 
                      className={cn(
                        "h-6 w-6 mb-1", 
                        isActive ? "text-amber-400" : "text-gray-400"
                      )} 
                    />
                    <span className={cn(
                      "text-xs font-medium", 
                      isActive ? "text-amber-400" : "text-gray-400"
                    )}>
                      {item.label}
                    </span>
                  </Link>
                );
              })}
            </div>
          </nav>
        </div>
      </div>
    </div>
  );
}
