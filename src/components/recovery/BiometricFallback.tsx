
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Fingerprint, Lock, Key, AlertTriangle, Clock } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface BiometricFallbackProps {
  onSuccess: () => void;
  onFallback: (method: string) => void;
}

type AuthStep = 'biometric' | 'pin' | 'seed' | 'lockout';

const BiometricFallback = ({ onSuccess, onFallback }: BiometricFallbackProps) => {
  const [currentStep, setCurrentStep] = useState<AuthStep>('biometric');
  const [pin, setPin] = useState('');
  const [attempts, setAttempts] = useState(0);
  const [lockoutUntil, setLockoutUntil] = useState<Date | null>(null);
  const [timeRemaining, setTimeRemaining] = useState(0);
  const { toast } = useToast();

  useEffect(() => {
    if (lockoutUntil) {
      const interval = setInterval(() => {
        const now = new Date().getTime();
        const remaining = lockoutUntil.getTime() - now;
        
        if (remaining <= 0) {
          setLockoutUntil(null);
          setAttempts(0);
          setCurrentStep('biometric');
          setTimeRemaining(0);
        } else {
          setTimeRemaining(Math.ceil(remaining / 1000));
        }
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [lockoutUntil]);

  const handleBiometricAuth = () => {
    // Simulate biometric authentication
    setTimeout(() => {
      const success = Math.random() > 0.7; // 30% success rate for demo
      
      if (success) {
        onSuccess();
        toast({
          title: "Welcome back!",
          description: "Biometric authentication successful."
        });
      } else {
        setCurrentStep('pin');
        toast({
          title: "Let's try another way",
          description: "Biometric authentication failed. Please enter your backup PIN.",
          variant: "destructive"
        });
      }
    }, 2000);
  };

  const handlePinSubmit = () => {
    // Simulate PIN validation
    const isValidPin = pin === '123456'; // Demo PIN
    
    if (isValidPin) {
      onSuccess();
      toast({
        title: "Access granted!",
        description: "PIN authentication successful."
      });
    } else {
      const newAttempts = attempts + 1;
      setAttempts(newAttempts);
      setPin('');
      
      if (newAttempts >= 3) {
        const lockoutDuration = Math.min(15 * Math.pow(2, newAttempts - 3), 60 * 60); // Progressive: 15min, 30min, 60min
        const lockoutTime = new Date(Date.now() + lockoutDuration * 1000);
        setLockoutUntil(lockoutTime);
        setCurrentStep('lockout');
        
        toast({
          title: "Account temporarily locked",
          description: `Too many failed attempts. Please wait ${Math.ceil(lockoutDuration / 60)} minutes or try another method.`,
          variant: "destructive"
        });
      } else {
        toast({
          title: "Incorrect PIN",
          description: `${3 - newAttempts} attempts remaining before temporary lockout.`,
          variant: "destructive"
        });
      }
    }
  };

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes}:${secs.toString().padStart(2, '0')}`;
  };

  if (currentStep === 'lockout') {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-orange-600">
            <Clock className="h-5 w-5" />
            Account Temporarily Locked
          </CardTitle>
          <CardDescription>
            For your security, authentication is temporarily disabled
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Alert>
            <AlertTriangle className="h-4 w-4" />
            <AlertDescription>
              Please wait {formatTime(timeRemaining)} before trying again, or choose another recovery method.
            </AlertDescription>
          </Alert>

          <div className="grid grid-cols-1 gap-3">
            <Button 
              variant="outline" 
              onClick={() => onFallback('seed_restoration')}
              className="flex items-center gap-2"
            >
              <Key className="h-4 w-4" />
              Use Recovery Seed Phrase
            </Button>
            
            <Button 
              variant="outline" 
              onClick={() => onFallback('manual_escalation')}
              className="flex items-center gap-2"
            >
              <AlertTriangle className="h-4 w-4" />
              Contact Support
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (currentStep === 'biometric') {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Fingerprint className="h-5 w-5 text-[#7E69AB]" />
            Try Biometric Authentication
          </CardTitle>
          <CardDescription>
            Use your fingerprint, Face ID, or other biometric method
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-col items-center space-y-4 py-6">
            <div className="w-20 h-20 rounded-full bg-[#7E69AB]/10 flex items-center justify-center">
              <Fingerprint className="h-10 w-10 text-[#7E69AB]" />
            </div>
            <p className="text-center text-gray-600">
              Touch your fingerprint sensor or look at your camera
            </p>
          </div>

          <Button onClick={handleBiometricAuth} className="w-full">
            Authenticate with Biometrics
          </Button>

          <Button 
            variant="outline" 
            onClick={() => setCurrentStep('pin')}
            className="w-full"
          >
            Use PIN Instead
          </Button>
        </CardContent>
      </Card>
    );
  }

  if (currentStep === 'pin') {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Lock className="h-5 w-5 text-[#7E69AB]" />
            Enter Your Backup PIN
          </CardTitle>
          <CardDescription>
            Enter the 6-digit PIN you set up as backup authentication
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {attempts > 0 && (
            <Alert variant="destructive">
              <AlertTriangle className="h-4 w-4" />
              <AlertDescription>
                Incorrect PIN. {3 - attempts} attempts remaining.
              </AlertDescription>
            </Alert>
          )}

          <div>
            <Label htmlFor="pin">6-Digit PIN</Label>
            <Input
              id="pin"
              type="password"
              value={pin}
              onChange={(e) => setPin(e.target.value.replace(/\D/g, '').slice(0, 6))}
              placeholder="Enter your PIN"
              className="text-center text-lg tracking-widest"
              maxLength={6}
            />
          </div>

          <Button 
            onClick={handlePinSubmit}
            disabled={pin.length !== 6}
            className="w-full"
          >
            Verify PIN
          </Button>

          <div className="grid grid-cols-1 gap-2">
            <Button 
              variant="outline" 
              onClick={() => onFallback('seed_restoration')}
              className="flex items-center gap-2"
            >
              <Key className="h-4 w-4" />
              Use Recovery Seed Phrase Instead
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  return null;
};

export default BiometricFallback;
