
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Shield, Clock } from "lucide-react";

interface SwapConfirmationProps {
  fromAsset: string;
  fromAmount: string;
  toAmount: string;
  exchangeRate: number;
  onConfirm: () => void;
  onCancel: () => void;
}

const SwapConfirmation = ({
  fromAsset,
  fromAmount,
  toAmount,
  exchangeRate,
  onConfirm,
  onCancel
}: SwapConfirmationProps) => {
  const [timeLeft, setTimeLeft] = useState(45);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          onCancel(); // Auto-cancel when rate expires
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [onCancel]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-center">Transaction Review</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Main Transaction */}
          <div className="text-center">
            <div className="text-2xl font-bold">
              {fromAmount} {fromAsset} → {toAmount}
            </div>
          </div>

          <Separator />

          {/* Exchange Rate */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">Exchange Rate:</span>
              <span className="font-medium">1 {fromAsset} = R{exchangeRate.toLocaleString()}</span>
            </div>
            
            <div className="flex items-center justify-center gap-2 text-amber-600">
              <Clock className="h-4 w-4" />
              <span className="text-sm">Rate expires in: {formatTime(timeLeft)}</span>
            </div>
          </div>

          <Separator />

          {/* Fee Summary */}
          <div className="space-y-3">
            <h4 className="font-semibold">Fee Summary:</h4>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">• Service:</span>
                <span>R8.50</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">• Network:</span>
                <span>R4.00</span>
              </div>
              <Separator />
              <div className="flex justify-between font-medium">
                <span>• Total:</span>
                <span>R12.50</span>
              </div>
            </div>
          </div>

          <Separator />

          {/* Final Amount */}
          <div className="text-center p-4 bg-green-50 rounded-lg">
            <div className="text-lg font-bold text-green-700">
              You'll Receive: R1,235.00
            </div>
          </div>

          {/* Biometric Confirmation */}
          <div className="flex items-center justify-center gap-2 text-blue-600 bg-blue-50 p-3 rounded-lg">
            <Shield className="h-5 w-5" />
            <span className="font-medium">🔒 Touch ID to Confirm</span>
          </div>

          {/* Action Buttons */}
          <div className="grid grid-cols-2 gap-3">
            <Button
              variant="outline"
              onClick={onCancel}
              className="h-12"
            >
              Cancel
            </Button>
            <Button
              onClick={onConfirm}
              className="h-12 bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700"
            >
              Confirm Swap
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SwapConfirmation;
