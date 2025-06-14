
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { CheckCircle, ChevronDown, ChevronUp, BookOpen, Play, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Lesson {
  id: string;
  title: string;
  type: 'video' | 'reading' | 'quiz';
  duration: string;
  completed: boolean;
  videoUrl?: string;
}

interface Module {
  id: string;
  title: string;
  description: string;
  progress: number;
  lessons: Lesson[];
}

interface TopicCurriculumProps {
  topic: {
    id: string;
    title: string;
    description: string;
    levels: string[];
    modules: Module[];
  };
  onBack: () => void;
  onLessonClick: (lesson: Lesson) => void;
}

const TopicCurriculum = ({ topic, onBack, onLessonClick }: TopicCurriculumProps) => {
  const [openModules, setOpenModules] = React.useState<Record<string, boolean>>({});

  const toggleModule = (moduleId: string) => {
    setOpenModules(prev => ({
      ...prev,
      [moduleId]: !prev[moduleId]
    }));
  };

  const getLessonIcon = (type: string) => {
    switch (type) {
      case 'video':
        return <Play className="h-4 w-4 text-finance-blue" />;
      case 'reading':
        return <FileText className="h-4 w-4 text-amber-500" />;
      case 'quiz':
        return <BookOpen className="h-4 w-4 text-green-500" />;
      default:
        return <FileText className="h-4 w-4" />;
    }
  };

  const handleLessonClick = (lesson: Lesson) => {
    onLessonClick(lesson);
  };

  return (
    <div className="space-y-4">
      <div className="mb-6">
        <h2 className="text-xl font-bold mb-2">{topic.title} Curriculum</h2>
        <p className="text-muted-foreground text-sm">{topic.description}</p>
        
        <div className="flex flex-wrap gap-2 mt-3">
          {topic.levels.map(level => (
            <Badge 
              key={level} 
              variant="outline" 
              className={`
                ${level === "Beginner" ? "border-green-500 text-green-700" : ""}
                ${level === "Intermediate" ? "border-amber-500 text-amber-700" : ""}
                ${level === "Advanced" ? "border-red-500 text-red-700" : ""}
              `}
            >
              {level}
            </Badge>
          ))}
        </div>
      </div>

      <div className="space-y-3">
        {topic.modules.map(module => (
          <Card key={module.id} className="overflow-hidden">
            <Collapsible 
              open={openModules[module.id]} 
              onOpenChange={() => toggleModule(module.id)}
              className="border-0"
            >
              <CardHeader className="pb-2">
                <CollapsibleTrigger className="flex items-center justify-between w-full text-left">
                  <div>
                    <CardTitle className="text-md">{module.title}</CardTitle>
                    <p className="text-xs text-muted-foreground">{module.description}</p>
                  </div>
                  {openModules[module.id] ? 
                    <ChevronUp className="h-5 w-5" /> : 
                    <ChevronDown className="h-5 w-5" />}
                </CollapsibleTrigger>
                <div className="pt-2">
                  <Progress value={module.progress} className="h-1.5" />
                  <p className="text-xs text-right mt-1 text-muted-foreground">{module.progress}% complete</p>
                </div>
              </CardHeader>
              <CollapsibleContent>
                <CardContent className="pt-0">
                  <div className="space-y-2">
                    {module.lessons.map(lesson => (
                      <div 
                        key={lesson.id}
                        className="flex items-center justify-between p-3 border rounded-md bg-slate-50"
                      >
                        <div className="flex items-center gap-3">
                          <div className="rounded-full bg-slate-100 p-2">
                            {getLessonIcon(lesson.type)}
                          </div>
                          <div>
                            <p className="text-sm font-medium">{lesson.title}</p>
                            <div className="flex items-center gap-2">
                              <span className="text-xs text-muted-foreground">
                                {lesson.duration}
                              </span>
                              <Badge variant="outline" className="text-xs">
                                {lesson.type.charAt(0).toUpperCase() + lesson.type.slice(1)}
                              </Badge>
                            </div>
                          </div>
                        </div>
                        {lesson.completed ? 
                          <CheckCircle className="h-5 w-5 text-green-500" /> :
                          <Button size="sm" onClick={() => handleLessonClick(lesson)}>
                            Start
                          </Button>
                        }
                      </div>
                    ))}
                  </div>
                </CardContent>
              </CollapsibleContent>
            </Collapsible>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default TopicCurriculum;
