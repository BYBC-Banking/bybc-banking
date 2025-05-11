
import { useState } from "react";
import EducationHeader from "@/components/EducationHeader";
import LearningJourney from "@/components/LearningJourney";
import ContinueLearning from "@/components/ContinueLearning";
import ContentFilters from "@/components/ContentFilters";
import RecommendationsCarousel from "@/components/RecommendationsCarousel";

// Content filter types
export type ContentType = "Articles" | "Videos" | "Quizzes" | "Tools";
export type DifficultyLevel = "Beginner" | "Intermediate" | "Advanced";

const Education = () => {
  const [selectedContentType, setSelectedContentType] = useState<ContentType | null>(null);
  const [selectedDifficulty, setSelectedDifficulty] = useState<DifficultyLevel | null>(null);
  
  // Mock user data
  const userData = {
    name: "Thabo",
    completedModules: 3,
    totalModules: 7,
    currentModule: {
      id: "m4",
      title: "Understanding Investment Risk",
      progress: 45,
      type: "Articles" as ContentType,
      difficulty: "Intermediate" as DifficultyLevel
    }
  };
  
  // Mock journey data
  const journeyData = [
    { id: "m1", title: "Financial Basics", completed: true, current: false },
    { id: "m2", title: "Budgeting 101", completed: true, current: false },
    { id: "m3", title: "Debt Management", completed: true, current: false },
    { id: "m4", title: "Understanding Investment Risk", completed: false, current: true },
    { id: "m5", title: "Retirement Planning", completed: false, current: false },
    { id: "m6", title: "Tax Strategies", completed: false, current: false },
    { id: "m7", title: "Advanced Investing", completed: false, current: false }
  ];
  
  // Mock recommendations data
  const recommendations = [
    {
      id: "r1",
      title: "Understanding Market Volatility",
      type: "Articles",
      difficulty: "Intermediate",
      imageUrl: "https://source.unsplash.com/random/300x200?finance",
      duration: "5 min read"
    },
    {
      id: "r2",
      title: "Compound Interest Explained",
      type: "Videos",
      difficulty: "Beginner",
      imageUrl: "https://source.unsplash.com/random/300x200?money",
      duration: "3:45"
    },
    {
      id: "r3",
      title: "Test Your Investment Knowledge",
      type: "Quizzes",
      difficulty: "Intermediate",
      imageUrl: "https://source.unsplash.com/random/300x200?invest",
      duration: "10 questions"
    },
    {
      id: "r4",
      title: "Retirement Calculator",
      type: "Tools",
      difficulty: "Advanced",
      imageUrl: "https://source.unsplash.com/random/300x200?calculator",
      duration: "Interactive"
    },
    {
      id: "r5",
      title: "Introduction to ETFs",
      type: "Articles",
      difficulty: "Beginner",
      imageUrl: "https://source.unsplash.com/random/300x200?stocks",
      duration: "7 min read"
    }
  ];
  
  const handleContentTypeChange = (type: ContentType | null) => {
    setSelectedContentType(type);
  };
  
  const handleDifficultyChange = (difficulty: DifficultyLevel | null) => {
    setSelectedDifficulty(difficulty);
  };
  
  // Filter recommendations based on selected filters
  const filteredRecommendations = recommendations.filter(item => {
    if (selectedContentType && item.type !== selectedContentType) return false;
    if (selectedDifficulty && item.difficulty !== selectedDifficulty) return false;
    return true;
  });
  
  return (
    <div className="bg-gradient-to-br from-white to-slate-100 min-h-screen">
      <div className="container mx-auto max-w-md px-4 py-6">
        {/* Header with greeting */}
        <EducationHeader name={userData.name} />
        
        {/* Learning journey map */}
        <LearningJourney 
          journeyData={journeyData}
          completed={userData.completedModules} 
          total={userData.totalModules}
        />
        
        {/* Continue learning section */}
        <ContinueLearning module={userData.currentModule} />
        
        {/* Content filters */}
        <ContentFilters 
          selectedContentType={selectedContentType}
          selectedDifficulty={selectedDifficulty}
          onContentTypeChange={handleContentTypeChange}
          onDifficultyChange={handleDifficultyChange}
        />
        
        {/* Recommendations carousel */}
        <div className="mt-6">
          <h2 className="text-lg font-semibold mb-3">Recommended For You</h2>
          <RecommendationsCarousel 
            recommendations={filteredRecommendations}
          />
        </div>
      </div>
    </div>
  );
};

export default Education;
