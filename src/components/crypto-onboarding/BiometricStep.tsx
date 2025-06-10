
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Fingerprint, Smartphone, Lock, Eye, EyeOff } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface BiometricStepProps {
  onComplete: (data: any) => void;
}

const BiometricStep = ({ onComplete }: BiometricStepProps) => {
  const [biometricEnabled, setBiometricEnabled] = useState(false);
  const [pin, setPin] = useState("");
  const [confirmPin, setConfirmPin] = useState("");
  const [showPin, setShowPin] = useState(false);
  const [biometricStatus, setBiometricStatus] = useState<'idle' | 'testing' | 'success' | 'failed'>('idle');
  const { toast } = useToast();

  const handleBiometricTest = () => {
    setBiometricStatus('testing');
    
    // Simulate biometric test
    setTimeout(() => {
      const success = Math.random() > 0.3; // 70% success rate for demo
      
      if (success) {
        setBiometricStatus('success');
        setBiometricEnabled(true);
        toast({
          title: "Biometric Setup Complete",
          description: "Face ID/Fingerprint enabled successfully.",
        });
      } else {
        setBiometricStatus('failed');
        toast({
          title: "Biometric Setup Failed",
          description: "Let's try again or use PIN only.",
          variant: "destructive"
        });
      }
    }, 2000);
  };

  const handleComplete = () => {
    if (pin.length !== 6) {
      toast({
        title: "Invalid PIN",
        description: "Please enter a 6-digit PIN.",
        variant: "destructive"
      });
      return;
    }

    if (pin !== confirmPin) {
      toast({
        title: "PIN Mismatch",
        description: "PINs don't match. Please try again.",
        variant: "destructive"
      });
      return;
    }

    onComplete({
      biometric: {
        enabled: biometricEnabled,
        fallbackPin: pin
      }
    });
  };

  const isValid = pin.length === 6 && pin === confirmPin;

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Biometric Security
        </h2>
        <p className="text-gray-600">
          Set up secure access to your wallet
        </p>
      </div>

      {/* Biometric Setup */}
      <Card className="border-none shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg">
            <Fingerprint className="h-5 w-5 text-blue-600" />
            Face ID / Fingerprint
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-gray-700">
            Your face becomes your password - only stored on your device. 
            We never see your biometric data.
          </p>

          {!biometricEnabled && biometricStatus !== 'success' && (
            <Button 
              onClick={handleBiometricTest}
              disabled={biometricStatus === 'testing'}
              className="w-full"
              variant="outline"
            >
              {biometricStatus === 'testing' && (
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600 mr-2" />
              )}
              {biometricStatus === 'testing' ? 'Testing...' : 'Test Biometric'}
            </Button>
          )}

          {biometricStatus === 'success' && (
            <div className="bg-green-50 border border-green-200 p-4 rounded-lg">
              <p className="text-green-800 text-sm font-medium">
                ✓ Biometric authentication enabled
              </p>
            </div>
          )}

          {biometricStatus === 'failed' && (
            <div className="bg-yellow-50 border border-yellow-200 p-4 rounded-lg">
              <p className="text-yellow-800 text-sm">
                Biometric setup failed. You can continue with PIN only.
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* PIN Setup */}
      <Card className="border-none shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg">
            <Lock className="h-5 w-5 text-green-600" />
            6-Digit PIN (Required)
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-gray-700">
            Your PIN is required as a backup for biometric authentication.
          </p>

          <div className="space-y-4">
            <div>
              <Label htmlFor="pin">Enter PIN</Label>
              <div className="relative">
                <Input
                  id="pin"
                  type={showPin ? "text" : "password"}
                  value={pin}
                  onChange={(e) => setPin(e.target.value.replace(/\D/g, '').slice(0, 6))}
                  placeholder="Enter 6-digit PIN"
                  className="pr-10"
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="absolute right-0 top-0 h-full px-3"
                  onClick={() => setShowPin(!showPin)}
                >
                  {showPin ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </Button>
              </div>
            </div>

            <div>
              <Label htmlFor="confirmPin">Confirm PIN</Label>
              <Input
                id="confirmPin"
                type={showPin ? "text" : "password"}
                value={confirmPin}
                onChange={(e) => setConfirmPin(e.target.value.replace(/\D/g, '').slice(0, 6))}
                placeholder="Confirm 6-digit PIN"
              />
            </div>
          </div>

          {pin.length === 6 && confirmPin.length === 6 && pin !== confirmPin && (
            <p className="text-red-600 text-sm">PINs don't match</p>
          )}
        </CardContent>
      </Card>

      <Button 
        onClick={handleComplete}
        disabled={!isValid}
        className="w-full h-12"
      >
        Continue
      </Button>
    </div>
  );
};

export default BiometricStep;
