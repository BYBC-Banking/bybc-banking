
import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { CheckCircle, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

interface SwapProcessingProps {
  onComplete: () => void;
}

const SwapProcessing = ({ onComplete }: SwapProcessingProps) => {
  const [currentPhase, setCurrentPhase] = useState(0);
  const [progress, setProgress] = useState(0);
  const { toast } = useToast();

  const phases = [
    { text: "Submitting to VALR...", duration: 5000 },
    { text: "Processing swap...", duration: 20000 },
    { text: "Updating balance...", duration: 5000 },
    { text: "Complete! ✅", duration: 2000 }
  ];

  useEffect(() => {
    let totalTime = 0;
    const phaseTimeouts: NodeJS.Timeout[] = [];

    phases.forEach((phase, index) => {
      const timeout = setTimeout(() => {
        setCurrentPhase(index);
        setProgress(((index + 1) / phases.length) * 100);
        
        if (index === phases.length - 1) {
          // Show success notification
          toast({
            title: "Swap Complete!",
            description: "R1,235 has been added to your account",
          });
          
          // Complete after showing final phase
          setTimeout(() => {
            onComplete();
          }, 2000);
        }
      }, totalTime);
      
      phaseTimeouts.push(timeout);
      totalTime += phase.duration;
    });

    return () => {
      phaseTimeouts.forEach(timeout => clearTimeout(timeout));
    };
  }, [onComplete, toast]);

  return (
    <div className="space-y-6">
      <Card>
        <CardContent className="p-8">
          <div className="text-center space-y-6">
            {/* Processing Icon */}
            <div className="flex justify-center">
              {currentPhase < phases.length - 1 ? (
                <Loader2 className="h-16 w-16 animate-spin text-blue-600" />
              ) : (
                <CheckCircle className="h-16 w-16 text-green-600" />
              )}
            </div>

            {/* Current Phase */}
            <div>
              <h3 className="text-xl font-semibold mb-2">Processing Swap</h3>
              <p className="text-muted-foreground">
                {phases[currentPhase]?.text}
              </p>
            </div>

            {/* Progress Bar */}
            <div className="space-y-2">
              <Progress value={progress} className="h-3" />
              <p className="text-sm text-muted-foreground">
                Phase {currentPhase + 1} of {phases.length}
              </p>
            </div>

            {/* Transaction Details */}
            <div className="bg-secondary/50 p-4 rounded-lg text-sm">
              <div className="space-y-1">
                <div>0.001 BTC → R1,235.00</div>
                <div className="text-muted-foreground">Fee: R12.50</div>
              </div>
            </div>

            {/* Estimated Time */}
            {currentPhase < phases.length - 1 && (
              <p className="text-xs text-muted-foreground">
                Estimated completion: 30-45 seconds
              </p>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Transaction Status */}
      <Card>
        <CardContent className="p-4">
          <div className="space-y-3">
            {phases.map((phase, index) => (
              <div key={index} className="flex items-center gap-3">
                {index < currentPhase ? (
                  <CheckCircle className="h-4 w-4 text-green-600 flex-shrink-0" />
                ) : index === currentPhase ? (
                  <Loader2 className="h-4 w-4 animate-spin text-blue-600 flex-shrink-0" />
                ) : (
                  <div className="h-4 w-4 rounded-full border-2 border-muted flex-shrink-0" />
                )}
                <span className={`text-sm ${
                  index <= currentPhase ? 'text-foreground' : 'text-muted-foreground'
                }`}>
                  {phase.text}
                </span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SwapProcessing;
