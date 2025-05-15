
import React from 'react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Link } from 'react-router-dom';
import { ArrowLeft, Mail, Phone, MessageSquare } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';

export default function Help() {
  return (
    <div className="container mx-auto py-8 px-4 max-w-3xl">
      <div className="flex items-center mb-6">
        <Link to="/dashboard" className="mr-3">
          <ArrowLeft className="h-5 w-5" />
        </Link>
        <h1 className="text-2xl font-bold">Help Center</h1>
      </div>
      
      <div className="grid gap-6">
        {/* Search section */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle>How can we help you?</CardTitle>
            <CardDescription>Find answers to common questions and issues</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="relative">
              <input
                type="text"
                placeholder="Search for help topics..."
                className="w-full px-4 py-2 border rounded-lg"
              />
              <Button className="absolute right-1 top-1 rounded-md px-3 py-1 h-8">
                Search
              </Button>
            </div>
          </CardContent>
        </Card>
        
        {/* FAQ Accordion */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-4">Frequently Asked Questions</h2>
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="item-1">
              <AccordionTrigger>How do I reset my password?</AccordionTrigger>
              <AccordionContent>
                To reset your password, click on the "Forgot Password" link on the login page. 
                Enter your registered email address and follow the instructions sent to your email.
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="item-2">
              <AccordionTrigger>How do I transfer funds between accounts?</AccordionTrigger>
              <AccordionContent>
                To transfer funds, navigate to the "Transfer" section from your dashboard.
                Select the source account, destination account, enter the amount, and confirm the transfer.
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="item-3">
              <AccordionTrigger>How do I report a suspicious transaction?</AccordionTrigger>
              <AccordionContent>
                If you notice any suspicious activity, please contact our customer support immediately
                at 0800-123-456 or through the secure messaging system in the app.
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="item-4">
              <AccordionTrigger>How secure is the mobile banking app?</AccordionTrigger>
              <AccordionContent>
                Our app uses industry-standard encryption and security measures including two-factor
                authentication, biometric verification, and end-to-end encryption to keep your data
                and transactions safe.
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="item-5">
              <AccordionTrigger>What fees apply to international transfers?</AccordionTrigger>
              <AccordionContent>
                International transfer fees vary based on destination country, amount, and transfer method.
                Generally, fees range from 0.5% to 2.5% of the transaction amount with a minimum fee of $5.
                You can view the exact fee before confirming your transfer.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
        
        <Separator />
        
        {/* Contact options */}
        <div>
          <h2 className="text-xl font-semibold mb-4">Contact Support</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Phone Support</CardTitle>
                <Phone className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <p className="text-xs text-muted-foreground">Available 24/7</p>
                <p className="font-semibold mt-2">0800-123-456</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Email Support</CardTitle>
                <Mail className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <p className="text-xs text-muted-foreground">Response within 24 hours</p>
                <p className="font-semibold mt-2">support@bybc.com</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Live Chat</CardTitle>
                <MessageSquare className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <p className="text-xs text-muted-foreground">Available 8AM - 8PM</p>
                <Button className="w-full mt-2" size="sm">Start Chat</Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
