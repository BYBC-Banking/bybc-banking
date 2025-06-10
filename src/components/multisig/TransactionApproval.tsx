
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import { 
  Clock, 
  CheckCircle, 
  XCircle, 
  AlertTriangle, 
  MessageSquare, 
  Paperclip,
  User,
  Bitcoin,
  Banknote
} from "lucide-react";

const TransactionApproval = () => {
  const [selectedTransaction, setSelectedTransaction] = useState<string | null>(null);
  const [comment, setComment] = useState("");

  // Mock transaction data
  const transactions = [
    {
      id: "tx1",
      type: "btc",
      amount: "0.005",
      amountZAR: "R6,250",
      recipient: "1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa",
      recipientName: "External Wallet",
      notes: "Payment for consulting services",
      urgency: "high",
      timeLeft: "8 hours",
      signers: [
        { name: "You", status: "pending", timestamp: null },
        { name: "Alice", status: "approved", timestamp: "2024-01-15 10:30" },
        { name: "Bob", status: "pending", timestamp: null }
      ],
      attachments: ["invoice_001.pdf"],
      comments: [
        { author: "Alice", message: "Approved - invoice verified", timestamp: "2024-01-15 10:30" }
      ]
    },
    {
      id: "tx2",
      type: "zar", 
      amount: "15000",
      amountZAR: "R15,000",
      recipient: "john.smith@company.com",
      recipientName: "John Smith",
      notes: "Salary payment",
      urgency: "normal",
      timeLeft: "2 days",
      signers: [
        { name: "You", status: "pending", timestamp: null },
        { name: "Alice", status: "pending", timestamp: null },
        { name: "Bob", status: "pending", timestamp: null }
      ],
      attachments: [],
      comments: []
    }
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
      case "approved": return <CheckCircle className="h-4 w-4 text-green-600" />;
      case "declined": return <XCircle className="h-4 w-4 text-red-600" />;
      default: return <Clock className="h-4 w-4 text-orange-500" />;
    }
  };

  const handleApprove = (txId: string) => {
    console.log(`Approving transaction ${txId}`);
    // Implement biometric confirmation and approval logic
  };

  const handleDecline = (txId: string) => {
    console.log(`Declining transaction ${txId} with comment: ${comment}`);
    // Implement decline logic with mandatory comment
  };

  if (selectedTransaction) {
    const tx = transactions.find(t => t.id === selectedTransaction);
    if (!tx) return null;

    return (
      <div className="space-y-4">
        <div className="flex items-center gap-2 mb-4">
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => setSelectedTransaction(null)}
          >
            ← Back
          </Button>
          <h2 className="font-semibold">Transaction Details</h2>
        </div>

        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg flex items-center gap-2">
                {tx.type === "btc" ? <Bitcoin className="h-5 w-5 text-orange-500" /> : <Banknote className="h-5 w-5 text-green-600" />}
                {tx.amount} {tx.type.toUpperCase()}
              </CardTitle>
              <Badge className={getUrgencyColor(tx.urgency)}>
                {tx.urgency === "high" && <AlertTriangle className="h-3 w-3 mr-1" />}
                {tx.urgency === "high" ? "Urgent" : "Normal"}
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <div className="text-sm text-muted-foreground">Amount (ZAR)</div>
              <div className="font-semibold text-lg">{tx.amountZAR}</div>
            </div>

            <div>
              <div className="text-sm text-muted-foreground">Recipient</div>
              <div className="font-medium">{tx.recipientName}</div>
              <div className="text-xs text-muted-foreground font-mono">{tx.recipient}</div>
            </div>

            {tx.notes && (
              <div>
                <div className="text-sm text-muted-foreground">Notes</div>
                <div className="text-sm">{tx.notes}</div>
              </div>
            )}

            {tx.attachments.length > 0 && (
              <div>
                <div className="text-sm text-muted-foreground mb-2">Attachments</div>
                {tx.attachments.map((attachment, index) => (
                  <div key={index} className="flex items-center gap-2 text-sm text-blue-600">
                    <Paperclip className="h-4 w-4" />
                    {attachment}
                  </div>
                ))}
              </div>
            )}

            <div>
              <div className="text-sm text-muted-foreground mb-2">Time Remaining</div>
              <div className="font-medium text-orange-600">{tx.timeLeft}</div>
            </div>
          </CardContent>
        </Card>

        {/* Signer Status */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Approval Status</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {tx.signers.map((signer, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <User className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <div className="font-medium">{signer.name}</div>
                    {signer.timestamp && (
                      <div className="text-xs text-muted-foreground">{signer.timestamp}</div>
                    )}
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {getStatusIcon(signer.status)}
                  <span className="text-sm capitalize">{signer.status}</span>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Comments */}
        {tx.comments.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <MessageSquare className="h-5 w-5" />
                Comments
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {tx.comments.map((comment, index) => (
                <div key={index} className="border-l-2 border-blue-200 pl-3">
                  <div className="font-medium text-sm">{comment.author}</div>
                  <div className="text-sm">{comment.message}</div>
                  <div className="text-xs text-muted-foreground">{comment.timestamp}</div>
                </div>
              ))}
            </CardContent>
          </Card>
        )}

        {/* Add Comment */}
        <Card>
          <CardContent className="pt-6">
            <Textarea
              placeholder="Add a comment (required for decline)..."
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              className="mb-4"
            />
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="grid grid-cols-2 gap-4">
          <Button 
            variant="outline" 
            className="text-red-600 border-red-200 hover:bg-red-50"
            onClick={() => handleDecline(tx.id)}
            disabled={!comment.trim()}
          >
            <XCircle className="h-4 w-4 mr-2" />
            Decline
          </Button>
          <Button 
            className="bg-green-600 hover:bg-green-700"
            onClick={() => handleApprove(tx.id)}
          >
            <CheckCircle className="h-4 w-4 mr-2" />
            Approve
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold">Pending Approvals</h2>
        <Badge variant="secondary">{transactions.length}</Badge>
      </div>

      {transactions.map((tx) => (
        <Card key={tx.id} className="cursor-pointer hover:shadow-md transition-shadow">
          <CardContent className="pt-6" onClick={() => setSelectedTransaction(tx.id)}>
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                {tx.type === "btc" ? (
                  <Bitcoin className="h-5 w-5 text-orange-500" />
                ) : (
                  <Banknote className="h-5 w-5 text-green-600" />
                )}
                <span className="font-semibold">{tx.amount} {tx.type.toUpperCase()}</span>
              </div>
              <Badge className={getUrgencyColor(tx.urgency)}>
                {tx.urgency === "high" && <AlertTriangle className="h-3 w-3 mr-1" />}
                {tx.urgency === "high" ? "Urgent" : "Normal"}
              </Badge>
            </div>

            <div className="text-sm text-muted-foreground mb-2">
              To: {tx.recipientName}
            </div>

            <div className="flex items-center justify-between text-xs">
              <div className="flex items-center gap-2">
                <span>{tx.signers.filter(s => s.status === "approved").length}/{tx.signers.length} approved</span>
                <div className="flex gap-1">
                  {tx.signers.map((signer, i) => (
                    <div
                      key={i}
                      className={`w-2 h-2 rounded-full ${
                        signer.status === "approved"
                          ? "bg-green-500"
                          : signer.status === "declined"
                          ? "bg-red-500"
                          : "bg-orange-300"
                      }`}
                    />
                  ))}
                </div>
              </div>
              <span className="text-muted-foreground">{tx.timeLeft} left</span>
            </div>
          </CardContent>
        </Card>
      ))}

      {transactions.length === 0 && (
        <Card>
          <CardContent className="text-center py-8">
            <CheckCircle className="h-12 w-12 text-green-500 mx-auto mb-4" />
            <div className="text-lg font-medium mb-2">All caught up!</div>
            <div className="text-muted-foreground">No pending approvals at the moment.</div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default TransactionApproval;
