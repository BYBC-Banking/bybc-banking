import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Clock, LogOut, RefreshCw } from "lucide-react";

interface SessionTimeoutWarningProps {
  timeLeft: number;
  onExtend: () => void;
  onLogout: () => void;
  className?: string;
}

const SessionTimeoutWarning = ({ 
  timeLeft, 
  onExtend, 
  onLogout, 
  className = "" 
}: SessionTimeoutWarningProps) => {
  const minutes = Math.floor(timeLeft);
  const seconds = Math.floor((timeLeft - minutes) * 60);

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/50">
      <Alert className={`bg-white border-gray-200 max-w-sm ${className}`}>
        <Clock className="h-4 w-4" />
        <AlertTitle className="text-gray-900">Time Out</AlertTitle>
        <AlertDescription className="text-gray-700">
          Would you like to continue using the app?
        </AlertDescription>
        <div className="flex gap-2 mt-3">
          <Button
            size="sm"
            onClick={onExtend}
            className="bg-primary hover:bg-primary/90"
          >
            Continue
          </Button>
          <Button
            size="sm"
            variant="outline"
            onClick={onLogout}
            className="border-gray-300 text-gray-700 hover:bg-gray-50"
          >
            No
          </Button>
        </div>
      </Alert>
    </div>
  );
};

export default SessionTimeoutWarning;