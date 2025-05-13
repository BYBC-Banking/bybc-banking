
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import LanaChat from "@/components/LanaChat";
import LanaAvatar from "@/components/LanaAvatar";

export default function Advisor() {
  const [isLanaChatOpen, setIsLanaChatOpen] = useState(false);
  
  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-2xl font-bold mb-6">Your Financial Advisor</h1>
      
      <div className="bg-white rounded-lg shadow p-6 mb-6">
        <div className="flex items-center gap-4 mb-4">
          <LanaAvatar size="lg" />
          <div>
            <h2 className="text-xl font-semibold">Lana</h2>
            <p className="text-gray-600">AI Financial Advisor</p>
          </div>
        </div>
        
        <p className="text-gray-700 mb-4">
          Lana can help you with personalized financial advice, retirement planning, investment strategies, 
          and more. Get expert guidance tailored to your financial goals.
        </p>
        
        <Button 
          onClick={() => setIsLanaChatOpen(true)}
          className="bg-blue-600 hover:bg-blue-700"
        >
          Chat with Lana
        </Button>
      </div>
      
      <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
        <h3 className="font-medium mb-2">Why use Lana?</h3>
        <ul className="list-disc pl-5 space-y-1 text-gray-700">
          <li>Personalized financial planning advice</li>
          <li>Investment portfolio recommendations</li>
          <li>Retirement planning strategies</li>
          <li>Tax optimization suggestions</li>
          <li>Available 24/7 to answer your questions</li>
        </ul>
      </div>
      
      <LanaChat isOpen={isLanaChatOpen} onClose={() => setIsLanaChatOpen(false)} />
    </div>
  );
}
