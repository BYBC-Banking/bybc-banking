
import RecentNotifications from "./RecentNotifications";
import NotificationFilters from "./NotificationFilters";
import NotificationSettings from "./NotificationSettings";
import BusinessHours from "./BusinessHours";

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

  return (
    <div className="space-y-4 sm:space-y-6">
      <RecentNotifications notifications={notifications} />
      <NotificationFilters />
      <NotificationSettings notificationSettings={notificationSettings} />
      <BusinessHours />
    </div>
  );
};

export default NotificationCenter;
