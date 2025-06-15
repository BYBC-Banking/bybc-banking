
import { Link, useNavigate } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Button } from "@/components/ui/button";
import { Book } from "lucide-react";
import { ContentType, DifficultyLevel } from "@/pages/Education";

interface Recommendation {
  id: string;
  title: string;
  type: ContentType;
  difficulty: DifficultyLevel;
  imageUrl: string;
  duration: string;
  description: string;
}

interface RecommendationsCarouselProps {
  recommendations: Recommendation[];
}

const RecommendationsCarousel = ({ recommendations }: RecommendationsCarouselProps) => {
  const navigate = useNavigate();

  // Mapping of recommendation titles to topic IDs on the Topics page
  const getTopicIdFromRecommendation = (title: string): string | null => {
    const titleToTopicMap: Record<string, string> = {
      "Understanding Market Volatility": "stocks",
      "Compound Interest Explained": "business",
      "Test Your Investment Knowledge": "stocks",
      "Retirement Calculator": "mutual-funds",
      "Introduction to ETFs": "stocks"
    };
    
    return titleToTopicMap[title] || null;
  };

  const handleStartLearning = (recommendation: Recommendation) => {
    const topicId = getTopicIdFromRecommendation(recommendation.title);
    if (topicId) {
      // Navigate to Topics page with the specific topic
      navigate(`/topics?topic=${topicId}`);
    } else {
      // Fallback to general Topics page
      navigate('/topics');
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-2">
        <h3 className="text-sm font-medium">Browse by Category</h3>
        <Link to="/topics">
          <Button variant="ghost" size="sm">
            <Book className="h-4 w-4 mr-2" />
            <span>All Topics</span>
          </Button>
        </Link>
      </div>
      
      <div className="overflow-x-auto pb-4">
        <div className="flex gap-3 min-w-max">
          {recommendations.map((item) => (
            <Card key={item.id} className="w-64 flex-shrink-0">
              <AspectRatio ratio={16/9}>
                <img 
                  src={item.imageUrl} 
                  alt={item.title} 
                  className="object-cover w-full h-full rounded-t-md"
                />
              </AspectRatio>
              <CardContent className="p-3">
                <div className="flex gap-2 mb-2">
                  <Badge variant="outline" className="bg-slate-100 text-xs">
                    {item.type}
                  </Badge>
                  <Badge variant="outline" 
                    className={`
                      text-xs
                      ${item.difficulty === "Beginner" ? "border-green-500 text-green-700" : ""}
                      ${item.difficulty === "Intermediate" ? "border-amber-500 text-amber-700" : ""}
                      ${item.difficulty === "Advanced" ? "border-red-500 text-red-700" : ""}
                    `}
                  >
                    {item.difficulty}
                  </Badge>
                </div>
                <h4 className="font-medium text-sm line-clamp-2">{item.title}</h4>
                <p className="text-xs text-muted-foreground line-clamp-2 mt-1">{item.description}</p>
                <div className="flex justify-between items-center mt-2">
                  <span className="text-xs text-muted-foreground">{item.duration}</span>
                  <Button 
                    size="sm" 
                    variant="default" 
                    className="text-xs"
                    onClick={() => handleStartLearning(item)}
                  >
                    Start Learning
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RecommendationsCarousel;
