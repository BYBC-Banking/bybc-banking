
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { Plus, Play, Pause, Edit, Trash2, Calendar } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface ScheduledSwap {
  id: string;
  fromAsset: string;
  amount: string;
  frequency: string;
  nextExecution: string;
  isActive: boolean;
  totalSwaps: number;
  completedSwaps: number;
  totalValue: number;
}

const ScheduledSwaps = () => {
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [schedules, setSchedules] = useState<ScheduledSwap[]>([
    {
      id: "1",
      fromAsset: "BTC",
      amount: "0.01",
      frequency: "Weekly",
      nextExecution: "Tomorrow",
      isActive: true,
      totalSwaps: 12,
      completedSwaps: 5,
      totalValue: 62500
    }
  ]);
  const { toast } = useToast();

  const [formData, setFormData] = useState({
    fromAsset: "BTC",
    amount: "",
    frequency: "weekly",
    startDate: "today",
    time: "09:00",
    duration: "occurrences",
    occurrences: "12",
    skipLowBalance: true,
    pauseVolatility: true
  });

  const handleCreateSchedule = () => {
    if (!formData.amount) {
      toast({
        title: "Missing Amount",
        description: "Please enter an amount for the scheduled swap",
        variant: "destructive"
      });
      return;
    }

    const newSchedule: ScheduledSwap = {
      id: Date.now().toString(),
      fromAsset: formData.fromAsset,
      amount: formData.amount,
      frequency: formData.frequency.charAt(0).toUpperCase() + formData.frequency.slice(1),
      nextExecution: "In 1 day",
      isActive: true,
      totalSwaps: parseInt(formData.occurrences),
      completedSwaps: 0,
      totalValue: 0
    };

    setSchedules(prev => [...prev, newSchedule]);
    setShowCreateForm(false);
    setFormData({
      fromAsset: "BTC",
      amount: "",
      frequency: "weekly",
      startDate: "today",
      time: "09:00",
      duration: "occurrences",
      occurrences: "12",
      skipLowBalance: true,
      pauseVolatility: true
    });

    toast({
      title: "Schedule Created",
      description: `${formData.frequency} swap schedule created successfully`,
    });
  };

  const toggleSchedule = (id: string) => {
    setSchedules(prev => prev.map(schedule => 
      schedule.id === id 
        ? { ...schedule, isActive: !schedule.isActive }
        : schedule
    ));
  };

  const deleteSchedule = (id: string) => {
    setSchedules(prev => prev.filter(schedule => schedule.id !== id));
    toast({
      title: "Schedule Deleted",
      description: "Scheduled swap has been removed",
    });
  };

  if (schedules.length === 0 && !showCreateForm) {
    return (
      <div className="text-center space-y-6 py-12">
        <div className="text-6xl">📅</div>
        <div>
          <h3 className="text-lg font-semibold mb-2">No Scheduled Swaps</h3>
          <p className="text-muted-foreground mb-4">
            Automate conversions with scheduled swaps.
          </p>
          <p className="text-sm text-blue-600 mb-6">
            💡 Popular: Weekly BTC swaps
          </p>
        </div>
        <Button onClick={() => setShowCreateForm(true)} className="w-full">
          <Plus className="h-4 w-4 mr-2" />
          Create Schedule
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Create New Schedule Button */}
      {!showCreateForm && (
        <Button 
          onClick={() => setShowCreateForm(true)}
          className="w-full h-12"
          variant="outline"
        >
          <Plus className="h-4 w-4 mr-2" />
          Create New Schedule
        </Button>
      )}

      {/* Create Schedule Form */}
      {showCreateForm && (
        <Card>
          <CardHeader>
            <CardTitle>Setup Scheduled Swap</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Asset and Amount */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>FROM:</Label>
                <Select value={formData.fromAsset} onValueChange={(value) => 
                  setFormData(prev => ({ ...prev, fromAsset: value }))
                }>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="BTC">Bitcoin</SelectItem>
                    <SelectItem value="ETH">Ethereum</SelectItem>
                    <SelectItem value="XRP">Ripple</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Amount:</Label>
                <Input
                  placeholder="0.01"
                  value={formData.amount}
                  onChange={(e) => setFormData(prev => ({ ...prev, amount: e.target.value }))}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label>TO: South African Rand (ZAR)</Label>
            </div>

            {/* Frequency */}
            <div className="space-y-2">
              <Label>📅 Frequency:</Label>
              <div className="flex gap-2">
                {["daily", "weekly", "monthly"].map((freq) => (
                  <Button
                    key={freq}
                    variant={formData.frequency === freq ? "default" : "outline"}
                    size="sm"
                    onClick={() => setFormData(prev => ({ ...prev, frequency: freq }))}
                  >
                    {freq.charAt(0).toUpperCase() + freq.slice(1)}
                  </Button>
                ))}
              </div>
            </div>

            {/* Schedule Details */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>🗓️ Start:</Label>
                <Select value={formData.startDate} onValueChange={(value) => 
                  setFormData(prev => ({ ...prev, startDate: value }))
                }>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="today">Today</SelectItem>
                    <SelectItem value="tomorrow">Tomorrow</SelectItem>
                    <SelectItem value="next-week">Next Week</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>⏰ Time:</Label>
                <Select value={formData.time} onValueChange={(value) => 
                  setFormData(prev => ({ ...prev, time: value }))
                }>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="09:00">09:00 AM</SelectItem>
                    <SelectItem value="12:00">12:00 PM</SelectItem>
                    <SelectItem value="15:00">03:00 PM</SelectItem>
                    <SelectItem value="18:00">06:00 PM</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Duration */}
            <div className="space-y-4">
              <Label>🔄 Duration:</Label>
              <div className="space-y-3">
                <div className="flex items-center space-x-2">
                  <input
                    type="radio"
                    id="until-cancelled"
                    name="duration"
                    checked={formData.duration === "until-cancelled"}
                    onChange={() => setFormData(prev => ({ ...prev, duration: "until-cancelled" }))}
                  />
                  <Label htmlFor="until-cancelled">Until cancelled</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <input
                    type="radio"
                    id="occurrences"
                    name="duration"
                    checked={formData.duration === "occurrences"}
                    onChange={() => setFormData(prev => ({ ...prev, duration: "occurrences" }))}
                  />
                  <Label htmlFor="occurrences">For</Label>
                  <Input
                    className="w-16 mx-2"
                    value={formData.occurrences}
                    onChange={(e) => setFormData(prev => ({ ...prev, occurrences: e.target.value }))}
                    disabled={formData.duration !== "occurrences"}
                  />
                  <Label>occurrences</Label>
                </div>
              </div>
            </div>

            {/* Smart Features */}
            <div className="space-y-4">
              <Label>💡 Smart Features:</Label>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-medium">Skip if balance low</div>
                    <div className="text-sm text-muted-foreground">
                      Skip execution if insufficient balance
                    </div>
                  </div>
                  <Switch
                    checked={formData.skipLowBalance}
                    onCheckedChange={(checked) => 
                      setFormData(prev => ({ ...prev, skipLowBalance: checked }))
                    }
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-medium">Pause during high volatility</div>
                    <div className="text-sm text-muted-foreground">
                      Temporary pause during market instability
                    </div>
                  </div>
                  <Switch
                    checked={formData.pauseVolatility}
                    onCheckedChange={(checked) => 
                      setFormData(prev => ({ ...prev, pauseVolatility: checked }))
                    }
                  />
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="grid grid-cols-2 gap-3">
              <Button variant="outline" onClick={() => setShowCreateForm(false)}>
                Cancel
              </Button>
              <Button onClick={handleCreateSchedule}>
                Create Schedule
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Active Schedules */}
      {schedules.map((schedule) => (
        <Card key={schedule.id}>
          <CardContent className="p-6">
            <div className="space-y-4">
              {/* Header */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className={`w-3 h-3 rounded-full ${
                    schedule.isActive ? 'bg-green-500' : 'bg-gray-400'
                  }`} />
                  <span className="font-semibold">
                    {schedule.fromAsset} → ZAR {schedule.frequency}
                  </span>
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => toggleSchedule(schedule.id)}
                  >
                    {schedule.isActive ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                  </Button>
                  <Button variant="ghost" size="icon">
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="icon"
                    onClick={() => deleteSchedule(schedule.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              {/* Details */}
              <div className="text-sm text-muted-foreground">
                <div>R{schedule.totalValue.toLocaleString()} • {schedule.frequency}s 9:00 AM</div>
                <div>Next: {schedule.nextExecution}</div>
              </div>

              {/* Progress */}
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Progress:</span>
                  <span>{schedule.completedSwaps}/{schedule.totalSwaps} swaps</span>
                </div>
                <div className="w-full bg-secondary rounded-full h-2">
                  <div 
                    className="bg-primary h-2 rounded-full transition-all"
                    style={{ width: `${(schedule.completedSwaps / schedule.totalSwaps) * 100}%` }}
                  />
                </div>
                <div className="text-sm text-muted-foreground">
                  Total: R{schedule.totalValue.toLocaleString()}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default ScheduledSwaps;
