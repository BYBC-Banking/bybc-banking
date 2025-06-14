
import { useState, useEffect } from "react";
import { ArrowLeft } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import ComplianceHoldDisplay from "@/components/compliance/ComplianceHoldDisplay";
import EscalationForm from "@/components/compliance/EscalationForm";
import StatusTracker from "@/components/compliance/StatusTracker";
import { useToast } from "@/hooks/use-toast";

interface EscalationData {
  reason: string;
  description: string;
  documents: File[];
}

const ComplianceCenter = () => {
  const [showEscalationForm, setShowEscalationForm] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  // Mock data - in real app, this would come from API
  const mockHold = {
    type: "largeTransaction",
    amount: 45000,
    referenceNumber: "COMP-2024-001234",
    estimatedTime: "2-4 business hours",
    currentStatus: "Standard Hold (Auto-resolve expected)"
  };

  const mockTimeline = [
    { 
      time: "2:34 PM", 
      status: "Transaction submitted", 
      completed: true,
      description: "Your transfer request was received"
    },
    { 
      time: "2:35 PM", 
      status: "Security screening initiated", 
      completed: true,
      description: "Automated security checks completed"
    },
    { 
      time: "2:40 PM", 
      status: "Compliance review started", 
      completed: false,
      description: "Manual review in progress"
    },
    { 
      time: "Pending", 
      status: "Verification in progress", 
      completed: false,
      description: "Final verification and approval"
    }
  ];

  const handleEscalation = () => {
    setShowEscalationForm(true);
  };

  const handleContactSupport = () => {
    toast({
      title: "Support Contact",
      description: "Redirecting to support chat...",
    });
    // In real app, would open support chat or phone
  };

  const handleEscalationSubmit = (data: EscalationData) => {
    // Generate escalation reference number
    const escalationRef = `ESC-2024-${Math.random().toString(36).substr(2, 6).toUpperCase()}`;
    
    console.log("Escalation submitted:", {
      ...data,
      referenceNumber: escalationRef,
      originalTransaction: mockHold.referenceNumber
    });

    toast({
      title: "Priority Review Requested",
      description: `Your escalation ${escalationRef} has been submitted. You'll receive an update within 2 hours.`,
    });

    setShowEscalationForm(false);
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (showEscalationForm) {
    return (
      <div className="bg-gradient-to-br from-white to-slate-100 min-h-screen">
        <div className="container mx-auto max-w-md px-4 py-6">
          <EscalationForm 
            onBack={() => setShowEscalationForm(false)}
            onSubmit={handleEscalationSubmit}
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
          <Link to="/" className="p-2">
            <ArrowLeft className="h-5 w-5" />
          </Link>
          <h1 className="text-2xl font-bold">Compliance Center</h1>
        </header>

        <div className="space-y-6">
          {/* Current Hold Display */}
          <ComplianceHoldDisplay
            holdType={mockHold.type}
            amount={mockHold.amount}
            referenceNumber={mockHold.referenceNumber}
            estimatedTime={mockHold.estimatedTime}
            onEscalate={handleEscalation}
            onContactSupport={handleContactSupport}
          />

          {/* Status Tracker */}
          <StatusTracker
            referenceNumber={mockHold.referenceNumber}
            currentStatus={mockHold.currentStatus}
            timeline={mockTimeline}
            estimatedCompletion="Today by 6:40 PM"
          />
        </div>
      </div>
    </div>
  );
};

export default ComplianceCenter;
