
import React, { useState } from 'react';
import { ArrowLeft } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { useToast } from '@/hooks/use-toast';
import { login } from '@/utils/auth';
import { isValidEmail, sanitizeInput } from '@/utils/security';
import CreateAccountLoginForm from '@/components/auth/CreateAccountLoginForm';

const CreateAccount = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [accountSection, setAccountSection] = useState<"personal" | "business">("personal");
  const [accountType, setAccountType] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [isLoginMode, setIsLoginMode] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  
  const personalAccountTypes = [
    { id: "basic", name: "Basic Account", description: "Standard personal banking account" },
    { id: "student", name: "Student Account", description: "Special rates for students" },
    { id: "senior", name: "Senior Citizen Account", description: "Benefits for senior citizens" },
    { id: "lifestyle", name: "Lifestyle Account", description: "Premium lifestyle banking" },
    { id: "joint", name: "Joint Account", description: "Shared account for couples" }
  ];

  const businessAccountTypes = [
    { id: "smb", name: "Small and Medium Business", description: "For growing businesses" },
    { id: "sole", name: "Sole Proprietor", description: "Individual business owners" },
    { id: "nonprofit", name: "Nonprofit Business", description: "For charitable organizations" },
    { id: "agricultural", name: "Agricultural and Rural Business", description: "Farming and rural enterprises" },
    { id: "ecommerce", name: "E-commerce and Online Business", description: "Digital business solutions" }
  ];

  const currentAccountTypes = accountSection === "personal" ? personalAccountTypes : businessAccountTypes;
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    setIsSubmitting(true);
    setError(null);
    
    if (isLoginMode) {
      try {
        // Validate email
        if (!isValidEmail(email)) {
          setError("Please enter a valid email address");
          setIsSubmitting(false);
          return;
        }
        
        // Sanitize input to prevent XSS
        const sanitizedEmail = sanitizeInput(email);
        
        // Attempt login
        const loginSuccess = await login(sanitizedEmail, password);
        
        if (loginSuccess) {
          toast({
            title: "Login Successful",
            description: "Welcome back to BYBC Banking",
          });
          navigate("/dashboard");
        } else {
          setError("Invalid email or password");
        }
      } catch (err) {
        console.error("Login error:", err);
        setError("An unexpected error occurred. Please try again.");
      } finally {
        setIsSubmitting(false);
      }
    } else {
      // For account creation
      try {
        setIsSubmitting(false);
        // Redirect to the appropriate onboarding page for the selected account type
        navigate(`/account-onboarding/${accountType}`);
      } catch (err) {
        setError("Failed to redirect to account creation");
        setIsSubmitting(false);
      }
    }
  };
  
  return (
    <div className="bg-gradient-to-br from-white to-slate-100 min-h-screen">
      <div className="container mx-auto max-w-md px-4 py-6">
        {/* Header */}
        <header className="flex items-center gap-4 mb-6">
          <Link to="/" className="p-2">
            <ArrowLeft className="h-5 w-5" />
          </Link>
          <h1 className="text-2xl font-bold">{isLoginMode ? "Login" : "Create Account"}</h1>
        </header>
        
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>{isLoginMode ? "Login to Your Account" : "Select Account Type"}</CardTitle>
            <CardDescription>
              {isLoginMode 
                ? "Enter your credentials to access your account" 
                : "Choose the type of account you want to open"}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {error && (
              <Alert variant="destructive" className="mb-4">
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}
            
            <form onSubmit={handleSubmit} className="space-y-4">
              {isLoginMode ? (
                <CreateAccountLoginForm
                  email={email}
                  password={password}
                  onEmailChange={setEmail}
                  onPasswordChange={setPassword}
                />
              ) : (
                <div className="space-y-4">
                  {/* Account Section Toggle */}
                  <div className="flex bg-gray-100 rounded-lg p-1">
                    <button
                      type="button"
                      onClick={() => {
                        setAccountSection("personal");
                        setAccountType("");
                      }}
                      className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
                        accountSection === "personal"
                          ? "bg-white text-gray-900 shadow-sm"
                          : "text-gray-600 hover:text-gray-900"
                      }`}
                    >
                      Personal Account
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setAccountSection("business");
                        setAccountType("");
                      }}
                      className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
                        accountSection === "business"
                          ? "bg-white text-gray-900 shadow-sm"
                          : "text-gray-600 hover:text-gray-900"
                      }`}
                    >
                      Business Account
                    </button>
                  </div>

                  {/* Account Type Selection */}
                  <div className="space-y-3">
                    {currentAccountTypes.map((type) => (
                      <div
                        key={type.id}
                        onClick={() => setAccountType(type.id)}
                        className={`p-4 border rounded-lg cursor-pointer transition-all ${
                          accountType === type.id
                            ? "border-finance-blue bg-finance-blue/5"
                            : "border-gray-200 hover:border-gray-300"
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <div>
                            <h3 className="font-medium text-gray-900">{type.name}</h3>
                            <p className="text-sm text-gray-500">{type.description}</p>
                          </div>
                          <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                            accountType === type.id
                              ? "border-finance-blue"
                              : "border-gray-300"
                          }`}>
                            {accountType === type.id && (
                              <div className="w-2 h-2 bg-finance-blue rounded-full" />
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              
              <div className="flex flex-col gap-3">
                <Button 
                  type="submit" 
                  className="w-full"
                  disabled={isSubmitting || (!isLoginMode && !accountType)}
                >
                  {isSubmitting 
                    ? (isLoginMode ? "Signing In..." : "Creating Account...") 
                    : (isLoginMode ? "Login" : "Create Account")}
                </Button>
                <Button 
                  type="button" 
                  variant="outline" 
                  className="w-full"
                  onClick={() => {
                    setIsLoginMode(!isLoginMode);
                    setError(null);
                  }}
                  disabled={isSubmitting}
                >
                  {isLoginMode ? "Create New Account" : "Already Have an Account? Login"}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CreateAccount;
