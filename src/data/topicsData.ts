
export interface Lesson {
  id: string;
  title: string;
  type: 'video' | 'reading' | 'quiz';
  duration: string;
  completed: boolean;
  videoUrl?: string;
  content?: string;
  quizQuestions?: QuizQuestion[];
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

export interface Module {
  id: string;
  title: string;
  description: string;
  progress: number;
  lessons: Lesson[];
}

export interface Topic {
  id: string;
  title: string;
  description: string;
  levels: string[];
  icon: string;
  modules: Module[];
}

// Import all topic files
import crypto from "./topics/crypto";
import forex from "./topics/forex";
import stocks from "./topics/stocks";
import commodities from "./topics/commodities";
import mutualFunds from "./topics/mutualFunds";
import business from "./topics/business";

// Export unified topics array
export const topics: Topic[] = [
  crypto,
  forex,
  stocks,
  commodities,
  mutualFunds,
  business
];
