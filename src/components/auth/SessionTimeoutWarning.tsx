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
      <Alert className={`border-destructive bg-destructive/10 max-w-md ${className}`}>
        <Clock className="h-4 w-4" />
        <AlertTitle className="text-destructive">Time Out</AlertTitle>
        <AlertDescription className="text-destructive/80">
          Would you like to continue?
        </AlertDescription>
      <div className="flex gap-2 mt-3">
        <Button
          size="sm"
          onClick={onExtend}
          className="bg-primary hover:bg-primary/90"
        >
          <RefreshCw className="h-3 w-3 mr-1" />
          Extend Session
        </Button>
        <Button
          size="sm"
          variant="outline"
          onClick={onLogout}
          className="border-destructive text-destructive hover:bg-destructive hover:text-destructive-foreground"
        >
          <LogOut className="h-3 w-3 mr-1" />
          Logout Now
        </Button>
      </div>
      </Alert>
    </div>
  );
};

export default SessionTimeoutWarning;