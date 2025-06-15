
import React, { useState } from 'react';
import { ArrowLeft, Download, Shield, Eye, FileText, Users, Settings, Calendar, Filter } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from '@/hooks/use-toast';

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

      {/* Overview Cards - Mobile optimized grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 mb-4 sm:mb-6">
        <Card className="mobile-card">
          <CardHeader className="pb-2 mobile-padding">
            <CardTitle className="text-xs sm:text-sm flex items-center gap-1 sm:gap-2">
              <Shield className="h-3 w-3 sm:h-4 sm:w-4 text-green-600" />
              <span className="truncate">Privacy Score</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="mobile-padding pt-0">
            <div className="text-lg sm:text-2xl font-bold text-green-600">{privacyScore}%</div>
            <Badge variant="outline" className="text-xs mt-1 bg-green-50 text-green-700">
              Excellent
            </Badge>
          </CardContent>
        </Card>

        <Card className="mobile-card">
          <CardHeader className="pb-2 mobile-padding">
            <CardTitle className="text-xs sm:text-sm flex items-center gap-1 sm:gap-2">
              <Eye className="h-3 w-3 sm:h-4 sm:w-4 text-blue-600" />
              <span className="truncate">Data Usage</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="mobile-padding pt-0">
            <div className="text-xs sm:text-sm font-medium">Device Only</div>
            <div className="text-xs text-muted-foreground mt-1 truncate">
              Wallet data, Session info
            </div>
          </CardContent>
        </Card>

        <Card className="mobile-card">
          <CardHeader className="pb-2 mobile-padding">
            <CardTitle className="text-xs sm:text-sm flex items-center gap-1 sm:gap-2">
              <FileText className="h-3 w-3 sm:h-4 sm:w-4 text-purple-600" />
              <span className="truncate">Audit Trail</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="mobile-padding pt-0">
            <div className="text-lg sm:text-lg font-bold">{auditEvents.length}</div>
            <div className="text-xs text-muted-foreground mt-1 truncate">
              Recent activities
            </div>
          </CardContent>
        </Card>

        <Card className="mobile-card">
          <CardHeader className="pb-2 mobile-padding">
            <CardTitle className="text-xs sm:text-sm flex items-center gap-1 sm:gap-2">
              <Users className="h-3 w-3 sm:h-4 sm:w-4 text-orange-600" />
              <span className="truncate">Third Parties</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="mobile-padding pt-0">
            <div className="text-lg sm:text-lg font-bold">2</div>
            <div className="text-xs text-muted-foreground mt-1 truncate">
              Essential partners only
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions - Mobile optimized */}
      <div className="bg-white rounded-lg shadow-sm p-3 sm:p-4 mb-4 sm:mb-6">
        <h3 className="font-semibold text-sm sm:text-base mb-3">Quick Actions</h3>
        <div className="grid grid-cols-2 sm:flex sm:flex-wrap gap-2">
          <Button variant="outline" size="sm" onClick={handleExportData} className="mobile-button text-xs sm:text-sm">
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
                      onCheckedChange={(checked) => updatePrivacySetting('analyticsEnabled', checked)}
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
                      onCheckedChange={(checked) => updatePrivacySetting('locationServices', checked)}
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
        </TabsContent>

        <TabsContent value="audit" className="space-y-4">
          <Card className="mobile-card">
            <CardHeader className="mobile-padding flex flex-row items-center justify-between">
              <CardTitle className="text-base sm:text-lg">Activity Audit Trail</CardTitle>
              <Button variant="outline" size="sm" className="text-xs">
                <Filter className="h-3 w-3 mr-1" />
                Filter
              </Button>
            </CardHeader>
            <CardContent className="mobile-padding">
              <div className="space-y-3">
                {auditEvents.map((event) => (
                  <div key={event.id} className="border rounded-lg p-3 sm:p-4 touch-target">
                    <div className="flex justify-between items-start">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <div className="font-medium text-xs sm:text-sm truncate">{event.title}</div>
                          <Badge 
                            variant={event.riskLevel === 'low' ? 'secondary' : 'destructive'}
                            className="text-xs flex-shrink-0"
                          >
                            {event.riskLevel}
                          </Badge>
                        </div>
                        <div className="text-xs text-muted-foreground mb-2 truncate">{event.description}</div>
                        <div className="text-xs text-muted-foreground">
                          {event.timestamp.toLocaleString()} • {event.device}
                        </div>
                      </div>
                    </div>
                    <div className="mt-2 p-2 bg-blue-50 rounded text-xs text-blue-800">
                      💡 {event.contextualHelp}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="settings" className="space-y-4">
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
                      onCheckedChange={(checked) => updatePrivacySetting('communicationPrefs', {
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
                      onCheckedChange={(checked) => updatePrivacySetting('communicationPrefs', {
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
                      onCheckedChange={(checked) => updatePrivacySetting('communicationPrefs', {
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
        </TabsContent>

        <TabsContent value="policy" className="space-y-4">
          <Card className="mobile-card">
            <CardHeader className="mobile-padding">
              <CardTitle className="text-base sm:text-lg">Privacy Policy (Plain Language)</CardTitle>
            </CardHeader>
            <CardContent className="mobile-padding space-y-4 sm:space-y-6">
              <div>
                <h4 className="font-semibold text-sm mb-3 text-green-600">✅ What We DO</h4>
                <ul className="space-y-2 text-xs sm:text-sm">
                  <li>• Keep wallet data on YOUR device</li>
                  <li>• Encrypt any stored data</li>
                  <li>• Never sell personal information</li>
                  <li>• Only collect what's needed</li>
                  <li>• Give you full control over your data</li>
                </ul>
              </div>

              <div>
                <h4 className="font-semibold text-sm mb-3 text-red-600">❌ What We DON'T Do</h4>
                <ul className="space-y-2 text-xs sm:text-sm">
                  <li>• Track location without permission</li>
                  <li>• Read personal files</li>
                  <li>• Share with advertisers</li>
                  <li>• Store private keys</li>
                  <li>• Sell your data to anyone</li>
                </ul>
              </div>

              <div>
                <h4 className="font-semibold text-sm mb-3">Third-Party Services</h4>
                <div className="space-y-3">
                  <div className="border rounded-lg p-3">
                    <div className="font-medium text-xs sm:text-sm">AWS Cloud Infrastructure</div>
                    <div className="text-xs text-muted-foreground mt-1">
                      Purpose: App infrastructure and encrypted data backup
                    </div>
                    <div className="text-xs text-muted-foreground">
                      Data Shared: Encrypted app data only (cannot read content)
                    </div>
                    <Badge variant="outline" className="text-xs mt-2">SOC 2 Compliant</Badge>
                  </div>
                  <div className="border rounded-lg p-3">
                    <div className="font-medium text-xs sm:text-sm">Blockchain Networks</div>
                    <div className="text-xs text-muted-foreground mt-1">
                      Purpose: Execute cryptocurrency transactions
                    </div>
                    <div className="text-xs text-muted-foreground">
                      Data Shared: Public wallet addresses only (required for blockchain)
                    </div>
                    <Badge variant="outline" className="text-xs mt-2">Public Ledger</Badge>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
