
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Shield, Bell, DollarSign, Clock } from "lucide-react";

interface SecurityConfigStepProps {
  onComplete: (data: any) => void;
}

const SecurityConfigStep = ({ onComplete }: SecurityConfigStepProps) => {
  const [settings, setSettings] = useState({
    biometricApproval: true,
    transactionLimits: true,
    dailyLimit: [1000],
    transactionAlerts: true,
    loginAlerts: true,
    largeTransactionAlert: true,
    autoLock: [5] // minutes
  });

  const handleToggle = (setting: string) => {
    setSettings(prev => ({
      ...prev,
      [setting]: !prev[setting as keyof typeof prev]
    }));
  };

  const handleSliderChange = (setting: string, value: number[]) => {
    setSettings(prev => ({
      ...prev,
      [setting]: value
    }));
  };

  const handleComplete = () => {
    onComplete({
      security: {
        transactionApproval: settings.biometricApproval,
        limits: settings.transactionLimits,
        alerts: settings.transactionAlerts,
        dailyLimit: settings.dailyLimit[0],
        autoLock: settings.autoLock[0]
      }
    });
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Security Configuration
        </h2>
        <p className="text-gray-600">
          Set up your wallet security preferences
        </p>
      </div>

      {/* Transaction Security */}
      <Card className="border-none shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg">
            <Shield className="h-5 w-5 text-blue-600" />
            Transaction Security
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <Label htmlFor="biometric-approval">Biometric Transaction Approval</Label>
              <p className="text-sm text-muted-foreground">
                Require Face ID/Fingerprint for all transactions
              </p>
            </div>
            <Switch
              id="biometric-approval"
              checked={settings.biometricApproval}
              onCheckedChange={() => handleToggle('biometricApproval')}
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <Label htmlFor="transaction-limits">Daily Transaction Limits</Label>
              <p className="text-sm text-muted-foreground">
                Set daily spending limits for security
              </p>
            </div>
            <Switch
              id="transaction-limits"
              checked={settings.transactionLimits}
              onCheckedChange={() => handleToggle('transactionLimits')}
            />
          </div>

          {settings.transactionLimits && (
            <div className="space-y-3">
              <Label>Daily Limit: R{settings.dailyLimit[0].toLocaleString()}</Label>
              <Slider
                value={settings.dailyLimit}
                onValueChange={(value) => handleSliderChange('dailyLimit', value)}
                max={50000}
                min={100}
                step={100}
                className="w-full"
              />
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>R100</span>
                <span>R50,000</span>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Alert Settings */}
      <Card className="border-none shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg">
            <Bell className="h-5 w-5 text-green-600" />
            Security Alerts
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <Label htmlFor="transaction-alerts">Transaction Notifications</Label>
              <p className="text-sm text-muted-foreground">
                Get notified of all transactions
              </p>
            </div>
            <Switch
              id="transaction-alerts"
              checked={settings.transactionAlerts}
              onCheckedChange={() => handleToggle('transactionAlerts')}
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <Label htmlFor="login-alerts">Login Alerts</Label>
              <p className="text-sm text-muted-foreground">
                Alert when someone accesses your wallet
              </p>
            </div>
            <Switch
              id="login-alerts"
              checked={settings.loginAlerts}
              onCheckedChange={() => handleToggle('loginAlerts')}
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <Label htmlFor="large-transaction-alert">Large Transaction Alerts</Label>
              <p className="text-sm text-muted-foreground">
                Extra notification for transactions over R5,000
              </p>
            </div>
            <Switch
              id="large-transaction-alert"
              checked={settings.largeTransactionAlert}
              onCheckedChange={() => handleToggle('largeTransactionAlert')}
            />
          </div>
        </CardContent>
      </Card>

      {/* Auto-Lock Settings */}
      <Card className="border-none shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg">
            <Clock className="h-5 w-5 text-purple-600" />
            Auto-Lock
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-3">
            <Label>Auto-lock after {settings.autoLock[0]} minutes of inactivity</Label>
            <Slider
              value={settings.autoLock}
              onValueChange={(value) => handleSliderChange('autoLock', value)}
              max={60}
              min={1}
              step={1}
              className="w-full"
            />
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>1 min</span>
              <span>60 min</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Progressive Disclosure Note */}
      <div className="bg-blue-50 border border-blue-200 p-4 rounded-lg">
        <p className="text-blue-800 text-sm">
          <strong>More Features Coming:</strong> Advanced features like BIP39 passphrases 
          and multisig will be available after you've used your wallet for a while.
        </p>
      </div>

      <Button
        onClick={handleComplete}
        className="w-full h-12"
      >
        Complete Setup
      </Button>
    </div>
  );
};

export default SecurityConfigStep;
