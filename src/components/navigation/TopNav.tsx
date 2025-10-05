
import React from "react";
import { Bell, Menu, LogOut, User, Inbox, Settings, HelpCircle, FileText, Globe, Gift } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/AuthContext";
import { logoutUser } from "@/services/supabase/authService";

const menuItems = [
  {
    label: "Profile",
    href: "/profile",
    icon: User
  },
  {
    label: "Inbox",
    href: "/inbox",
    icon: Inbox
  },
  {
    label: "Settings",
    href: "/settings",
    icon: Settings
  },
  {
    label: "Referral and Earn",
    href: "/referral",
    icon: Gift
  },
  {
    label: "Help",
    href: "/help",
    icon: HelpCircle
  }, 
  {
    label: "Legal",
    href: "/legal",
    icon: FileText
  }, 
  {
    label: "Language",
    href: "/language",
    icon: Globe
  }
];

export default function TopNav() {
  const [open, setOpen] = React.useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();
  const { user } = useAuth();

  // Close the menu after navigation
  const handleMenuItemClick = () => {
    setOpen(false);
  };
  
  const handleLogout = async () => {
    setOpen(false);
    
    try {
      await logoutUser();
      toast({
        title: "Logged out",
        description: "You have been successfully logged out"
      });
      
      // Redirect to login page
      navigate('/login');
    } catch (error) {
      toast({
        title: "Logout failed",
        description: "There was an error logging you out. Please try again.",
        variant: "destructive"
      });
    }
  };
  
  const location = useLocation();
  const isHomePage = location.pathname === '/dashboard' || location.pathname === '/';
  
  return (
    <div className="sticky top-0 left-0 right-0 z-40 bg-[#1A1F2C] border-b border-white/10">
      <div className="flex justify-between items-center h-14 px-4">
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild>
            <button aria-label="Menu" className="p-2 rounded-md hover:bg-white/10 transition-colors">
              <Menu className="h-6 w-6 text-white" />
            </button>
          </SheetTrigger>
          <SheetContent side="left" className="bg-[#222222] border-r border-white/10 p-0">
            <div className="pt-6">
              <div className="px-6 pb-4 border-b border-white/10">
                <h2 className="text-lg font-medium text-white">Menu</h2>
              </div>
              
              <nav className="mt-4 flex flex-col h-full">
                <div>
                  {menuItems.map(item => (
                    <Link 
                      key={item.href} 
                      to={item.href} 
                      onClick={handleMenuItemClick} 
                      className={cn("flex items-center py-3 px-6", "text-gray-200 hover:bg-white/5 transition-colors")}
                    >
                      <item.icon className="h-5 w-5 mr-3" />
                      <span>{item.label}</span>
                    </Link>
                  ))}
                </div>
                
                <div className="mt-auto pb-4">
                  <Separator className="my-2 bg-white/10" />
                  <button onClick={handleLogout} className="flex items-center py-3 px-6 w-full text-left text-red-400 hover:bg-white/5 transition-colors">
                    <LogOut className="h-5 w-5 mr-3" />
                    <span>Log Out</span>
                  </button>
                </div>
              </nav>
            </div>
          </SheetContent>
        </Sheet>
        
        {isHomePage ? (
          <Link to="/dashboard" className="flex items-center space-x-1">
            <img src="/lovable-uploads/9b582461-f327-43f4-991f-e50e68817084.png" alt="BYBC Banking" className="h-16 w-16" />
            <span className="text-white font-bold text-lg">BYBC</span>
          </Link>
        ) : (
          <h1 className="text-white font-bold text-lg">BYBC</h1>
        )}
        
        <Link to="/notifications" className="p-2 rounded-md hover:bg-white/10 transition-colors">
          <Bell className="h-6 w-6 text-white" />
        </Link>
      </div>
    </div>
  );
}
