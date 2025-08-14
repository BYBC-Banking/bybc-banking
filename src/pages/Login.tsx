
import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { AlertTriangle } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import LoginForm from "@/components/auth/LoginForm";
import BiometricButton from "@/components/auth/BiometricButton";
import LoginLinks from "@/components/auth/LoginLinks";
import { useToast } from "@/hooks/use-toast";
import { loginUser } from "@/services/supabase/authService";
import { useAuth } from "@/contexts/AuthContext";
import { isValidEmail, sanitizeInput } from "@/utils/security";
import { parseWebsiteParams, generateWebsiteRedirectUrl, isWebsiteRedirect } from "@/utils/websiteIntegration";

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();
  const { user, loading } = useAuth();
  
  const [formData, setFormData] = useState({
    identifier: "",
    password: "",
  });
  
  const [validation, setValidation] = useState({
    identifier: false,
    password: false,
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  // Get the redirect URL from query params
  const params = new URLSearchParams(location.search);
  const websiteParams = parseWebsiteParams();
  const redirectTo = params.get('redirect') || "/dashboard";
  const isFromWebsite = isWebsiteRedirect();

  // Redirect if already logged in
  useEffect(() => {
    if (!loading && user) {
      navigate(redirectTo);
    }
  }, [user, loading, navigate, redirectTo]);

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
        const result = await loginUser(sanitizedIdentifier, formData.password);
        
        if (result.success) {
          toast({
            title: "Login successful",
            description: isFromWebsite ? "Redirecting back to main website..." : "Welcome to BYBC Banking",
          });
          
           if (isFromWebsite && websiteParams.returnUrl) {
            // Handle website redirect
            const redirectUrl = generateWebsiteRedirectUrl({
              success: true,
              returnUrl: websiteParams.returnUrl,
              userId: "user-id-placeholder",
              token: "auth-token-placeholder"
            });
            
            setTimeout(() => {
              window.location.href = redirectUrl;
            }, 2000);
          } else {
            // Normal app navigation
            navigate(redirectTo);
          }
        } else {
          setError(result.error || "Invalid email or password");
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

  if (loading) {
    return (
      <div className="min-h-screen w-full bg-gradient-to-b from-[#1A1F2C] to-[#7E69AB] flex items-center justify-center">
        <div className="text-white">Loading...</div>
      </div>
    );
  }

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

        <div className="space-y-4">
          <LoginForm
            formData={formData}
            validation={validation}
            isSubmitting={isSubmitting}
            onSubmit={handleSubmit}
            onChange={handleChange}
          />
          
          <div className="relative flex items-center justify-center">
            <hr className="w-full border-gray-200" />
            <span className="absolute bg-white px-2 text-xs text-gray-400">or</span>
          </div>
          
          <BiometricButton />
          
          <LoginLinks />
        </div>
      </div>
    </div>
  );
};

export default Login;
