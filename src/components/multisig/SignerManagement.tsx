
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { 
  Users, 
  Crown, 
  User, 
  Eye, 
  Plus, 
  MoreVertical, 
  Mail,
  Settings,
  Shield
} from "lucide-react";

const SignerManagement = () => {
  const [isInviting, setIsInviting] = useState(false);
  const [inviteEmail, setInviteEmail] = useState("");
  const [inviteRole, setInviteRole] = useState("approver");

  // Mock signer data
  const signers = [
    {
      id: "1",
      name: "You",
      email: "you@company.com",
      role: "admin",
      status: "online",
      joinedDate: "2024-01-01",
      lastActive: "Now",
      isCurrentUser: true
    },
    {
      id: "2", 
      name: "Alice Johnson",
      email: "alice@company.com",
      role: "approver",
      status: "online",
      joinedDate: "2024-01-15",
      lastActive: "5 minutes ago",
      isCurrentUser: false
    },
    {
      id: "3",
      name: "Bob Wilson", 
      email: "bob@company.com",
      role: "approver",
      status: "offline",
      joinedDate: "2024-01-10",
      lastActive: "2 hours ago",
      isCurrentUser: false
    },
    {
      id: "4",
      name: "Carol Davis",
      email: "carol@company.com", 
      role: "view-only",
      status: "online",
      joinedDate: "2024-01-20",
      lastActive: "1 hour ago",
      isCurrentUser: false
    }
  ];

  const walletSettings = {
    signatureThreshold: 2,
    totalSigners: 3,
    autoExecute: true,
    requireComments: true,
    transactionExpiry: 7
  };

  const getRoleIcon = (role: string) => {
    switch (role) {
      case "admin": return <Crown className="h-4 w-4 text-yellow-600" />;
      case "approver": return <User className="h-4 w-4 text-blue-600" />;
      case "view-only": return <Eye className="h-4 w-4 text-gray-500" />;
      default: return <User className="h-4 w-4" />;
    }
  };

  const getRoleColor = (role: string) => {
    switch (role) {
      case "admin": return "bg-yellow-50 text-yellow-700 border-yellow-200";
      case "approver": return "bg-blue-50 text-blue-700 border-blue-200";
      case "view-only": return "bg-gray-50 text-gray-700 border-gray-200";
      default: return "bg-gray-50 text-gray-700 border-gray-200";
    }
  };

  const getStatusColor = (status: string) => {
    return status === "online" ? "bg-green-500" : "bg-gray-400";
  };

  const handleInvite = () => {
    console.log(`Inviting ${inviteEmail} as ${inviteRole}`);
    setInviteEmail("");
    setIsInviting(false);
  };

  return (
    <div className="space-y-6">
      {/* Wallet Configuration */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <Settings className="h-5 w-5" />
            Wallet Configuration
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <div className="text-sm text-muted-foreground mb-1">Signature Threshold</div>
              <div className="font-semibold text-lg">
                {walletSettings.signatureThreshold} of {walletSettings.totalSigners}
              </div>
            </div>
            <div>
              <div className="text-sm text-muted-foreground mb-1">Expiry Period</div>
              <div className="font-semibold text-lg">{walletSettings.transactionExpiry} days</div>
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <div className="font-medium">Auto-execute when threshold met</div>
                <div className="text-sm text-muted-foreground">Automatically execute approved transactions</div>
              </div>
              <Switch checked={walletSettings.autoExecute} />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <div className="font-medium">Require comments for declines</div>
                <div className="text-sm text-muted-foreground">Mandatory comments when declining</div>
              </div>
              <Switch checked={walletSettings.requireComments} />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Signers List */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg flex items-center gap-2">
              <Users className="h-5 w-5" />
              Signers ({signers.length})
            </CardTitle>
            <Button 
              size="sm" 
              onClick={() => setIsInviting(true)}
              className="flex items-center gap-2"
            >
              <Plus className="h-4 w-4" />
              Invite
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {isInviting && (
            <Card className="border-dashed">
              <CardContent className="pt-6 space-y-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">Email Address</label>
                  <Input
                    type="email"
                    placeholder="colleague@company.com"
                    value={inviteEmail}
                    onChange={(e) => setInviteEmail(e.target.value)}
                  />
                </div>
                
                <div>
                  <label className="text-sm font-medium mb-2 block">Role</label>
                  <Select value={inviteRole} onValueChange={setInviteRole}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="admin">Admin - Full control</SelectItem>
                      <SelectItem value="approver">Approver - Transaction authority</SelectItem>
                      <SelectItem value="view-only">View Only - Observer access</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex gap-2">
                  <Button 
                    onClick={handleInvite}
                    disabled={!inviteEmail.includes("@")}
                    className="flex-1"
                  >
                    <Mail className="h-4 w-4 mr-2" />
                    Send Invite
                  </Button>
                  <Button 
                    variant="outline"
                    onClick={() => setIsInviting(false)}
                  >
                    Cancel
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {signers.map((signer) => (
            <div key={signer.id} className="flex items-center justify-between p-3 border rounded-lg">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-medium">
                    {signer.name.charAt(0)}
                  </div>
                  <div 
                    className={`absolute -bottom-1 -right-1 w-3 h-3 rounded-full border-2 border-white ${getStatusColor(signer.status)}`}
                  />
                </div>
                
                <div>
                  <div className="font-medium flex items-center gap-2">
                    {signer.name}
                    {signer.isCurrentUser && <Badge variant="secondary" className="text-xs">You</Badge>}
                  </div>
                  <div className="text-sm text-muted-foreground">{signer.email}</div>
                  <div className="text-xs text-muted-foreground">Last active: {signer.lastActive}</div>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Badge className={`${getRoleColor(signer.role)} flex items-center gap-1`}>
                  {getRoleIcon(signer.role)}
                  {signer.role.replace("-", " ")}
                </Badge>
                
                {!signer.isCurrentUser && (
                  <Button variant="ghost" size="icon">
                    <MoreVertical className="h-4 w-4" />
                  </Button>
                )}
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Permission Matrix */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <Shield className="h-5 w-5" />
            Permission Matrix
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="grid grid-cols-4 gap-2 text-xs font-medium text-muted-foreground">
              <div>Permission</div>
              <div className="text-center">Admin</div>
              <div className="text-center">Approver</div>
              <div className="text-center">View Only</div>
            </div>
            
            {[
              { name: "View transactions", admin: true, approver: true, viewOnly: true },
              { name: "Create transactions", admin: true, approver: false, viewOnly: false },
              { name: "Approve transactions", admin: true, approver: true, viewOnly: false },
              { name: "Manage signers", admin: true, approver: false, viewOnly: false },
              { name: "Modify settings", admin: true, approver: false, viewOnly: false }
            ].map((permission, index) => (
              <div key={index} className="grid grid-cols-4 gap-2 text-sm py-2 border-t">
                <div>{permission.name}</div>
                <div className="text-center">
                  {permission.admin ? "✅" : "❌"}
                </div>
                <div className="text-center">
                  {permission.approver ? "✅" : "❌"}
                </div>
                <div className="text-center">
                  {permission.viewOnly ? "✅" : "❌"}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SignerManagement;
