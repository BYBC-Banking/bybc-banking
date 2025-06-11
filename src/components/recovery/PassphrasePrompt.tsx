
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Lock, Info } from "lucide-react";

interface PassphrasePromptProps {
  onComplete: (passphrase: string) => void;
}

const PassphrasePrompt = ({ onComplete }: PassphrasePromptProps) => {
  const [passphrase, setPassphrase] = useState("");
  const [showAdvanced, setShowAdvanced] = useState(false);

  const handleSubmit = () => {
    onComplete(passphrase);
  };

  const handleSkip = () => {
    onComplete("");
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Lock className="h-5 w-5 text-[#7E69AB]" />
          Optional Passphrase
        </CardTitle>
        <CardDescription>
          If you set up an additional passphrase for extra security, enter it here
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <Alert>
          <Info className="h-4 w-4" />
          <AlertDescription>
            Most users don't have a passphrase. You can safely skip this step unless you specifically remember setting one up.
          </AlertDescription>
        </Alert>

        <div className="space-y-4">
          <div>
            <Label htmlFor="passphrase">BIP39 Passphrase (Optional)</Label>
            <Input
              id="passphrase"
              type="password"
              value={passphrase}
              onChange={(e) => setPassphrase(e.target.value)}
              placeholder="Enter your passphrase if you have one"
            />
          </div>

          <div className="space-y-2">
            <Button onClick={handleSubmit} className="w-full">
              Continue with Passphrase
            </Button>
            <Button onClick={handleSkip} variant="outline" className="w-full">
              Skip - I don't have a passphrase
            </Button>
          </div>

          <div className="text-center">
            <button
              onClick={() => setShowAdvanced(!showAdvanced)}
              className="text-sm text-[#7E69AB] hover:underline"
            >
              What is a passphrase?
            </button>
          </div>

          {showAdvanced && (
            <Alert>
              <AlertDescription className="text-sm">
                A passphrase is an optional additional word or phrase that some advanced users add for extra security. 
                It's different from your seed phrase and is not required for most wallets.
              </AlertDescription>
            </Alert>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default PassphrasePrompt;
