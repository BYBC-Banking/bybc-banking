
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { Card, CardContent } from '@/components/ui/card';

export default function Legal() {
  return (
    <div className="container mx-auto py-8 px-4 max-w-3xl">
      <div className="flex items-center mb-6">
        <Link to="/dashboard" className="mr-3">
          <ArrowLeft className="h-5 w-5" />
        </Link>
        <h1 className="text-2xl font-bold">Legal Information</h1>
      </div>
      
      <Tabs defaultValue="terms">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="terms">Terms of Service</TabsTrigger>
          <TabsTrigger value="privacy">Privacy Policy</TabsTrigger>
          <TabsTrigger value="cookie">Cookie Policy</TabsTrigger>
        </TabsList>
        
        <TabsContent value="terms" className="mt-6">
          <Card>
            <CardContent className="pt-6">
              <h2 className="text-xl font-semibold mb-4">Terms of Service</h2>
              <p className="text-sm text-muted-foreground mb-2">Last Updated: May 15, 2025</p>
              
              <div className="prose prose-sm max-w-none">
                <h3 className="text-lg font-medium mt-6 mb-2">1. Introduction</h3>
                <p>
                  Welcome to BYBC Banking. These Terms of Service govern your use of our website, 
                  mobile application, and banking services. By accessing or using our services, 
                  you agree to be bound by these Terms.
                </p>
                
                <h3 className="text-lg font-medium mt-6 mb-2">2. Account Registration</h3>
                <p>
                  To use our banking services, you must create an account and provide accurate 
                  and complete information. You are responsible for maintaining the confidentiality 
                  of your account credentials and for all activities that occur under your account.
                </p>
                
                <h3 className="text-lg font-medium mt-6 mb-2">3. Financial Services</h3>
                <p>
                  BYBC Banking offers various financial services, including but not limited to 
                  deposits, transfers, investments, and payments. These services are subject 
                  to applicable banking regulations and our internal policies.
                </p>
                
                <h3 className="text-lg font-medium mt-6 mb-2">4. Fees and Charges</h3>
                <p>
                  Our services may be subject to fees and charges as outlined in our Fee Schedule. 
                  We reserve the right to modify our fees with appropriate notice to you.
                </p>
                
                <Separator className="my-6" />
                
                <h3 className="text-lg font-medium mt-6 mb-2">5. Limitation of Liability</h3>
                <p>
                  To the fullest extent permitted by law, BYBC Banking shall not be liable for any 
                  indirect, incidental, special, consequential, or punitive damages resulting from 
                  your use of or inability to use our services.
                </p>
                
                <h3 className="text-lg font-medium mt-6 mb-2">6. Governing Law</h3>
                <p>
                  These Terms shall be governed by and construed in accordance with the laws of 
                  South Africa, without regard to its conflict of law provisions.
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="privacy" className="mt-6">
          <Card>
            <CardContent className="pt-6">
              <h2 className="text-xl font-semibold mb-4">Privacy Policy</h2>
              <p className="text-sm text-muted-foreground mb-2">Last Updated: May 15, 2025</p>
              
              <div className="prose prose-sm max-w-none">
                <h3 className="text-lg font-medium mt-6 mb-2">1. Information We Collect</h3>
                <p>
                  We collect personal information such as your name, contact information, 
                  identification details, financial information, and transaction history 
                  to provide our services and comply with regulatory requirements.
                </p>
                
                <h3 className="text-lg font-medium mt-6 mb-2">2. How We Use Your Information</h3>
                <p>
                  We use your personal information to provide and improve our services, 
                  process transactions, communicate with you, prevent fraud, and comply 
                  with legal obligations.
                </p>
                
                <h3 className="text-lg font-medium mt-6 mb-2">3. Information Sharing</h3>
                <p>
                  We may share your information with third-party service providers, 
                  financial institutions, regulatory authorities, and other parties 
                  as required by law or with your consent.
                </p>
                
                <h3 className="text-lg font-medium mt-6 mb-2">4. Data Security</h3>
                <p>
                  We implement technical and organizational measures to protect your 
                  personal information against unauthorized access, loss, or alteration.
                </p>
                
                <h3 className="text-lg font-medium mt-6 mb-2">5. Your Rights</h3>
                <p>
                  You have the right to access, correct, delete, or restrict the processing 
                  of your personal information, as well as the right to data portability 
                  and to object to processing.
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="cookie" className="mt-6">
          <Card>
            <CardContent className="pt-6">
              <h2 className="text-xl font-semibold mb-4">Cookie Policy</h2>
              <p className="text-sm text-muted-foreground mb-2">Last Updated: May 15, 2025</p>
              
              <div className="prose prose-sm max-w-none">
                <h3 className="text-lg font-medium mt-6 mb-2">1. What Are Cookies</h3>
                <p>
                  Cookies are small text files that are placed on your device when you 
                  visit our website or use our application. They help us provide you 
                  with a better experience.
                </p>
                
                <h3 className="text-lg font-medium mt-6 mb-2">2. Types of Cookies We Use</h3>
                <ul className="list-disc pl-5 space-y-2">
                  <li>
                    <strong>Essential cookies:</strong> These cookies are necessary for the 
                    functioning of our website and cannot be disabled.
                  </li>
                  <li>
                    <strong>Functional cookies:</strong> These cookies enable personalized 
                    features and remember your preferences.
                  </li>
                  <li>
                    <strong>Analytical cookies:</strong> These cookies help us understand 
                    how visitors interact with our website.
                  </li>
                  <li>
                    <strong>Marketing cookies:</strong> These cookies track your online 
                    activity to help deliver relevant advertisements.
                  </li>
                </ul>
                
                <h3 className="text-lg font-medium mt-6 mb-2">3. Cookie Management</h3>
                <p>
                  You can manage or delete cookies through your browser settings. 
                  Please note that blocking certain cookies may impact the functionality 
                  of our website.
                </p>
                
                <h3 className="text-lg font-medium mt-6 mb-2">4. Third-Party Cookies</h3>
                <p>
                  We may allow third parties to place cookies on your device when you 
                  visit our website. These third parties have their own privacy policies.
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
