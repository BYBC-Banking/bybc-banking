
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Shield, Banknote, Smartphone } from "lucide-react";

interface WelcomeStepProps {
  onComplete: () => void;
  onboardingData?: any;
}

const WelcomeStep = ({ onComplete }: WelcomeStepProps) => {
  return (
    <div className="space-y-6 animate-fade-in">
      {/* Hero Section with SA Flag Colors */}
      <div className="text-center py-8">
        <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-gradient-to-br from-green-500 via-yellow-400 to-blue-500 flex items-center justify-center shadow-lg">
          <Shield className="h-10 w-10 text-white" />
        </div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Welcome to BYBC
        </h1>
        <p className="text-lg text-gray-600 mb-6">
          Banking meets crypto. Made simple.
        </p>
      </div>

      {/* Value Proposition */}
      <Card className="border-none shadow-lg bg-gradient-to-br from-white to-slate-50">
        <CardContent className="pt-6">
          <p className="text-center text-gray-700 text-lg leading-relaxed mb-6">
            BYBC combines ZAR banking with secure crypto storage. 
            Your money, your crypto, your control.
          </p>
          
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                <Banknote className="h-5 w-5 text-green-600" />
              </div>
              <span className="text-gray-700">Traditional ZAR banking</span>
            </div>
            
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                <Shield className="h-5 w-5 text-blue-600" />
              </div>
              <span className="text-gray-700">Secure crypto wallet</span>
            </div>
            
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center">
                <Smartphone className="h-5 w-5 text-purple-600" />
              </div>
              <span className="text-gray-700">Simple mobile experience</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* CTA Button */}
      <Button 
        onClick={onComplete}
        className="w-full h-12 text-lg font-semibold bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700"
      >
        Get Started
      </Button>

      <p className="text-xs text-center text-gray-500">
        By continuing, you agree to our Terms of Service and Privacy Policy
      </p>
    </div>
  );
};

export default WelcomeStep;
