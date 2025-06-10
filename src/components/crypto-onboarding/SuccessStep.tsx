
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle, Wallet, Shield, Bell } from "lucide-react";

interface SuccessStepProps {
  onComplete: () => void;
  onboardingData: any;
}

const SuccessStep = ({ onComplete, onboardingData }: SuccessStepProps) => {
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="text-center py-8">
        <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-gradient-to-br from-green-400 to-blue-500 flex items-center justify-center shadow-lg">
          <CheckCircle className="h-12 w-12 text-white" />
        </div>
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          🎉 Welcome to BYBC!
        </h1>
        <p className="text-lg text-gray-600">
          Your secure crypto wallet and ZAR banking are ready to use
        </p>
      </div>

      {/* Setup Summary */}
      <Card className="border-none shadow-lg bg-gradient-to-br from-green-50 to-blue-50">
        <CardContent className="pt-6 space-y-4">
          <h3 className="font-semibold text-gray-900 mb-4">Setup Complete:</h3>
          
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center">
                <CheckCircle className="h-4 w-4 text-green-600" />
              </div>
              <span className="text-gray-700">Identity verified</span>
            </div>
            
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center">
                <CheckCircle className="h-4 w-4 text-green-600" />
              </div>
              <span className="text-gray-700">
                {onboardingData.biometric?.enabled ? 'Biometric security enabled' : 'PIN security enabled'}
              </span>
            </div>
            
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center">
                <Wallet className="h-4 w-4 text-green-600" />
              </div>
              <span className="text-gray-700">Crypto wallet created & backed up</span>
            </div>
            
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center">
                <Shield className="h-4 w-4 text-green-600" />
              </div>
              <span className="text-gray-700">Security preferences configured</span>
            </div>
            
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center">
                <Bell className="h-4 w-4 text-green-600" />
              </div>
              <span className="text-gray-700">Notifications enabled</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Next Steps */}
      <Card className="border-none shadow-lg">
        <CardContent className="pt-6">
          <h3 className="font-semibold text-gray-900 mb-4">What's Next:</h3>
          
          <div className="space-y-3 text-gray-700">
            <div className="flex items-start gap-3">
              <span className="text-blue-600 font-semibold">1.</span>
              <span>Fund your wallet by transferring crypto or buying with ZAR</span>
            </div>
            
            <div className="flex items-start gap-3">
              <span className="text-blue-600 font-semibold">2.</span>
              <span>Explore the app while your compliance verification completes</span>
            </div>
            
            <div className="flex items-start gap-3">
              <span className="text-blue-600 font-semibold">3.</span>
              <span>Advanced features (BIP39, multisig) unlock after 1-2 weeks</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Important Reminder */}
      <div className="bg-yellow-50 border border-yellow-200 p-4 rounded-lg">
        <p className="text-yellow-800 text-sm font-medium text-center">
          🔐 Remember: Keep your 12-word seed phrase safe and private. 
          It's the only way to recover your crypto!
        </p>
      </div>

      <Button
        onClick={onComplete}
        className="w-full h-12 text-lg font-semibold bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700"
      >
        Start Using BYBC
      </Button>
    </div>
  );
};

export default SuccessStep;
