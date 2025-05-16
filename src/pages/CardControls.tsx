
import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';

export default function CardControls() {
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [contactlessPayments, setContactlessPayments] = React.useState(true);
  const [onlineTransactions, setOnlineTransactions] = React.useState(true);
  const [internationalPayments, setInternationalPayments] = React.useState(false);
  const [atmWithdrawals, setAtmWithdrawals] = React.useState(true);
  
  const handleBack = () => {
    navigate(-1);
  };
  
  const handleSave = () => {
    toast({
      title: "Card controls updated",
      description: "Your card control preferences have been saved",
    });
  };
  
  return (
    <div className="container mx-auto py-8 px-4 max-w-3xl">
      <div className="flex items-center mb-6">
        <button onClick={handleBack} className="mr-3">
          <ArrowLeft className="h-5 w-5" />
        </button>
        <h1 className="text-2xl font-bold">Card Controls</h1>
      </div>
      
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Payment Settings</CardTitle>
            <CardDescription>
              Control how and where your card can be used
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between py-2">
              <div>
                <h3 className="font-medium">Contactless Payments</h3>
                <p className="text-sm text-muted-foreground">Enable or disable tap-to-pay functionality</p>
              </div>
              <Switch checked={contactlessPayments} onCheckedChange={setContactlessPayments} />
            </div>
            
            <Separator />
            
            <div className="flex items-center justify-between py-2">
              <div>
                <h3 className="font-medium">Online Transactions</h3>
                <p className="text-sm text-muted-foreground">Allow card to be used for online purchases</p>
              </div>
              <Switch checked={onlineTransactions} onCheckedChange={setOnlineTransactions} />
            </div>
            
            <Separator />
            
            <div className="flex items-center justify-between py-2">
              <div>
                <h3 className="font-medium">International Payments</h3>
                <p className="text-sm text-muted-foreground">Enable card usage outside your country</p>
              </div>
              <Switch checked={internationalPayments} onCheckedChange={setInternationalPayments} />
            </div>
            
            <Separator />
            
            <div className="flex items-center justify-between py-2">
              <div>
                <h3 className="font-medium">ATM Withdrawals</h3>
                <p className="text-sm text-muted-foreground">Allow cash withdrawals at ATMs</p>
              </div>
              <Switch checked={atmWithdrawals} onCheckedChange={setAtmWithdrawals} />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Card Details</CardTitle>
            <CardDescription>
              View and manage your card information
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="bg-finance-blue rounded-lg p-6 text-white mb-4">
              <div className="mb-6">
                <div className="text-sm opacity-80">BYBC Banking</div>
                <div className="font-mono text-lg mt-1">•••• •••• •••• 4321</div>
              </div>
              <div className="flex justify-between items-end">
                <div>
                  <div className="text-xs opacity-80">VALID THRU</div>
                  <div className="font-mono">12/26</div>
                </div>
                <div className="w-12 h-12 bg-white/20 rounded-full"></div>
              </div>
            </div>
            
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Card Status</span>
                <span className="font-medium text-green-600">Active</span>
              </div>
              
              <div className="flex justify-between">
                <span className="text-muted-foreground">Daily Limit</span>
                <span className="font-medium">R5,000</span>
              </div>
              
              <div className="flex justify-between">
                <span className="text-muted-foreground">Monthly Limit</span>
                <span className="font-medium">R50,000</span>
              </div>
            </div>
            
            <div className="flex justify-between mt-6">
              <Button variant="outline">Freeze Card</Button>
              <Button onClick={handleSave}>Save Changes</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
