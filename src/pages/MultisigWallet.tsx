
import { useState, useEffect } from "react";
import { ArrowLeft, Plus } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import MultisigDashboard from "@/components/multisig/MultisigDashboard";
import TransactionApproval from "@/components/multisig/TransactionApproval";
import SignerManagement from "@/components/multisig/SignerManagement";
import NotificationCenter from "@/components/multisig/NotificationCenter";

const MultisigWallet = () => {
  const [activeTab, setActiveTab] = useState("dashboard");

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="bg-gradient-to-br from-white to-slate-100 min-h-screen">
      <div className="container mx-auto max-w-md px-3 py-4 sm:px-4 sm:py-6">
        {/* Header - Mobile optimized */}
        <header className="flex items-center justify-between mb-4 sm:mb-6">
          <div className="flex items-center gap-3 sm:gap-4 min-w-0 flex-1">
            <Link to="/dashboard" className="p-2 -ml-2 touch-target">
              <ArrowLeft className="h-5 w-5" />
            </Link>
            <div className="min-w-0 flex-1">
              <h1 className="text-xl sm:text-2xl font-bold truncate">Multisig Wallet</h1>
              <p className="text-xs sm:text-sm text-muted-foreground truncate">Secure collaborative wallet</p>
            </div>
          </div>
          
          <Button size="icon" className="rounded-full h-10 w-10 sm:h-11 sm:w-11 touch-target flex-shrink-0">
            <Plus className="h-4 w-4" />
          </Button>
        </header>

        {/* Tab Navigation - Mobile optimized */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-4 h-12 sm:h-10 mb-4 sm:mb-6">
            <TabsTrigger value="dashboard" className="text-xs sm:text-sm px-1 sm:px-3">
              Dashboard
            </TabsTrigger>
            <TabsTrigger value="approvals" className="text-xs sm:text-sm px-1 sm:px-3">
              Approvals
            </TabsTrigger>
            <TabsTrigger value="signers" className="text-xs sm:text-sm px-1 sm:px-3">
              Signers
            </TabsTrigger>
            <TabsTrigger value="notifications" className="text-xs sm:text-sm px-1 sm:px-3">
              Alerts
            </TabsTrigger>
          </TabsList>

          <TabsContent value="dashboard" className="mt-0">
            <MultisigDashboard />
          </TabsContent>

          <TabsContent value="approvals" className="mt-0">
            <TransactionApproval />
          </TabsContent>

          <TabsContent value="signers" className="mt-0">
            <SignerManagement />
          </TabsContent>

          <TabsContent value="notifications" className="mt-0">
            <NotificationCenter />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default MultisigWallet;
