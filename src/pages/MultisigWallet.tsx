
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
      <div className="container mx-auto max-w-md px-4 py-6">
        {/* Header */}
        <header className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <Link to="/dashboard" className="p-2">
              <ArrowLeft className="h-5 w-5" />
            </Link>
            <div>
              <h1 className="text-2xl font-bold">Multisig Wallet</h1>
              <p className="text-sm text-muted-foreground">Secure collaborative wallet</p>
            </div>
          </div>
          
          <Button size="icon" className="rounded-full">
            <Plus className="h-4 w-4" />
          </Button>
        </header>

        {/* Tab Navigation */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
            <TabsTrigger value="approvals">Approvals</TabsTrigger>
            <TabsTrigger value="signers">Signers</TabsTrigger>
            <TabsTrigger value="notifications">Alerts</TabsTrigger>
          </TabsList>

          <TabsContent value="dashboard" className="mt-6">
            <MultisigDashboard />
          </TabsContent>

          <TabsContent value="approvals" className="mt-6">
            <TransactionApproval />
          </TabsContent>

          <TabsContent value="signers" className="mt-6">
            <SignerManagement />
          </TabsContent>

          <TabsContent value="notifications" className="mt-6">
            <NotificationCenter />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default MultisigWallet;
