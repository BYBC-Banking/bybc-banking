
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

interface LoginFormProps {
  formData: {
    identifier: string;
    password: string;
  };
  validation: {
    identifier: boolean;
    password: boolean;
  };
  isSubmitting: boolean;
  onSubmit: (e: React.FormEvent) => void;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const LoginForm = ({ formData, validation, isSubmitting, onSubmit, onChange }: LoginFormProps) => {
  const [showPassword, setShowPassword] = useState(false);
  const isFormValid = validation.identifier && validation.password;

  return (
    <form onSubmit={onSubmit} className="space-y-6">
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
            onChange={onChange}
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
            onChange={onChange}
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

      <Button
        type="submit"
        disabled={!isFormValid || isSubmitting}
        className={cn(
          "w-full bg-[#9b87f5] hover:bg-[#7E69AB] transition-all shadow-md duration-200 hover:scale-[1.02]",
          (!isFormValid || isSubmitting) ? "opacity-70" : ""
        )}
      >
        {isSubmitting ? "Signing In..." : "Log In"}
      </Button>
    </form>
  );
};

export default LoginForm;
