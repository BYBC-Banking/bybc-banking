
import React from 'react';
import { ArrowLeft, Moon, Sun, Monitor } from 'lucide-react';
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { useToast } from '@/hooks/use-toast';

export default function AppAppearance() {
  const navigate = useNavigate();
  const { toast } = useToast();
  
  // State for appearance settings
  const [theme, setTheme] = React.useState(() => {
    return localStorage.getItem('theme') || "system";
  });
  const [fontSize, setFontSize] = React.useState([16]);
  const [highContrast, setHighContrast] = React.useState(false);
  
  // Apply theme to document
  React.useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove('light', 'dark');
    
    if (theme === 'system') {
      const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
      root.classList.add(systemTheme);
    } else {
      root.classList.add(theme);
    }
    
    localStorage.setItem('theme', theme);
  }, [theme]);
  
  const handleBack = () => {
    navigate(-1);
  };
  
  const handleSave = () => {
    // In a real app, this would save to user preferences
    toast({
      title: "Appearance updated",
      description: "Your appearance settings have been saved",
    });
  };
  
  return (
    <div className="container mx-auto py-8 px-4 max-w-3xl">
      <div className="flex items-center mb-6">
        <button onClick={handleBack} className="mr-3">
          <ArrowLeft className="h-5 w-5" />
        </button>
        <h1 className="text-2xl font-bold">App Appearance</h1>
      </div>
      
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Theme Settings</CardTitle>
            <CardDescription>
              Customize the look and feel of your banking app
            </CardDescription>
          </CardHeader>
          <CardContent>
            <RadioGroup
              value={theme}
              onValueChange={setTheme}
              className="grid grid-cols-3 gap-4"
            >
              <div>
                <RadioGroupItem
                  value="light"
                  id="light"
                  className="sr-only"
                />
                <Label
                  htmlFor="light"
                  className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground cursor-pointer peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                >
                  <Sun className="mb-3 h-6 w-6" />
                  <span className="text-center">Light</span>
                </Label>
              </div>
              
              <div>
                <RadioGroupItem
                  value="dark"
                  id="dark"
                  className="sr-only"
                />
                <Label
                  htmlFor="dark"
                  className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground cursor-pointer peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                >
                  <Moon className="mb-3 h-6 w-6" />
                  <span className="text-center">Dark</span>
                </Label>
              </div>
              
              <div>
                <RadioGroupItem
                  value="system"
                  id="system"
                  className="sr-only"
                />
                <Label
                  htmlFor="system"
                  className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground cursor-pointer peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                >
                  <Monitor className="mb-3 h-6 w-6" />
                  <span className="text-center">System</span>
                </Label>
              </div>
            </RadioGroup>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Text Size</CardTitle>
            <CardDescription>
              Adjust the size of text throughout the application
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <Slider
                  value={fontSize}
                  min={12}
                  max={20}
                  step={1}
                  onValueChange={setFontSize}
                />
              </div>
              <div className="flex justify-between">
                <div className="text-sm">A</div>
                <div className="text-lg">A</div>
                <div className="text-xl">A</div>
              </div>
              <div className="pt-4">
                <p style={{ fontSize: `${fontSize[0]}px` }}>
                  This is a preview of how text will appear at this size.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Accessibility</CardTitle>
            <CardDescription>
              Options to improve the app's accessibility
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="high-contrast"
                checked={highContrast}
                onChange={(e) => setHighContrast(e.target.checked)}
                className="rounded border-gray-300 text-primary focus:ring-primary"
              />
              <label htmlFor="high-contrast" className="text-sm font-medium">
                High contrast mode
              </label>
            </div>
            
            <div className="mt-6 flex justify-end">
              <Button onClick={handleSave}>Save Changes</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
