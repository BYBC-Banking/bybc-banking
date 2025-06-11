
import { useState } from "react";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useToast } from "@/hooks/use-toast";
import { isValidEmail } from "@/utils/security";

const AccountRecovery = () => {
  const { toast } = useToast();
  const [email, setEmail] = useState<string>("");
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!isValidEmail(email)) {
      setError("Please enter a valid email address");
      return;
    }
    
    setError(null);
    setIsSubmitting(true);
    
    // In a real app, this would call an API endpoint to trigger password reset
    setTimeout(() => {
      setSubmitted(true);
      setIsSubmitting(false);
      toast({
        title: "Recovery email sent",
        description: "Check your inbox for instructions",
      });
    }, 1500);
  };
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md">
        <header className="flex items-center gap-2 mb-6">
          <Link to="/login" className="p-2">
            <ArrowLeft className="h-5 w-5" />
          </Link>
          <h1 className="text-2xl font-bold">Account Recovery</h1>
        </header>
        
        <Card>
          <CardHeader>
            <CardTitle>
              {submitted ? "Check Your Email" : "Recover Your Account"}
            </CardTitle>
            <CardDescription>
              {submitted
                ? "We've sent recovery instructions to your email"
                : "Enter your email to receive recovery instructions"}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {error && (
              <Alert variant="destructive" className="mb-4">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}
            
            {!submitted ? (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email address"
                    required
                  />
                </div>
                
                <Button 
                  type="submit" 
                  className="w-full"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Sending..." : "Send Recovery Link"}
                </Button>
                
                <div className="text-center text-sm text-muted-foreground">
                  Remember your password?{" "}
                  <Link to="/login" className="text-primary font-medium hover:underline">
                    Back to Login
                  </Link>
                </div>
              </form>
            ) : (
              <div className="space-y-4">
                <div className="bg-blue-50 text-blue-800 p-4 rounded-md text-sm">
                  <p>We've sent recovery instructions to <strong>{email}</strong></p>
                  <p className="mt-2">
                    Check your inbox and spam folder. The email should arrive within a few minutes.
                  </p>
                </div>
                
                <div className="space-y-3">
                  <Button 
                    className="w-full" 
                    variant="outline"
                    onClick={() => {
                      setEmail("");
                      setSubmitted(false);
                    }}
                  >
                    Try Different Email
                  </Button>
                  
                  <Link to="/login">
                    <Button className="w-full">
                      Back to Login
                    </Button>
                  </Link>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AccountRecovery;
