
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
      <Card variant="neumorphism">
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2 text-gray-700">
            <Banknote className="h-5 w-5" />
            Wallet Balance
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-3 gap-4">
            <div className="text-center p-3 rounded-xl bg-gray-100 shadow-[inset_2px_2px_4px_#d1d9e6,inset_-2px_-2px_4px_#ffffff]">
              <div className="flex items-center justify-center mb-1">
                <Bitcoin className="h-4 w-4 text-orange-500 mr-1" />
                <span className="text-xs text-gray-600">BTC</span>
              </div>
              <div className="font-semibold text-gray-700">{walletBalance.btc}</div>
            </div>
            <div className="text-center p-3 rounded-xl bg-gray-100 shadow-[inset_2px_2px_4px_#d1d9e6,inset_-2px_-2px_4px_#ffffff]">
              <div className="flex items-center justify-center mb-1">
                <div className="w-4 h-4 bg-purple-500 rounded-full mr-1" />
                <span className="text-xs text-gray-600">ETH</span>
              </div>
              <div className="font-semibold text-gray-700">{walletBalance.eth}</div>
            </div>
            <div className="text-center p-3 rounded-xl bg-gray-100 shadow-[inset_2px_2px_4px_#d1d9e6,inset_-2px_-2px_4px_#ffffff]">
              <div className="flex items-center justify-center mb-1">
                <Banknote className="h-4 w-4 text-green-600 mr-1" />
                <span className="text-xs text-gray-600">ZAR</span>
              </div>
              <div className="font-semibold text-gray-700">R{walletBalance.zar.toLocaleString()}</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <div className="grid grid-cols-3 gap-4">
        <button className="h-16 flex-col gap-1 px-4 py-2 rounded-xl bg-gray-100 shadow-[4px_4px_8px_#d1d9e6,-4px_-4px_8px_#ffffff] hover:shadow-[2px_2px_4px_#d1d9e6,-2px_-2px_4px_#ffffff] text-gray-700 font-medium flex items-center justify-center transition-all">
          <Send className="h-5 w-5" />
          <span className="text-xs">Send</span>
        </button>
        <button className="h-16 flex-col gap-1 px-4 py-2 rounded-xl bg-gray-100 shadow-[4px_4px_8px_#d1d9e6,-4px_-4px_8px_#ffffff] hover:shadow-[2px_2px_4px_#d1d9e6,-2px_-2px_4px_#ffffff] text-gray-700 font-medium flex items-center justify-center transition-all">
          <Activity className="h-5 w-5" />
          <span className="text-xs">Activity</span>
        </button>
        <button className="h-16 flex-col gap-1 px-4 py-2 rounded-xl bg-gray-100 shadow-[4px_4px_8px_#d1d9e6,-4px_-4px_8px_#ffffff] hover:shadow-[2px_2px_4px_#d1d9e6,-2px_-2px_4px_#ffffff] text-gray-700 font-medium flex items-center justify-center transition-all">
          <Settings className="h-5 w-5" />
          <span className="text-xs">Settings</span>
        </button>
      </div>

      {/* Pending Approvals */}
      <Card variant="neumorphism">
        <CardHeader>
          <CardTitle className="text-lg flex items-center justify-between text-gray-700">
            <div className="flex items-center gap-2">
              <Clock className="h-5 w-5" />
              Pending Approvals
            </div>
            <Badge variant="secondary">{pendingApprovals.length}</Badge>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {pendingApprovals.map((approval) => (
            <div key={approval.id} className="p-3 rounded-xl bg-gray-100 shadow-[inset_2px_2px_4px_#d1d9e6,inset_-2px_-2px_4px_#ffffff] space-y-2">
              <div className="flex items-center justify-between">
                <div className="font-medium text-gray-700">{approval.amount}</div>
                <Badge className={getUrgencyColor(approval.urgency)}>
                  {approval.urgency === "high" && <AlertTriangle className="h-3 w-3 mr-1" />}
                  {approval.urgency === "high" ? "Urgent" : "Normal"}
                </Badge>
              </div>
              <div className="text-sm text-gray-600">
                To: {approval.recipient}
              </div>
              <div className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <span className="text-gray-600">{approval.signers.approved}/{approval.signers.required} approved</span>
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
                <span className="text-gray-500">{approval.timeLeft} left</span>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Signer Status */}
      <Card variant="neumorphism">
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2 text-gray-700">
            <Users className="h-5 w-5" />
            Signer Status
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {signerStatuses.map((signer, index) => (
            <div key={index} className="flex items-center justify-between p-3 rounded-xl bg-gray-100 shadow-[inset_2px_2px_4px_#d1d9e6,inset_-2px_-2px_4px_#ffffff]">
              <div className="flex items-center gap-3">
                {getStatusIcon(signer.status)}
                <div>
                  <div className="font-medium text-gray-700">{signer.name}</div>
                  <div className="text-xs text-gray-500 capitalize">{signer.role}</div>
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
