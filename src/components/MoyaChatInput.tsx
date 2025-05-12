
import { useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Send, Mic, MicOff } from "lucide-react";
import { cn } from "@/lib/utils";

interface MoyaChatInputProps {
  onSubmit: (text: string) => void;
}

const MoyaChatInput = ({ onSubmit }: MoyaChatInputProps) => {
  const [inputText, setInputText] = useState("");
  const [isRecording, setIsRecording] = useState(false);
  const [isListening, setIsListening] = useState(false);
  
  // Handle message submission
  const handleSubmit = () => {
    if (!inputText.trim()) return;
    onSubmit(inputText);
    setInputText("");
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

  return (
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
  );
};

export default MoyaChatInput;
