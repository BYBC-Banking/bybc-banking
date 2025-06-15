
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BookOpen } from "lucide-react";
import { Lesson } from "@/data/topicsData";

interface ReadingComponentProps {
  lesson: Lesson;
}

const ReadingComponent = ({ lesson }: ReadingComponentProps) => {
  return (
    <div className="space-y-4">
      <div className="mb-6">
        <div className="flex items-center gap-3 mb-2">
          <BookOpen className="h-6 w-6 text-amber-500" />
          <h2 className="text-xl font-bold">{lesson.title}</h2>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="border-amber-500 text-amber-700">
            Reading
          </Badge>
          <span className="text-sm text-muted-foreground">{lesson.duration}</span>
        </div>
      </div>

      <Card>
        <CardContent className="pt-6">
          <div className="prose prose-slate max-w-none">
            {lesson.content ? (
              <div className="whitespace-pre-line leading-relaxed">
                {lesson.content}
              </div>
            ) : (
              <div className="text-center py-8">
                <p className="text-muted-foreground">Reading content is being prepared...</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ReadingComponent;
