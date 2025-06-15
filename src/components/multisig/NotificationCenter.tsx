
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { 
  Bell, 
  Clock, 
  CheckCircle, 
  AlertTriangle, 
  Users, 
  Settings,
  Smartphone,
  Mail,
  MessageSquare
} from "lucide-react";

const NotificationCenter = () => {
  // Mock notification data
  const notifications = [
    {
      id: "1",
      type: "urgent",
      title: "Transaction approval needed",
      message: "0.005 BTC transfer expires in 8 hours",
      timestamp: "2 minutes ago",
      unread: true,
      actionRequired: true
    },
    {
      id: "2",
      type: "approval",
      title: "Transaction approved by Alice",
      message: "R15,000 transfer to John Smith",
      timestamp: "1 hour ago",
      unread: true,
      actionRequired: false
    },
    {
      id: "3",
      type: "signer",
      title: "New signer added",
      message: "Carol Davis joined as view-only member",
      timestamp: "3 hours ago",
      unread: false,
      actionRequired: false
    },
    {
      id: "4",
      type: "completed",
      title: "Transaction executed",
      message: "0.001 BTC sent successfully",
      timestamp: "1 day ago",
      unread: false,
      actionRequired: false
    }
  ];

  const notificationSettings = [
    {
      category: "Transaction Alerts",
      settings: [
        { name: "New transaction created", push: true, email: true, inApp: true },
        { name: "Approval required", push: true, email: true, inApp: true },
        { name: "Transaction approved", push: false, email: true, inApp: true },
        { name: "Transaction executed", push: true, email: false, inApp: true }
      ]
    },
    {
      category: "Urgent Notifications",
      settings: [
        { name: "Expiring transactions (24h)", push: true, email: true, inApp: true },
        { name: "Expiring transactions (1h)", push: true, email: true, inApp: true },
        { name: "Failed transactions", push: true, email: true, inApp: true }
      ]
    },
    {
      category: "Team Updates",
      settings: [
        { name: "Signer added/removed", push: false, email: true, inApp: true },
        { name: "Role changes", push: false, email: true, inApp: true },
        { name: "Settings modified", push: false, email: false, inApp: true }
      ]
    }
  ];

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
    <div className="space-y-4 sm:space-y-6">
      {/* Recent Notifications */}
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

      {/* Notification Categories */}
      <Card>
        <CardHeader className="mobile-padding">
          <CardTitle className="text-base sm:text-lg flex items-center gap-2">
            <Clock className="h-4 w-4 sm:h-5 sm:w-5" />
            Quick Filters
          </CardTitle>
        </CardHeader>
        <CardContent className="mobile-padding">
          <div className="grid grid-cols-2 gap-3">
            <Button variant="outline" className="flex items-center gap-2 text-xs">
              <AlertTriangle className="h-3 w-3 sm:h-4 sm:w-4 text-red-500" />
              <span className="truncate">Urgent (1)</span>
            </Button>
            <Button variant="outline" className="flex items-center gap-2 text-xs">
              <Clock className="h-3 w-3 sm:h-4 sm:w-4 text-orange-500" />
              <span className="truncate">Pending (2)</span>
            </Button>
            <Button variant="outline" className="flex items-center gap-2 text-xs">
              <CheckCircle className="h-3 w-3 sm:h-4 sm:w-4 text-green-500" />
              <span className="truncate">Completed (1)</span>
            </Button>
            <Button variant="outline" className="flex items-center gap-2 text-xs">
              <Users className="h-3 w-3 sm:h-4 sm:w-4 text-blue-500" />
              <span className="truncate">Team (1)</span>
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Notification Settings */}
      <Card>
        <CardHeader className="mobile-padding">
          <CardTitle className="text-base sm:text-lg flex items-center gap-2">
            <Settings className="h-4 w-4 sm:h-5 sm:w-5" />
            Notification Preferences
          </CardTitle>
        </CardHeader>
        <CardContent className="mobile-padding space-y-6">
          {notificationSettings.map((category, categoryIndex) => (
            <div key={categoryIndex} className="space-y-4">
              <h3 className="font-semibold text-sm sm:text-base text-gray-900">{category.category}</h3>
              <div className="space-y-4">
                {category.settings.map((setting, settingIndex) => (
                  <div key={settingIndex} className="space-y-3 p-3 bg-gray-50 rounded-lg">
                    <div className="font-medium text-sm">{setting.name}</div>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between py-2">
                        <div className="flex items-center gap-3">
                          <Smartphone className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                          <span className="text-sm font-medium">Push Notifications</span>
                        </div>
                        <Switch checked={setting.push} className="flex-shrink-0" />
                      </div>
                      <div className="flex items-center justify-between py-2">
                        <div className="flex items-center gap-3">
                          <Mail className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                          <span className="text-sm font-medium">Email Alerts</span>
                        </div>
                        <Switch checked={setting.email} className="flex-shrink-0" />
                      </div>
                      <div className="flex items-center justify-between py-2">
                        <div className="flex items-center gap-3">
                          <Bell className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                          <span className="text-sm font-medium">In-App Notifications</span>
                        </div>
                        <Switch checked={setting.inApp} className="flex-shrink-0" />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Business Hours */}
      <Card>
        <CardHeader className="mobile-padding">
          <CardTitle className="text-base sm:text-lg">Business Hours</CardTitle>
        </CardHeader>
        <CardContent className="mobile-padding space-y-4">
          <div className="flex items-center justify-between py-3">
            <div className="flex-1">
              <div className="font-medium text-sm">Quiet hours</div>
              <div className="text-xs sm:text-sm text-muted-foreground">Reduce notifications during off-hours</div>
            </div>
            <Switch className="flex-shrink-0 ml-4" />
          </div>
          
          <div className="text-xs sm:text-sm text-muted-foreground p-3 bg-gray-50 rounded-lg">
            <div>Business hours: 9:00 AM - 6:00 PM</div>
            <div>Timezone: South Africa Standard Time (SAST)</div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default NotificationCenter;
