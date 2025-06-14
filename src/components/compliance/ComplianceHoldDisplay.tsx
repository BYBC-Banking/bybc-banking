
import { Clock, FileText, Phone, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface ComplianceHoldDisplayProps {
  holdType: string;
  amount: number;
  referenceNumber: string;
  estimatedTime: string;
  onEscalate: () => void;
  onContactSupport: () => void;
}

const holdReasons = {
  largeTransaction: "Security Review in Progress",
  amlReview: "Additional Verification Required", 
  flaggedAddress: "Address Verification Needed",
  enhancedDueDiligence: "Enhanced Review Required"
};

const holdMessages = {
  largeTransaction: {
    icon: "🔍",
    description: "Your transaction is being reviewed as part of our standard security process.",
    timeline: "2-4 business hours",
    action: "Wait for automatic approval or contact support"
  },
  amlReview: {
    icon: "🛡️",
    description: "We need to verify transaction details to comply with financial safety regulations.",
    timeline: "1-2 business days",
    action: "Provide documentation if requested"
  },
  flaggedAddress: {
    icon: "📍",
    description: "We're verifying the recipient address for security purposes.",
    timeline: "4-8 business hours",
    action: "Confirm recipient details if contacted"
  },
  enhancedDueDiligence: {
    icon: "🔒",
    description: "Enhanced security review required for this transaction type.",
    timeline: "2-5 business days",
    action: "Additional documentation may be requested"
  }
};

const ComplianceHoldDisplay = ({ 
  holdType, 
  amount, 
  referenceNumber, 
  estimatedTime, 
  onEscalate, 
  onContactSupport 
}: ComplianceHoldDisplayProps) => {
  const holdInfo = holdMessages[holdType as keyof typeof holdMessages] || holdMessages.largeTransaction;
  const reasonText = holdReasons[holdType as keyof typeof holdReasons] || holdReasons.largeTransaction;

  return (
    <Card className="border-amber-200 bg-amber-50">
      <CardHeader>
        <div className="flex items-center gap-3">
          <div className="text-2xl">{holdInfo.icon}</div>
          <div>
            <CardTitle className="text-lg text-amber-800">{reasonText}</CardTitle>
            <p className="text-sm text-amber-600">Reference: {referenceNumber}</p>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="bg-white rounded-lg p-4 border border-amber-200">
          <p className="text-gray-700 mb-3">{holdInfo.description}</p>
          
          <div className="grid grid-cols-1 gap-3">
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-amber-600" />
              <span className="text-sm">
                <strong>Expected timeline:</strong> {holdInfo.timeline}
              </span>
            </div>
            
            <div className="flex items-center gap-2">
              <AlertCircle className="h-4 w-4 text-amber-600" />
              <span className="text-sm">
                <strong>What you can do:</strong> {holdInfo.action}
              </span>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <Button 
            variant="outline" 
            onClick={onEscalate}
            className="w-full border-amber-300 text-amber-700 hover:bg-amber-100"
          >
            <FileText className="h-4 w-4 mr-2" />
            Request Priority Review
          </Button>
          
          <Button 
            variant="ghost" 
            onClick={onContactSupport}
            className="w-full text-amber-700 hover:bg-amber-100"
          >
            <Phone className="h-4 w-4 mr-2" />
            Contact Support
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default ComplianceHoldDisplay;
