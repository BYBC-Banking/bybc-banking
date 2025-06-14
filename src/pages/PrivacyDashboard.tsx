
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
    <div className="container mx-auto max-w-6xl py-8 px-4">
      <header className="flex items-center gap-4 mb-6">
        <button onClick={handleBack} className="p-2">
          <ArrowLeft className="h-5 w-5" />
        </button>
        <h1 className="text-2xl font-bold">Privacy & Data Dashboard</h1>
      </header>

      {/* Overview Cards */}
      <div className="grid md:grid-cols-4 gap-4 mb-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm flex items-center gap-2">
              <Shield className="h-4 w-4 text-green-600" />
              Privacy Score
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{privacyScore}%</div>
            <Badge variant="outline" className="text-xs mt-1 bg-green-50 text-green-700">
              Excellent
            </Badge>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm flex items-center gap-2">
              <Eye className="h-4 w-4 text-blue-600" />
              Data Usage
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-sm font-medium">Device Only</div>
            <div className="text-xs text-muted-foreground mt-1">
              Wallet data, Session info
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm flex items-center gap-2">
              <FileText className="h-4 w-4 text-purple-600" />
              Audit Trail
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-lg font-bold">{auditEvents.length}</div>
            <div className="text-xs text-muted-foreground mt-1">
              Recent activities
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm flex items-center gap-2">
              <Users className="h-4 w-4 text-orange-600" />
              Third Parties
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-lg font-bold">2</div>
            <div className="text-xs text-muted-foreground mt-1">
              Essential partners only
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
        <h3 className="font-semibold mb-3">Quick Actions</h3>
        <div className="flex flex-wrap gap-2">
          <Button variant="outline" size="sm" onClick={handleExportData}>
            <Download className="h-4 w-4 mr-2" />
            Download My Data
          </Button>
          <Button variant="outline" size="sm">
            <Settings className="h-4 w-4 mr-2" />
            Review Settings
          </Button>
          <Button variant="outline" size="sm">
            <Calendar className="h-4 w-4 mr-2" />
            View Activity
          </Button>
          <Button variant="outline" size="sm">
            <FileText className="h-4 w-4 mr-2" />
            Export Logs
          </Button>
        </div>
      </div>

      {/* Main Content Tabs */}
      <Tabs defaultValue="transparency" className="space-y-4">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="transparency">Data Transparency</TabsTrigger>
          <TabsTrigger value="audit">Audit Trail</TabsTrigger>
          <TabsTrigger value="settings">Privacy Settings</TabsTrigger>
          <TabsTrigger value="policy">Privacy Policy</TabsTrigger>
        </TabsList>

        <TabsContent value="transparency" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Data Collection Transparency</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Essential Data */}
              <div>
                <h4 className="font-semibold text-sm mb-3">Essential Data (Required)</h4>
                <div className="space-y-3">
                  <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                    <div>
                      <div className="font-medium text-sm">Wallet Address</div>
                      <div className="text-xs text-muted-foreground">Public blockchain identifier</div>
                    </div>
                    <Badge variant="secondary">Device Storage</Badge>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                    <div>
                      <div className="font-medium text-sm">Device Information</div>
                      <div className="text-xs text-muted-foreground">Security and compatibility</div>
                    </div>
                    <Badge variant="secondary">Device Storage</Badge>
                  </div>
                </div>
              </div>

              {/* Optional Data */}
              <div>
                <h4 className="font-semibold text-sm mb-3">Optional Data (Your Choice)</h4>
                <div className="space-y-3">
                  <div className="flex justify-between items-center p-3 border rounded-lg">
                    <div>
                      <div className="font-medium text-sm">Usage Analytics</div>
                      <div className="text-xs text-muted-foreground">Help improve app performance</div>
                    </div>
                    <Switch 
                      checked={privacySettings.analyticsEnabled}
                      onCheckedChange={(checked) => updatePrivacySetting('analyticsEnabled', checked)}
                    />
                  </div>
                  <div className="flex justify-between items-center p-3 border rounded-lg">
                    <div>
                      <div className="font-medium text-sm">Location Services</div>
                      <div className="text-xs text-muted-foreground">Optional convenience features</div>
                    </div>
                    <Switch 
                      checked={privacySettings.locationServices}
                      onCheckedChange={(checked) => updatePrivacySetting('locationServices', checked)}
                    />
                  </div>
                </div>
              </div>

              {/* Never Collected */}
              <div>
                <h4 className="font-semibold text-sm mb-3">Never Collected</h4>
                <div className="grid grid-cols-2 gap-2">
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
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Activity Audit Trail</CardTitle>
              <Button variant="outline" size="sm">
                <Filter className="h-4 w-4 mr-2" />
                Filter
              </Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {auditEvents.map((event) => (
                  <div key={event.id} className="border rounded-lg p-4">
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <div className="font-medium text-sm">{event.title}</div>
                          <Badge 
                            variant={event.riskLevel === 'low' ? 'secondary' : 'destructive'}
                            className="text-xs"
                          >
                            {event.riskLevel}
                          </Badge>
                        </div>
                        <div className="text-xs text-muted-foreground mb-2">{event.description}</div>
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
          <Card>
            <CardHeader>
              <CardTitle>Privacy Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h4 className="font-semibold text-sm mb-3">Communication Preferences</h4>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <div>
                      <div className="font-medium text-sm">Security Alerts</div>
                      <div className="text-xs text-muted-foreground">Important security notifications</div>
                    </div>
                    <Switch 
                      checked={privacySettings.communicationPrefs.security}
                      onCheckedChange={(checked) => updatePrivacySetting('communicationPrefs', {
                        ...privacySettings.communicationPrefs,
                        security: checked
                      })}
                    />
                  </div>
                  <div className="flex justify-between items-center">
                    <div>
                      <div className="font-medium text-sm">Product Updates</div>
                      <div className="text-xs text-muted-foreground">Feature announcements and updates</div>
                    </div>
                    <Switch 
                      checked={privacySettings.communicationPrefs.updates}
                      onCheckedChange={(checked) => updatePrivacySetting('communicationPrefs', {
                        ...privacySettings.communicationPrefs,
                        updates: checked
                      })}
                    />
                  </div>
                  <div className="flex justify-between items-center">
                    <div>
                      <div className="font-medium text-sm">Educational Content</div>
                      <div className="text-xs text-muted-foreground">Financial education and tips</div>
                    </div>
                    <Switch 
                      checked={privacySettings.communicationPrefs.educational}
                      onCheckedChange={(checked) => updatePrivacySetting('communicationPrefs', {
                        ...privacySettings.communicationPrefs,
                        educational: checked
                      })}
                    />
                  </div>
                </div>
              </div>

              <div>
                <h4 className="font-semibold text-sm mb-3">Data Retention</h4>
                <div className="p-3 border rounded-lg">
                  <div className="font-medium text-sm">Automatic Data Cleanup</div>
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
          <Card>
            <CardHeader>
              <CardTitle>Privacy Policy (Plain Language)</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h4 className="font-semibold text-sm mb-3 text-green-600">✅ What We DO</h4>
                <ul className="space-y-2 text-sm">
                  <li>• Keep wallet data on YOUR device</li>
                  <li>• Encrypt any stored data</li>
                  <li>• Never sell personal information</li>
                  <li>• Only collect what's needed</li>
                  <li>• Give you full control over your data</li>
                </ul>
              </div>

              <div>
                <h4 className="font-semibold text-sm mb-3 text-red-600">❌ What We DON'T Do</h4>
                <ul className="space-y-2 text-sm">
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
                    <div className="font-medium text-sm">AWS Cloud Infrastructure</div>
                    <div className="text-xs text-muted-foreground mt-1">
                      Purpose: App infrastructure and encrypted data backup
                    </div>
                    <div className="text-xs text-muted-foreground">
                      Data Shared: Encrypted app data only (cannot read content)
                    </div>
                    <Badge variant="outline" className="text-xs mt-2">SOC 2 Compliant</Badge>
                  </div>
                  <div className="border rounded-lg p-3">
                    <div className="font-medium text-sm">Blockchain Networks</div>
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
