
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Eye, EyeOff, AlertTriangle, Users } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";
import { registerUser } from "@/services/supabase/authService";
import { isValidEmail, isValidPhone, isStrongPassword } from "@/utils/security";

const Register = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    mobile: "",
    password: "",
    confirmPassword: "",
  });
  
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const [validation, setValidation] = useState({
    fullName: false,
    email: false,
    mobile: false,
    password: false,
    confirmPassword: false,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    
    // Clear error when user types
    setError(null);
    
    // Basic validation
    switch (name) {
      case "fullName":
        setValidation(prev => ({
          ...prev,
          fullName: value.trim().length > 2
        }));
        break;
      case "email":
        setValidation(prev => ({
          ...prev,
          email: isValidEmail(value)
        }));
        break;
      case "mobile":
        setValidation(prev => ({
          ...prev,
          mobile: isValidPhone(value)
        }));
        break;
      case "password":
        const isStrong = isStrongPassword(value);
        setValidation(prev => ({
          ...prev,
          password: isStrong,
          confirmPassword: isStrong && value === formData.confirmPassword
        }));
        break;
      case "confirmPassword":
        setValidation(prev => ({
          ...prev,
          confirmPassword: value === formData.password && value.length > 0
        }));
        break;
      default:
        break;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Check if all fields are valid
    const isFormValid = Object.values(validation).every(valid => valid);
    
    if (!isFormValid) {
      setError("Please ensure all fields are valid before submitting");
      return;
    }
    
    setIsSubmitting(true);
    setError(null);
    
    try {
      const result = await registerUser({
        fullName: formData.fullName,
        email: formData.email,
        mobile: formData.mobile,
        password: formData.password
      });
      
      if (result.success) {
        toast({
          title: "Registration Successful!",
          description: "Please check your email to confirm your account, then you can log in.",
        });
        navigate("/login");
      } else {
        setError(result.error || "Registration failed. Please try again.");
      }
    } catch (err) {
      console.error("Registration error:", err);
      setError("An unexpected error occurred. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const isFormValid = Object.values(validation).every(valid => valid);

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-finance-blue-light to-finance-green-light flex flex-col justify-center px-4 py-12">
      <div className="max-w-md w-full mx-auto bg-white/90 backdrop-blur-sm rounded-xl shadow-lg p-6 space-y-6 animate-fade-in">
        <div className="text-center space-y-2">
          <h1 className="text-2xl font-bold text-finance-blue">Create Account</h1>
          <p className="text-muted-foreground">Start your financial journey with us</p>
        </div>

        {error && (
          <Alert variant="destructive">
            <AlertTriangle className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="fullName">Full Name</Label>
            <Input
              id="fullName"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              placeholder="Enter your full name"
              className={cn(
                "transition-all duration-200",
                validation.fullName && "border-finance-green"
              )}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              className={cn(
                "transition-all duration-200",
                validation.email && "border-finance-green"
              )}
              autoComplete="email"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="mobile">Mobile Number</Label>
            <Input
              id="mobile"
              name="mobile"
              value={formData.mobile}
              onChange={handleChange}
              placeholder="Enter your SA mobile number (e.g., 0712345678)"
              className={cn(
                "transition-all duration-200",
                validation.mobile && "border-finance-green"
              )}
              autoComplete="tel"
            />
            <p className="text-xs text-muted-foreground">
              Only South African mobile numbers are accepted (06x, 07x, 08x format)
            </p>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <div className="relative">
              <Input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                value={formData.password}
                onChange={handleChange}
                placeholder="Create password (min. 8 characters)"
                className={cn(
                  "pr-10 transition-all duration-200",
                  validation.password && "border-finance-green"
                )}
                autoComplete="new-password"
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
          
          <div className="space-y-2">
            <Label htmlFor="confirmPassword">Confirm Password</Label>
            <div className="relative">
              <Input
                id="confirmPassword"
                name="confirmPassword"
                type={showConfirmPassword ? "text" : "password"}
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="Confirm your password"
                className={cn(
                  "pr-10 transition-all duration-200",
                  validation.confirmPassword && "border-finance-green"
                )}
                autoComplete="new-password"
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
              >
                {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          <Button
            type="submit"
            disabled={!isFormValid || isSubmitting}
            className={cn(
              "w-full mt-4 transition-all duration-200 hover:scale-[1.02]",
              isFormValid && !isSubmitting ? "bg-finance-blue hover:bg-finance-blue-light" : "opacity-70"
            )}
          >
            {isSubmitting ? "Creating Account..." : "Create Account"}
          </Button>
          
          <p className="text-sm text-center text-muted-foreground pt-2">
            Already have an account?{" "}
            <Link to="/login" className="text-finance-blue hover:underline font-medium">
              Log In
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Register;
