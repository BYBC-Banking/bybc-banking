
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Plus, BarChart3 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import SwapCard from "./SwapCard";
import SwapDetailView from "./SwapDetailView";
import SwapAnalytics from "./SwapAnalytics";

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
  status: 'active' | 'paused' | 'failed' | 'executing' | 'completed';
  successRate: { successful: number; total: number };
  retryCount?: number;
  lastFailureReason?: string;
  totalConverted: number;
  avgRate: number;
  executionHistory: Array<{
    date: string;
    status: 'success' | 'failed';
    amount: number;
    rate: number;
    reason?: string;
  }>;
}

const ScheduledSwaps = () => {
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [selectedView, setSelectedView] = useState<'list' | 'detail' | 'analytics'>('list');
  const [selectedSwapId, setSelectedSwapId] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState('active');
  
  const [schedules, setSchedules] = useState<ScheduledSwap[]>([
    {
      id: "1",
      fromAsset: "BTC",
      amount: "0.01",
      frequency: "Weekly",
      nextExecution: "Tomorrow 09:00",
      isActive: true,
      totalSwaps: 12,
      completedSwaps: 5,
      totalValue: 62500,
      status: 'active',
      successRate: { successful: 8, total: 8 },
      totalConverted: 45000,
      avgRate: 850000,
      executionHistory: [
        { date: "Dec 8, 2024", status: 'success', amount: 8500, rate: 850000 },
        { date: "Dec 1, 2024", status: 'success', amount: 8200, rate: 820000 },
        { date: "Nov 24, 2024", status: 'success', amount: 8800, rate: 880000 },
      ]
    },
    {
      id: "2",
      fromAsset: "ETH",
      amount: "0.5",
      frequency: "Daily",
      nextExecution: "Today 14:00",
      isActive: false,
      totalSwaps: 30,
      completedSwaps: 15,
      totalValue: 25000,
      status: 'paused',
      successRate: { successful: 14, total: 15 },
      totalConverted: 22000,
      avgRate: 44000,
      executionHistory: [
        { date: "Dec 7, 2024", status: 'success', amount: 1600, rate: 44000 },
        { date: "Dec 6, 2024", status: 'failed', amount: 0, rate: 0, reason: "Network timeout" },
      ]
    },
    {
      id: "3",
      fromAsset: "BTC",
      amount: "0.005",
      frequency: "Monthly",
      nextExecution: "Failed - Retry pending",
      isActive: true,
      totalSwaps: 6,
      completedSwaps: 4,
      totalValue: 15000,
      status: 'failed',
      successRate: { successful: 4, total: 5 },
      retryCount: 2,
      lastFailureReason: "Insufficient balance - R500 required",
      totalConverted: 12000,
      avgRate: 820000,
      executionHistory: [
        { date: "Dec 1, 2024", status: 'failed', amount: 0, rate: 0, reason: "Insufficient balance" },
        { date: "Nov 1, 2024", status: 'success', amount: 4200, rate: 840000 },
      ]
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

  // Filter schedules by status
  const activeSchedules = schedules.filter(s => s.status === 'active' || s.status === 'executing');
  const pausedSchedules = schedules.filter(s => s.status === 'paused' || s.status === 'failed');
  const completedSchedules = schedules.filter(s => s.status === 'completed');

  const getCurrentSchedules = () => {
    switch (activeTab) {
      case 'active': return activeSchedules;
      case 'paused': return pausedSchedules;
      case 'completed': return completedSchedules;
      default: return activeSchedules;
    }
  };

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
      totalValue: 0,
      status: 'active',
      successRate: { successful: 0, total: 0 },
      totalConverted: 0,
      avgRate: 0,
      executionHistory: []
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
        ? { 
            ...schedule, 
            isActive: !schedule.isActive,
            status: schedule.isActive ? 'paused' : 'active'
          }
        : schedule
    ));
  };

  const deleteSchedule = (id: string) => {
    setSchedules(prev => prev.filter(schedule => schedule.id !== id));
    toast({
      title: "Schedule Deleted",
      description: "Scheduled swap has been removed",
    });
    if (selectedSwapId === id) {
      setSelectedView('list');
      setSelectedSwapId(null);
    }
  };

  const duplicateSchedule = (id: string) => {
    const original = schedules.find(s => s.id === id);
    if (original) {
      const duplicate = {
        ...original,
        id: Date.now().toString(),
        completedSwaps: 0,
        totalValue: 0,
        successRate: { successful: 0, total: 0 },
        executionHistory: []
      };
      setSchedules(prev => [...prev, duplicate]);
      toast({
        title: "Schedule Duplicated",
        description: "A copy of the schedule has been created",
      });
    }
  };

  const viewSwapDetails = (id: string) => {
    setSelectedSwapId(id);
    setSelectedView('detail');
  };

  const selectedSwap = selectedSwapId ? schedules.find(s => s.id === selectedSwapId) : null;

  // Handle empty state
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

  // Show detail view
  if (selectedView === 'detail' && selectedSwap) {
    return (
      <SwapDetailView
        swap={selectedSwap}
        onBack={() => setSelectedView('list')}
        onEdit={() => {
          // TODO: Implement edit functionality
          toast({ title: "Edit", description: "Edit functionality coming soon" });
        }}
        onDuplicate={() => duplicateSchedule(selectedSwap.id)}
        onDelete={() => deleteSchedule(selectedSwap.id)}
      />
    );
  }

  // Show analytics view
  if (selectedView === 'analytics') {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <Button variant="ghost" onClick={() => setSelectedView('list')}>
            ← Back to Swaps
          </Button>
        </div>
        <SwapAnalytics />
      </div>
    );
  }

  // Show main list view
  return (
    <div className="space-y-6">
      {/* Header with actions */}
      <div className="flex justify-between items-center">
        {!showCreateForm && (
          <Button onClick={() => setShowCreateForm(true)} className="flex-1 mr-2">
            <Plus className="h-4 w-4 mr-2" />
            Create New Schedule
          </Button>
        )}
        <Button 
          variant="outline" 
          onClick={() => setSelectedView('analytics')}
          className={showCreateForm ? 'flex-1' : ''}
        >
          <BarChart3 className="h-4 w-4 mr-2" />
          Analytics
        </Button>
      </div>

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

      {/* Tabbed Schedule List */}
      {!showCreateForm && (
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="active">
              Active ({activeSchedules.length})
            </TabsTrigger>
            <TabsTrigger value="paused">
              Paused ({pausedSchedules.length})
            </TabsTrigger>
            <TabsTrigger value="completed">
              Completed ({completedSchedules.length})
            </TabsTrigger>
          </TabsList>

          <TabsContent value={activeTab} className="space-y-4 mt-6">
            {getCurrentSchedules().map((schedule) => (
              <SwapCard
                key={schedule.id}
                swap={schedule}
                onToggleStatus={toggleSchedule}
                onEdit={() => {
                  toast({ title: "Edit", description: "Edit functionality coming soon" });
                }}
                onDelete={deleteSchedule}
                onDuplicate={duplicateSchedule}
                onViewDetails={viewSwapDetails}
              />
            ))}
            
            {getCurrentSchedules().length === 0 && (
              <div className="text-center py-8 text-muted-foreground">
                <p>No {activeTab} swaps</p>
              </div>
            )}
          </TabsContent>
        </Tabs>
      )}
    </div>
  );
};

export default ScheduledSwaps;
