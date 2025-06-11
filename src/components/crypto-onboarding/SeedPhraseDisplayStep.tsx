
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Eye, EyeOff, Shield } from "lucide-react";

interface SeedPhraseDisplayStepProps {
  seedPhrase: string[];
  onContinue: () => void;
}

const SeedPhraseDisplayStep = ({ seedPhrase, onContinue }: SeedPhraseDisplayStepProps) => {
  const [showSeed, setShowSeed] = useState(false);

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
        onClick={onContinue}
        className="w-full h-12"
      >
        Yes, I've Written Them Down
      </Button>
    </div>
  );
};

export default SeedPhraseDisplayStep;
