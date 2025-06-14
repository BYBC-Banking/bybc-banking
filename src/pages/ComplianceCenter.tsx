
import { useState } from "react";
import { ArrowLeft, Bell, Shield, Clock, FileText } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ComplianceHoldDisplay from "@/components/compliance/ComplianceHoldDisplay";
import EscalationForm from "@/components/compliance/EscalationForm";
import StatusTracker from "@/components/compliance/StatusTracker";
import { useToast } from "@/hooks/use-toast";

const ComplianceCenter = () => {
  const [showEscalationForm, setShowEscalationForm] = useState<string | null>(null);
  const { toast } = useToast();

  // Mock data - in a real app this would come from an API
  const mockHolds = [
    {
      id: "hold-001",
      transactionId: "tx-12345",
      amount: 45000,
      type: "largeTransaction" as const,
      status: "underReview" as const,
      createdAt: "2024-01-15T14:30:00Z",
      estimatedResolution: "Within 4 hours",
      referenceNumber: "CR-2024-A4B2C9",
      progress: 65
    },
    {
      id: "hold-002", 
      transactionId: "tx-12346",
      amount: 12500,
      type: "amlReview" as const,
      status: "pending" as const,
      createdAt: "2024-01-15T09:15:00Z",
      estimatedResolution: "1-2 business days",
      referenceNumber: "CR-2024-D7E8F3",
      progress: 25
    }
  ];

  const mockTimeline = [
    { time: "2:34 PM", status: "Transaction submitted", completed: true },
    { time: "2:35 PM", status: "Security screening initiated", completed: true },
    { time: "2:40 PM", status: "Compliance review started", completed: true },
    { time: "In Progress", status: "Enhanced verification", completed: false, requiresAction: true },
    { time: "Pending", status: "Final approval", completed: false }
  ];

  const mockCommunications = [
    {
      id: "comm-001",
      time: "2:45 PM",
      from: "Compliance System",
      message: "Your transaction has entered enhanced review due to the transaction amount.",
      type: "system" as const
    },
    {
      id: "comm-002", 
      time: "3:15 PM",
      from: "Compliance Team",
      message: "We may require additional documentation. We'll contact you if needed.",
      type: "agent" as const
    }
  ];

  const mockDocumentRequests = [
    {
      id: "doc-001",
      description: "Proof of business relationship",
      required: false,
      submitted: false
    }
  ];

  const handleEscalation = (holdId: string) => {
    setShowEscalationForm(holdId);
  };

  const handleEscalationSubmit = async (escalationData: any) => {
    // Mock escalation submission
    toast({
      title: "Escalation submitted successfully",
      description: `Your request has been submitted with reference ${escalationData.escalationRef}`,
    });
    setShowEscalationForm(null);
  };

  const handleContactSupport = () => {
    toast({
      title: "Support contacted",
      description: "A support agent will contact you within 2 hours",
    });
  };

  if (showEscalationForm) {
    const hold = mockHolds.find(h => h.id === showEscalationForm);
    return (
      <div className="bg-gradient-to-br from-white to-slate-100 min-h-screen">
        <div className="container mx-auto max-w-md px-4 py-6">
          <header className="flex items-center gap-4 mb-6">
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={() => setShowEscalationForm(null)}
              className="h-10 w-10"
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <h1 className="text-2xl font-bold">Request Priority Review</h1>
          </header>

          <EscalationForm
            holdId={showEscalationForm}
            transactionAmount={hold?.amount || 0}
            onSubmit={handleEscalationSubmit}
            onCancel={() => setShowEscalationForm(null)}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-br from-white to-slate-100 min-h-screen">
      <div className="container mx-auto max-w-md px-4 py-6">
        {/* Header */}
        <header className="flex items-center gap-4 mb-6">
          <Link to="/">
            <Button variant="ghost" size="icon" className="h-10 w-10">
              <ArrowLeft className="h-5 w-5" />
            </Button>
          </Link>
          <h1 className="text-2xl font-bold">Compliance Center</h1>
          <div className="ml-auto">
            <Button variant="outline" size="icon">
              <Bell className="h-4 w-4" />
            </Button>
          </div>
        </header>

        <Tabs defaultValue="active" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="active">Active Reviews</TabsTrigger>
            <TabsTrigger value="history">History</TabsTrigger>
            <TabsTrigger value="help">Help</TabsTrigger>
          </TabsList>

          <TabsContent value="active" className="space-y-4">
            {mockHolds.length > 0 ? (
              mockHolds.map((hold) => (
                <ComplianceHoldDisplay
                  key={hold.id}
                  hold={hold}
                  onEscalate={handleEscalation}
                  onContactSupport={handleContactSupport}
                />
              ))
            ) : (
              <Card>
                <CardContent className="text-center py-8">
                  <Shield className="h-12 w-12 mx-auto mb-4 text-gray-400" />
                  <h3 className="font-medium mb-2">No active reviews</h3>
                  <p className="text-sm text-muted-foreground">
                    All your transactions are processing normally
                  </p>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="history" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Recent Compliance Reviews</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <div className="font-medium text-sm">R25,000 transfer</div>
                      <div className="text-xs text-muted-foreground">Completed in 2 hours</div>
                    </div>
                    <div className="text-xs text-green-600">✅ Approved</div>
                  </div>
                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <div className="font-medium text-sm">R75,000 business payment</div>
                      <div className="text-xs text-muted-foreground">Completed in 1 day</div>
                    </div>
                    <div className="text-xs text-green-600">✅ Approved</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="help" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Frequently Asked Questions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-medium text-sm mb-2">Why is my transaction being reviewed?</h4>
                  <p className="text-sm text-muted-foreground">
                    We review certain transactions to ensure security and compliance with financial regulations. 
                    This is a standard process that protects you and our banking community.
                  </p>
                </div>
                
                <div>
                  <h4 className="font-medium text-sm mb-2">How long do reviews take?</h4>
                  <p className="text-sm text-muted-foreground">
                    Most reviews complete automatically within a few hours. Complex reviews may take 1-2 business days.
                  </p>
                </div>
                
                <div>
                  <h4 className="font-medium text-sm mb-2">Can I speed up the process?</h4>
                  <p className="text-sm text-muted-foreground">
                    You can request priority review for urgent transactions or provide additional documentation when requested.
                  </p>
                </div>
                
                <div>
                  <h4 className="font-medium text-sm mb-2">What if my transaction is rejected?</h4>
                  <p className="text-sm text-muted-foreground">
                    Rejected transactions are automatically refunded to your account. You'll receive an explanation and can contact support for assistance.
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Contact Support</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <Button variant="outline" className="w-full justify-start">
                    <FileText className="h-4 w-4 mr-2" />
                    Submit a Support Ticket
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <Clock className="h-4 w-4 mr-2" />
                    Schedule a Call
                  </Button>
                </div>
                <div className="mt-4 text-xs text-muted-foreground">
                  <p>Support Hours: Monday-Friday 8AM-6PM SAST</p>
                  <p>Emergency Line: Available 24/7 for urgent issues</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default ComplianceCenter;
