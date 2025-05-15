
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Fingerprint, Eye, EyeOff } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    identifier: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [validation, setValidation] = useState({
    identifier: false,
    password: false,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validation.identifier && validation.password) {
      // Check for admin credentials
      if (formData.identifier === "bybc.banking@gmail.com" && formData.password === "adminbybc") {
        console.log("Login successful with admin credentials");
        navigate("/dashboard"); // Navigate to dashboard on successful login
      } else {
        console.log("Login attempt with:", formData);
        navigate("/dashboard"); // For demo purposes, navigate anyway
      }
    }
  };

  const handleBiometricAuth = () => {
    // This would integrate with device biometric APIs in a real app
    console.log("Biometric authentication requested");
  };

  const isFormValid = validation.identifier && validation.password;

  return (
    <div className="min-h-screen w-full bg-gradient-to-b from-[#1A1F2C] to-[#7E69AB] flex flex-col justify-center px-4 py-12">
      <div className="max-w-md w-full mx-auto bg-white/90 backdrop-blur-sm rounded-xl shadow-lg p-8 space-y-6 animate-fade-in">
        <div className="text-center space-y-2">
          <h1 className="text-2xl font-bold text-[#1A1F2C]">Welcome Back</h1>
          <p className="text-[#8E9196]">Continue your financial journey</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <div className="flex justify-between">
              <Label htmlFor="identifier">Mobile or Email</Label>
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
                placeholder="Enter mobile or email"
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
              disabled={!isFormValid}
              className={cn(
                "bg-[#9b87f5] hover:bg-[#7E69AB] transition-all shadow-md duration-200 hover:scale-[1.02]",
                isFormValid ? "" : "opacity-70"
              )}
            >
              Log In
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
              <a 
                href="#forgot-password" 
                className="text-sm text-[#999] hover:underline transition-all block"
              >
                Forgot Password?
              </a>
              
              <p className="text-sm text-muted-foreground">
                Don't have an account?{" "}
                <Link to="/register" className="text-[#9b87f5] font-medium hover:underline">
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
