
import React, { useEffect } from 'react';
import { ArrowLeft, User, Lock, Bell, Globe, Shield, CreditCard, Smartphone, ExternalLink, HelpCircle } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useToast } from '@/hooks/use-toast';

export default function Settings() {
  const navigate = useNavigate();
  const { toast } = useToast();
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  
  const handleBack = () => {
    navigate(-1);
  };
  
  const handleLogout = () => {
    toast({
      title: "Logged out",
      description: "You have been successfully logged out"
    });
    // In a real app, you would handle actual logout logic here
  };
  
  return (
    <div className="container mx-auto max-w-md py-8 px-4">
      <header className="flex items-center gap-4 mb-6">
        <button onClick={handleBack} className="p-2">
          <ArrowLeft className="h-5 w-5" />
        </button>
        <h1 className="text-2xl font-bold">Settings</h1>
      </header>

      {/* Profile Section */}
      <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
        <div className="flex items-center space-x-4">
          <Avatar className="h-16 w-16">
            <AvatarImage src="/placeholder.svg" alt="User" />
            <AvatarFallback>JD</AvatarFallback>
          </Avatar>
          <div>
            <h2 className="font-semibold text-lg">John Doe</h2>
            <p className="text-sm text-muted-foreground">john.doe@example.com</p>
            <Link to="/profile" className="text-sm text-finance-blue mt-1 inline-block">
              Edit Profile
            </Link>
          </div>
        </div>
      </div>

      {/* Account Settings */}
      <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
        <h2 className="font-semibold text-lg mb-4">Account Settings</h2>
        
        <div className="space-y-4">
          <Link to="/profile" className="flex items-center justify-between py-2">
            <div className="flex items-center">
              <User className="h-5 w-5 mr-3 text-gray-500" />
              <span>Personal Information</span>
            </div>
            <ArrowLeft className="h-4 w-4 rotate-180" />
          </Link>
          
          <Separator />
          
          <Link to="/settings/security" className="flex items-center justify-between py-2">
            <div className="flex items-center">
              <Lock className="h-5 w-5 mr-3 text-gray-500" />
              <span>Security</span>
            </div>
            <ArrowLeft className="h-4 w-4 rotate-180" />
          </Link>
          
          <Separator />
          
          <Link to="/notifications" className="flex items-center justify-between py-2">
            <div className="flex items-center">
              <Bell className="h-5 w-5 mr-3 text-gray-500" />
              <span>Notification Preferences</span>
            </div>
            <ArrowLeft className="h-4 w-4 rotate-180" />
          </Link>
          
          <Separator />
          
          <Link to="/privacy-dashboard" className="flex items-center justify-between py-2">
            <div className="flex items-center">
              <Shield className="h-5 w-5 mr-3 text-gray-500" />
              <span>Privacy & Data</span>
            </div>
            <ArrowLeft className="h-4 w-4 rotate-180" />
          </Link>
          
          <Separator />
          
          <Link to="/language" className="flex items-center justify-between py-2">
            <div className="flex items-center">
              <Globe className="h-5 w-5 mr-3 text-gray-500" />
              <span>Language</span>
            </div>
            <ArrowLeft className="h-4 w-4 rotate-180" />
          </Link>
        </div>
      </div>

      {/* Preferences */}
      <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
        <h2 className="font-semibold text-lg mb-4">Preferences</h2>
        
        <div className="space-y-4">
          <div className="flex items-center justify-between py-2">
            <div className="flex items-center">
              <Shield className="h-5 w-5 mr-3 text-gray-500" />
              <span>Face ID / Touch ID Login</span>
            </div>
            <Switch />
          </div>
          
          <Separator />
          
          <Link to="/card-controls" className="flex items-center justify-between py-2">
            <div className="flex items-center">
              <CreditCard className="h-5 w-5 mr-3 text-gray-500" />
              <span>Card Controls</span>
            </div>
            <ArrowLeft className="h-4 w-4 rotate-180" />
          </Link>
          
          <Separator />
          
          <Link to="/app-appearance" className="flex items-center justify-between py-2">
            <div className="flex items-center">
              <Smartphone className="h-5 w-5 mr-3 text-gray-500" />
              <span>App Appearance</span>
            </div>
            <ArrowLeft className="h-4 w-4 rotate-180" />
          </Link>
          
          <Separator />
          
          <div className="flex items-center justify-between py-2">
            <div className="flex items-center">
              <Bell className="h-5 w-5 mr-3 text-gray-500" />
              <span>Push Notifications</span>
            </div>
            <Switch defaultChecked />
          </div>
        </div>
      </div>

      {/* Support & Legal */}
      <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
        <h2 className="font-semibold text-lg mb-4">Support & Legal</h2>
        
        <div className="space-y-4">
          <Link to="/help" className="flex items-center justify-between py-2">
            <div className="flex items-center">
              <HelpCircle className="h-5 w-5 mr-3 text-gray-500" />
              <span>Help & Support</span>
            </div>
            <ArrowLeft className="h-4 w-4 rotate-180" />
          </Link>
          
          <Separator />
          
          <Link to="/legal" className="flex items-center justify-between py-2">
            <div className="flex items-center">
              <ExternalLink className="h-5 w-5 mr-3 text-gray-500" />
              <span>Terms & Privacy Policy</span>
            </div>
            <ArrowLeft className="h-4 w-4 rotate-180" />
          </Link>
        </div>
      </div>
    </div>
  );
}
