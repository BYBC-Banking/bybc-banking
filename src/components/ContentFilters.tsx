
import { ScrollArea } from "@/components/ui/scroll-area";
import { ContentType, DifficultyLevel } from "@/pages/Education";

interface ContentFiltersProps {
  selectedContentType: ContentType | null;
  selectedDifficulty: DifficultyLevel | null;
  onContentTypeChange: (type: ContentType | null) => void;
  onDifficultyChange: (difficulty: DifficultyLevel | null) => void;
}

const ContentFilters = ({ 
  selectedContentType, 
  selectedDifficulty,
  onContentTypeChange,
  onDifficultyChange 
}: ContentFiltersProps) => {
  const contentTypes: ContentType[] = ["Articles", "Videos", "Quizzes", "Tools"];
  const difficultyLevels: DifficultyLevel[] = ["Beginner", "Intermediate", "Advanced"];
  
  const handleContentTypeClick = (type: ContentType) => {
    if (selectedContentType === type) {
      onContentTypeChange(null);
    } else {
      onContentTypeChange(type);
    }
  };
  
  const handleDifficultyClick = (difficulty: DifficultyLevel) => {
    if (selectedDifficulty === difficulty) {
      onDifficultyChange(null);
    } else {
      onDifficultyChange(difficulty);
    }
  };
  
  return (
    <div className="mb-6 animate-fade-in" style={{animationDelay: "150ms"}}>
      <h2 className="text-lg font-semibold mb-3">Explore Content</h2>
      
      <div className="space-y-3">
        <div>
          <label className="text-sm font-medium text-gray-700 mb-1.5 block">
            Content Type
          </label>
          <ScrollArea className="w-full">
            <div className="flex gap-2">
              {contentTypes.map((type) => (
                <button
                  key={type}
                  onClick={() => handleContentTypeClick(type)}
                  className={`whitespace-nowrap px-4 py-2 rounded-full text-sm font-medium ${
                    selectedContentType === type
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                  }`}
                >
                  {type}
                </button>
              ))}
            </div>
          </ScrollArea>
        </div>
        
        <div>
          <label className="text-sm font-medium text-gray-700 mb-1.5 block">
            Difficulty Level
          </label>
          <ScrollArea className="w-full">
            <div className="flex gap-2">
              {difficultyLevels.map((level) => (
                <button
                  key={level}
                  onClick={() => handleDifficultyClick(level)}
                  className={`whitespace-nowrap px-4 py-2 rounded-full text-sm font-medium ${
                    selectedDifficulty === level
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                  }`}
                >
                  {level}
                </button>
              ))}
            </div>
          </ScrollArea>
        </div>
      </div>
    </div>
  );
};

export default ContentFilters;
