
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
    <div className="space-y-4 sm:space-y-6">
      {/* Wallet Balance - Mobile optimized */}
      <Card>
        <CardHeader className="pb-3 sm:pb-6">
          <CardTitle className="text-base sm:text-lg flex items-center gap-2">
            <Banknote className="h-4 w-4 sm:h-5 sm:w-5" />
            Wallet Balance
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-0">
          <div className="grid grid-cols-3 gap-3 sm:gap-4">
            <div className="text-center">
              <div className="flex items-center justify-center mb-1">
                <Bitcoin className="h-3 w-3 sm:h-4 sm:w-4 text-orange-500 mr-1" />
                <span className="text-xs text-muted-foreground">BTC</span>
              </div>
              <div className="font-semibold text-sm sm:text-base">{walletBalance.btc}</div>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center mb-1">
                <div className="w-3 h-3 sm:w-4 sm:h-4 bg-purple-500 rounded-full mr-1" />
                <span className="text-xs text-muted-foreground">ETH</span>
              </div>
              <div className="font-semibold text-sm sm:text-base">{walletBalance.eth}</div>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center mb-1">
                <Banknote className="h-3 w-3 sm:h-4 sm:w-4 text-green-600 mr-1" />
                <span className="text-xs text-muted-foreground">ZAR</span>
              </div>
              <div className="font-semibold text-sm sm:text-base">R{walletBalance.zar.toLocaleString()}</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions - Mobile optimized */}
      <div className="grid grid-cols-3 gap-3 sm:gap-4">
        <Button className="h-14 sm:h-16 flex-col gap-1 text-xs sm:text-sm touch-target" variant="outline">
          <Send className="h-4 w-4 sm:h-5 sm:w-5" />
          <span>Send</span>
        </Button>
        <Button className="h-14 sm:h-16 flex-col gap-1 text-xs sm:text-sm touch-target" variant="outline">
          <Activity className="h-4 w-4 sm:h-5 sm:w-5" />
          <span>Activity</span>
        </Button>
        <Button className="h-14 sm:h-16 flex-col gap-1 text-xs sm:text-sm touch-target" variant="outline">
          <Settings className="h-4 w-4 sm:h-5 sm:w-5" />
          <span>Settings</span>
        </Button>
      </div>

      {/* Pending Approvals - Improved Layout */}
      <Card>
        <CardHeader className="pb-3 sm:pb-6">
          <CardTitle className="text-base sm:text-lg flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 sm:h-5 sm:w-5" />
              Pending Approvals
            </div>
            <Badge variant="secondary" className="text-xs">{pendingApprovals.length}</Badge>
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-0 space-y-4">
          {pendingApprovals.map((approval) => (
            <div key={approval.id} className="border rounded-lg p-4 space-y-3 touch-target">
              {/* Header with amount and urgency badge */}
              <div className="flex items-center justify-between">
                <div className="font-semibold text-base sm:text-lg">{approval.amount}</div>
                <Badge className={`${getUrgencyColor(approval.urgency)} text-xs px-2 py-1`}>
                  {approval.urgency === "high" && <AlertTriangle className="h-3 w-3 mr-1" />}
                  {approval.urgency === "high" ? "Urgent" : "Normal"}
                </Badge>
              </div>

              {/* Recipient info */}
              <div className="text-sm text-muted-foreground">
                To: <span className="font-medium text-foreground">{approval.recipient}</span>
              </div>

              {/* Approval status and time info */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="text-sm font-medium">
                      {approval.signers.approved}/{approval.signers.required} approved
                    </span>
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
                  <span className="text-sm text-muted-foreground font-medium">
                    {approval.timeLeft} left
                  </span>
                </div>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Signer Status - Mobile optimized */}
      <Card>
        <CardHeader className="pb-3 sm:pb-6">
          <CardTitle className="text-base sm:text-lg flex items-center gap-2">
            <Users className="h-4 w-4 sm:h-5 sm:w-5" />
            Signer Status
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-0 space-y-3">
          {signerStatuses.map((signer, index) => (
            <div key={index} className="flex items-center justify-between touch-target">
              <div className="flex items-center gap-3">
                {getStatusIcon(signer.status)}
                <div>
                  <div className="font-medium text-sm sm:text-base">{signer.name}</div>
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
