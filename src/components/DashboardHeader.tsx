
import { useToast } from "@/hooks/use-toast";
import { Bell } from "lucide-react";
import { Link } from "react-router-dom";

const DashboardHeader = () => {
  const { toast } = useToast();
  
  const handleNotificationClick = () => {
    toast({
      title: "Notifications",
      description: "You have no new notifications",
    });
  };
  
  return (
    <header className="flex items-center justify-between mb-6 animate-fade-in">
      <div>
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <p className="text-muted-foreground">Welcome back, Sipho</p>
        <Link to="/investments" className="text-finance-blue text-sm">
          View Investments
        </Link>
      </div>
      <button 
        onClick={handleNotificationClick}
        className="w-11 h-11 min-w-[44px] min-h-[44px] rounded-full bg-white border flex items-center justify-center shadow-sm hover:bg-muted/50 transition-colors"
        aria-label="Notifications"
      >
        <Bell className="h-5 w-5" />
      </button>
    </header>
  );
};

export default DashboardHeader;
