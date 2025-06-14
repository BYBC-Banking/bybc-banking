
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  CheckCircle, 
  Clock, 
  AlertTriangle, 
  FileText, 
  MessageSquare,
  Users,
  Shield
} from "lucide-react";

interface TimelineItem {
  time: string;
  status: string;
  completed: boolean;
  description?: string;
  requiresAction?: boolean;
}

interface StatusTrackerProps {
  referenceNumber: string;
  currentStatus: string;
  estimatedCompletion: string;
  timeline: TimelineItem[];
  communicationHistory: Array<{
    id: string;
    time: string;
    from: string;
    message: string;
    type: "system" | "user" | "agent";
  }>;
  documentRequests: Array<{
    id: string;
    description: string;
    required: boolean;
    submitted: boolean;
    submittedAt?: string;
  }>;
}

const StatusTracker = ({ 
  referenceNumber, 
  currentStatus, 
  estimatedCompletion,
  timeline,
  communicationHistory,
  documentRequests 
}: StatusTrackerProps) => {
  
  const getStatusIcon = (completed: boolean, requiresAction?: boolean) => {
    if (requiresAction) {
      return <AlertTriangle className="h-4 w-4 text-orange-500" />;
    }
    return completed 
      ? <CheckCircle className="h-4 w-4 text-green-500" />
      : <Clock className="h-4 w-4 text-gray-400" />;
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "pending": return "bg-yellow-100 text-yellow-800";
      case "under review": return "bg-blue-100 text-blue-800";
      case "escalated": return "bg-orange-100 text-orange-800";
      case "completed": return "bg-green-100 text-green-800";
      case "rejected": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const completedSteps = timeline.filter(item => item.completed).length;
  const totalSteps = timeline.length;
  const progressPercentage = (completedSteps / totalSteps) * 100;

  return (
    <div className="space-y-6">
      {/* Header Status */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5" />
              Transaction Review Status
            </CardTitle>
            <Badge className={getStatusColor(currentStatus)}>
              {currentStatus}
            </Badge>
          </div>
          <div className="text-sm text-muted-foreground">
            Reference: <span className="font-mono">{referenceNumber}</span>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium">Overall Progress</span>
                <span className="text-sm text-muted-foreground">
                  {completedSteps} of {totalSteps} steps
                </span>
              </div>
              <Progress value={progressPercentage} className="h-2" />
            </div>
            
            <div className="text-sm">
              <span className="text-muted-foreground">Estimated completion: </span>
              <span className="font-medium">{estimatedCompletion}</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Timeline */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="h-5 w-5" />
            Review Timeline
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {timeline.map((item, index) => (
              <div key={index} className="flex items-start gap-3">
                <div className="mt-1">
                  {getStatusIcon(item.completed, item.requiresAction)}
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <span className={`text-sm ${item.completed ? 'font-medium' : 'text-muted-foreground'}`}>
                      {item.status}
                    </span>
                    <span className="text-xs text-muted-foreground">{item.time}</span>
                  </div>
                  {item.description && (
                    <p className="text-xs text-muted-foreground mt-1">{item.description}</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Document Requirements */}
      {documentRequests.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5" />
              Document Requirements
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {documentRequests.map((doc) => (
                <div key={doc.id} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center gap-3">
                    <div>
                      {doc.submitted 
                        ? <CheckCircle className="h-4 w-4 text-green-500" />
                        : <Clock className="h-4 w-4 text-orange-500" />
                      }
                    </div>
                    <div>
                      <div className="text-sm font-medium">{doc.description}</div>
                      {doc.submitted && doc.submittedAt && (
                        <div className="text-xs text-muted-foreground">
                          Submitted: {new Date(doc.submittedAt).toLocaleString()}
                        </div>
                      )}
                    </div>
                  </div>
                  <div>
                    {doc.required && !doc.submitted && (
                      <Badge variant="destructive" className="text-xs">Required</Badge>
                    )}
                    {doc.submitted && (
                      <Badge variant="secondary" className="text-xs">Submitted</Badge>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Communication History */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MessageSquare className="h-5 w-5" />
            Communication History
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3 max-h-64 overflow-y-auto">
            {communicationHistory.map((comm) => (
              <div key={comm.id} className={`p-3 rounded-lg ${
                comm.type === "system" ? "bg-gray-50" :
                comm.type === "user" ? "bg-blue-50" : "bg-green-50"
              }`}>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm font-medium">{comm.from}</span>
                  <span className="text-xs text-muted-foreground">{comm.time}</span>
                </div>
                <p className="text-sm">{comm.message}</p>
              </div>
            ))}
            
            {communicationHistory.length === 0 && (
              <div className="text-center py-4 text-muted-foreground">
                <MessageSquare className="h-8 w-8 mx-auto mb-2 opacity-50" />
                <p className="text-sm">No communications yet</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default StatusTracker;
