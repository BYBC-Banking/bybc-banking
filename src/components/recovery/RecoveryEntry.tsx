
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Smartphone, Key, Shield, FileText, Users, AlertTriangle, RotateCcw } from "lucide-react";

interface RecoveryEntryProps {
  onFlowSelect: (flow: string) => void;
}

const RecoveryEntry = ({ onFlowSelect }: RecoveryEntryProps) => {
  const [selectedFlow, setSelectedFlow] = useState<string>("biometric_pin_recovery");

  const recoveryPaths = [
    {
      id: "biometric_pin_recovery",
      title: "I have this device but can't authenticate",
      description: "Try biometric backup or PIN entry",
      icon: Smartphone,
      available: true,
      recommended: true
    },
    {
      id: "seed_restoration",
      title: "I have my recovery seed phrase",
      description: "12 or 24 words that you wrote down securely",
      icon: Key,
      available: true,
      recommended: false
    },
    {
      id: "device_based_recovery",
      title: "I have access to another authorized device",
      description: "Phone, tablet, or computer where you're logged in",
      icon: Shield,
      available: true,
      recommended: false
    },
    {
      id: "identity_verification",
      title: "I can verify my identity with documents",
      description: "Upload ID documents for secure verification",
      icon: FileText,
      available: true,
      recommended: false
    },
    {
      id: "social_recovery",
      title: "Contact my trusted recovery contacts",
      description: "Friends or family you designated for recovery",
      icon: Users,
      available: false,
      recommended: false
    },
    {
      id: "manual_escalation",
      title: "I need personal assistance",
      description: "Speak with our security team for manual review",
      icon: AlertTriangle,
      available: true,
      recommended: false
    },
    {
      id: "account_reset",
      title: "Start completely over (nuclear option)",
      description: "Permanently delete everything and create new account",
      icon: RotateCcw,
      available: true,
      recommended: false
    }
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-lg">
          Don't worry - let's get you back in safely
        </CardTitle>
        <CardDescription>
          Choose the option that best describes your situation. We'll guide you through each step.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <RadioGroup value={selectedFlow} onValueChange={setSelectedFlow}>
          {recoveryPaths.map((path) => {
            const Icon = path.icon;
            return (
              <div
                key={path.id}
                className={`flex items-start space-x-3 border rounded-lg p-4 cursor-pointer transition-colors relative ${
                  selectedFlow === path.id 
                    ? 'border-[#7E69AB] bg-[#7E69AB]/5' 
                    : 'border-gray-200 hover:bg-gray-50'
                } ${!path.available ? 'opacity-50' : ''}`}
                onClick={() => path.available && setSelectedFlow(path.id)}
              >
                <RadioGroupItem 
                  value={path.id} 
                  id={path.id} 
                  disabled={!path.available}
                />
                <Icon className={`h-5 w-5 mt-0.5 ${path.recommended ? 'text-green-600' : 'text-[#7E69AB]'}`} />
                <div className="flex-1">
                  <Label 
                    htmlFor={path.id} 
                    className={`font-medium cursor-pointer flex items-center gap-2 ${!path.available ? 'text-gray-400' : ''}`}
                  >
                    {path.title}
                    {path.recommended && (
                      <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded">
                        Recommended
                      </span>
                    )}
                    {!path.available && (
                      <span className="text-xs text-gray-400">(Coming soon)</span>
                    )}
                  </Label>
                  <p className="text-sm text-muted-foreground mt-1">
                    {path.description}
                  </p>
                </div>
              </div>
            );
          })}
        </RadioGroup>

        <div className="bg-blue-50 border border-blue-200 p-4 rounded-lg">
          <p className="text-blue-800 text-sm">
            <strong>Remember:</strong> You will regain access - we're here to help every step of the way. 
            Our security measures protect your account while ensuring you can always get back in.
          </p>
        </div>

        <Button 
          onClick={() => onFlowSelect(selectedFlow)}
          className="w-full"
          disabled={!recoveryPaths.find(p => p.id === selectedFlow)?.available}
        >
          Continue with This Method
        </Button>
      </CardContent>
    </Card>
  );
};

export default RecoveryEntry;
