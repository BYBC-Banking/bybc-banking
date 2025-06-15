
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Clock, 
  CheckCircle, 
  AlertTriangle, 
  Users
} from "lucide-react";

const NotificationFilters = () => {
  return (
    <Card>
      <CardHeader className="mobile-padding">
        <CardTitle className="text-base sm:text-lg flex items-center gap-2">
          <Clock className="h-4 w-4 sm:h-5 sm:w-5" />
          Quick Filters
        </CardTitle>
      </CardHeader>
      <CardContent className="mobile-padding">
        <div className="grid grid-cols-2 gap-3">
          <Button variant="outline" className="flex items-center gap-2 text-xs">
            <AlertTriangle className="h-3 w-3 sm:h-4 sm:w-4 text-red-500" />
            <span className="truncate">Urgent (1)</span>
          </Button>
          <Button variant="outline" className="flex items-center gap-2 text-xs">
            <Clock className="h-3 w-3 sm:h-4 sm:w-4 text-orange-500" />
            <span className="truncate">Pending (2)</span>
          </Button>
          <Button variant="outline" className="flex items-center gap-2 text-xs">
            <CheckCircle className="h-3 w-3 sm:h-4 sm:w-4 text-green-500" />
            <span className="truncate">Completed (1)</span>
          </Button>
          <Button variant="outline" className="flex items-center gap-2 text-xs">
            <Users className="h-3 w-3 sm:h-4 sm:w-4 text-blue-500" />
            <span className="truncate">Team (1)</span>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default NotificationFilters;
