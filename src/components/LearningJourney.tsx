
import { ScrollArea } from "@/components/ui/scroll-area";

interface JourneyItem {
  id: string;
  title: string;
  completed: boolean;
  current: boolean;
}

interface LearningJourneyProps {
  journeyData: JourneyItem[];
  completed: number;
  total: number;
}

const LearningJourney = ({ journeyData, completed, total }: LearningJourneyProps) => {
  return (
    <div className="mb-6 animate-fade-in" style={{animationDelay: "50ms"}}>
      <div className="flex justify-between items-center mb-3">
        <h2 className="text-lg font-semibold">Your Learning Journey</h2>
        <span className="text-sm font-medium text-gray-600">
          {completed}/{total} completed
        </span>
      </div>
      
      <ScrollArea className="w-full py-3">
        <div className="flex space-x-2 min-w-max">
          {journeyData.map((item, index) => (
            <div 
              key={item.id} 
              className={`relative min-w-[100px] flex flex-col items-center ${index === journeyData.length - 1 ? '' : 'after:content-[""] after:absolute after:w-full after:h-0.5 after:top-[15px] after:left-1/2 after:bg-gray-200'}`}
            >
              <div className={`relative z-10 h-8 w-8 rounded-full flex items-center justify-center border-2 ${
                item.completed 
                  ? 'bg-green-500 border-green-500 text-white' 
                  : item.current 
                    ? 'bg-white border-primary text-primary animate-pulse-light' 
                    : 'bg-white border-gray-200 text-gray-400'
              }`}>
                {item.completed ? (
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                ) : (
                  <span className="text-xs">{index + 1}</span>
                )}
              </div>
              
              <div className="mt-2 text-center">
                <p className={`text-xs font-medium ${
                  item.completed 
                    ? 'text-green-500' 
                    : item.current 
                      ? 'text-primary' 
                      : 'text-gray-400'
                }`}>
                  {item.title}
                </p>
                
                {item.current && (
                  <span className="mt-1 inline-block bg-primary text-primary-foreground text-[10px] px-2 py-0.5 rounded-full">
                    You are here
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
};

export default LearningJourney;
