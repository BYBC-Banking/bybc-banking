
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertTriangle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface SecurityWarningStepProps {
  onContinue: () => void;
}

const SecurityWarningStep = ({ onContinue }: SecurityWarningStepProps) => {
  const [acknowledged, setAcknowledged] = useState(false);
  const { toast } = useToast();

  const handleContinue = () => {
    if (!acknowledged) {
      toast({
        title: "Please acknowledge",
        description: "You must acknowledge the security warning to continue.",
        variant: "destructive"
      });
      return;
    }
    onContinue();
  };

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
        onClick={handleContinue}
        disabled={!acknowledged}
        className="w-full h-12"
      >
        I Understand - Show My Seed Phrase
      </Button>
    </div>
  );
};

export default SecurityWarningStep;
