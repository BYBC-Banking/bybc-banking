
import React from 'react';
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Link } from 'react-router-dom';
import { ArrowLeft, Check } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';

export default function Language() {
  const [selectedLanguage, setSelectedLanguage] = React.useState("en-US");
  const { toast } = useToast();
  
  const languages = [
    { id: "en-US", name: "English (US)", flag: "🇺🇸" },
    { id: "en-GB", name: "English (UK)", flag: "🇬🇧" },
    { id: "fr-FR", name: "Français", flag: "🇫🇷" },
    { id: "es-ES", name: "Español", flag: "🇪🇸" },
    { id: "de-DE", name: "Deutsch", flag: "🇩🇪" },
    { id: "zh-CN", name: "中文 (简体)", flag: "🇨🇳" },
    { id: "ja-JP", name: "日本語", flag: "🇯🇵" },
    { id: "ar-SA", name: "العربية", flag: "🇸🇦" },
    { id: "pt-BR", name: "Português (Brasil)", flag: "🇧🇷" },
    { id: "ru-RU", name: "Русский", flag: "🇷🇺" },
    { id: "hi-IN", name: "हिन्दी", flag: "🇮🇳" },
    { id: "sw-KE", name: "Kiswahili", flag: "🇰🇪" },
    { id: "zu-ZA", name: "isiZulu", flag: "🇿🇦" },
    { id: "xh-ZA", name: "isiXhosa", flag: "🇿🇦" },
    { id: "af-ZA", name: "Afrikaans", flag: "🇿🇦" }
  ];
  
  const saveLanguage = () => {
    toast({
      title: "Language updated",
      description: `Your language preference has been set to ${
        languages.find(lang => lang.id === selectedLanguage)?.name
      }`,
    });
  };
  
  return (
    <div className="container mx-auto py-8 px-4 max-w-3xl">
      <div className="flex items-center mb-6">
        <Link to="/dashboard" className="mr-3">
          <ArrowLeft className="h-5 w-5" />
        </Link>
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
                    <span className="text-xl mr-3">{language.flag}</span>
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
