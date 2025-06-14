
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  Clock, 
  Shield, 
  AlertTriangle, 
  FileText, 
  Phone, 
  HelpCircle,
  ExternalLink
} from "lucide-react";

interface ComplianceHold {
  id: string;
  transactionId: string;
  amount: number;
  type: "largeTransaction" | "amlReview" | "flaggedAddress" | "enhancedDueDiligence";
  status: "pending" | "underReview" | "escalated" | "resolved";
  createdAt: string;
  estimatedResolution: string;
  referenceNumber: string;
  progress: number;
}

interface ComplianceHoldDisplayProps {
  hold: ComplianceHold;
  onEscalate: (holdId: string) => void;
  onContactSupport: () => void;
}

const ComplianceHoldDisplay = ({ hold, onEscalate, onContactSupport }: ComplianceHoldDisplayProps) => {
  const [showDetails, setShowDetails] = useState(false);

  const holdReasons = {
    largeTransaction: {
      title: "🔍 Security Review in Progress",
      description: `Your R${hold.amount.toLocaleString()} transaction is being reviewed as part of our standard security process.`,
      timeline: "2-4 business hours",
      whatYouCanDo: "Wait for automatic approval or contact support",
      icon: <Shield className="h-5 w-5 text-blue-600" />
    },
    amlReview: {
      title: "🛡️ Additional Verification Required", 
      description: "We need to verify transaction details to comply with financial safety regulations.",
      timeline: "1-2 business days",
      whatYouCanDo: "Provide documentation if requested",
      icon: <AlertTriangle className="h-5 w-5 text-amber-600" />
    },
    flaggedAddress: {
      title: "📍 Address Verification Needed",
      description: "The recipient address requires additional verification for security purposes.",
      timeline: "4-6 business hours", 
      whatYouCanDo: "Verify recipient details or provide relationship proof",
      icon: <AlertTriangle className="h-5 w-5 text-orange-600" />
    },
    enhancedDueDiligence: {
      title: "🔒 Enhanced Review Required",
      description: "This transaction requires enhanced due diligence review per regulatory requirements.",
      timeline: "2-3 business days",
      whatYouCanDo: "Provide additional documentation when requested",
      icon: <Shield className="h-5 w-5 text-red-600" />
    }
  };

  const currentHold = holdReasons[hold.type];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending": return "bg-yellow-100 text-yellow-800";
      case "underReview": return "bg-blue-100 text-blue-800";
      case "escalated": return "bg-orange-100 text-orange-800";
      case "resolved": return "bg-green-100 text-green-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <Card className="border-l-4 border-l-blue-500">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            {currentHold.icon}
            <CardTitle className="text-lg">{currentHold.title}</CardTitle>
          </div>
          <Badge className={getStatusColor(hold.status)}>
            {hold.status.charAt(0).toUpperCase() + hold.status.slice(1)}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <p className="text-muted-foreground mb-2">{currentHold.description}</p>
          <div className="bg-blue-50 p-3 rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <Clock className="h-4 w-4 text-blue-600" />
              <span className="font-medium text-sm">Expected timeline: {currentHold.timeline}</span>
            </div>
            <div className="flex items-center gap-2">
              <FileText className="h-4 w-4 text-blue-600" />
              <span className="text-sm">What you can do: {currentHold.whatYouCanDo}</span>
            </div>
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium">Review Progress</span>
            <span className="text-sm text-muted-foreground">{hold.progress}%</span>
          </div>
          <Progress value={hold.progress} className="h-2" />
        </div>

        <div className="bg-gray-50 p-3 rounded-lg">
          <div className="text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Reference Number:</span>
              <span className="font-mono font-medium">{hold.referenceNumber}</span>
            </div>
            <div className="flex justify-between mt-1">
              <span className="text-muted-foreground">Started:</span>
              <span>{new Date(hold.createdAt).toLocaleString()}</span>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <Button
            onClick={() => onEscalate(hold.id)}
            variant="outline"
            className="w-full"
            disabled={hold.status === "escalated"}
          >
            {hold.status === "escalated" ? "Escalation Submitted" : "Request Priority Review"}
          </Button>
          
          <div className="grid grid-cols-2 gap-2">
            <Button
              onClick={onContactSupport}
              variant="outline"
              size="sm"
              className="flex items-center gap-1"
            >
              <Phone className="h-4 w-4" />
              Contact Support
            </Button>
            <Button
              onClick={() => setShowDetails(!showDetails)}
              variant="outline"
              size="sm"
              className="flex items-center gap-1"
            >
              <HelpCircle className="h-4 w-4" />
              FAQ
            </Button>
          </div>
        </div>

        {showDetails && (
          <div className="bg-gray-50 p-3 rounded-lg text-sm space-y-2">
            <h4 className="font-medium">Why do compliance holds happen?</h4>
            <p className="text-muted-foreground">
              We review certain transactions to ensure your account security and comply with 
              financial regulations. This is a standard process that helps protect both you 
              and our banking community.
            </p>
            <h4 className="font-medium mt-3">Can I speed up the process?</h4>
            <p className="text-muted-foreground">
              You can request a priority review or provide additional documentation when requested. 
              Most holds resolve automatically within the estimated timeframe.
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ComplianceHoldDisplay;
