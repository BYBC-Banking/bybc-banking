
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle } from "lucide-react";

interface WalletCreationSuccessStepProps {
  onComplete: () => void;
}

const WalletCreationSuccessStep = ({ onComplete }: WalletCreationSuccessStepProps) => {
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="text-center">
        <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-green-100 flex items-center justify-center">
          <CheckCircle className="h-10 w-10 text-green-600" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Wallet Created Successfully!
        </h2>
        <p className="text-gray-600">
          Your secure crypto wallet is ready
        </p>
      </div>

      <Card className="border-green-200 bg-green-50">
        <CardContent className="pt-6">
          <div className="text-center space-y-2">
            <p className="text-green-800 font-medium">
              ✓ Seed phrase verified and backed up
            </p>
            <p className="text-green-700 text-sm">
              Your wallet is now secured with your 12-word seed phrase
            </p>
          </div>
        </CardContent>
      </Card>

      <div className="bg-blue-50 border border-blue-200 p-4 rounded-lg">
        <p className="text-blue-800 text-sm text-center">
          <strong>Remember:</strong> Keep your seed phrase safe and never share it with anyone. 
          It's the only way to recover your crypto if you lose access to this device.
        </p>
      </div>

      <Button
        onClick={onComplete}
        className="w-full h-12"
      >
        Continue to Security Settings
      </Button>
    </div>
  );
};

export default WalletCreationSuccessStep;
