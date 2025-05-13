
import { Home, TrendingUp, Book, MessageCircle, User } from "lucide-react";
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
    href: "/",
  },
  {
    icon: TrendingUp,
    label: "Invest",
    href: "/investments",
  },
  {
    icon: Book,
    label: "Learn",
    href: "/education",
  },
  {
    icon: MessageCircle,
    label: "Advisor",
    href: "/advisor",
  },
  {
    icon: User,
    label: "Profile",
    href: "/profile",
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
        <nav className="flex justify-between items-center px-2">
          {navItems.map((item) => {
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
