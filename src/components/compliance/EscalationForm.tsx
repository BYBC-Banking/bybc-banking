
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useToast } from "@/hooks/use-toast";
import { 
  AlertTriangle, 
  Upload, 
  X, 
  FileText, 
  Clock, 
  DollarSign, 
  Users,
  AlertCircle
} from "lucide-react";
import DocumentUpload from "./DocumentUpload";

interface EscalationFormProps {
  holdId: string;
  transactionAmount: number;
  onSubmit: (escalationData: EscalationData) => void;
  onCancel: () => void;
}

interface EscalationData {
  reason: string;
  description: string;
  contactMethod: string;
  contactValue: string;
  documents: File[];
  priority: "standard" | "high" | "urgent";
}

const EscalationForm = ({ holdId, transactionAmount, onSubmit, onCancel }: EscalationFormProps) => {
  const [formData, setFormData] = useState<EscalationData>({
    reason: "",
    description: "",
    contactMethod: "email",
    contactValue: "",
    documents: [],
    priority: "standard"
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const escalationReasons = [
    {
      id: "urgent-business",
      label: "This is an urgent business transaction",
      icon: <DollarSign className="h-4 w-4" />,
      priority: "urgent" as const
    },
    {
      id: "time-sensitive", 
      label: "Time-sensitive payment (bills, rent, etc.)",
      icon: <Clock className="h-4 w-4" />,
      priority: "high" as const
    },
    {
      id: "exceeded-timeline",
      label: "Review exceeded estimated timeframe",
      icon: <AlertTriangle className="h-4 w-4" />,
      priority: "high" as const
    },
    {
      id: "additional-verification",
      label: "I can provide additional verification",
      icon: <FileText className="h-4 w-4" />,
      priority: "standard" as const
    },
    {
      id: "error-hold",
      label: "I believe this hold is in error",
      icon: <AlertCircle className="h-4 w-4" />,
      priority: "high" as const
    }
  ];

  const handleReasonChange = (reasonId: string) => {
    const selectedReason = escalationReasons.find(r => r.id === reasonId);
    if (selectedReason) {
      setFormData(prev => ({
        ...prev,
        reason: reasonId,
        priority: selectedReason.priority
      }));
    }
  };

  const handleDocumentUpload = (files: File[]) => {
    setFormData(prev => ({
      ...prev,
      documents: [...prev.documents, ...files]
    }));
  };

  const removeDocument = (index: number) => {
    setFormData(prev => ({
      ...prev,
      documents: prev.documents.filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.reason) {
      toast({
        title: "Please select a reason",
        description: "Choose why you need to escalate this review",
        variant: "destructive"
      });
      return;
    }

    if (!formData.contactValue) {
      toast({
        title: "Contact information required",
        description: "Please provide your contact information",
        variant: "destructive"
      });
      return;
    }

    setIsSubmitting(true);
    
    try {
      // Generate escalation reference number
      const escalationRef = `ESC-${new Date().getFullYear()}-${Math.random().toString(36).substr(2, 6).toUpperCase()}`;
      
      await onSubmit({
        ...formData,
        escalationRef
      });
      
      toast({
        title: "Escalation submitted",
        description: `Your request has been submitted with reference ${escalationRef}`,
      });
    } catch (error) {
      toast({
        title: "Submission failed",
        description: "Please try again or contact support",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <AlertTriangle className="h-5 w-5 text-orange-600" />
          Request Priority Review
        </CardTitle>
        <p className="text-sm text-muted-foreground">
          Help us understand why this transaction needs urgent attention
        </p>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Reason Selection */}
          <div>
            <Label className="text-base font-medium">Why do you need to escalate this review?</Label>
            <RadioGroup 
              value={formData.reason} 
              onValueChange={handleReasonChange}
              className="mt-3"
            >
              {escalationReasons.map((reason) => (
                <div key={reason.id} className="flex items-center space-x-2 p-3 rounded-lg border hover:bg-gray-50">
                  <RadioGroupItem value={reason.id} id={reason.id} />
                  <Label htmlFor={reason.id} className="flex items-center gap-2 cursor-pointer flex-1">
                    {reason.icon}
                    {reason.label}
                    {reason.priority === "urgent" && (
                      <span className="text-xs bg-red-100 text-red-700 px-2 py-1 rounded">URGENT</span>
                    )}
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </div>

          {/* Additional Details */}
          <div>
            <Label htmlFor="description">Additional details (optional)</Label>
            <Textarea
              id="description"
              placeholder="Provide any additional context that might help expedite your review..."
              value={formData.description}
              onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
              className="mt-1"
              rows={3}
            />
          </div>

          {/* Contact Information */}
          <div className="space-y-3">
            <Label className="text-base font-medium">Preferred contact method</Label>
            <RadioGroup 
              value={formData.contactMethod} 
              onValueChange={(value) => setFormData(prev => ({ ...prev, contactMethod: value }))}
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="email" id="email" />
                <Label htmlFor="email">Email</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="phone" id="phone" />
                <Label htmlFor="phone">Phone</Label>
              </div>
            </RadioGroup>
            
            <Input
              placeholder={formData.contactMethod === "email" ? "your.email@example.com" : "+27 XX XXX XXXX"}
              value={formData.contactValue}
              onChange={(e) => setFormData(prev => ({ ...prev, contactValue: e.target.value }))}
              type={formData.contactMethod === "email" ? "email" : "tel"}
            />
          </div>

          {/* Document Upload */}
          <div>
            <Label className="text-base font-medium">Supporting documents (optional)</Label>
            <p className="text-sm text-muted-foreground mb-3">
              Upload any documents that might help: invoices, proof of relationship, business documentation
            </p>
            <DocumentUpload onUpload={handleDocumentUpload} />
            
            {formData.documents.length > 0 && (
              <div className="mt-3 space-y-2">
                {formData.documents.map((file, index) => (
                  <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                    <div className="flex items-center gap-2">
                      <FileText className="h-4 w-4" />
                      <span className="text-sm">{file.name}</span>
                    </div>
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => removeDocument(index)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Priority Indicator */}
          {formData.priority !== "standard" && (
            <div className={`p-3 rounded-lg ${
              formData.priority === "urgent" ? "bg-red-50 border border-red-200" : "bg-orange-50 border border-orange-200"
            }`}>
              <div className="flex items-center gap-2">
                <AlertTriangle className={`h-4 w-4 ${
                  formData.priority === "urgent" ? "text-red-600" : "text-orange-600"
                }`} />
                <span className="font-medium text-sm">
                  {formData.priority === "urgent" ? "Urgent Priority" : "High Priority"}
                </span>
              </div>
              <p className="text-sm text-muted-foreground mt-1">
                {formData.priority === "urgent" 
                  ? "This will be reviewed within 2 hours during business hours"
                  : "This will be prioritized in our review queue"
                }
              </p>
            </div>
          )}

          {/* Form Actions */}
          <div className="flex gap-3">
            <Button 
              type="submit" 
              disabled={isSubmitting}
              className="flex-1"
            >
              {isSubmitting ? "Submitting..." : "Submit Escalation Request"}
            </Button>
            <Button 
              type="button" 
              variant="outline" 
              onClick={onCancel}
              disabled={isSubmitting}
            >
              Cancel
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default EscalationForm;
