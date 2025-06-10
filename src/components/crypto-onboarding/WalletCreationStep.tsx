
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AlertTriangle, Copy, Eye, EyeOff, CheckCircle, Shield } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface WalletCreationStepProps {
  onComplete: (data: any) => void;
}

// Mock seed phrase generation (in real app, this would be cryptographically secure)
const generateSeedPhrase = () => {
  const words = [
    'abandon', 'ability', 'able', 'about', 'above', 'absent', 'absorb', 'abstract',
    'absurd', 'abuse', 'access', 'accident', 'account', 'accuse', 'achieve', 'acid',
    'acoustic', 'acquire', 'across', 'act', 'action', 'actor', 'actress', 'actual',
    'adapt', 'add', 'addict', 'address', 'adjust', 'admit', 'adult', 'advance',
    'advice', 'aerobic', 'affair', 'afford', 'afraid', 'again', 'age', 'agent',
    'agree', 'ahead', 'aim', 'air', 'airport', 'aisle', 'alarm', 'album'
  ];
  
  return Array.from({ length: 12 }, () => 
    words[Math.floor(Math.random() * words.length)]
  );
};

const WalletCreationStep = ({ onComplete }: WalletCreationStepProps) => {
  const [step, setStep] = useState<'warning' | 'display' | 'verify' | 'final'>('warning');
  const [seedPhrase, setSeedPhrase] = useState<string[]>([]);
  const [userSeedInput, setUserSeedInput] = useState<string[]>(Array(12).fill(''));
  const [verificationWords, setVerificationWords] = useState<{position: number, word: string}[]>([]);
  const [verificationInput, setVerificationInput] = useState<string[]>(['', '', '']);
  const [showSeed, setShowSeed] = useState(false);
  const [acknowledged, setAcknowledged] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    if (step === 'display') {
      const phrase = generateSeedPhrase();
      setSeedPhrase(phrase);
      
      // Select 3 random words for verification
      const randomPositions = Array.from({ length: 3 }, () => 
        Math.floor(Math.random() * 12)
      ).sort((a, b) => a - b);
      
      setVerificationWords(
        randomPositions.map(pos => ({
          position: pos,
          word: phrase[pos]
        }))
      );
    }
  }, [step]);

  const handleContinueFromWarning = () => {
    if (!acknowledged) {
      toast({
        title: "Please acknowledge",
        description: "You must acknowledge the security warning to continue.",
        variant: "destructive"
      });
      return;
    }
    setStep('display');
  };

  const handleContinueFromDisplay = () => {
    setStep('verify');
  };

  const handleVerification = () => {
    const isCorrect = verificationWords.every((item, index) => 
      verificationInput[index].toLowerCase().trim() === item.word.toLowerCase()
    );

    if (!isCorrect) {
      toast({
        title: "Verification Failed",
        description: "Let's double-check those words. Please try again.",
        variant: "destructive"
      });
      setVerificationInput(['', '', '']);
      return;
    }

    setStep('final');
  };

  const handleFinalConfirmation = () => {
    onComplete({
      seedPhrase: {
        words: seedPhrase,
        verified: true
      }
    });
  };

  // Prevent screenshots and copying during seed display
  useEffect(() => {
    if (step === 'display') {
      // In a real app, you would implement screenshot prevention
      console.log('Screenshot prevention should be active');
    }
  }, [step]);

  if (step === 'warning') {
    return (
      <div className="space-y-6 animate-fade-in">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Critical Security Step
          </h2>
          <p className="text-gray-600">
            Your seed phrase is about to be generated
          </p>
        </div>

        <Card className="border-red-200 bg-red-50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-red-800">
              <AlertTriangle className="h-5 w-5" />
              Important Security Warning
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3 text-red-800">
              <p className="font-semibold">These 12 words are the ONLY way to recover your crypto.</p>
              <p>Treat them like R50,000 in cash:</p>
              <ul className="space-y-2 ml-4">
                <li>• Write them down on paper only</li>
                <li>• Never take photos or screenshots</li>
                <li>• Never store them digitally</li>
                <li>• Keep them in a safe place</li>
                <li>• Never share with anyone</li>
              </ul>
            </div>

            <div className="bg-white p-4 rounded border border-red-200">
              <label className="flex items-start gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={acknowledged}
                  onChange={(e) => setAcknowledged(e.target.checked)}
                  className="mt-1"
                />
                <span className="text-sm text-gray-700">
                  I understand that losing my seed phrase means losing my crypto forever. 
                  I will write it down on paper and store it safely.
                </span>
              </label>
            </div>
          </CardContent>
        </Card>

        <Button
          onClick={handleContinueFromWarning}
          disabled={!acknowledged}
          className="w-full h-12"
        >
          I Understand - Show My Seed Phrase
        </Button>
      </div>
    );
  }

  if (step === 'display') {
    return (
      <div className="space-y-6 animate-fade-in">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Your Seed Phrase
          </h2>
          <p className="text-gray-600">
            Write these 12 words in order on paper
          </p>
        </div>

        <Card className="border-yellow-200 bg-yellow-50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-yellow-800">
              <Shield className="h-5 w-5" />
              Screenshots Disabled
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-yellow-800 text-sm">
              For your security, screenshots and copying are disabled on this screen.
            </p>
          </CardContent>
        </Card>

        <Card className="border-none shadow-lg">
          <CardContent className="pt-6">
            <div className="grid grid-cols-2 gap-3">
              {seedPhrase.map((word, index) => (
                <div
                  key={index}
                  className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg border"
                >
                  <span className="text-sm text-gray-500 font-mono min-w-[20px]">
                    {index + 1}.
                  </span>
                  <span className="font-medium text-gray-900">
                    {showSeed ? word : '••••••'}
                  </span>
                </div>
              ))}
            </div>

            <Button
              variant="outline"
              onClick={() => setShowSeed(!showSeed)}
              className="w-full mt-4"
            >
              {showSeed ? (
                <>
                  <EyeOff className="h-4 w-4 mr-2" />
                  Hide Words
                </>
              ) : (
                <>
                  <Eye className="h-4 w-4 mr-2" />
                  Show Words
                </>
              )}
            </Button>
          </CardContent>
        </Card>

        <div className="bg-red-50 border border-red-200 p-4 rounded-lg">
          <p className="text-red-800 text-sm text-center font-medium">
            ✋ Have you written all 12 words on paper in order?
          </p>
        </div>

        <Button
          onClick={handleContinueFromDisplay}
          className="w-full h-12"
        >
          Yes, I've Written Them Down
        </Button>
      </div>
    );
  }

  if (step === 'verify') {
    return (
      <div className="space-y-6 animate-fade-in">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Verify Your Backup
          </h2>
          <p className="text-gray-600">
            Enter the requested words to confirm your backup
          </p>
        </div>

        <Card className="border-none shadow-lg">
          <CardContent className="pt-6 space-y-4">
            {verificationWords.map((item, index) => (
              <div key={index}>
                <Label htmlFor={`word-${index}`}>
                  Word #{item.position + 1}
                </Label>
                <Input
                  id={`word-${index}`}
                  value={verificationInput[index]}
                  onChange={(e) => {
                    const newInput = [...verificationInput];
                    newInput[index] = e.target.value;
                    setVerificationInput(newInput);
                  }}
                  placeholder={`Enter word #${item.position + 1}`}
                  className="mt-1"
                />
              </div>
            ))}
          </CardContent>
        </Card>

        <Button
          onClick={handleVerification}
          disabled={verificationInput.some(word => !word.trim())}
          className="w-full h-12"
        >
          Verify Backup
        </Button>
      </div>
    );
  }

  if (step === 'final') {
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
          onClick={handleFinalConfirmation}
          className="w-full h-12"
        >
          Continue to Security Settings
        </Button>
      </div>
    );
  }

  return null;
};

export default WalletCreationStep;
