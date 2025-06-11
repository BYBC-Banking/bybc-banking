
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";

interface VerificationWord {
  position: number;
  word: string;
}

interface SeedPhraseVerificationStepProps {
  verificationWords: VerificationWord[];
  onSuccess: () => void;
}

const SeedPhraseVerificationStep = ({ verificationWords, onSuccess }: SeedPhraseVerificationStepProps) => {
  const [verificationInput, setVerificationInput] = useState<string[]>(['', '', '']);
  const { toast } = useToast();

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

    onSuccess();
  };

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
};

export default SeedPhraseVerificationStep;
