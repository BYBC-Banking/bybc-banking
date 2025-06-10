
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Shield, FileCheck, UserCheck, AlertCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface IdentityStepProps {
  onComplete: (data: any) => void;
}

const IdentityStep = ({ onComplete }: IdentityStepProps) => {
  const [verificationStatus, setVerificationStatus] = useState<'idle' | 'processing' | 'success' | 'failed'>('idle');
  const [selectedMethod, setSelectedMethod] = useState<'onfido' | 'keyless'>('onfido');
  const { toast } = useToast();

  const handleStartVerification = () => {
    setVerificationStatus('processing');
    
    // Simulate verification process
    setTimeout(() => {
      const success = Math.random() > 0.2; // 80% success rate for demo
      
      if (success) {
        setVerificationStatus('success');
        toast({
          title: "Identity Verified",
          description: "Your identity has been successfully verified.",
        });
        
        setTimeout(() => {
          onComplete({ 
            identity: { 
              verified: true, 
              method: selectedMethod 
            } 
          });
        }, 1500);
      } else {
        setVerificationStatus('failed');
        toast({
          title: "Verification Failed",
          description: "Additional information needed. Our compliance team will contact you within 24 hours.",
          variant: "destructive"
        });
      }
    }, 3000);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Identity Verification
        </h2>
        <p className="text-gray-600">
          SA banking regulations require ID verification
        </p>
      </div>

      <Card className="border-none shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg">
            <Shield className="h-5 w-5 text-blue-600" />
            Secure & Private
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-gray-700">
            We use Keyless technology - no photos are stored on servers. 
            Your biometric data stays on your device only.
          </p>
          
          <div className="bg-blue-50 p-4 rounded-lg">
            <div className="flex items-start gap-3">
              <AlertCircle className="h-5 w-5 text-blue-600 mt-0.5" />
              <div>
                <p className="text-sm font-medium text-blue-900">Privacy First</p>
                <p className="text-sm text-blue-700">
                  Your face becomes your password - only on your device. 
                  We never see your biometric data.
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Verification Methods */}
      <div className="space-y-3">
        <div 
          className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
            selectedMethod === 'onfido' 
              ? 'border-blue-500 bg-blue-50' 
              : 'border-gray-200 hover:border-gray-300'
          }`}
          onClick={() => setSelectedMethod('onfido')}
        >
          <div className="flex items-center gap-3">
            <FileCheck className="h-6 w-6 text-blue-600" />
            <div>
              <p className="font-medium">ID Document Scan</p>
              <p className="text-sm text-gray-600">Quick scan of your SA ID</p>
            </div>
          </div>
        </div>

        <div 
          className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
            selectedMethod === 'keyless' 
              ? 'border-blue-500 bg-blue-50' 
              : 'border-gray-200 hover:border-gray-300'
          }`}
          onClick={() => setSelectedMethod('keyless')}
        >
          <div className="flex items-center gap-3">
            <UserCheck className="h-6 w-6 text-green-600" />
            <div>
              <p className="font-medium">Biometric Verification</p>
              <p className="text-sm text-gray-600">Face verification + ID scan</p>
            </div>
          </div>
        </div>
      </div>

      {/* Action Button */}
      <Button 
        onClick={handleStartVerification}
        disabled={verificationStatus === 'processing'}
        className="w-full h-12"
      >
        {verificationStatus === 'processing' && (
          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
        )}
        {verificationStatus === 'processing' ? 'Verifying...' : 'Start Verification'}
      </Button>

      {verificationStatus === 'failed' && (
        <div className="bg-red-50 border border-red-200 p-4 rounded-lg">
          <p className="text-red-800 text-sm">
            Verification failed. Our compliance team will contact you within 24 hours 
            with additional requirements.
          </p>
        </div>
      )}
    </div>
  );
};

export default IdentityStep;
