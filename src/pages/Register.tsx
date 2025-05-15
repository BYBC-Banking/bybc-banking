
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";

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
    
    // Basic validation
    switch (name) {
      case "fullName":
        setValidation(prev => ({
          ...prev,
          fullName: value.trim().length > 2
        }));
        break;
      case "email":
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        setValidation(prev => ({
          ...prev,
          email: emailRegex.test(value)
        }));
        break;
      case "mobile":
        const phoneRegex = /^(\+27|0)[0-9]{9}$/; // South African phone format
        setValidation(prev => ({
          ...prev,
          mobile: phoneRegex.test(value)
        }));
        break;
      case "password":
        setValidation(prev => ({
          ...prev,
          password: value.length >= 8,
          // Also update confirmPassword validation when password changes
          confirmPassword: value === formData.confirmPassword && value.length > 0
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Check if all fields are valid
    const isFormValid = Object.values(validation).every(valid => valid);
    
    if (isFormValid) {
      // In a real app, this would handle registration
      console.log("Registration attempt with:", formData);
      
      toast({
        title: "Registration successful",
        description: "Your account has been created.",
      });
      
      // Navigate to dashboard on successful registration
      navigate("/dashboard");
    } else {
      toast({
        title: "Registration failed",
        description: "Please fill all fields correctly.",
        variant: "destructive"
      });
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

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Full Name */}
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
          
          {/* Email */}
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
          
          {/* Mobile */}
          <div className="space-y-2">
            <Label htmlFor="mobile">Mobile Number</Label>
            <Input
              id="mobile"
              name="mobile"
              value={formData.mobile}
              onChange={handleChange}
              placeholder="Enter your mobile number"
              className={cn(
                "transition-all duration-200",
                validation.mobile && "border-finance-green"
              )}
              autoComplete="tel"
            />
          </div>
          
          {/* Password */}
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
          
          {/* Confirm Password */}
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
            disabled={!isFormValid}
            className={cn(
              "w-full mt-4 transition-all duration-200 hover:scale-[1.02]",
              isFormValid ? "bg-finance-blue hover:bg-finance-blue-light" : "opacity-70"
            )}
          >
            Create Account
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
