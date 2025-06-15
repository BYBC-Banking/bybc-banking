
import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Topic } from "@/data/topicsData";

interface TopicCardProps {
  topic: Topic;
  onClick: (topic: Topic) => void;
}

const TopicCard = ({ topic, onClick }: TopicCardProps) => {
  return (
    <Card 
      className="transition-all hover:shadow-md cursor-pointer"
      onClick={() => onClick(topic)}
    >
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg">{topic.title}</CardTitle>
          <span className="text-2xl">{topic.icon}</span>
        </div>
        <CardDescription>{topic.description}</CardDescription>
      </CardHeader>
      <CardContent>
        <h3 className="text-sm font-medium mb-2">Available Levels:</h3>
        <div className="flex flex-wrap gap-2">
          {topic.levels.map((level) => (
            <Badge 
              key={level} 
              variant="outline" 
              className={`
                ${level === "All" ? "border-gray-400 text-gray-600" : ""}
                ${level === "Beginner" ? "border-green-500 text-green-700" : ""}
                ${level === "Intermediate" ? "border-amber-500 text-amber-700" : ""}
                ${level === "Advanced" ? "border-red-500 text-red-700" : ""}
              `}
            >
              {level}
            </Badge>
          ))}
        </div>
      </CardContent>
      <CardFooter>
        <div className="text-sm text-finance-blue hover:underline">
          Explore curriculum →
        </div>
      </CardFooter>
    </Card>
  );
};

export default TopicCard;
