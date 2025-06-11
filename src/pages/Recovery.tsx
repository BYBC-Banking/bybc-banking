
import { useState } from "react";
import { ArrowLeft } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import RecoveryEntry from "@/components/recovery/RecoveryEntry";
import RecoveryAssessment from "@/components/recovery/RecoveryAssessment";
import SeedPhraseInput from "@/components/recovery/SeedPhraseInput";
import PassphrasePrompt from "@/components/recovery/PassphrasePrompt";
import RecoverySuccess from "@/components/recovery/RecoverySuccess";
import BiometricFallback from "@/components/recovery/BiometricFallback";
import DeviceManager from "@/components/recovery/DeviceManager";

type RecoveryFlow = 'entry' | 'biometric_pin_recovery' | 'seed_restoration' | 'device_based_recovery' | 
                   'identity_verification' | 'social_recovery' | 'manual_escalation' | 'account_reset' |
                   'assessment' | 'seed' | 'passphrase' | 'success';

interface RecoveryState {
  currentFlow: RecoveryFlow;
  seedWords: string[];
  passphrase: string;
  recoveryMethod: string;
  attempts: number;
  lockoutUntil: Date | null;
  progress: number;
}

const Recovery = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [recoveryState, setRecoveryState] = useState<RecoveryState>({
    currentFlow: 'entry',
    seedWords: [],
    passphrase: '',
    recoveryMethod: '',
    attempts: 0,
    lockoutUntil: null,
    progress: 0
  });

  const handleFlowSelect = (flow: string) => {
    setRecoveryState(prev => ({ 
      ...prev, 
      currentFlow: flow as RecoveryFlow,
      progress: 25 
    }));
  };

  const handleAssessmentComplete = (method: string) => {
    setRecoveryState(prev => ({ 
      ...prev, 
      recoveryMethod: method,
      currentFlow: method === 'seed' ? 'seed' : 'assessment',
      progress: 50
    }));
  };

  const handleSeedPhraseComplete = (words: string[]) => {
    setRecoveryState(prev => ({ 
      ...prev, 
      seedWords: words,
      currentFlow: 'passphrase',
      progress: 75
    }));
  };

  const handlePassphraseComplete = (phrase: string) => {
    setRecoveryState(prev => ({ 
      ...prev, 
      passphrase: phrase,
      progress: 90
    }));
    
    // Simulate recovery process
    setTimeout(() => {
      setRecoveryState(prev => ({ 
        ...prev, 
        currentFlow: 'success',
        progress: 100
      }));
      
      toast({
        title: "Account recovered successfully",
        description: "Your account has been restored and all previous devices have been cleared for security."
      });
    }, 1500);
  };

  const handleBiometricSuccess = () => {
    setRecoveryState(prev => ({ 
      ...prev, 
      currentFlow: 'success',
      progress: 100
    }));
  };

  const handleBiometricFallback = (method: string) => {
    setRecoveryState(prev => ({ 
      ...prev, 
      currentFlow: method as RecoveryFlow,
      progress: 25
    }));
  };

  const handleDeviceRecoveryComplete = () => {
    setRecoveryState(prev => ({ 
      ...prev, 
      currentFlow: 'success',
      progress: 100
    }));
  };

  const handleRecoveryComplete = () => {
    navigate('/dashboard');
  };

  const getStepInfo = () => {
    switch (recoveryState.currentFlow) {
      case 'entry': return { step: 1, total: 4, title: 'Choose Recovery Method' };
      case 'biometric_pin_recovery': return { step: 2, total: 3, title: 'Authenticate' };
      case 'seed_restoration': 
      case 'assessment': return { step: 1, total: 4, title: 'Recovery Assessment' };
      case 'seed': return { step: 2, total: 4, title: 'Enter Seed Phrase' };
      case 'passphrase': return { step: 3, total: 4, title: 'Optional Passphrase' };
      case 'device_based_recovery': return { step: 2, total: 3, title: 'Device Recovery' };
      case 'success': return { step: 4, total: 4, title: 'Recovery Complete' };
      default: return { step: 1, total: 4, title: 'Account Recovery' };
    }
  };

  const renderCurrentFlow = () => {
    switch (recoveryState.currentFlow) {
      case 'entry':
        return <RecoveryEntry onFlowSelect={handleFlowSelect} />;
      
      case 'biometric_pin_recovery':
        return (
          <BiometricFallback 
            onSuccess={handleBiometricSuccess}
            onFallback={handleBiometricFallback}
          />
        );
      
      case 'seed_restoration':
        return <RecoveryAssessment onComplete={handleAssessmentComplete} />;
      
      case 'device_based_recovery':
        return <DeviceManager onRecoveryComplete={handleDeviceRecoveryComplete} />;
      
      case 'assessment':
        return <RecoveryAssessment onComplete={handleAssessmentComplete} />;
      
      case 'seed':
        return <SeedPhraseInput onComplete={handleSeedPhraseComplete} />;
      
      case 'passphrase':
        return <PassphrasePrompt onComplete={handlePassphraseComplete} />;
      
      case 'success':
        return <RecoverySuccess onComplete={handleRecoveryComplete} />;
      
      case 'identity_verification':
        return (
          <div className="text-center p-8">
            <h3 className="text-lg font-semibold mb-2">Identity Verification</h3>
            <p className="text-gray-600 mb-4">
              Document upload and verification coming soon. Please contact support for assistance.
            </p>
            <button 
              onClick={() => handleFlowSelect('manual_escalation')}
              className="text-[#7E69AB] hover:underline"
            >
              Contact Support Instead
            </button>
          </div>
        );
      
      case 'manual_escalation':
        return (
          <div className="text-center p-8">
            <h3 className="text-lg font-semibold mb-2">Manual Recovery Assistance</h3>
            <p className="text-gray-600 mb-4">
              Our security team will help you regain access. Live chat support coming soon.
            </p>
            <p className="text-sm text-gray-500">
              Email: security@bybc.co.za | Phone: +27 21 XXX XXXX
            </p>
          </div>
        );
      
      default:
        return <RecoveryEntry onFlowSelect={handleFlowSelect} />;
    }
  };

  const stepInfo = getStepInfo();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md">
        <header className="flex items-center gap-2 mb-6">
          <Link to="/login" className="p-2">
            <ArrowLeft className="h-5 w-5" />
          </Link>
          <div className="flex-1">
            <h1 className="text-2xl font-bold">Account Recovery</h1>
            <p className="text-sm text-muted-foreground">
              {stepInfo.title} - Step {stepInfo.step} of {stepInfo.total}
            </p>
          </div>
        </header>
        
        {/* Progress indicator */}
        <div className="mb-6">
          <div className="flex gap-2">
            {Array.from({ length: stepInfo.total }, (_, i) => (
              <div
                key={i}
                className={`h-2 flex-1 rounded ${
                  i < stepInfo.step ? 'bg-[#7E69AB]' : 'bg-gray-200'
                }`}
              />
            ))}
          </div>
          <div className="mt-2 text-xs text-gray-500 text-center">
            Great! We're {Math.round((stepInfo.step / stepInfo.total) * 100)}% through restoring access
          </div>
        </div>

        {renderCurrentFlow()}
      </div>
    </div>
  );
};

export default Recovery;
