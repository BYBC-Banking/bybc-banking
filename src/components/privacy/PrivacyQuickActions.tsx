
import React from 'react';
import { Download, Settings, Calendar, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";

interface PrivacyQuickActionsProps {
  onExportData: () => void;
}

export default function PrivacyQuickActions({ onExportData }: PrivacyQuickActionsProps) {
  return (
    <div className="bg-white rounded-lg shadow-sm p-3 sm:p-4 mb-4 sm:mb-6">
      <h3 className="font-semibold text-sm sm:text-base mb-3">Quick Actions</h3>
      <div className="grid grid-cols-2 sm:flex sm:flex-wrap gap-2">
        <Button variant="outline" size="sm" onClick={onExportData} className="mobile-button text-xs sm:text-sm">
          <Download className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
          <span className="truncate">Download Data</span>
        </Button>
        <Button variant="outline" size="sm" className="mobile-button text-xs sm:text-sm">
          <Settings className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
          <span className="truncate">Settings</span>
        </Button>
        <Button variant="outline" size="sm" className="mobile-button text-xs sm:text-sm">
          <Calendar className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
          <span className="truncate">Activity</span>
        </Button>
        <Button variant="outline" size="sm" className="mobile-button text-xs sm:text-sm">
          <FileText className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
          <span className="truncate">Export Logs</span>
        </Button>
      </div>
    </div>
  );
}
