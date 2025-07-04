
import React from "react";
import { ArrowDownLeft, ArrowUpRight } from "lucide-react";

interface ActivityItem {
  type: string;
  action: string;
  amount: string;
  time: string;
  status: string;
  icon: any;
  iconBg: string;
  amountColor: string;
}

interface CryptoActivityTabProps {
  activityData: ActivityItem[];
  isDarkMode: boolean;
}

const CryptoActivityTab = ({ activityData, isDarkMode }: CryptoActivityTabProps) => {
  return (
    <div className="p-4">
      <h3 className={`text-lg font-bold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
        Recent Activity
      </h3>
      <div className="space-y-3">
        {activityData.map((activity, index) => (
          <div key={index} className={`flex items-center justify-between p-4 rounded-lg ${
            isDarkMode ? 'bg-gray-700/30' : 'bg-gray-50/50'
          }`}>
            <div className="flex items-center gap-3">
              <div className={`w-12 h-12 rounded-full flex items-center justify-center ${activity.iconBg}`}>
                <activity.icon className="h-5 w-5 text-white" />
              </div>
              <div>
                <div className={`font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                  {activity.action}
                </div>
                <div className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  {activity.time}
                </div>
              </div>
            </div>
            <div className="text-right">
              <div className={`font-medium ${activity.amountColor}`}>
                {activity.amount}
              </div>
              <div className={`text-xs px-2 py-1 rounded-full bg-green-500/20 text-green-500`}>
                {activity.status}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CryptoActivityTab;
