
import React, { useEffect } from 'react';
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Check } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';

export default function Language() {
  const [selectedLanguage, setSelectedLanguage] = React.useState(() => {
    // Get stored language from localStorage or default to en-US
    return localStorage.getItem('preferredLanguage') || "en-US";
  });
  const { toast } = useToast();
  const navigate = useNavigate();
  
  const languages = [
    { id: "af-ZA", name: "Afrikaans", code: "AF" },
    { id: "en-US", name: "English", code: "EN" },
    { id: "nr-ZA", name: "isiNdebele", code: "NR" },
    { id: "xh-ZA", name: "isiXhosa", code: "XH" },
    { id: "zu-ZA", name: "isiZulu", code: "ZU" },
    { id: "nso-ZA", name: "Sepedi", code: "NSO" },
    { id: "st-ZA", name: "Sesotho", code: "ST" },
    { id: "tn-ZA", name: "Setswana", code: "TN" },
    { id: "ss-ZA", name: "siSwati", code: "SS" },
    { id: "ve-ZA", name: "Tshivenda", code: "VE" },
    { id: "ts-ZA", name: "Xitsonga", code: "TS" }
  ];
  
  const saveLanguage = () => {
    // Save to localStorage
    localStorage.setItem('preferredLanguage', selectedLanguage);
    
    // Show toast notification
    toast({
      title: "Language updated",
      description: `Your language preference has been set to ${
        languages.find(lang => lang.id === selectedLanguage)?.name
      }`,
    });
    
    // Navigate back
    navigate(-1);
  };
  
  // Handle back navigation
  const handleBack = () => {
    navigate(-1);
  };
  
  return (
    <div className="container mx-auto py-8 px-4 max-w-3xl">
      <div className="flex items-center mb-6">
        <button onClick={handleBack} className="mr-3">
          <ArrowLeft className="h-5 w-5" />
        </button>
        <h1 className="text-2xl font-bold">Language Settings</h1>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Select Your Preferred Language</CardTitle>
          <CardDescription>
            Choose the language you want to use throughout the application. 
            This will affect all text, notifications, and communications.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <RadioGroup 
            value={selectedLanguage}
            onValueChange={setSelectedLanguage}
            className="grid gap-2"
          >
            {languages.map((language) => (
              <div key={language.id} className="flex items-center space-x-2 border rounded-md p-3 cursor-pointer hover:bg-muted transition-colors">
                <RadioGroupItem value={language.id} id={language.id} />
                <Label 
                  htmlFor={language.id} 
                  className="flex items-center justify-between w-full cursor-pointer"
                >
                  <div className="flex items-center">
                    <span className="text-sm font-mono bg-slate-100 px-2 py-1 rounded mr-3 text-slate-600">
                      {language.code}
                    </span>
                    <span>{language.name}</span>
                  </div>
                  {selectedLanguage === language.id && (
                    <Check className="h-4 w-4 text-primary" />
                  )}
                </Label>
              </div>
            ))}
          </RadioGroup>
          
          <div className="flex justify-end mt-6">
            <Button onClick={saveLanguage}>
              Save Preferences
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
