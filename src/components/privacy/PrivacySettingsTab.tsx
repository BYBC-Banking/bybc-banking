
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";

interface CommunicationPrefs {
  security: boolean;
  updates: boolean;
  educational: boolean;
}

interface PrivacySettings {
  communicationPrefs: CommunicationPrefs;
  dataRetentionDays: number;
}

interface PrivacySettingsTabProps {
  privacySettings: PrivacySettings;
  onUpdateSetting: (key: string, value: any) => void;
}

export default function PrivacySettingsTab({ privacySettings, onUpdateSetting }: PrivacySettingsTabProps) {
  return (
    <Card className="mobile-card">
      <CardHeader className="mobile-padding">
        <CardTitle className="text-base sm:text-lg">Privacy Settings</CardTitle>
      </CardHeader>
      <CardContent className="mobile-padding space-y-4 sm:space-y-6">
        <div>
          <h4 className="font-semibold text-sm mb-3">Communication Preferences</h4>
          <div className="space-y-3">
            <div className="flex justify-between items-center touch-target">
              <div className="min-w-0 flex-1">
                <div className="font-medium text-xs sm:text-sm">Security Alerts</div>
                <div className="text-xs text-muted-foreground">Important security notifications</div>
              </div>
              <Switch 
                checked={privacySettings.communicationPrefs.security}
                onCheckedChange={(checked) => onUpdateSetting('communicationPrefs', {
                  ...privacySettings.communicationPrefs,
                  security: checked
                })}
                className="ml-2 flex-shrink-0"
              />
            </div>
            <div className="flex justify-between items-center touch-target">
              <div className="min-w-0 flex-1">
                <div className="font-medium text-xs sm:text-sm">Product Updates</div>
                <div className="text-xs text-muted-foreground">Feature announcements and updates</div>
              </div>
              <Switch 
                checked={privacySettings.communicationPrefs.updates}
                onCheckedChange={(checked) => onUpdateSetting('communicationPrefs', {
                  ...privacySettings.communicationPrefs,
                  updates: checked
                })}
                className="ml-2 flex-shrink-0"
              />
            </div>
            <div className="flex justify-between items-center touch-target">
              <div className="min-w-0 flex-1">
                <div className="font-medium text-xs sm:text-sm">Educational Content</div>
                <div className="text-xs text-muted-foreground">Financial education and tips</div>
              </div>
              <Switch 
                checked={privacySettings.communicationPrefs.educational}
                onCheckedChange={(checked) => onUpdateSetting('communicationPrefs', {
                  ...privacySettings.communicationPrefs,
                  educational: checked
                })}
                className="ml-2 flex-shrink-0"
              />
            </div>
          </div>
        </div>

        <div>
          <h4 className="font-semibold text-sm mb-3">Data Retention</h4>
          <div className="p-3 border rounded-lg">
            <div className="font-medium text-xs sm:text-sm">Automatic Data Cleanup</div>
            <div className="text-xs text-muted-foreground mb-2">
              Non-essential data older than {privacySettings.dataRetentionDays} days is automatically deleted
            </div>
            <Badge variant="outline">Currently: {privacySettings.dataRetentionDays} days</Badge>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
