
import { useEffect } from "react";
import { AlertTriangle } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import LoginForm from "@/components/auth/LoginForm";
import BiometricButton from "@/components/auth/BiometricButton";
import LoginLinks from "@/components/auth/LoginLinks";
import { useLoginValidation } from "@/hooks/useLoginValidation";
import { useLoginSubmit } from "@/hooks/useLoginSubmit";

const Login = () => {
  const { formData, validation, handleChange } = useLoginValidation();
  const { isSubmitting, error, handleSubmit, clearError } = useLoginSubmit(formData, validation);

  // Clear error when user types
  useEffect(() => {
    if (error) {
      clearError();
    }
  }, [formData.identifier, formData.password]);

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
