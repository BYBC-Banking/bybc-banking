
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Bell, 
  CheckCircle, 
  AlertTriangle, 
  Users
} from "lucide-react";

interface Notification {
  id: string;
  type: string;
  title: string;
  message: string;
  timestamp: string;
  unread: boolean;
  actionRequired: boolean;
}

interface RecentNotificationsProps {
  notifications: Notification[];
}

const RecentNotifications = ({ notifications }: RecentNotificationsProps) => {
  const getNotificationIcon = (type: string) => {
    switch (type) {
      case "urgent": return <AlertTriangle className="h-5 w-5 text-red-500" />;
      case "approval": return <CheckCircle className="h-5 w-5 text-green-500" />;
      case "signer": return <Users className="h-5 w-5 text-blue-500" />;
      case "completed": return <CheckCircle className="h-5 w-5 text-gray-500" />;
      default: return <Bell className="h-5 w-5 text-gray-500" />;
    }
  };

  const getNotificationColor = (type: string, unread: boolean) => {
    if (!unread) return "border-gray-200";
    
    switch (type) {
      case "urgent": return "border-l-4 border-l-red-500 bg-red-50";
      case "approval": return "border-l-4 border-l-green-500 bg-green-50";
      case "signer": return "border-l-4 border-l-blue-500 bg-blue-50";
      default: return "border-l-4 border-l-gray-500 bg-gray-50";
    }
  };

  return (
    <Card>
      <CardHeader className="mobile-padding">
        <div className="flex items-center justify-between">
          <CardTitle className="text-base sm:text-lg flex items-center gap-2">
            <Bell className="h-4 w-4 sm:h-5 sm:w-5" />
            Recent Notifications
          </CardTitle>
          <Button variant="outline" size="sm" className="text-xs">
            Mark all read
          </Button>
        </div>
      </CardHeader>
      <CardContent className="mobile-padding space-y-3">
        {notifications.map((notification) => (
          <div 
            key={notification.id} 
            className={`p-3 rounded-lg ${getNotificationColor(notification.type, notification.unread)}`}
          >
            <div className="flex items-start gap-3">
              {getNotificationIcon(notification.type)}
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-1">
                  <div className="font-medium text-xs sm:text-sm truncate">{notification.title}</div>
                  <div className="text-xs text-muted-foreground flex-shrink-0 ml-2">{notification.timestamp}</div>
                </div>
                <div className="text-xs sm:text-sm text-muted-foreground mb-2">
                  {notification.message}
                </div>
                {notification.actionRequired && (
                  <Button size="sm" className="text-xs">
                    Take Action
                  </Button>
                )}
              </div>
              {notification.unread && (
                <div className="w-2 h-2 bg-blue-500 rounded-full mt-1 flex-shrink-0" />
              )}
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};

export default RecentNotifications;
