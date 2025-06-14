
import React from 'react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';

interface LoginFormProps {
  email: string;
  password: string;
  onEmailChange: (email: string) => void;
  onPasswordChange: (password: string) => void;
}

const CreateAccountLoginForm = ({ email, password, onEmailChange, onPasswordChange }: LoginFormProps) => {
  return (
    <>
      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input 
          id="email" 
          type="email" 
          placeholder="yourname@example.com" 
          value={email}
          onChange={(e) => onEmailChange(e.target.value)}
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
          onChange={(e) => onPasswordChange(e.target.value)}
          required
        />
      </div>
    </>
  );
};

export default CreateAccountLoginForm;
