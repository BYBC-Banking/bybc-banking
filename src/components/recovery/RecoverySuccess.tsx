
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { CheckCircle, Shield, Smartphone } from "lucide-react";

interface RecoverySuccessProps {
  onComplete: () => void;
}

const RecoverySuccess = ({ onComplete }: RecoverySuccessProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-green-600">
          <CheckCircle className="h-6 w-6" />
          Account Successfully Recovered!
        </CardTitle>
        <CardDescription>
          Welcome back! Your account has been fully restored and secured.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="text-center space-y-4">
          <div className="w-20 h-20 mx-auto rounded-full bg-green-100 flex items-center justify-center">
            <CheckCircle className="h-10 w-10 text-green-600" />
          </div>
          
          <div>
            <h3 className="text-lg font-semibold">You're all set!</h3>
            <p className="text-gray-600">
              Your wallet has been restored with all your assets and transaction history intact.
            </p>
          </div>
        </div>

        <div className="space-y-3">
          <Alert>
            <Shield className="h-4 w-4" />
            <AlertDescription>
              <strong>Security Notice:</strong> All other devices have been signed out for your protection. 
              You'll need to sign in again on any other devices you use.
            </AlertDescription>
          </Alert>

          <Alert>
            <Smartphone className="h-4 w-4" />
            <AlertDescription>
              <strong>Next Step:</strong> Consider setting up biometric authentication on this device 
              to make future access easier and more secure.
            </AlertDescription>
          </Alert>
        </div>

        <div className="space-y-3">
          <Button onClick={onComplete} className="w-full">
            Continue to Dashboard
          </Button>
          
          <div className="text-center">
            <p className="text-sm text-gray-500">
              Recovery completed successfully at {new Date().toLocaleString()}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default RecoverySuccess;
