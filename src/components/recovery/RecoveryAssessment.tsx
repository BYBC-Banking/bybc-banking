
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { AlertTriangle, Key, Smartphone, HelpCircle } from "lucide-react";

interface RecoveryAssessmentProps {
  onComplete: (method: string) => void;
}

const RecoveryAssessment = ({ onComplete }: RecoveryAssessmentProps) => {
  const [selectedMethod, setSelectedMethod] = useState<string>("seed");

  const recoveryOptions = [
    {
      id: "seed",
      title: "I have my recovery seed phrase",
      description: "12 or 24 words that you wrote down when creating your wallet",
      icon: Key,
      available: true
    },
    {
      id: "device",
      title: "I have access to another authorized device",
      description: "Phone, tablet, or computer where you're already logged in",
      icon: Smartphone,
      available: false
    },
    {
      id: "support",
      title: "I don't have either of these",
      description: "Contact support for manual account recovery",
      icon: HelpCircle,
      available: false
    }
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <AlertTriangle className="h-5 w-5 text-orange-500" />
          Let's recover your account
        </CardTitle>
        <CardDescription>
          Don't worry - we'll help you get back in safely. What do you have available?
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <RadioGroup value={selectedMethod} onValueChange={setSelectedMethod}>
          {recoveryOptions.map((option) => {
            const Icon = option.icon;
            return (
              <div
                key={option.id}
                className={`flex items-start space-x-3 border rounded-lg p-4 cursor-pointer transition-colors ${
                  selectedMethod === option.id 
                    ? 'border-[#7E69AB] bg-[#7E69AB]/5' 
                    : 'border-gray-200 hover:bg-gray-50'
                } ${!option.available ? 'opacity-50' : ''}`}
                onClick={() => option.available && setSelectedMethod(option.id)}
              >
                <RadioGroupItem 
                  value={option.id} 
                  id={option.id} 
                  disabled={!option.available}
                />
                <Icon className="h-5 w-5 mt-0.5 text-[#7E69AB]" />
                <div className="flex-1">
                  <Label 
                    htmlFor={option.id} 
                    className={`font-medium cursor-pointer ${!option.available ? 'text-gray-400' : ''}`}
                  >
                    {option.title}
                    {!option.available && (
                      <span className="ml-2 text-xs text-gray-400">(Coming soon)</span>
                    )}
                  </Label>
                  <p className="text-sm text-muted-foreground mt-1">
                    {option.description}
                  </p>
                </div>
              </div>
            );
          })}
        </RadioGroup>

        <Button 
          onClick={() => onComplete(selectedMethod)}
          className="w-full"
          disabled={selectedMethod !== "seed"}
        >
          Continue with Recovery
        </Button>
      </CardContent>
    </Card>
  );
};

export default RecoveryAssessment;
