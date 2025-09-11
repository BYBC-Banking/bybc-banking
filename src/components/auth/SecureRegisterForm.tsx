import { useState } from "react";
import { Eye, EyeOff, Mail, Lock, User, Phone } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { isValidEmail, isValidPhone, isStrongPassword, sanitizeInput } from "@/utils/security";
import PasswordStrengthIndicator from "./PasswordStrengthIndicator";

interface SecureRegisterFormProps {
  formData: {
    fullName: string;
    email: string;
    mobile: string;
    password: string;
    confirmPassword: string;
  };
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (e: React.FormEvent) => void;
  isSubmitting: boolean;
}

const SecureRegisterForm = ({ formData, onChange, onSubmit, isSubmitting }: SecureRegisterFormProps) => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const validation = {
    fullName: formData.fullName.length >= 2,
    email: isValidEmail(formData.email),
    mobile: isValidPhone(formData.mobile),
    password: isStrongPassword(formData.password),
    confirmPassword: formData.password === formData.confirmPassword && formData.confirmPassword.length > 0
  };

  const isFormValid = Object.values(validation).every(Boolean);

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="fullName">Full Name</Label>
        <div className="relative">
          <User className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
          <Input
            type="text"
            id="fullName"
            name="fullName"
            placeholder="Enter your full name"
            value={formData.fullName}
            onChange={onChange}
            className={`pl-10 ${validation.fullName ? "border-green-500" : "border-gray-300"}`}
            required
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="email">Email Address</Label>
        <div className="relative">
          <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
          <Input
            type="email"
            id="email"
            name="email"
            placeholder="Enter your email"
            value={formData.email}
            onChange={onChange}
            className={`pl-10 ${validation.email ? "border-green-500" : "border-gray-300"}`}
            required
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="mobile">Mobile Number</Label>
        <div className="relative">
          <Phone className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
          <Input
            type="tel"
            id="mobile"
            name="mobile"
            placeholder="+27 or 0XX XXX XXXX"
            value={formData.mobile}
            onChange={onChange}
            className={`pl-10 ${validation.mobile ? "border-green-500" : "border-gray-300"}`}
            required
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="password">Password</Label>
        <div className="relative">
          <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
          <Input
            type={showPassword ? "text" : "password"}
            id="password"
            name="password"
            placeholder="Create a strong password"
            value={formData.password}
            onChange={onChange}
            className={`pl-10 pr-10 ${validation.password ? "border-green-500" : "border-gray-300"}`}
            required
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
          >
            {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
          </button>
        </div>
        <PasswordStrengthIndicator password={formData.password} />
      </div>

      <div className="space-y-2">
        <Label htmlFor="confirmPassword">Confirm Password</Label>
        <div className="relative">
          <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
          <Input
            type={showConfirmPassword ? "text" : "password"}
            id="confirmPassword"
            name="confirmPassword"
            placeholder="Confirm your password"
            value={formData.confirmPassword}
            onChange={onChange}
            className={`pl-10 pr-10 ${validation.confirmPassword ? "border-green-500" : "border-gray-300"}`}
            required
          />
          <button
            type="button"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
          >
            {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
          </button>
        </div>
        {formData.confirmPassword && !validation.confirmPassword && (
          <p className="text-sm text-red-600">Passwords do not match</p>
        )}
      </div>

      <Button
        type="submit"
        className="w-full"
        disabled={!isFormValid || isSubmitting}
      >
        {isSubmitting ? "Creating Account..." : "Create Secure Account"}
      </Button>
    </form>
  );
};

export default SecureRegisterForm;