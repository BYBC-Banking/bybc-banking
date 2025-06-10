
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Bitcoin, 
  Banknote, 
  Clock, 
  CheckCircle, 
  AlertTriangle, 
  Users, 
  Send,
  Activity,
  Settings
} from "lucide-react";

const MultisigDashboard = () => {
  // Mock data for demonstration
  const walletBalance = {
    btc: 0.12345,
    eth: 2.5,
    zar: 125000
  };

  const pendingApprovals = [
    {
      id: "tx1",
      amount: "0.005 BTC",
      recipient: "1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa",
      status: "pending",
      urgency: "normal",
      signers: { approved: 1, required: 2, total: 3 },
      timeLeft: "2 days"
    },
    {
      id: "tx2", 
      amount: "R15,000",
      recipient: "John Smith",
      status: "urgent",
      urgency: "high",
      signers: { approved: 0, required: 2, total: 3 },
      timeLeft: "8 hours"
    }
  ];

  const signerStatuses = [
    { name: "You", status: "online", role: "admin" },
    { name: "Alice", status: "online", role: "approver" },
    { name: "Bob", status: "offline", role: "approver" }
  ];

  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
      case "high": return "text-red-600 bg-red-50";
      case "medium": return "text-orange-600 bg-orange-50";
      default: return "text-blue-600 bg-blue-50";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "online": return <div className="w-2 h-2 bg-green-500 rounded-full" />;
      case "offline": return <div className="w-2 h-2 bg-gray-400 rounded-full" />;
      default: return <div className="w-2 h-2 bg-yellow-500 rounded-full" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Wallet Balance */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <Banknote className="h-5 w-5" />
            Wallet Balance
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-3 gap-4">
            <div className="text-center">
              <div className="flex items-center justify-center mb-1">
                <Bitcoin className="h-4 w-4 text-orange-500 mr-1" />
                <span className="text-xs text-muted-foreground">BTC</span>
              </div>
              <div className="font-semibold">{walletBalance.btc}</div>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center mb-1">
                <div className="w-4 h-4 bg-purple-500 rounded-full mr-1" />
                <span className="text-xs text-muted-foreground">ETH</span>
              </div>
              <div className="font-semibold">{walletBalance.eth}</div>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center mb-1">
                <Banknote className="h-4 w-4 text-green-600 mr-1" />
                <span className="text-xs text-muted-foreground">ZAR</span>
              </div>
              <div className="font-semibold">R{walletBalance.zar.toLocaleString()}</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <div className="grid grid-cols-3 gap-4">
        <Button className="h-16 flex-col gap-1" variant="outline">
          <Send className="h-5 w-5" />
          <span className="text-xs">Send</span>
        </Button>
        <Button className="h-16 flex-col gap-1" variant="outline">
          <Activity className="h-5 w-5" />
          <span className="text-xs">Activity</span>
        </Button>
        <Button className="h-16 flex-col gap-1" variant="outline">
          <Settings className="h-5 w-5" />
          <span className="text-xs">Settings</span>
        </Button>
      </div>

      {/* Pending Approvals */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Clock className="h-5 w-5" />
              Pending Approvals
            </div>
            <Badge variant="secondary">{pendingApprovals.length}</Badge>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {pendingApprovals.map((approval) => (
            <div key={approval.id} className="border rounded-lg p-3 space-y-2">
              <div className="flex items-center justify-between">
                <div className="font-medium">{approval.amount}</div>
                <Badge className={getUrgencyColor(approval.urgency)}>
                  {approval.urgency === "high" && <AlertTriangle className="h-3 w-3 mr-1" />}
                  {approval.urgency === "high" ? "Urgent" : "Normal"}
                </Badge>
              </div>
              <div className="text-sm text-muted-foreground">
                To: {approval.recipient}
              </div>
              <div className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <span>{approval.signers.approved}/{approval.signers.required} approved</span>
                  <div className="flex gap-1">
                    {Array.from({ length: approval.signers.total }).map((_, i) => (
                      <div
                        key={i}
                        className={`w-2 h-2 rounded-full ${
                          i < approval.signers.approved
                            ? "bg-green-500"
                            : i < approval.signers.required
                            ? "bg-orange-300"
                            : "bg-gray-300"
                        }`}
                      />
                    ))}
                  </div>
                </div>
                <span className="text-muted-foreground">{approval.timeLeft} left</span>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Signer Status */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <Users className="h-5 w-5" />
            Signer Status
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {signerStatuses.map((signer, index) => (
            <div key={index} className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                {getStatusIcon(signer.status)}
                <div>
                  <div className="font-medium">{signer.name}</div>
                  <div className="text-xs text-muted-foreground capitalize">{signer.role}</div>
                </div>
              </div>
              <Badge variant="outline" className="text-xs">
                {signer.status}
              </Badge>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
};

export default MultisigDashboard;
