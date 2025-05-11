
import { Card, CardContent } from "@/components/ui/card";
import { 
  Carousel, 
  CarouselContent, 
  CarouselItem, 
  CarouselNext, 
  CarouselPrevious 
} from "@/components/ui/carousel";
import { useToast } from "@/hooks/use-toast";
import { BookOpen } from "lucide-react";
import { ContentType, DifficultyLevel } from "@/pages/Education";

interface Recommendation {
  id: string;
  title: string;
  type: ContentType;
  difficulty: DifficultyLevel;
  imageUrl: string;
  duration: string;
}

interface RecommendationsCarouselProps {
  recommendations: Recommendation[];
}

const RecommendationsCarousel = ({ recommendations }: RecommendationsCarouselProps) => {
  const { toast } = useToast();
  
  const handleItemClick = (recommendation: Recommendation) => {
    toast({
      title: recommendation.title,
      description: `Opening ${recommendation.type.toLowerCase()} content`,
    });
  };
  
  if (recommendations.length === 0) {
    return (
      <div className="p-6 text-center border rounded-xl bg-white">
        <p className="text-gray-500">No recommendations match your filters</p>
        <p className="text-sm text-gray-400">Try adjusting your selections</p>
      </div>
    );
  }
  
  return (
    <Carousel className="w-full mb-8">
      <CarouselContent>
        {recommendations.map((item) => (
          <CarouselItem key={item.id} className="basis-[85%] md:basis-1/2 lg:basis-1/3">
            <Card 
              className="overflow-hidden border hover:shadow-md transition-shadow cursor-pointer"
              onClick={() => handleItemClick(item)}
            >
              <div className="relative h-36">
                <img 
                  src={item.imageUrl} 
                  alt={item.title} 
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-2 right-2">
                  <span className={`inline-block text-xs font-semibold px-2 py-1 rounded-full ${
                    item.type === 'Articles' ? 'bg-blue-100 text-blue-700' : 
                    item.type === 'Videos' ? 'bg-red-100 text-red-700' :
                    item.type === 'Quizzes' ? 'bg-purple-100 text-purple-700' :
                    'bg-green-100 text-green-700'
                  }`}>
                    {item.type}
                  </span>
                </div>
                <div className="absolute bottom-2 left-2">
                  <span className={`inline-block text-xs font-semibold px-2 py-1 rounded-full ${
                    item.difficulty === 'Beginner' ? 'bg-green-100 text-green-700' : 
                    item.difficulty === 'Intermediate' ? 'bg-yellow-100 text-yellow-700' :
                    'bg-red-100 text-red-700'
                  }`}>
                    {item.difficulty}
                  </span>
                </div>
              </div>
              <CardContent className="p-4">
                <h3 className="font-semibold line-clamp-2 mb-1">{item.title}</h3>
                <div className="flex items-center justify-between">
                  <div className="flex items-center text-xs text-gray-500">
                    <BookOpen className="h-3 w-3 mr-1" />
                    {item.duration}
                  </div>
                </div>
              </CardContent>
            </Card>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className="left-0" />
      <CarouselNext className="right-0" />
    </Carousel>
  );
};

export default RecommendationsCarousel;
