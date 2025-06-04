import React from 'react';
import { ArrowLeft, Plus } from 'lucide-react';
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';

export default function Cards() {
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const handleBack = () => {
    navigate(-1);
  };
  
  const handleCreateCard = () => {
    toast({
      title: "Virtual Card Creation",
      description: "Creating your new BYBC virtual card...",
    });
  };
  
  return (
    <div className="container mx-auto py-8 px-4 max-w-3xl">
      <div className="flex items-center mb-6">
        <button onClick={handleBack} className="mr-3">
          <ArrowLeft className="h-5 w-5" />
        </button>
        <h1 className="text-2xl font-bold">Cards</h1>
      </div>
      
      <div className="space-y-6">
        {/* Add New Card Section */}
        <Card>
          <CardHeader className="text-center">
            <CardTitle className="text-lg text-blue-500 mb-2">Add new card</CardTitle>
            <CardDescription className="text-sm text-gray-600">
              Up to 5 virtual cards allowed
            </CardDescription>
          </CardHeader>
          <CardContent className="flex justify-center">
            <div className="w-full max-w-sm">
              {/* Dashed Border Card Placeholder */}
              <div className="border-2 border-dashed border-blue-300 rounded-xl p-8 bg-blue-50/30 min-h-[280px] flex flex-col items-center justify-center relative">
                {/* Radio buttons in top right */}
                <div className="absolute top-4 right-4 flex flex-col space-y-2">
                  <div className="w-3 h-3 border-2 border-gray-400 rounded-full"></div>
                  <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                </div>
                
                {/* Center content */}
                <div className="text-center">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4 mx-auto">
                    <Plus className="h-6 w-6 text-blue-500" />
                  </div>
                  <Button 
                    onClick={handleCreateCard}
                    variant="ghost" 
                    className="text-blue-500 hover:text-blue-600 hover:bg-blue-50 text-sm font-medium"
                  >
                    Add new virtual card
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        {/* Existing Cards Section (placeholder for future cards) */}
        <Card>
          <CardHeader>
            <CardTitle>Your Virtual Cards</CardTitle>
            <CardDescription>
              Manage your BYBC virtual cards
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-center py-8 text-gray-500">
              <p>No virtual cards created yet.</p>
              <p className="text-sm mt-1">Create your first virtual card above to get started.</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
