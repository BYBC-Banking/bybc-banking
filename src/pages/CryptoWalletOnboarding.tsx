
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { ArrowLeft, ArrowRight, Shield, Eye, EyeOff } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import WelcomeStep from "@/components/crypto-onboarding/WelcomeStep";
import IdentityStep from "@/components/crypto-onboarding/IdentityStep";
import BiometricStep from "@/components/crypto-onboarding/BiometricStep";
import EducationStep from "@/components/crypto-onboarding/EducationStep";
import WalletCreationStep from "@/components/crypto-onboarding/WalletCreationStep";
import SecurityConfigStep from "@/components/crypto-onboarding/SecurityConfigStep";
import SuccessStep from "@/components/crypto-onboarding/SuccessStep";

const STEPS = [
  { id: 1, title: "Welcome", component: WelcomeStep },
  { id: 2, title: "Identity", component: IdentityStep },
  { id: 3, title: "Biometric", component: BiometricStep },
  { id: 4, title: "Education", component: EducationStep },
  { id: 5, title: "Wallet", component: WalletCreationStep },
  { id: 6, title: "Security", component: SecurityConfigStep },
  { id: 7, title: "Ready", component: SuccessStep }
];

const CryptoWalletOnboarding = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);
  const [onboardingData, setOnboardingData] = useState({
    identity: { verified: false, method: "" },
    biometric: { enabled: false, fallbackPin: "" },
    seedPhrase: { words: [], verified: false },
    security: { transactionApproval: true, limits: true, alerts: true }
  });
  
  const navigate = useNavigate();
  const { toast } = useToast();

  const progress = (currentStep / STEPS.length) * 100;
  const currentStepData = STEPS.find(step => step.id === currentStep);
  const CurrentStepComponent = currentStepData?.component;

  const handleNext = () => {
    if (currentStep < STEPS.length) {
      setCompletedSteps(prev => [...new Set([...prev, currentStep])]);
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleStepComplete = (stepData?: any) => {
    if (stepData) {
      setOnboardingData(prev => ({ ...prev, ...stepData }));
    }
    handleNext();
  };

  const handleExit = () => {
    navigate("/crypto-wallet");
  };

  if (currentStep === 7) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
        <div className="container mx-auto max-w-md px-4 py-6">
          {CurrentStepComponent && (
            <CurrentStepComponent 
              onComplete={() => navigate("/crypto-wallet")}
              onboardingData={onboardingData}
            />
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-slate-100">
      <div className="container mx-auto max-w-md px-4 py-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          {currentStep > 1 && (
            <Button
              variant="ghost"
              size="icon"
              onClick={handlePrevious}
              className="h-10 w-10"
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
          )}
          <div className="flex-1 mx-4">
            <div className="text-center mb-2">
              <span className="text-sm text-muted-foreground">
                Step {currentStep} of {STEPS.length}
              </span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={handleExit}
            className="text-muted-foreground"
          >
            Exit
          </Button>
        </div>

        {/* Step Content */}
        <div className="space-y-6">
          {CurrentStepComponent && (
            <>
              {currentStep === 1 && (
                <CurrentStepComponent 
                  onComplete={() => handleStepComplete()}
                  onboardingData={onboardingData}
                />
              )}
              {currentStep === 2 && (
                <CurrentStepComponent 
                  onComplete={handleStepComplete}
                />
              )}
              {currentStep === 3 && (
                <CurrentStepComponent 
                  onComplete={handleStepComplete}
                />
              )}
              {currentStep === 4 && (
                <CurrentStepComponent 
                  onComplete={() => handleStepComplete()}
                />
              )}
              {currentStep === 5 && (
                <CurrentStepComponent 
                  onComplete={handleStepComplete}
                />
              )}
              {currentStep === 6 && (
                <CurrentStepComponent 
                  onComplete={handleStepComplete}
                />
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default CryptoWalletOnboarding;
