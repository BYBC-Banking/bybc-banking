
import { useState } from "react";
import { ArrowLeft, Bell } from "lucide-react";
import { Link } from "react-router-dom";

type Notification = {
  id: string;
  title: string;
  message: string;
  time: string;
  read: boolean;
};

const Notifications = () => {
  // Mock notifications data
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: "1",
      title: "Account Alert",
      message: "Your account balance is below R500",
      time: "10 minutes ago",
      read: false
    },
    {
      id: "2",
      title: "Transaction Complete",
      message: "Payment to Woolworths of R45.75 successful",
      time: "2 hours ago",
      read: false
    },
    {
      id: "3",
      title: "Security Update",
      message: "New login detected on your account",
      time: "Yesterday",
      read: true
    },
    {
      id: "4",
      title: "Investment Update",
      message: "Your investment portfolio has grown by 2.3% this month",
      time: "2 days ago",
      read: true
    }
  ]);

  const markAsRead = (id: string) => {
    setNotifications(notifications.map(notification => 
      notification.id === id ? { ...notification, read: true } : notification
    ));
  };

  return (
    <div className="bg-gradient-to-br from-white to-slate-100 min-h-screen">
      <div className="container mx-auto max-w-md px-4 py-6">
        {/* Header */}
        <header className="flex items-center gap-4 mb-6">
          <Link to="/" className="p-2">
            <ArrowLeft className="h-5 w-5" />
          </Link>
          <h1 className="text-2xl font-bold">Notifications</h1>
        </header>
        
        {/* Notifications List */}
        <div className="space-y-4">
          {notifications.length > 0 ? (
            notifications.map((notification) => (
              <div
                key={notification.id}
                className={`bg-white rounded-xl shadow-sm border p-4 ${!notification.read ? 'border-l-4 border-l-blue-500' : ''}`}
                onClick={() => markAsRead(notification.id)}
              >
                <div className="flex justify-between items-start">
                  <div className="flex items-start gap-3">
                    <div className="bg-slate-100 rounded-full p-2 mt-1">
                      <Bell className="h-5 w-5 text-finance-blue" />
                    </div>
                    <div>
                      <div className="font-medium">{notification.title}</div>
                      <div className="text-sm text-gray-600">{notification.message}</div>
                      <div className="text-xs text-muted-foreground mt-1">{notification.time}</div>
                    </div>
                  </div>
                  {!notification.read && (
                    <div className="w-2 h-2 rounded-full bg-blue-500" />
                  )}
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-8 text-muted-foreground">
              <Bell className="h-12 w-12 mx-auto mb-3 opacity-30" />
              <p>No notifications</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Notifications;
