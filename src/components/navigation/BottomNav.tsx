
import { Home, Wallet2, TrendingUp, GraduationCap, Plus } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { useIsMobile } from "@/hooks/use-mobile";

type NavItem = {
  icon: React.ElementType;
  label: string;
  href: string;
};

const navItems: NavItem[] = [
  {
    icon: Home,
    label: "Home",
    href: "/dashboard",
  },
  {
    icon: Wallet2,
    label: "Accounts",
    href: "/accounts",
  },
  {
    icon: TrendingUp,
    label: "Invest",
    href: "/investments",
  },
  {
    icon: GraduationCap,
    label: "Learn",
    href: "/education",
  },
];

export default function BottomNav() {
  const location = useLocation();
  const isMobile = useIsMobile();
  
  // Don't render bottom nav on desktop
  if (!isMobile) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-[#1A1F2C] border-t border-white/10">
      <div className="max-w-screen-lg mx-auto">
        <nav className="flex justify-between items-center px-4 py-2">
          {/* First two nav items */}
          {navItems.slice(0, 2).map((item) => {
            const isActive = location.pathname === item.href;
            
            return (
              <Link
                key={item.href}
                to={item.href}
                className={cn(
                  "flex flex-col items-center py-2 px-3 min-w-[64px]",
                  "transition-colors duration-200"
                )}
              >
                <item.icon 
                  className={cn(
                    "h-6 w-6 mb-1",
                    isActive 
                      ? "text-amber-300" 
                      : "text-gray-400"
                  )}
                />
                <span 
                  className={cn(
                    "text-xs font-medium",
                    isActive 
                      ? "text-amber-300" 
                      : "text-gray-400"
                  )}
                >
                  {item.label}
                </span>
              </Link>
            );
          })}
          
          {/* Central Plus Button */}
          <Link
            to="/create-account"
            className="flex flex-col items-center py-2 px-3"
          >
            <div className="w-12 h-12 rounded-full bg-amber-400 flex items-center justify-center mb-1">
              <Plus className="h-6 w-6 text-black" />
            </div>
          </Link>
          
          {/* Last two nav items */}
          {navItems.slice(2).map((item) => {
            const isActive = location.pathname === item.href;
            
            return (
              <Link
                key={item.href}
                to={item.href}
                className={cn(
                  "flex flex-col items-center py-2 px-3 min-w-[64px]",
                  "transition-colors duration-200"
                )}
              >
                <item.icon 
                  className={cn(
                    "h-6 w-6 mb-1",
                    isActive 
                      ? "text-amber-300" 
                      : "text-gray-400"
                  )}
                />
                <span 
                  className={cn(
                    "text-xs font-medium",
                    isActive 
                      ? "text-amber-300" 
                      : "text-gray-400"
                  )}
                >
                  {item.label}
                </span>
              </Link>
            );
          })}
        </nav>
      </div>
    </div>
  );
}
