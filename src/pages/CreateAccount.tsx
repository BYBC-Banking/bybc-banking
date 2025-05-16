
import React, { useState } from 'react';
import { ArrowLeft } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { useToast } from '@/hooks/use-toast';

interface AccountType {
  id: string;
  name: string;
  description: string;
  color: string;
}

const accountTypes: AccountType[] = [
  {
    id: "spending",
    name: "Spending Account",
    description: "Everyday banking for daily transactions",
    color: "blue"
  },
  {
    id: "savings",
    name: "Savings Account",
    description: "Higher interest for your savings goals",
    color: "green"
  },
  {
    id: "business",
    name: "Business Account",
    description: "Manage your business finances",
    color: "purple"
  },
  {
    id: "investment",
    name: "Investment Account",
    description: "Invest in stocks, bonds, and more",
    color: "teal"
  },
  {
    id: "nonprofit",
    name: "Nonprofit Account",
    description: "Special features for nonprofit organizations",
    color: "orange"
  }
];

const CreateAccount = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [accountType, setAccountType] = useState<string>("spending");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [isLoginMode, setIsLoginMode] = useState<boolean>(false);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (isLoginMode) {
      // Check if credentials match the admin credentials
      if (email === "bybc.banking@gmail.com" && password === "adminbybc") {
        toast({
          title: "Login Successful",
          description: "Welcome back to BYBC Banking",
        });
        localStorage.setItem('isLoggedIn', 'true');
        navigate("/dashboard");
      } else {
        toast({
          title: "Login Failed",
          description: "Invalid email or password",
          variant: "destructive",
        });
      }
    } else {
      // Redirect to the appropriate onboarding page for the selected account type
      navigate(`/account-onboarding/${accountType}`);
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
            <form onSubmit={handleSubmit} className="space-y-4">
              {isLoginMode ? (
                // Login form
                <>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input 
                      id="email" 
                      type="email" 
                      placeholder="yourname@example.com" 
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="password">Password</Label>
                    <Input 
                      id="password" 
                      type="password" 
                      placeholder="••••••••" 
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                  </div>
                </>
              ) : (
                // Account type selection
                <RadioGroup 
                  value={accountType} 
                  onValueChange={setAccountType}
                  className="space-y-3"
                >
                  {accountTypes.map((type) => (
                    <div
                      key={type.id}
                      className="flex items-center space-x-3 border rounded-lg p-3 hover:bg-slate-50 cursor-pointer"
                      onClick={() => setAccountType(type.id)}
                    >
                      <RadioGroupItem value={type.id} id={type.id} />
                      <div className="flex-1">
                        <Label htmlFor={type.id} className="font-medium cursor-pointer">
                          {type.name}
                        </Label>
                        <p className="text-sm text-muted-foreground">
                          {type.description}
                        </p>
                      </div>
                      <div 
                        className={`w-4 h-4 rounded-full
                          ${type.color === "blue" ? "bg-finance-blue" : ""} 
                          ${type.color === "green" ? "bg-finance-green" : ""}
                          ${type.color === "purple" ? "bg-[#7E69AB]" : ""}
                          ${type.color === "orange" ? "bg-orange-500" : ""}
                          ${type.color === "teal" ? "bg-teal-600" : ""}
                        `}
                      />
                    </div>
                  ))}
                </RadioGroup>
              )}
              
              <div className="flex flex-col gap-3">
                <Button type="submit" className="w-full">
                  {isLoginMode ? "Login" : "Create Account"}
                </Button>
                <Button 
                  type="button" 
                  variant="outline" 
                  className="w-full"
                  onClick={() => setIsLoginMode(!isLoginMode)}
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
