
import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface ExpandableDefinitionProps {
  term: string;
  definition: string;
}

const ExpandableDefinition = ({ term, definition }: ExpandableDefinitionProps) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <Card className="bg-[#7E69AB] text-white shadow-sm overflow-hidden">
      <div 
        className="p-3 cursor-pointer flex justify-between items-center"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="font-medium">{term}</div>
        {isExpanded ? (
          <ChevronUp className="h-4 w-4" />
        ) : (
          <ChevronDown className="h-4 w-4" />
        )}
      </div>
      
      <div
        className={cn(
          "grid transition-all",
          isExpanded ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
        )}
      >
        <CardContent className="overflow-hidden p-3 pt-0 text-sm border-t border-white/20">
          {definition}
        </CardContent>
      </div>
    </Card>
  );
};

export default ExpandableDefinition;
