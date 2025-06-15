
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";

interface PrivacySettings {
  analyticsEnabled: boolean;
  locationServices: boolean;
}

interface DataTransparencyTabProps {
  privacySettings: PrivacySettings;
  onUpdateSetting: (key: string, value: any) => void;
}

export default function DataTransparencyTab({ privacySettings, onUpdateSetting }: DataTransparencyTabProps) {
  return (
    <Card className="mobile-card">
      <CardHeader className="mobile-padding">
        <CardTitle className="text-base sm:text-lg">Data Collection Transparency</CardTitle>
      </CardHeader>
      <CardContent className="mobile-padding space-y-4 sm:space-y-6">
        {/* Essential Data */}
        <div>
          <h4 className="font-semibold text-sm mb-3">Essential Data (Required)</h4>
          <div className="space-y-2 sm:space-y-3">
            <div className="flex justify-between items-center p-2 sm:p-3 bg-gray-50 rounded-lg">
              <div className="min-w-0 flex-1">
                <div className="font-medium text-xs sm:text-sm truncate">Wallet Address</div>
                <div className="text-xs text-muted-foreground truncate">Public blockchain identifier</div>
              </div>
              <Badge variant="secondary" className="text-xs ml-2 flex-shrink-0">Device Storage</Badge>
            </div>
            <div className="flex justify-between items-center p-2 sm:p-3 bg-gray-50 rounded-lg">
              <div className="min-w-0 flex-1">
                <div className="font-medium text-xs sm:text-sm truncate">Device Information</div>
                <div className="text-xs text-muted-foreground truncate">Security and compatibility</div>
              </div>
              <Badge variant="secondary" className="text-xs ml-2 flex-shrink-0">Device Storage</Badge>
            </div>
          </div>
        </div>

        {/* Optional Data */}
        <div>
          <h4 className="font-semibold text-sm mb-3">Optional Data (Your Choice)</h4>
          <div className="space-y-2 sm:space-y-3">
            <div className="flex justify-between items-center p-2 sm:p-3 border rounded-lg">
              <div className="min-w-0 flex-1">
                <div className="font-medium text-xs sm:text-sm">Usage Analytics</div>
                <div className="text-xs text-muted-foreground">Help improve app performance</div>
              </div>
              <Switch 
                checked={privacySettings.analyticsEnabled}
                onCheckedChange={(checked) => onUpdateSetting('analyticsEnabled', checked)}
                className="ml-2 flex-shrink-0"
              />
            </div>
            <div className="flex justify-between items-center p-2 sm:p-3 border rounded-lg">
              <div className="min-w-0 flex-1">
                <div className="font-medium text-xs sm:text-sm">Location Services</div>
                <div className="text-xs text-muted-foreground">Optional convenience features</div>
              </div>
              <Switch 
                checked={privacySettings.locationServices}
                onCheckedChange={(checked) => onUpdateSetting('locationServices', checked)}
                className="ml-2 flex-shrink-0"
              />
            </div>
          </div>
        </div>

        {/* Never Collected */}
        <div>
          <h4 className="font-semibold text-sm mb-3">Never Collected</h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            <div className="p-2 bg-green-50 rounded text-xs text-green-800">
              ✅ Private browsing history
            </div>
            <div className="p-2 bg-green-50 rounded text-xs text-green-800">
              ✅ Personal contacts
            </div>
            <div className="p-2 bg-green-50 rounded text-xs text-green-800">
              ✅ Private keys/seed phrases
            </div>
            <div className="p-2 bg-green-50 rounded text-xs text-green-800">
              ✅ Personal documents
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
