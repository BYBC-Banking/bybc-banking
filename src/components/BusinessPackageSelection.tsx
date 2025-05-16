
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Check, ChevronDown, ChevronUp, Building, ShoppingBag } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";

interface Feature {
  name: string;
  description: string;
  included: boolean;
}

interface PackageOption {
  id: string;
  name: string;
  icon: React.ReactNode;
  description: string;
  monthlyFee: number;
  features: Feature[];
}

interface BusinessPackageSelectionProps {
  onContinue: (selectedPackage: string, addOns: string[]) => void;
  onBack: () => void;
}

const BusinessPackageSelection: React.FC<BusinessPackageSelectionProps> = ({ onContinue, onBack }) => {
  const [expandedPackage, setExpandedPackage] = useState<string | null>("core");
  const [selectedPackage, setSelectedPackage] = useState<string>("core");
  const [selectedAddOns, setSelectedAddOns] = useState<string[]>([]);

  // Core package features
  const coreFeatures: Feature[] = [
    { name: "Multi-user roles", description: "Assign different roles with varying access levels", included: true },
    { name: "Payroll management", description: "Process payroll and pay employees", included: true },
    { name: "Invoicing", description: "Create, send, and track invoices", included: true },
    { name: "Business analytics", description: "Track business performance with visual reports", included: true },
    { name: "Compliance reporting", description: "Generate reports for regulatory compliance", included: true },
  ];

  // Add-on features
  const addOnFeatures: Feature[] = [
    { name: "POS integration", description: "Connect to point-of-sale systems", included: false },
    { name: "Supplier management", description: "Track suppliers and inventory", included: false },
    { name: "VAT tracking", description: "Automated VAT calculation and reporting", included: false },
    { name: "Budgeting sub-accounts", description: "Create dedicated accounts for different budgets", included: false },
    { name: "Accounting tool integration", description: "Seamless connection to popular accounting software", included: false },
  ];

  const packageOptions: PackageOption[] = [
    {
      id: "core",
      name: "Core Features",
      icon: <Building className="h-6 w-6" />,
      description: "Essential business banking features",
      monthlyFee: 249,
      features: coreFeatures
    },
    {
      id: "complete",
      name: "Core + Add-Ons",
      icon: <ShoppingBag className="h-6 w-6" />,
      description: "Complete business solution with all features",
      monthlyFee: 399,
      features: [...coreFeatures, ...addOnFeatures.map(f => ({ ...f, included: true }))]
    }
  ];

  const toggleAddOn = (addOn: string) => {
    setSelectedAddOns(prev => 
      prev.includes(addOn) 
        ? prev.filter(a => a !== addOn) 
        : [...prev, addOn]
    );
  };

  const calculateTotalPrice = () => {
    const basePrice = packageOptions.find(p => p.id === selectedPackage)?.monthlyFee || 0;
    const addOnsPrice = selectedPackage === "core" ? selectedAddOns.length * 50 : 0;
    return basePrice + addOnsPrice;
  };

  const handleContinue = () => {
    onContinue(selectedPackage, selectedAddOns);
  };

  const toggleExpandPackage = (packageId: string) => {
    setExpandedPackage(expandedPackage === packageId ? null : packageId);
  };

  return (
    <div className="space-y-6">
      <div className="mb-4">
        <h2 className="text-2xl font-bold mb-2">Choose Your Package</h2>
        <p className="text-muted-foreground">
          Select the features that best suit your business needs
        </p>
      </div>
      
      <div className="space-y-4">
        {packageOptions.map((pkg) => (
          <Card 
            key={pkg.id} 
            className={`transition-all ${selectedPackage === pkg.id ? 'border-amber-500 shadow-md' : ''}`}
          >
            <div 
              className="cursor-pointer"
              onClick={() => setSelectedPackage(pkg.id)}
            >
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className={`p-2.5 rounded-full ${selectedPackage === pkg.id ? 'bg-amber-100 text-amber-600' : 'bg-slate-100'}`}>
                    {pkg.icon}
                  </div>
                  <div className="flex-1">
                    <CardTitle className="flex items-center justify-between">
                      <span>{pkg.name}</span>
                      <Badge className="bg-amber-500">{`R${pkg.monthlyFee}/mo`}</Badge>
                    </CardTitle>
                    <CardDescription>{pkg.description}</CardDescription>
                  </div>
                </div>
              </CardHeader>
            </div>
            
            <Collapsible open={expandedPackage === pkg.id}>
              <CollapsibleTrigger 
                className="w-full flex justify-center py-2 border-t text-sm text-muted-foreground hover:bg-slate-50"
                onClick={(e) => {
                  e.stopPropagation();
                  toggleExpandPackage(pkg.id);
                }}
              >
                {expandedPackage === pkg.id ? (
                  <div className="flex items-center">
                    <span>Hide features</span>
                    <ChevronUp className="h-4 w-4 ml-1" />
                  </div>
                ) : (
                  <div className="flex items-center">
                    <span>Show features</span>
                    <ChevronDown className="h-4 w-4 ml-1" />
                  </div>
                )}
              </CollapsibleTrigger>
              <CollapsibleContent>
                <CardContent>
                  <div className="space-y-3 pt-2">
                    <h3 className="font-medium">Included features:</h3>
                    <ul className="space-y-2">
                      {pkg.features.filter(f => f.included).map((feature, index) => (
                        <li key={index} className="flex items-start gap-2">
                          <Check className="h-5 w-5 text-green-500 mt-0.5" />
                          <div>
                            <div className="font-medium text-sm">{feature.name}</div>
                            <div className="text-xs text-muted-foreground">{feature.description}</div>
                          </div>
                        </li>
                      ))}
                    </ul>
                    
                    {selectedPackage === 'core' && pkg.id === 'core' && (
                      <div className="mt-4 pt-4 border-t">
                        <h3 className="font-medium mb-2">Optional Add-Ons (R50/mo each):</h3>
                        <div className="space-y-3">
                          {addOnFeatures.map((feature, index) => (
                            <div key={index} className="flex items-start justify-between">
                              <div className="flex items-start gap-2">
                                <div>
                                  <div className="font-medium text-sm">{feature.name}</div>
                                  <div className="text-xs text-muted-foreground">{feature.description}</div>
                                </div>
                              </div>
                              <Switch 
                                checked={selectedAddOns.includes(feature.name)}
                                onCheckedChange={() => toggleAddOn(feature.name)}
                              />
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </CardContent>
              </CollapsibleContent>
            </Collapsible>
          </Card>
        ))}
      </div>
      
      <div className="pt-4 border-t mt-6">
        <div className="flex justify-between mb-4">
          <span className="text-lg font-semibold">Total Monthly Fee:</span>
          <span className="text-lg font-semibold text-amber-600">R{calculateTotalPrice()}</span>
        </div>
        
        <div className="flex gap-3">
          <Button variant="outline" onClick={onBack} className="flex-1">
            Back
          </Button>
          <Button onClick={handleContinue} className="flex-1 bg-amber-500 hover:bg-amber-600">
            Continue
          </Button>
        </div>
      </div>
    </div>
  );
};

export default BusinessPackageSelection;
