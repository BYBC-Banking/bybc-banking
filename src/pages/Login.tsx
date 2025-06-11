
import { useState, useEffect } from "react";
import { useNavigate, Link, useLocation } from "react-router-dom";
import { Fingerprint, Eye, EyeOff, AlertTriangle } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";
import { login } from "@/utils/auth";
import { isValidEmail, sanitizeInput } from "@/utils/security";

const Login = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const location = useLocation();
  const [formData, setFormData] = useState({
    identifier: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [validation, setValidation] = useState({
    identifier: false,
    password: false,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  // Get the redirect URL from query params
  const params = new URLSearchParams(location.search);
  const redirectTo = params.get('redirect') || "/dashboard";

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    
    // Clear error when user types
    setError(null);
    
    // Basic validation
    if (name === "identifier") {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      const phoneRegex = /^(\+27|0)[0-9]{9}$/; // South African phone format
      setValidation((prev) => ({
        ...prev,
        identifier: emailRegex.test(value) || phoneRegex.test(value),
      }));
    } else if (name === "password") {
      setValidation((prev) => ({
        ...prev,
        password: value.length >= 8,
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate inputs
    if (!validation.identifier || !validation.password) {
      setError("Please ensure all fields are valid before submitting");
      return;
    }
    
    setIsSubmitting(true);
    setError(null);
    
    try {
      // Sanitize inputs to prevent XSS
      const sanitizedIdentifier = sanitizeInput(formData.identifier.trim());
      
      // Determine if input is email or phone
      const isEmail = isValidEmail(sanitizedIdentifier);
      
      // Attempt login with the sanitized email
      if (isEmail) {
        const loginSuccess = await login(sanitizedIdentifier, formData.password);
        
        if (loginSuccess) {
          toast({
            title: "Login successful",
            description: "Welcome to BYBC Banking",
          });
          
          // Redirect to intended destination
          navigate(redirectTo);
        } else {
          setError("Invalid email or password");
        }
      } else {
        // For demo purposes, phone login isn't implemented yet
        setError("Please use your email address to login");
      }
    } catch (err) {
      console.error("Login error:", err);
      setError("An unexpected error occurred. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleBiometricAuth = () => {
    // This would integrate with device biometric APIs in a real app
    toast({
      title: "Biometric authentication",
      description: "This feature is not available in the demo",
    });
  };

  const isFormValid = validation.identifier && validation.password;

  return (
    <div className="min-h-screen w-full bg-gradient-to-b from-[#1A1F2C] to-[#7E69AB] flex flex-col justify-center px-4 py-12">
      <div className="max-w-md w-full mx-auto bg-white/90 backdrop-blur-sm rounded-xl shadow-lg p-8 space-y-6 animate-fade-in">
        <div className="text-center space-y-2">
          <h1 className="text-2xl font-bold text-[#1A1F2C]">Welcome Back</h1>
          <p className="text-[#8E9196]">Continue your financial journey</p>
        </div>

        {error && (
          <Alert variant="destructive">
            <AlertTriangle className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <div className="flex justify-between">
              <Label htmlFor="identifier">Email Address</Label>
              {validation.identifier && (
                <span className="text-sm text-finance-green flex items-center gap-1">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M20 6 9 17l-5-5" />
                  </svg>
                  Valid
                </span>
              )}
            </div>
            <div className="relative">
              <Input
                id="identifier"
                name="identifier"
                value={formData.identifier}
                onChange={handleChange}
                placeholder="Enter your email address"
                className={cn(
                  "transition-all duration-200",
                  validation.identifier && "border-finance-green pr-10"
                )}
                autoComplete="username"
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <div className="flex justify-between">
              <Label htmlFor="password">Password</Label>
              {validation.password && (
                <span className="text-sm text-finance-green flex items-center gap-1">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M20 6 9 17l-5-5" />
                  </svg>
                  Valid
                </span>
              )}
            </div>
            <div className="relative">
              <Input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter your password"
                className={cn(
                  "pr-10 transition-all duration-200",
                  validation.password && "border-finance-green"
                )}
                autoComplete="current-password"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          <div className="flex flex-col space-y-4">
            <Button
              type="submit"
              disabled={!isFormValid || isSubmitting}
              className={cn(
                "bg-[#9b87f5] hover:bg-[#7E69AB] transition-all shadow-md duration-200 hover:scale-[1.02]",
                (!isFormValid || isSubmitting) ? "opacity-70" : ""
              )}
            >
              {isSubmitting ? "Signing In..." : "Log In"}
            </Button>
            
            <div className="relative flex items-center justify-center">
              <hr className="w-full border-gray-200" />
              <span className="absolute bg-white px-2 text-xs text-gray-400">or</span>
            </div>
            
            <Button
              type="button"
              variant="outline"
              onClick={handleBiometricAuth}
              className="flex items-center justify-center gap-2 hover:bg-gray-50 border-[#9b87f5] text-[#9b87f5] transition-colors"
            >
              <Fingerprint className="text-[#9b87f5]" size={18} />
              <span>Login with Biometrics</span>
            </Button>
            
            <div className="text-center space-y-2 pt-2">
              <Link
                to="/account-recovery"
                className="text-sm text-[#999] hover:underline transition-all block"
              >
                Forgot Password?
              </Link>
              
              <Link
                to="/recovery"
                className="text-sm text-[#7E69AB] hover:underline transition-all block font-medium"
              >
                Can't access account?
              </Link>
              
              <p className="text-sm text-muted-foreground">
                Don't have an account?{" "}
                <Link to="/register" className="text-[#7E69AB] font-medium hover:underline">
                  Register
                </Link>
              </p>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
