
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";

const SwapSettings = () => {
  const [advancedMode, setAdvancedMode] = useState(false);
  const [settings, setSettings] = useState({
    slippageTolerance: "0.5",
    autoConfirm: false,
    notifications: true,
    rateAlerts: true,
    maxSlippage: "1.0",
    gasPrice: "standard"
  });
  const { toast } = useToast();

  const handleSaveSettings = () => {
    toast({
      title: "Settings Saved",
      description: "Your swap preferences have been updated",
    });
  };

  return (
    <div className="space-y-6">
      {/* Advanced Mode Toggle */}
      <Card>
        <CardHeader>
          <CardTitle>Display Mode</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <div className="font-medium">Advanced Mode</div>
              <div className="text-sm text-muted-foreground">
                Show technical details, advanced orders, analysis tools
              </div>
            </div>
            <Switch
              checked={advancedMode}
              onCheckedChange={setAdvancedMode}
            />
          </div>
        </CardContent>
      </Card>

      {/* Trading Preferences */}
      <Card>
        <CardHeader>
          <CardTitle>Trading Preferences</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Slippage Tolerance */}
          <div className="space-y-3">
            <Label>Slippage Tolerance</Label>
            <div className="flex gap-2">
              {["0.1", "0.5", "1.0", "2.0"].map((value) => (
                <Button
                  key={value}
                  variant={settings.slippageTolerance === value ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSettings(prev => ({ ...prev, slippageTolerance: value }))}
                >
                  {value}%
                </Button>
              ))}
            </div>
            <div className="flex items-center gap-2">
              <Input
                placeholder="Custom"
                className="w-20"
                value={settings.slippageTolerance}
                onChange={(e) => setSettings(prev => ({ ...prev, slippageTolerance: e.target.value }))}
              />
              <span className="text-sm text-muted-foreground">%</span>
            </div>
          </div>

          <Separator />

          {/* Auto-confirm */}
          <div className="flex items-center justify-between">
            <div>
              <div className="font-medium">Auto-confirm small swaps</div>
              <div className="text-sm text-muted-foreground">
                Skip confirmation for swaps under R1,000
              </div>
            </div>
            <Switch
              checked={settings.autoConfirm}
              onCheckedChange={(checked) => 
                setSettings(prev => ({ ...prev, autoConfirm: checked }))
              }
            />
          </div>
        </CardContent>
      </Card>

      {/* Advanced Settings */}
      {advancedMode && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              Advanced Settings
              <Badge variant="secondary">Pro</Badge>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Max Slippage */}
            <div className="space-y-2">
              <Label>Maximum Slippage</Label>
              <div className="flex items-center gap-2">
                <Input
                  value={settings.maxSlippage}
                  onChange={(e) => setSettings(prev => ({ ...prev, maxSlippage: e.target.value }))}
                  className="w-20"
                />
                <span className="text-sm text-muted-foreground">%</span>
                <span className="text-xs text-muted-foreground ml-2">
                  Transactions with higher slippage will be rejected
                </span>
              </div>
            </div>

            <Separator />

            {/* Gas Price */}
            <div className="space-y-3">
              <Label>Network Priority</Label>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { value: "slow", label: "Slow", desc: "~5-10 min" },
                  { value: "standard", label: "Standard", desc: "~2-5 min" },
                  { value: "fast", label: "Fast", desc: "~30s-2min" }
                ].map((option) => (
                  <Button
                    key={option.value}
                    variant={settings.gasPrice === option.value ? "default" : "outline"}
                    className="h-auto p-3 flex flex-col"
                    onClick={() => setSettings(prev => ({ ...prev, gasPrice: option.value }))}
                  >
                    <div className="font-medium">{option.label}</div>
                    <div className="text-xs text-muted-foreground">{option.desc}</div>
                  </Button>
                ))}
              </div>
            </div>

            <Separator />

            {/* Technical Details */}
            <div className="space-y-3">
              <Label>🔬 Technical Details</Label>
              <div className="bg-secondary/50 p-3 rounded-lg text-sm space-y-1">
                <div>• Gas: 45 gwei</div>
                <div>• Time: ~2-3 blocks</div>
                <div>• Network: Ethereum Mainnet</div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Notifications */}
      <Card>
        <CardHeader>
          <CardTitle>Notifications</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <div className="font-medium">Swap Notifications</div>
              <div className="text-sm text-muted-foreground">
                Get notified when swaps complete
              </div>
            </div>
            <Switch
              checked={settings.notifications}
              onCheckedChange={(checked) => 
                setSettings(prev => ({ ...prev, notifications: checked }))
              }
            />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <div className="font-medium">Rate Alerts</div>
              <div className="text-sm text-muted-foreground">
                Alert when favorable rates are available
              </div>
            </div>
            <Switch
              checked={settings.rateAlerts}
              onCheckedChange={(checked) => 
                setSettings(prev => ({ ...prev, rateAlerts: checked }))
              }
            />
          </div>
        </CardContent>
      </Card>

      {/* Save Button */}
      <Button onClick={handleSaveSettings} className="w-full h-12">
        Save Settings
      </Button>
    </div>
  );
};

export default SwapSettings;
