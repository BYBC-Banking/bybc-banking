
import { useState, useRef, useEffect } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Send, Mic, MicOff } from "lucide-react";
import MoyaMessage, { Message, MessageType, MessageContent } from "@/components/MoyaMessage";
import MoyaAvatar from "@/components/MoyaAvatar";
import { cn } from "@/lib/utils";

interface MoyaChatProps {
  isOpen: boolean;
  onClose: () => void;
}

const MoyaChat = ({ isOpen, onClose }: MoyaChatProps) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      type: "assistant",
      content: {
        type: "text",
        text: "Hi! I'm Moya, your personal financial assistant. How can I help you today?"
      },
      timestamp: new Date()
    }
  ]);
  const [inputText, setInputText] = useState("");
  const [isRecording, setIsRecording] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  
  // Scroll to bottom when messages change
  useEffect(() => {
    if (scrollAreaRef.current) {
      const scrollContainer = scrollAreaRef.current.querySelector('[data-radix-scroll-area-viewport]');
      if (scrollContainer) {
        scrollContainer.scrollTop = scrollContainer.scrollHeight;
      }
    }
  }, [messages]);

  // Handle message submission
  const handleSubmit = () => {
    if (!inputText.trim()) return;

    // Add user message
    const newMessage: Message = {
      id: Date.now().toString(),
      type: "user",
      content: {
        type: "text",
        text: inputText
      },
      timestamp: new Date()
    };
    
    setMessages([...messages, newMessage]);
    setInputText("");
    
    // Simulate assistant response (in a real app, this would call an API)
    setTimeout(() => {
      const demoResponses = getDemoResponse(inputText);
      setMessages(prev => [...prev, ...demoResponses]);
    }, 1000);
  };

  // Get demo response based on user input
  const getDemoResponse = (text: string): Message[] => {
    const lowerText = text.toLowerCase();
    
    if (lowerText.includes("invest") || lowerText.includes("stock")) {
      // Example of multiple message types including a chart
      return [
        {
          id: Date.now().toString() + "-1",
          type: "assistant",
          content: {
            type: "text",
            text: "Based on your risk profile, I recommend considering these investment options:"
          },
          timestamp: new Date()
        },
        {
          id: Date.now().toString() + "-2",
          type: "assistant",
          content: {
            type: "chart",
            text: "Expected Returns (5 Year Projection)",
            data: [
              { name: 'Year 1', value: 105, comparison: 103 },
              { name: 'Year 2', value: 110, comparison: 106 },
              { name: 'Year 3', value: 118, comparison: 110 },
              { name: 'Year 4', value: 125, comparison: 113 },
              { name: 'Year 5', value: 132, comparison: 117 }
            ]
          },
          timestamp: new Date()
        }
      ];
    } else if (lowerText.includes("compare") || lowerText.includes("vs")) {
      // Example of comparison view
      return [{
        id: Date.now().toString(),
        type: "assistant",
        content: {
          type: "comparison",
          text: "Comparison: Savings Account vs Unit Trust Investment",
          data: {
            option1Name: "Savings",
            option2Name: "Unit Trust",
            items: [
              { label: "Annual Return", value1: "3.5%", value2: "8-12%", highlight: "second" },
              { label: "Risk Level", value1: "Very Low", value2: "Medium", highlight: null },
              { label: "Access to Funds", value1: "Immediate", value2: "1-3 Days", highlight: "first" },
              { label: "Minimum Investment", value1: "R0", value2: "R500", highlight: null }
            ]
          }
        },
        timestamp: new Date()
      }];
    } else if (lowerText.includes("term") || lowerText.includes("mean") || lowerText.includes("what is")) {
      // Example of definition
      return [{
        id: Date.now().toString(),
        type: "assistant",
        content: {
          type: "definition",
          text: "Compound Interest",
          data: {
            definition: "Compound interest is the interest calculated on the initial principal and also on the accumulated interest from previous periods. It's essentially 'interest on interest' and makes your money grow faster than simple interest."
          }
        },
        timestamp: new Date()
      }];
    } else {
      // Default text response
      return [{
        id: Date.now().toString(),
        type: "assistant",
        content: {
          type: "text",
          text: "I'm here to help with your financial questions. You can ask me about investments, savings, budgeting, financial terms, or comparing financial products!"
        },
        timestamp: new Date()
      }];
    }
  };

  // Handle voice recording
  const toggleRecording = () => {
    if (isRecording) {
      // Stop recording
      setIsRecording(false);
      // In a real implementation, this would process the recorded audio
      setTimeout(() => {
        setInputText("How do I start investing?");
        setIsListening(false);
      }, 1000);
    } else {
      // Start recording
      setIsRecording(true);
      setIsListening(true);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm flex justify-center items-center">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-md h-[80vh] flex flex-col overflow-hidden">
        {/* Header */}
        <div className="bg-[#1A1F2C] text-white px-4 py-3 flex items-center justify-between">
          <div className="flex items-center">
            <MoyaAvatar size="sm" />
            <div className="ml-2">
              <h3 className="font-semibold">Moya</h3>
              <p className="text-xs text-white/70">Your Financial Assistant</p>
            </div>
          </div>
          <Button variant="ghost" size="sm" onClick={onClose} className="text-white hover:bg-white/20">
            Close
          </Button>
        </div>
        
        {/* Chat messages */}
        <ScrollArea ref={scrollAreaRef} className="flex-1 p-4">
          <div className="flex flex-col">
            {messages.map((message) => (
              <MoyaMessage key={message.id} message={message} />
            ))}
          </div>
        </ScrollArea>
        
        {/* Input area */}
        <div className="border-t p-4">
          <div className="flex gap-2">
            <Textarea
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Ask Moya a question..."
              className="min-h-[60px] flex-1"
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  handleSubmit();
                }
              }}
            />
            <div className="flex flex-col gap-2">
              <Button 
                size="icon" 
                variant="outline" 
                className={cn("rounded-full", isRecording && "bg-red-500 text-white border-red-500")}
                onClick={toggleRecording}
              >
                {isRecording ? <MicOff className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
              </Button>
              <Button size="icon" onClick={handleSubmit}>
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </div>
          
          {/* Voice feedback */}
          {isListening && (
            <div className="mt-2 flex items-center gap-2 text-sm text-muted-foreground">
              <div className="flex gap-1">
                <span className="inline-block w-1 h-4 bg-primary animate-pulse" style={{ animationDelay: "0ms" }}></span>
                <span className="inline-block w-1 h-4 bg-primary animate-pulse" style={{ animationDelay: "100ms" }}></span>
                <span className="inline-block w-1 h-4 bg-primary animate-pulse" style={{ animationDelay: "200ms" }}></span>
                <span className="inline-block w-1 h-4 bg-primary animate-pulse" style={{ animationDelay: "300ms" }}></span>
              </div>
              <span>Listening...</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MoyaChat;
