
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { 
  Settings,
  Smartphone,
  Mail,
  Bell
} from "lucide-react";

interface NotificationSetting {
  name: string;
  push: boolean;
  email: boolean;
  inApp: boolean;
}

interface NotificationCategory {
  category: string;
  settings: NotificationSetting[];
}

interface NotificationSettingsProps {
  notificationSettings: NotificationCategory[];
}

const NotificationSettings = ({ notificationSettings }: NotificationSettingsProps) => {
  return (
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
                <div key={settingIndex} className="bg-gray-50 rounded-lg p-4">
                  <div className="font-medium text-sm mb-4">{setting.name}</div>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <Smartphone className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                        <span className="text-sm font-medium">Push Notifications</span>
                      </div>
                      <Switch checked={setting.push} className="flex-shrink-0" />
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <Mail className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                        <span className="text-sm font-medium">Email Alerts</span>
                      </div>
                      <Switch checked={setting.email} className="flex-shrink-0" />
                    </div>
                    <div className="flex items-center justify-between">
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
  );
};

export default NotificationSettings;
