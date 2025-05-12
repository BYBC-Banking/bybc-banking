
import { useEffect, useRef } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import MoyaMessage, { Message } from "@/components/MoyaMessage";

interface MoyaChatMessagesProps {
  messages: Message[];
}

const MoyaChatMessages = ({ messages }: MoyaChatMessagesProps) => {
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

  return (
    <ScrollArea ref={scrollAreaRef} className="flex-1 p-4">
      <div className="flex flex-col">
        {messages.map((message) => (
          <MoyaMessage key={message.id} message={message} />
        ))}
      </div>
    </ScrollArea>
  );
};

export default MoyaChatMessages;
