
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft } from "lucide-react";
import DocumentUpload from "./DocumentUpload";

interface EscalationFormProps {
  onBack: () => void;
  onSubmit: (data: EscalationData) => void;
}

interface EscalationData {
  reason: string;
  description: string;
  documents: File[];
}

const escalationReasons = [
  "This is an urgent business transaction",
  "Time-sensitive payment (bills, rent, etc.)",
  "Review exceeded estimated timeframe", 
  "I can provide additional verification",
  "I believe this hold is in error"
];

const EscalationForm = ({ onBack, onSubmit }: EscalationFormProps) => {
  const [selectedReason, setSelectedReason] = useState("");
  const [description, setDescription] = useState("");
  const [documents, setDocuments] = useState<File[]>([]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedReason) {
      onSubmit({
        reason: selectedReason,
        description,
        documents
      });
    }
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="icon" onClick={onBack}>
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <CardTitle>Request Priority Review</CardTitle>
        </div>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <Label className="text-base font-medium mb-3 block">
              Why do you need priority review?
            </Label>
            <RadioGroup value={selectedReason} onValueChange={setSelectedReason}>
              {escalationReasons.map((reason, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <RadioGroupItem value={reason} id={`reason-${index}`} />
                  <Label htmlFor={`reason-${index}`} className="text-sm">
                    {reason}
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </div>

          <div>
            <Label htmlFor="description" className="text-base font-medium">
              Additional Details (Optional)
            </Label>
            <Textarea
              id="description"
              placeholder="Provide any additional context that might help expedite your review..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="mt-2"
            />
          </div>

          <DocumentUpload 
            onFilesChange={setDocuments}
            acceptedFiles={documents}
          />

          <Button 
            type="submit" 
            className="w-full"
            disabled={!selectedReason}
          >
            Submit Priority Request
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default EscalationForm;
