
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import SwapInterface from "@/components/crypto-swap/SwapInterface";
import ScheduledSwaps from "@/components/crypto-swap/ScheduledSwaps";
import SwapSettings from "@/components/crypto-swap/SwapSettings";

const CryptoSwap = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("swap");

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-secondary/20">
      <div className="container mx-auto max-w-md px-4 py-6">
        {/* Header */}
        <div className="flex items-center gap-4 mb-6">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate("/dashboard")}
            className="h-10 w-10"
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div>
            <h1 className="text-2xl font-bold text-foreground">Crypto Swap</h1>
            <p className="text-sm text-muted-foreground">Convert crypto to ZAR</p>
          </div>
        </div>

        {/* Tab Navigation */}
        <Card className="mb-6">
          <CardContent className="p-1">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="swap" className="flex items-center gap-2">
                  ⚡ Swap
                </TabsTrigger>
                <TabsTrigger value="schedule" className="flex items-center gap-2">
                  📅 Schedule
                </TabsTrigger>
                <TabsTrigger value="settings" className="flex items-center gap-2">
                  ⚙️ Settings
                </TabsTrigger>
              </TabsList>

              <TabsContent value="swap" className="mt-6">
                <SwapInterface />
              </TabsContent>

              <TabsContent value="schedule" className="mt-6">
                <ScheduledSwaps />
              </TabsContent>

              <TabsContent value="settings" className="mt-6">
                <SwapSettings />
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CryptoSwap;
