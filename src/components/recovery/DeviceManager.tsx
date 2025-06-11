
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Smartphone, Monitor, Tablet, MapPin, Clock, AlertTriangle, Shield, Trash2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Device {
  id: string;
  name: string;
  type: 'mobile' | 'desktop' | 'tablet';
  lastActive: string;
  location: string;
  isOnline: boolean;
  isCurrent: boolean;
}

interface DeviceManagerProps {
  onRecoveryComplete: () => void;
}

const DeviceManager = ({ onRecoveryComplete }: DeviceManagerProps) => {
  const [devices, setDevices] = useState<Device[]>([
    {
      id: '1',
      name: 'iPhone 14 Pro',
      type: 'mobile',
      lastActive: '2 hours ago',
      location: 'Cape Town, SA',
      isOnline: true,
      isCurrent: false
    },
    {
      id: '2',
      name: 'MacBook Pro',
      type: 'desktop',
      lastActive: '1 day ago',
      location: 'Cape Town, SA',
      isOnline: false,
      isCurrent: false
    },
    {
      id: '3',
      name: 'iPad Air',
      type: 'tablet',
      lastActive: '3 days ago',
      location: 'Johannesburg, SA',
      isOnline: false,
      isCurrent: false
    },
    {
      id: '4',
      name: 'Current Device',
      type: 'desktop',
      lastActive: 'Now',
      location: 'Cape Town, SA',
      isOnline: true,
      isCurrent: true
    }
  ]);
  
  const [confirmationText, setConfirmationText] = useState('');
  const [isEmergencyDialogOpen, setIsEmergencyDialogOpen] = useState(false);
  const { toast } = useToast();

  const getDeviceIcon = (type: Device['type']) => {
    switch (type) {
      case 'mobile': return Smartphone;
      case 'desktop': return Monitor;
      case 'tablet': return Tablet;
      default: return Smartphone;
    }
  };

  const handleDeauthorizeDevice = (deviceId: string) => {
    setDevices(devices.filter(d => d.id !== deviceId));
    toast({
      title: "Device deauthorized",
      description: "The device has been removed from your authorized devices."
    });
  };

  const handleEmergencySignOut = () => {
    if (confirmationText === 'SIGN OUT ALL DEVICES') {
      setDevices(devices.filter(d => d.isCurrent));
      setIsEmergencyDialogOpen(false);
      setConfirmationText('');
      toast({
        title: "Emergency sign out complete",
        description: "All other devices have been signed out for your security."
      });
    } else {
      toast({
        title: "Confirmation text incorrect",
        description: "Please type exactly: SIGN OUT ALL DEVICES",
        variant: "destructive"
      });
    }
  };

  const handleRequestRecovery = (deviceId: string) => {
    // Simulate recovery request
    toast({
      title: "Recovery request sent",
      description: "A recovery notification has been sent to your authorized device.",
    });
    
    // Simulate approval after delay
    setTimeout(() => {
      toast({
        title: "Recovery approved!",
        description: "Access has been granted from your authorized device."
      });
      onRecoveryComplete();
    }, 3000);
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5 text-[#7E69AB]" />
            Authorized Devices
          </CardTitle>
          <CardDescription>
            Request recovery access from any of your authorized devices
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {devices.length === 0 ? (
            <Alert>
              <AlertTriangle className="h-4 w-4" />
              <AlertDescription>
                No authorized devices found. Please use another recovery method.
              </AlertDescription>
            </Alert>
          ) : (
            <div className="space-y-3">
              {devices.map((device) => {
                const Icon = getDeviceIcon(device.type);
                return (
                  <div
                    key={device.id}
                    className="flex items-center justify-between p-4 border rounded-lg"
                  >
                    <div className="flex items-center gap-3">
                      <Icon className="h-5 w-5 text-gray-600" />
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-medium">{device.name}</span>
                          {device.isOnline && (
                            <Badge variant="secondary" className="bg-green-100 text-green-800">
                              Online
                            </Badge>
                          )}
                          {device.isCurrent && (
                            <Badge variant="secondary" className="bg-blue-100 text-blue-800">
                              This Device
                            </Badge>
                          )}
                        </div>
                        <div className="flex items-center gap-4 text-sm text-gray-500">
                          <span className="flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            {device.lastActive}
                          </span>
                          <span className="flex items-center gap-1">
                            <MapPin className="h-3 w-3" />
                            {device.location}
                          </span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex gap-2">
                      {!device.isCurrent && (
                        <>
                          <Button
                            size="sm"
                            onClick={() => handleRequestRecovery(device.id)}
                            disabled={!device.isOnline}
                          >
                            Request Recovery
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleDeauthorizeDevice(device.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {devices.filter(d => !d.isCurrent).length > 0 && (
            <div className="pt-4 border-t">
              <Dialog open={isEmergencyDialogOpen} onOpenChange={setIsEmergencyDialogOpen}>
                <DialogTrigger asChild>
                  <Button variant="destructive" className="w-full">
                    <AlertTriangle className="h-4 w-4 mr-2" />
                    Emergency: Sign Out All Devices
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Emergency Device Sign Out</DialogTitle>
                    <DialogDescription>
                      This will immediately sign out all devices except this one. 
                      This action cannot be undone.
                    </DialogDescription>
                  </DialogHeader>
                  
                  <div className="space-y-4">
                    <Alert variant="destructive">
                      <AlertTriangle className="h-4 w-4" />
                      <AlertDescription>
                        Use this only if you suspect unauthorized access to your account.
                      </AlertDescription>
                    </Alert>
                    
                    <div>
                      <Label htmlFor="confirmation">
                        Type "SIGN OUT ALL DEVICES" to confirm
                      </Label>
                      <Input
                        id="confirmation"
                        value={confirmationText}
                        onChange={(e) => setConfirmationText(e.target.value)}
                        placeholder="SIGN OUT ALL DEVICES"
                      />
                    </div>
                  </div>
                  
                  <DialogFooter>
                    <Button 
                      variant="outline" 
                      onClick={() => setIsEmergencyDialogOpen(false)}
                    >
                      Cancel
                    </Button>
                    <Button 
                      variant="destructive"
                      onClick={handleEmergencySignOut}
                      disabled={confirmationText !== 'SIGN OUT ALL DEVICES'}
                    >
                      Sign Out All Devices
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default DeviceManager;
