
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import CryptoActivityTab from "./CryptoActivityTab";
import CryptoAboutTab from "./CryptoAboutTab";

interface CryptoTabsSectionProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  currentCrypto: any;
  crypto: string;
  isDarkMode: boolean;
  activityData: any[];
  formatCurrency: (value: number) => string;
}

const CryptoTabsSection = ({
  activeTab,
  onTabChange,
  currentCrypto,
  crypto,
  isDarkMode,
  activityData,
  formatCurrency
}: CryptoTabsSectionProps) => {
  return (
    <Card className={`${isDarkMode ? 'bg-gray-800/50 backdrop-blur-md' : 'bg-white/60'}`}
          style={{border: `1px solid ${currentCrypto.color}30`}}>
      <CardContent className="p-0">
        <Tabs value={activeTab} onValueChange={onTabChange}>
          <TabsList className="w-full bg-transparent p-0 h-auto rounded-t-lg overflow-hidden">
            <TabsTrigger 
              value="activity" 
              className={`flex-1 py-3 border-b-2 transition-all ${
                activeTab === 'activity' ? 'border-current font-medium' : 'border-transparent'
              } ${activeTab === 'activity' ? 'rounded-tl-lg' : ''}`}
              style={{
                backgroundColor: activeTab === 'activity' ? currentCrypto.color : 'transparent',
                color: activeTab === 'activity' ? '#000' : undefined
              }}
            >
              Activity
            </TabsTrigger>
            <TabsTrigger 
              value="about" 
              className={`flex-1 py-3 border-b-2 transition-all ${
                activeTab === 'about' ? 'border-current font-medium' : 'border-transparent'
              } ${activeTab === 'about' ? 'rounded-tr-lg' : ''}`}
              style={{
                backgroundColor: activeTab === 'about' ? currentCrypto.color : 'transparent',
                color: activeTab === 'about' ? '#000' : undefined
              }}
            >
              About
            </TabsTrigger>
          </TabsList>

          <TabsContent value="activity" className="p-0">
            <CryptoActivityTab activityData={activityData} isDarkMode={isDarkMode} />
          </TabsContent>

          <TabsContent value="about" className="p-0">
            <CryptoAboutTab 
              crypto={crypto}
              currentCrypto={currentCrypto}
              isDarkMode={isDarkMode}
              formatCurrency={formatCurrency}
            />
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default CryptoTabsSection;
