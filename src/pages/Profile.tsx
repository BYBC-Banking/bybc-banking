
import React from 'react';
import { ArrowLeft, Edit, Camera, Mail, Phone, User, MapPin, Calendar } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";

export default function Profile() {
  const { toast } = useToast();
  
  const handleEditProfile = () => {
    toast({
      title: "Edit Profile",
      description: "Profile edit functionality will be implemented soon.",
    });
  };
  
  const handleChangePhoto = () => {
    toast({
      title: "Change Photo",
      description: "Photo upload functionality will be implemented soon.",
    });
  };

  return (
    <div className="bg-gradient-to-br from-white to-slate-100 min-h-screen pb-12">
      <div className="container mx-auto max-w-md px-4 py-6">
        {/* Header */}
        <header className="flex items-center gap-4 mb-6">
          <Link to="/" className="p-2">
            <ArrowLeft className="h-5 w-5" />
          </Link>
          <h1 className="text-2xl font-bold">Profile</h1>
        </header>
        
        {/* Profile Header */}
        <Card className="mb-6">
          <CardHeader className="pb-0">
            <div className="flex justify-between items-center mb-4">
              <CardTitle>Personal Information</CardTitle>
              <Button variant="outline" size="sm" onClick={handleEditProfile}>
                <Edit className="h-4 w-4 mr-2" /> Edit
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-4 mb-4">
              <div className="relative">
                <div className="w-20 h-20 rounded-full overflow-hidden bg-slate-200">
                  <AspectRatio ratio={1/1} className="bg-slate-200">
                    <div className="flex items-center justify-center h-full text-slate-400">
                      <User className="h-10 w-10" />
                    </div>
                  </AspectRatio>
                </div>
                <Button 
                  size="icon" 
                  variant="secondary"
                  className="absolute bottom-0 right-0 rounded-full w-7 h-7"
                  onClick={handleChangePhoto}
                >
                  <Camera className="h-3.5 w-3.5" />
                </Button>
              </div>
              
              <div>
                <h2 className="font-semibold text-lg">Sipho Ndlovu</h2>
                <p className="text-muted-foreground text-sm">Premium Account</p>
              </div>
            </div>
            
            <Separator className="my-4" />
            
            {/* Contact Information */}
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <Mail className="h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="text-sm text-muted-foreground">Email</p>
                  <p className="font-medium">sipho.ndlovu@example.com</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <Phone className="h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="text-sm text-muted-foreground">Phone</p>
                  <p className="font-medium">+27 71 234 5678</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <MapPin className="h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="text-sm text-muted-foreground">Address</p>
                  <p className="font-medium">123 Main Street, Johannesburg</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <Calendar className="h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="text-sm text-muted-foreground">Date of Birth</p>
                  <p className="font-medium">15 July 1985</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        {/* Account Details */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Account Summary</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex justify-between">
                <p className="text-muted-foreground">Customer Since</p>
                <p className="font-medium">January 2018</p>
              </div>
              <Separator />
              
              <div className="flex justify-between">
                <p className="text-muted-foreground">Account Status</p>
                <p className="font-medium text-green-600">Active</p>
              </div>
              <Separator />
              
              <div className="flex justify-between">
                <p className="text-muted-foreground">Accounts</p>
                <p className="font-medium">5 Accounts</p>
              </div>
              <Separator />
              
              <div className="flex justify-between">
                <p className="text-muted-foreground">KYC Status</p>
                <p className="font-medium">Verified</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        {/* Preferences */}
        <Card>
          <CardHeader>
            <CardTitle>Preferences</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex justify-between">
                <p className="text-muted-foreground">Communication</p>
                <p className="font-medium">Email, SMS</p>
              </div>
              <Separator />
              
              <div className="flex justify-between">
                <p className="text-muted-foreground">Language</p>
                <p className="font-medium">English</p>
              </div>
              <Separator />
              
              <div className="flex justify-between">
                <p className="text-muted-foreground">Two-Factor Authentication</p>
                <p className="font-medium text-yellow-600">Enabled</p>
              </div>
              <Separator />
              
              <div className="flex justify-between">
                <p className="text-muted-foreground">App Notifications</p>
                <p className="font-medium">Enabled</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
