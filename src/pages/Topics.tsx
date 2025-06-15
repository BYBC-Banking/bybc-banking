import React, { useState, useEffect } from 'react';
import { ArrowLeft } from "lucide-react";
import { useSearchParams } from "react-router-dom";
import TopicCurriculum from "@/components/TopicCurriculum";
import TopicCard from "@/components/TopicCard";
import VideoPlayer from "@/components/VideoPlayer";
import QuizComponent from "@/components/QuizComponent";
import ReadingComponent from "@/components/ReadingComponent";
import { topics, Topic, Lesson } from "@/data/topicsData";

const Topics = () => {
  const [selectedTopic, setSelectedTopic] = useState<Topic | null>(null);
  const [selectedLesson, setSelectedLesson] = useState<Lesson | null>(null);
  const [searchParams] = useSearchParams();

  useEffect(() => {
    window.scrollTo(0, 0);
    
    // Check if there's a topic parameter in the URL
    const topicParam = searchParams.get('topic');
    if (topicParam && !selectedTopic) {
      const topic = topics.find(t => t.id === topicParam);
      if (topic) {
        setSelectedTopic(topic);
      }
    }
  }, [searchParams, selectedTopic]);

  const handleTopicClick = (topic: Topic) => {
    setSelectedTopic(topic);
    setSelectedLesson(null);
    window.scrollTo(0, 0);
  };

  const handleBack = () => {
    if (selectedLesson) {
      setSelectedLesson(null);
    } else {
      setSelectedTopic(null);
    }
    window.scrollTo(0, 0);
  };

  const handleLessonClick = (lesson: Lesson) => {
    setSelectedLesson(lesson);
    window.scrollTo(0, 0);
  };

  const renderLessonContent = () => {
    if (!selectedLesson) return null;

    switch (selectedLesson.type) {
      case 'video':
        return <VideoPlayer lesson={selectedLesson} />;
      case 'reading':
        return <ReadingComponent lesson={selectedLesson} />;
      case 'quiz':
        return <QuizComponent lesson={selectedLesson} />;
      default:
        return <div>Lesson type not supported</div>;
    }
  };

  return (
    <div className="bg-gradient-to-br from-white to-slate-100 min-h-screen">
      <div className="container mx-auto max-w-md px-4 py-6">
        {/* Header */}
        <header className="flex items-center gap-4 mb-6">
          <button onClick={handleBack} className="p-2">
            <ArrowLeft className="h-5 w-5" />
          </button>
          <h1 className="text-2xl font-bold">
            {selectedLesson ? selectedLesson.title : selectedTopic ? selectedTopic.title : "Learning Topics"}
          </h1>
        </header>
        
        {selectedLesson ? (
          renderLessonContent()
        ) : selectedTopic ? (
          <TopicCurriculum topic={selectedTopic} onBack={handleBack} onLessonClick={handleLessonClick} />
        ) : (
          <div className="grid gap-4">
            {topics.map((topic) => (
              <TopicCard 
                key={topic.id} 
                topic={topic}
                onClick={handleTopicClick}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Topics;
