
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { ContentType, DifficultyLevel } from "@/pages/Education";
import { useToast } from "@/hooks/use-toast";

interface ContinueLearningProps {
  module: {
    id: string;
    title: string;
    progress: number;
    type: ContentType;
    difficulty: DifficultyLevel;
  };
}

const ContinueLearning = ({ module }: ContinueLearningProps) => {
  const { toast } = useToast();
  
  const handleContinue = () => {
    toast({
      title: "Continuing learning",
      description: `Resuming ${module.title}`,
    });
  };
  
  return (
    <div className="mb-6 animate-fade-in" style={{animationDelay: "100ms"}}>
      <div className="bg-white rounded-xl shadow-sm border p-4">
        <h2 className="text-lg font-semibold mb-1">Continue Learning</h2>
        <h3 className="text-xl font-bold text-primary mb-2">{module.title}</h3>
        
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center">
            <span className="text-xs font-medium text-gray-500 bg-gray-100 px-2 py-1 rounded mr-2">
              {module.type}
            </span>
            <span className="text-xs font-medium text-gray-500 bg-gray-100 px-2 py-1 rounded">
              {module.difficulty}
            </span>
          </div>
          <span className="text-sm font-medium text-primary">{module.progress}% Complete</span>
        </div>
        
        <Progress value={module.progress} className="h-2 mb-4" />
        
        <Button onClick={handleContinue} className="w-full">
          Continue Learning
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export default ContinueLearning;
