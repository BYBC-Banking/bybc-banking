
import React, { useState } from 'react';
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from '@/hooks/use-toast';
import PrivacyOverviewCards from '@/components/privacy/PrivacyOverviewCards';
import PrivacyQuickActions from '@/components/privacy/PrivacyQuickActions';
import DataTransparencyTab from '@/components/privacy/DataTransparencyTab';
import AuditTrailTab from '@/components/privacy/AuditTrailTab';
import PrivacySettingsTab from '@/components/privacy/PrivacySettingsTab';
import PrivacyPolicyTab from '@/components/privacy/PrivacyPolicyTab';

export default function PrivacyDashboard() {
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [privacySettings, setPrivacySettings] = useState({
    analyticsEnabled: true,
    crashReportingLevel: 'minimal' as 'none' | 'minimal' | 'detailed',
    locationServices: false,
    dataRetentionDays: 90,
    communicationPrefs: {
      security: true,
      updates: false,
      educational: true
    }
  });

  const handleBack = () => {
    navigate(-1);
  };

  const handleExportData = () => {
    toast({
      title: "Data Export Initiated",
      description: "Your data export will be ready for download in a few minutes"
    });
  };

  const updatePrivacySetting = (key: string, value: any) => {
    setPrivacySettings(prev => ({
      ...prev,
      [key]: value
    }));
    toast({
      title: "Privacy Setting Updated",
      description: "Your privacy preferences have been saved"
    });
  };

  const privacyScore = 95;
  const auditEvents = [
    {
      id: '1',
      timestamp: new Date('2024-06-14T10:30:00'),
      category: 'auth' as const,
      title: 'Biometric Authentication',
      description: 'Face ID used to unlock wallet',
      device: 'iPhone 15 Pro',
      riskLevel: 'low' as const,
      contextualHelp: 'Biometric data never leaves your device'
    },
    {
      id: '2',
      timestamp: new Date('2024-06-14T09:15:00'),
      category: 'transaction' as const,
      title: 'Transaction Initiated',
      description: 'BTC swap to ZAR scheduled',
      device: 'iPhone 15 Pro',
      riskLevel: 'low' as const,
      contextualHelp: 'Transaction data encrypted before transmission'
    },
    {
      id: '3',
      timestamp: new Date('2024-06-13T16:45:00'),
      category: 'security' as const,
      title: 'Settings Changed',
      description: 'Privacy preferences updated',
      device: 'iPhone 15 Pro',
      riskLevel: 'low' as const,
      contextualHelp: 'Changes logged for your security'
    }
  ];

  return (
    <div className="container mx-auto max-w-md px-3 py-4 sm:max-w-6xl sm:px-4 sm:py-8">
      {/* Header - Mobile optimized */}
      <header className="flex items-center gap-3 sm:gap-4 mb-4 sm:mb-6">
        <button onClick={handleBack} className="p-2 -ml-2 touch-target">
          <ArrowLeft className="h-5 w-5" />
        </button>
        <div className="min-w-0 flex-1">
          <h1 className="text-xl sm:text-2xl font-bold truncate">Privacy & Data</h1>
          <p className="text-xs sm:text-sm text-muted-foreground truncate">Dashboard</p>
        </div>
      </header>

      {/* Overview Cards */}
      <PrivacyOverviewCards 
        privacyScore={privacyScore}
        auditEventsCount={auditEvents.length}
      />

      {/* Quick Actions */}
      <PrivacyQuickActions onExportData={handleExportData} />

      {/* Main Content Tabs - Mobile optimized */}
      <Tabs defaultValue="transparency" className="space-y-4">
        <TabsList className="grid w-full grid-cols-2 sm:grid-cols-4 h-12 sm:h-10">
          <TabsTrigger value="transparency" className="text-xs sm:text-sm px-1 sm:px-3">
            Data
          </TabsTrigger>
          <TabsTrigger value="audit" className="text-xs sm:text-sm px-1 sm:px-3">
            Audit
          </TabsTrigger>
          <TabsTrigger value="settings" className="text-xs sm:text-sm px-1 sm:px-3">
            Settings
          </TabsTrigger>
          <TabsTrigger value="policy" className="text-xs sm:text-sm px-1 sm:px-3">
            Policy
          </TabsTrigger>
        </TabsList>

        <TabsContent value="transparency" className="space-y-4">
          <DataTransparencyTab 
            privacySettings={privacySettings}
            onUpdateSetting={updatePrivacySetting}
          />
        </TabsContent>

        <TabsContent value="audit" className="space-y-4">
          <AuditTrailTab auditEvents={auditEvents} />
        </TabsContent>

        <TabsContent value="settings" className="space-y-4">
          <PrivacySettingsTab 
            privacySettings={privacySettings}
            onUpdateSetting={updatePrivacySetting}
          />
        </TabsContent>

        <TabsContent value="policy" className="space-y-4">
          <PrivacyPolicyTab />
        </TabsContent>
      </Tabs>
    </div>
  );
}
