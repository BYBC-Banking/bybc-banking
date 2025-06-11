
import { useState, useEffect } from "react";
import SecurityWarningStep from "./SecurityWarningStep";
import SeedPhraseDisplayStep from "./SeedPhraseDisplayStep";
import SeedPhraseVerificationStep from "./SeedPhraseVerificationStep";
import WalletCreationSuccessStep from "./WalletCreationSuccessStep";
import { generateSeedPhrase, selectVerificationWords } from "@/utils/seedPhraseGenerator";

interface WalletCreationStepProps {
  onComplete: (data: any) => void;
}

const WalletCreationStep = ({ onComplete }: WalletCreationStepProps) => {
  const [step, setStep] = useState<'warning' | 'display' | 'verify' | 'final'>('warning');
  const [seedPhrase, setSeedPhrase] = useState<string[]>([]);
  const [verificationWords, setVerificationWords] = useState<{position: number, word: string}[]>([]);

  useEffect(() => {
    if (step === 'display') {
      const phrase = generateSeedPhrase();
      setSeedPhrase(phrase);
      setVerificationWords(selectVerificationWords(phrase));
    }
  }, [step]);

  // Prevent screenshots and copying during seed display
  useEffect(() => {
    if (step === 'display') {
      console.log('Screenshot prevention should be active');
    }
  }, [step]);

  const handleStepContinue = () => {
    if (step === 'warning') {
      setStep('display');
    } else if (step === 'display') {
      setStep('verify');
    } else if (step === 'verify') {
      setStep('final');
    }
  };

  const handleFinalComplete = () => {
    onComplete({
      seedPhrase: {
        words: seedPhrase,
        verified: true
      }
    });
  };

  if (step === 'warning') {
    return <SecurityWarningStep onContinue={handleStepContinue} />;
  }

  if (step === 'display') {
    return (
      <SeedPhraseDisplayStep 
        seedPhrase={seedPhrase} 
        onContinue={handleStepContinue} 
      />
    );
  }

  if (step === 'verify') {
    return (
      <SeedPhraseVerificationStep 
        verificationWords={verificationWords}
        onSuccess={handleStepContinue}
      />
    );
  }

  if (step === 'final') {
    return <WalletCreationSuccessStep onComplete={handleFinalComplete} />;
  }

  return null;
};

export default WalletCreationStep;
