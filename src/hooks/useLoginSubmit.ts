
import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { login } from "@/utils/auth";
import { isValidEmail, sanitizeInput } from "@/utils/security";

interface FormData {
  identifier: string;
  password: string;
}

interface Validation {
  identifier: boolean;
  password: boolean;
}

export const useLoginSubmit = (formData: FormData, validation: Validation) => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const location = useLocation();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  // Get the redirect URL from query params
  const params = new URLSearchParams(location.search);
  const redirectTo = params.get('redirect') || "/dashboard";

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

  // Clear error when user types
  const clearError = () => setError(null);

  return {
    isSubmitting,
    error,
    handleSubmit,
    clearError,
  };
};
