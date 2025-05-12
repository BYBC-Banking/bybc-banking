
import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { Card } from "@/components/ui/card";
import MoyaAvatar from "@/components/MoyaAvatar";
import { cn } from "@/lib/utils";
import ExpandableDefinition from "@/components/ExpandableDefinition";
import FinancialChartView from "@/components/FinancialChartView";
import ComparisonView from "@/components/ComparisonView";

export type MessageType = "assistant" | "user";
export type MessageContentType = "text" | "definition" | "chart" | "comparison";

export interface MessageContent {
  type: MessageContentType;
  text: string;
  data?: any;
}

export interface Message {
  id: string;
  type: MessageType;
  content: MessageContent | MessageContent[];
  timestamp: Date;
}

interface MoyaMessageProps {
  message: Message;
}

const MoyaMessage = ({ message }: MoyaMessageProps) => {
  const isAssistant = message.type === "assistant";
  const contents = Array.isArray(message.content) ? message.content : [message.content];

  return (
    <div className={cn("flex w-full mb-4", 
      isAssistant ? "justify-start" : "justify-end")}>
      
      {isAssistant && <MoyaAvatar className="mr-2 mt-1" />}
      
      <div className={cn("max-w-[80%]", 
        isAssistant ? "mr-12" : "ml-12")}>
        
        {contents.map((content, index) => (
          <div key={index} className="mb-1">
            {content.type === "text" && (
              <Card className={cn("p-3 shadow-sm",
                isAssistant 
                  ? "bg-[#7E69AB] text-white" 
                  : "bg-primary text-primary-foreground"
              )}>
                <p>{content.text}</p>
              </Card>
            )}
            
            {content.type === "definition" && (
              <ExpandableDefinition 
                term={content.text} 
                definition={content.data?.definition || ""} 
              />
            )}
            
            {content.type === "chart" && (
              <FinancialChartView 
                title={content.text} 
                chartData={content.data} 
              />
            )}
            
            {content.type === "comparison" && (
              <ComparisonView 
                title={content.text} 
                comparisonData={content.data} 
              />
            )}
          </div>
        ))}
        
        <div className={cn("text-xs text-muted-foreground mt-1",
          isAssistant ? "text-left" : "text-right")}>
          {new Date(message.timestamp).toLocaleTimeString([], { 
            hour: '2-digit', 
            minute: '2-digit' 
          })}
        </div>
      </div>
      
      {!isAssistant && <MoyaAvatar className="ml-2 mt-1" />}
    </div>
  );
};

export default MoyaMessage;
