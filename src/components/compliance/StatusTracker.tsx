
import { Clock, CheckCircle, AlertCircle, MessageCircle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface StatusTrackerProps {
  referenceNumber: string;
  currentStatus: string;
  timeline: TimelineItem[];
  estimatedCompletion?: string;
}

interface TimelineItem {
  time: string;
  status: string;
  completed: boolean;
  description?: string;
}

const statusLevels = {
  level1: "Standard Hold (Auto-resolve expected)",
  level2: "Manual Review Required", 
  level3: "Enhanced Due Diligence"
};

const StatusTracker = ({ 
  referenceNumber, 
  currentStatus, 
  timeline, 
  estimatedCompletion 
}: StatusTrackerProps) => {
  const getStatusIcon = (completed: boolean, isCurrent: boolean) => {
    if (completed) {
      return <CheckCircle className="h-4 w-4 text-green-600" />;
    } else if (isCurrent) {
      return <Clock className="h-4 w-4 text-blue-600 animate-pulse" />;
    } else {
      return <div className="h-4 w-4 rounded-full border-2 border-gray-300" />;
    }
  };

  const currentIndex = timeline.findIndex(item => !item.completed);

  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-lg">Transaction Status</CardTitle>
            <p className="text-sm text-gray-600">Ref: {referenceNumber}</p>
          </div>
          <Badge variant="outline" className="text-xs">
            {currentStatus}
          </Badge>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-6">
        {estimatedCompletion && (
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-blue-600" />
              <span className="text-sm font-medium text-blue-800">
                Estimated completion: {estimatedCompletion}
              </span>
            </div>
          </div>
        )}

        <div className="space-y-4">
          <h4 className="font-medium text-sm text-gray-700">Review Progress</h4>
          
          {timeline.map((item, index) => {
            const isCurrent = index === currentIndex;
            const isCompleted = item.completed;
            
            return (
              <div key={index} className="flex gap-3">
                <div className="flex flex-col items-center">
                  {getStatusIcon(isCompleted, isCurrent)}
                  {index < timeline.length - 1 && (
                    <div 
                      className={`w-0.5 h-8 mt-2 ${
                        isCompleted ? 'bg-green-200' : 'bg-gray-200'
                      }`} 
                    />
                  )}
                </div>
                
                <div className="flex-1 pb-6">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className={`text-sm font-medium ${
                        isCompleted ? 'text-green-800' : 
                        isCurrent ? 'text-blue-800' : 'text-gray-600'
                      }`}>
                        {item.status}
                      </p>
                      {item.description && (
                        <p className="text-xs text-gray-500 mt-1">
                          {item.description}
                        </p>
                      )}
                    </div>
                    <span className="text-xs text-gray-500">
                      {item.time}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="border-t pt-4">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <MessageCircle className="h-4 w-4" />
            <span>We'll notify you of any updates via email and app notifications</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default StatusTracker;
