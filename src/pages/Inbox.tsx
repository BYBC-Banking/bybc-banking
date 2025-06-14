
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useHomePage } from "@/context/HomePageContext";

interface Message {
  id: string;
  subject: string;
  sender: string;
  preview: string;
  date: string;
  isRead: boolean;
  category: 'important' | 'promotion' | 'update' | 'general';
  section: 'personal' | 'business' | 'both';
}

export default function Inbox() {
  const { accountSection } = useHomePage();

  // Sample messages data with section-specific content
  const messages: Message[] = [
    // Personal messages
    {
      id: "msg1",
      subject: "Your Account Statement",
      sender: "BYBC Banking",
      preview: "Your monthly account statement for April is now available. Login to view the details.",
      date: "2025-05-10",
      isRead: false,
      category: 'important',
      section: 'personal'
    },
    {
      id: "msg2",
      subject: "New Savings Options Available",
      sender: "BYBC Savings",
      preview: "Discover our new high-yield savings options tailored for you.",
      date: "2025-05-05",
      isRead: true,
      category: 'promotion',
      section: 'personal'
    },
    {
      id: "msg3",
      subject: "Payment Confirmation",
      sender: "BYBC Payments",
      preview: "Your payment of R240.50 to Electric Company was successful.",
      date: "2025-05-03",
      isRead: true,
      category: 'update',
      section: 'personal'
    },
    // Business messages
    {
      id: "msg4",
      subject: "Business Account Statement",
      sender: "BYBC Business Banking",
      preview: "Your business account statement for April is ready for download.",
      date: "2025-05-10",
      isRead: false,
      category: 'important',
      section: 'business'
    },
    {
      id: "msg5",
      subject: "Tax Season Reminder",
      sender: "BYBC Business Services",
      preview: "Important tax filing deadlines and business banking features to help you prepare.",
      date: "2025-05-08",
      isRead: false,
      category: 'important',
      section: 'business'
    },
    {
      id: "msg6",
      subject: "Business Credit Line Offer",
      sender: "BYBC Business Credit",
      preview: "You're pre-approved for a business line of credit. Apply now with special rates.",
      date: "2025-05-06",
      isRead: true,
      category: 'promotion',
      section: 'business'
    },
    {
      id: "msg7",
      subject: "Nonprofit Donation Receipt",
      sender: "BYBC Nonprofit Services",
      preview: "Receipt for recent donation processing through your nonprofit account.",
      date: "2025-05-04",
      isRead: true,
      category: 'update',
      section: 'business'
    },
    // Shared messages
    {
      id: "msg8",
      subject: "Security Alert",
      sender: "BYBC Security Team",
      preview: "We noticed a login from a new device. Was this you?",
      date: "2025-05-08",
      isRead: false,
      category: 'important',
      section: 'both'
    },
    {
      id: "msg9",
      subject: "App Update Available",
      sender: "BYBC Mobile",
      preview: "A new version of the BYBC Banking app is available with exciting features.",
      date: "2025-05-01",
      isRead: true,
      category: 'general',
      section: 'both'
    }
  ];

  // Filter messages based on current section
  const filteredMessages = messages.filter(message => 
    message.section === accountSection || message.section === 'both'
  );

  return (
    <div className="bg-gradient-to-br from-white to-slate-100 min-h-screen">
      <div className="container mx-auto max-w-md px-4 py-6">
        {/* Header */}
        <header className="flex items-center gap-4 mb-6">
          <Link to="/" className="p-2">
            <ArrowLeft className="h-5 w-5" />
          </Link>
          <h1 className="text-2xl font-bold">
            {accountSection === 'business' ? 'Business ' : 'Personal '}Inbox
          </h1>
          <div className="ml-auto">
            <Badge variant="secondary" className="ml-2">
              {filteredMessages.filter(msg => !msg.isRead).length} unread
            </Badge>
          </div>
        </header>

        {/* Messages List */}
        <ScrollArea className="h-[calc(100vh-120px)]">
          <div className="space-y-2">
            {filteredMessages.map((message) => (
              <div 
                key={message.id}
                className={`bg-white rounded-lg shadow-sm p-4 ${!message.isRead ? 'border-l-4 border-finance-blue' : ''}`}
              >
                <div className="flex justify-between items-start mb-1">
                  <h3 className={`font-medium ${!message.isRead ? 'font-semibold' : ''}`}>
                    {message.subject}
                  </h3>
                  <span className="text-xs text-gray-500">
                    {new Date(message.date).toLocaleDateString()}
                  </span>
                </div>
                <p className="text-sm text-gray-500 mb-2">{message.sender}</p>
                <p className="text-sm">{message.preview}</p>
                <div className="mt-2">
                  {message.category === 'important' && (
                    <Badge variant="destructive" className="text-xs">Important</Badge>
                  )}
                  {message.category === 'promotion' && (
                    <Badge variant="secondary" className="text-xs bg-amber-100 text-amber-800">Promotion</Badge>
                  )}
                  {message.category === 'update' && (
                    <Badge variant="outline" className="text-xs">Update</Badge>
                  )}
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      </div>
    </div>
  );
}
