
import React, { useState } from 'react';
import { ArrowLeft, Copy, Facebook, Twitter, Linkedin, Share2, MessageCircle, ScanQrCode, QrCode } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { Card } from "@/components/ui/card";
import QrCodeComponent from "@/components/QrCode";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

const ReferralAndEarn = () => {
  const { toast } = useToast();
  const [username] = useState("johndoe123"); // In a real app, this would come from user context
  const [uniqueCode] = useState("REF-" + Math.random().toString(36).substring(2, 8).toUpperCase()); // Simulated unique code
  const referralLink = `https://bybc.com/refer?code=${uniqueCode}&username=${username}`;

  const handleCopyLink = () => {
    navigator.clipboard.writeText(referralLink);
    toast({
      title: "Link copied!",
      description: "Referral link has been copied to clipboard",
    });
  };

  const handleSharePlatform = (platform: string) => {
    // In a real app, this would open native sharing dialogs or generate platform-specific links
    toast({
      title: `Sharing to ${platform}`,
      description: `Your referral link is being shared to ${platform}`,
    });
  };

  const handleScanQR = () => {
    // In a real app, this would use the device's camera to scan a QR code
    toast({
      title: "QR Scanner",
      description: "Opening camera to scan QR code. This is a mock functionality.",
    });
  };

  return (
    <div className="bg-gradient-to-br from-white to-slate-100 min-h-screen">
      <div className="container mx-auto max-w-md px-4 py-6">
        {/* Header */}
        <header className="flex items-center gap-4 mb-6">
          <Link to="/dashboard" className="p-2">
            <ArrowLeft className="h-5 w-5" />
          </Link>
          <h1 className="text-2xl font-bold">Referral and Earn</h1>
        </header>

        {/* Main Content */}
        <div className="space-y-6">
          {/* Referral Status Card */}
          <Card className="p-6 bg-finance-blue text-white">
            <h2 className="text-lg font-semibold mb-2">Your Referral Status</h2>
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm opacity-80">People referred</p>
                <p className="text-2xl font-bold">0</p>
              </div>
              <div>
                <p className="text-sm opacity-80">Rewards earned</p>
                <p className="text-2xl font-bold">R0</p>
              </div>
            </div>
          </Card>

          {/* QR Code Options */}
          <div className="flex gap-2 justify-between">
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline" className="flex-1">
                  <QrCode className="h-5 w-5 mr-2" />
                  Show QR Code
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Your Referral QR Code</DialogTitle>
                </DialogHeader>
                <div className="flex flex-col items-center justify-center p-4">
                  <QrCodeComponent value={referralLink} size={200} />
                  <p className="mt-4 text-sm text-muted-foreground text-center">Scan this code to use your referral</p>
                </div>
              </DialogContent>
            </Dialog>

            <Button variant="outline" className="flex-1" onClick={handleScanQR}>
              <ScanQrCode className="h-5 w-5 mr-2" />
              Scan QR Code
            </Button>
          </div>

          {/* How it works */}
          <div>
            <h2 className="text-lg font-semibold mb-3">How it works</h2>
            <ol className="space-y-3 list-decimal pl-5">
              <li>Share your unique referral code with friends and family</li>
              <li>When they sign up using your code, they get R100 bonus</li>
              <li>You earn R150 for each successful referral</li>
              <li>Rewards are credited once their account is activated</li>
            </ol>
          </div>

          {/* Your Referral Link */}
          <div className="space-y-3">
            <h2 className="text-lg font-semibold">Your Referral Link</h2>
            <div className="flex">
              <Input 
                value={referralLink} 
                readOnly 
                className="rounded-r-none focus-visible:ring-0"
              />
              <Button 
                onClick={handleCopyLink} 
                className="rounded-l-none"
                variant="outline"
              >
                <Copy className="h-4 w-4 mr-2" />
                Copy
              </Button>
            </div>
          </div>

          {/* Referral Code */}
          <div className="space-y-3">
            <h2 className="text-lg font-semibold">Your Referral Code</h2>
            <div className="flex items-center justify-center bg-slate-100 py-4 rounded-lg border-2 border-dashed border-slate-300">
              <span className="text-xl font-mono font-bold tracking-wider">{uniqueCode}</span>
            </div>
          </div>

          {/* Share Options */}
          <div className="space-y-3">
            <h2 className="text-lg font-semibold">Share With</h2>
            <div className="flex flex-wrap gap-2 justify-between">
              <Button variant="outline" className="flex-1" onClick={() => handleSharePlatform("WhatsApp")}>
                <MessageCircle className="h-5 w-5 mr-2 text-green-600" />
                WhatsApp
              </Button>
              <Button variant="outline" className="flex-1" onClick={() => handleSharePlatform("Facebook")}>
                <Facebook className="h-5 w-5 mr-2 text-blue-600" />
                Facebook
              </Button>
              <Button variant="outline" className="flex-1" onClick={() => handleSharePlatform("Twitter")}>
                <Twitter className="h-5 w-5 mr-2 text-sky-500" />
                Twitter
              </Button>
            </div>
            <div className="flex flex-wrap gap-2 justify-between">
              <Button variant="outline" className="flex-1" onClick={() => handleSharePlatform("LinkedIn")}>
                <Linkedin className="h-5 w-5 mr-2 text-blue-700" />
                LinkedIn
              </Button>
              <Button variant="outline" className="flex-1 basis-full" onClick={() => handleSharePlatform("More")}>
                <Share2 className="h-5 w-5 mr-2" />
                More Options
              </Button>
            </div>
          </div>

          {/* Terms and Conditions */}
          <div className="text-center text-sm text-muted-foreground mt-6">
            <p>By referring, you agree to our <Link to="/terms" className="underline">Terms & Conditions</Link></p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReferralAndEarn;
