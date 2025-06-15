
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";

const BusinessHours = () => {
  return (
    <Card>
      <CardHeader className="mobile-padding">
        <CardTitle className="text-base sm:text-lg">Business Hours</CardTitle>
      </CardHeader>
      <CardContent className="mobile-padding space-y-4">
        <div className="flex items-center justify-between py-3">
          <div className="flex-1">
            <div className="font-medium text-sm">Quiet hours</div>
            <div className="text-xs sm:text-sm text-muted-foreground">Reduce notifications during off-hours</div>
          </div>
          <Switch className="flex-shrink-0 ml-4" />
        </div>
        
        <div className="text-xs sm:text-sm text-muted-foreground p-3 bg-gray-50 rounded-lg">
          <div>Business hours: 9:00 AM - 6:00 PM</div>
          <div>Timezone: South Africa Standard Time (SAST)</div>
        </div>
      </CardContent>
    </Card>
  );
};

export default BusinessHours;
