
import { useToast } from "@/components/ui/use-toast";
import { Bell } from "lucide-react";

const DashboardHeader = () => {
  const { toast } = useToast();
  
  const handleNotificationClick = () => {
    toast({
      title: "Notifications",
      description: "You have no new notifications",
    });
  };
  
  return (
    <header className="flex items-center justify-between mb-4">
      <div>
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <p className="text-muted-foreground">Welcome back, Sipho</p>
      </div>
      <button 
        onClick={handleNotificationClick}
        className="w-10 h-10 rounded-full bg-white border flex items-center justify-center"
        aria-label="Notifications"
      >
        <Bell className="h-5 w-5" />
      </button>
    </header>
  );
};

export default DashboardHeader;
