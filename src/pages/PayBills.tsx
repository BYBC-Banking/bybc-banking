
import React from 'react';
import { ArrowLeft, Tv, Zap, Wifi, Phone, Building2, CreditCard } from 'lucide-react';
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';

const billCategories = [
  {
    id: 'entertainment',
    title: 'Entertainment',
    icon: Tv,
    color: 'bg-purple-500',
    bills: [
      { id: 'dstv', name: 'DStv', description: 'Satellite TV subscription' },
      { id: 'netflix', name: 'Netflix', description: 'Streaming service' },
      { id: 'showmax', name: 'Showmax', description: 'Local streaming' }
    ]
  },
  {
    id: 'utilities',
    title: 'Utilities',
    icon: Zap,
    color: 'bg-yellow-500',
    bills: [
      { id: 'eskom', name: 'Eskom', description: 'Electricity' },
      { id: 'water', name: 'Municipal Water', description: 'Water & sanitation' }
    ]
  },
  {
    id: 'telecoms',
    title: 'Telecoms',
    icon: Phone,
    color: 'bg-blue-500',
    bills: [
      { id: 'vodacom', name: 'Vodacom', description: 'Mobile network' },
      { id: 'mtn', name: 'MTN', description: 'Mobile network' },
      { id: 'telkom', name: 'Telkom', description: 'Internet & mobile' }
    ]
  },
  {
    id: 'insurance',
    title: 'Insurance',
    icon: Building2,
    color: 'bg-green-500',
    bills: [
      { id: 'discovery', name: 'Discovery Health', description: 'Medical aid' },
      { id: 'santam', name: 'Santam', description: 'Car & home insurance' }
    ]
  }
];

export default function PayBills() {
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const handleBack = () => {
    navigate(-1);
  };
  
  const handleBillSelect = (billName: string) => {
    toast({
      title: "Bill Payment",
      description: `Initiating payment for ${billName}`,
    });
  };
  
  return (
    <div className="container mx-auto py-8 px-4 max-w-3xl">
      <div className="flex items-center mb-6">
        <button onClick={handleBack} className="mr-3">
          <ArrowLeft className="h-5 w-5" />
        </button>
        <h1 className="text-2xl font-bold">Pay Bills</h1>
      </div>
      
      <div className="space-y-6">
        {billCategories.map((category) => (
          <Card key={category.id}>
            <CardHeader>
              <CardTitle className="flex items-center">
                <div className={`${category.color} p-2 rounded-lg mr-3`}>
                  <category.icon className="h-5 w-5 text-white" />
                </div>
                {category.title}
              </CardTitle>
              <CardDescription>
                Manage your {category.title.toLowerCase()} bill payments
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-3">
                {category.bills.map((bill) => (
                  <div
                    key={bill.id}
                    className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 cursor-pointer transition-colors"
                    onClick={() => handleBillSelect(bill.name)}
                  >
                    <div>
                      <h4 className="font-medium">{bill.name}</h4>
                      <p className="text-sm text-muted-foreground">{bill.description}</p>
                    </div>
                    <Button variant="outline" size="sm">
                      Pay Now
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
