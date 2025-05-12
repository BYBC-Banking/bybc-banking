
import { useState } from "react";
import { Message } from "@/components/MoyaMessage";
import MoyaChatHeader from "@/components/MoyaChatHeader";
import MoyaChatMessages from "@/components/MoyaChatMessages";
import MoyaChatInput from "@/components/MoyaChatInput";
import { getDemoResponse } from "@/utils/moyaResponses";

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

  // Handle message submission
  const handleSubmit = (inputText: string) => {
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
    
    // Simulate assistant response (in a real app, this would call an API)
    setTimeout(() => {
      const demoResponses = getDemoResponse(inputText);
      setMessages(prev => [...prev, ...demoResponses]);
    }, 1000);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm flex justify-center items-center">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-md h-[80vh] flex flex-col overflow-hidden">
        {/* Header */}
        <MoyaChatHeader onClose={onClose} />
        
        {/* Chat messages */}
        <MoyaChatMessages messages={messages} />
        
        {/* Input area */}
        <MoyaChatInput onSubmit={handleSubmit} />
      </div>
    </div>
  );
};

export default MoyaChat;
