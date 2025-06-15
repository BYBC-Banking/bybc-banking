
import React, { useState, useEffect } from 'react';
import { ArrowLeft } from "lucide-react";
import { Link, useSearchParams } from "react-router-dom";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import TopicCurriculum from "@/components/TopicCurriculum";

// Topic data with embedded video URLs
const topics = [
  {
    id: "crypto",
    title: "Cryptocurrency",
    description: "Learn about digital currencies and blockchain technology",
    levels: ["Beginner", "Intermediate", "Advanced"],
    icon: "₿",
    modules: [
      {
        id: "crypto-m1",
        title: "Introduction to Blockchain",
        description: "Understand the fundamentals of blockchain technology",
        progress: 0,
        lessons: [
          { 
            id: "c-l1", 
            title: "What is Blockchain?", 
            type: "video" as const, 
            duration: "5:30", 
            completed: false,
            videoUrl: "https://www.youtube.com/embed/yubzJw0uiE4"
          },
          { id: "c-l2", title: "Decentralization Explained", type: "reading" as const, duration: "8 min read", completed: false },
          { id: "c-l3", title: "Blockchain Technology Quiz", type: "quiz" as const, duration: "10 questions", completed: false }
        ]
      },
      {
        id: "crypto-m2",
        title: "Bitcoin Fundamentals",
        description: "Learn about the first and most popular cryptocurrency",
        progress: 0,
        lessons: [
          { 
            id: "c-l4", 
            title: "The History of Bitcoin", 
            type: "video" as const, 
            duration: "8:45", 
            completed: false,
            videoUrl: "https://www.youtube.com/embed/41JCpzvnn_0"
          },
          { id: "c-l5", title: "How Bitcoin Works", type: "reading" as const, duration: "12 min read", completed: false },
          { 
            id: "c-l6", 
            title: "Bitcoin Wallets and Security", 
            type: "video" as const, 
            duration: "7:20", 
            completed: false,
            videoUrl: "https://www.youtube.com/embed/GSTiKjnBaes"
          }
        ]
      }
    ]
  },
  {
    id: "forex",
    title: "Forex",
    description: "Understand foreign exchange markets and currency trading",
    levels: ["Beginner", "Intermediate", "Advanced"],
    icon: "💱",
    modules: [
      {
        id: "forex-m1",
        title: "Forex Market Basics",
        description: "Understanding the foreign exchange market",
        progress: 30,
        lessons: [
          { 
            id: "f-l1", 
            title: "Introduction to Forex", 
            type: "video" as const, 
            duration: "6:15", 
            completed: true,
            videoUrl: "https://www.youtube.com/embed/s6CYrVe03wA"
          },
          { id: "f-l2", title: "Major Currency Pairs", type: "reading" as const, duration: "10 min read", completed: true },
          { id: "f-l3", title: "Market Participants", type: "quiz" as const, duration: "8 questions", completed: false }
        ]
      },
      {
        id: "forex-m2",
        title: "Trading Strategies",
        description: "Learn different approaches to forex trading",
        progress: 0,
        lessons: [
          { 
            id: "f-l4", 
            title: "Technical Analysis Basics", 
            type: "video" as const, 
            duration: "10:30", 
            completed: false,
            videoUrl: "https://www.youtube.com/embed/08Klqux9yVk"
          },
          { id: "f-l5", title: "Fundamental Analysis", type: "reading" as const, duration: "15 min read", completed: false },
          { 
            id: "f-l6", 
            title: "Risk Management", 
            type: "video" as const, 
            duration: "9:45", 
            completed: false,
            videoUrl: "https://www.youtube.com/embed/8La0uJRZQSA"
          }
        ]
      }
    ]
  },
  {
    id: "stocks",
    title: "Stocks",
    description: "Master equity markets and stock trading strategies",
    levels: ["Beginner", "Intermediate", "Advanced"],
    icon: "📈",
    modules: [
      {
        id: "stocks-m1",
        title: "Stock Market Fundamentals",
        description: "Learn how stock markets work",
        progress: 75,
        lessons: [
          { 
            id: "s-l1", 
            title: "What are Stocks?", 
            type: "video" as const, 
            duration: "5:20", 
            completed: true,
            videoUrl: "https://www.youtube.com/embed/hE2NsJLDMPM"
          },
          { id: "s-l2", title: "How Stock Markets Work", type: "reading" as const, duration: "9 min read", completed: true },
          { id: "s-l3", title: "Types of Stocks", type: "quiz" as const, duration: "12 questions", completed: true }
        ]
      },
      {
        id: "stocks-m2",
        title: "Stock Analysis",
        description: "Methods for evaluating stocks",
        progress: 33,
        lessons: [
          { 
            id: "s-l4", 
            title: "Fundamental Analysis", 
            type: "video" as const, 
            duration: "11:15", 
            completed: true,
            videoUrl: "https://www.youtube.com/embed/7pwW_N5sbCE"
          },
          { id: "s-l5", title: "Technical Analysis", type: "reading" as const, duration: "14 min read", completed: false },
          { id: "s-l6", title: "Stock Valuation Methods", type: "quiz" as const, duration: "10 questions", completed: false }
        ]
      }
    ]
  },
  {
    id: "commodities",
    title: "Commodities",
    description: "Explore trading in physical goods like gold, oil, and agricultural products",
    levels: ["Beginner", "Intermediate", "Advanced"],
    icon: "🛢️",
    modules: [
      {
        id: "commodities-m1",
        title: "Introduction to Commodities",
        description: "Understanding different types of commodities",
        progress: 0,
        lessons: [
          { 
            id: "cm-l1", 
            title: "What are Commodities?", 
            type: "video" as const, 
            duration: "6:30", 
            completed: false,
            videoUrl: "https://www.youtube.com/embed/jRoq5BnElQo"
          },
          { id: "cm-l2", title: "Commodities Markets", type: "reading" as const, duration: "11 min read", completed: false },
          { id: "cm-l3", title: "Types of Commodities Quiz", type: "quiz" as const, duration: "8 questions", completed: false }
        ]
      }
    ]
  },
  {
    id: "mutual-funds",
    title: "Mutual Funds",
    description: "Learn about pooled investment vehicles managed by professionals",
    levels: ["Beginner", "Intermediate", "Advanced"],
    icon: "📊",
    modules: [
      {
        id: "mutual-funds-m1",
        title: "Mutual Fund Basics",
        description: "Understanding how mutual funds work",
        progress: 50,
        lessons: [
          { 
            id: "mf-l1", 
            title: "What are Mutual Funds?", 
            type: "video" as const, 
            duration: "7:15", 
            completed: true,
            videoUrl: "https://www.youtube.com/embed/uVhQnf18kms"
          },
          { id: "mf-l2", title: "Types of Mutual Funds", type: "reading" as const, duration: "13 min read", completed: true },
          { id: "mf-l3", title: "Mutual Fund Fees", type: "quiz" as const, duration: "9 questions", completed: false }
        ]
      }
    ]
  },
  {
    id: "business",
    title: "Business",
    description: "Understand fundamentals of running and investing in businesses",
    levels: ["Beginner", "Intermediate", "Advanced"],
    icon: "🏢",
    modules: [
      {
        id: "business-m1",
        title: "Business Models",
        description: "Learn about different ways businesses operate",
        progress: 25,
        lessons: [
          { 
            id: "b-l1", 
            title: "Types of Business Models", 
            type: "video" as const, 
            duration: "8:20", 
            completed: true,
            videoUrl: "https://www.youtube.com/embed/EFSMGnJHVA4"
          },
          { id: "b-l2", title: "Revenue Streams", type: "reading" as const, duration: "10 min read", completed: false },
          { id: "b-l3", title: "Business Structure Quiz", type: "quiz" as const, duration: "12 questions", completed: false }
        ]
      }
    ]
  }
];

const Topics = () => {
  const [selectedTopic, setSelectedTopic] = useState<typeof topics[0] | null>(null);
  const [selectedLesson, setSelectedLesson] = useState<any>(null);
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

  const handleTopicClick = (topic: typeof topics[0]) => {
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

  const handleLessonClick = (lesson: any) => {
    if (lesson.type === 'video' && lesson.videoUrl) {
      setSelectedLesson(lesson);
      window.scrollTo(0, 0);
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
          // Video player view
          <div className="space-y-4">
            <div className="aspect-video">
              <iframe
                src={selectedLesson.videoUrl}
                title={selectedLesson.title}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-full rounded-lg"
              ></iframe>
            </div>
            <div>
              <h2 className="text-xl font-semibold mb-2">{selectedLesson.title}</h2>
              <p className="text-muted-foreground">Duration: {selectedLesson.duration}</p>
            </div>
          </div>
        ) : selectedTopic ? (
          <TopicCurriculum topic={selectedTopic} onBack={handleBack} onLessonClick={handleLessonClick} />
        ) : (
          <div className="grid gap-4">
            {topics.map((topic) => (
              <Card 
                key={topic.id} 
                className="transition-all hover:shadow-md cursor-pointer"
                onClick={() => handleTopicClick(topic)}
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
                  <div 
                    className="text-sm text-finance-blue hover:underline"
                  >
                    Explore curriculum →
                  </div>
                </CardFooter>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Topics;
