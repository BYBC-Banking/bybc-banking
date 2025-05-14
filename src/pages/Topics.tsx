
import React from 'react';
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

// Topic data
const topics = [
  {
    id: "crypto",
    title: "Cryptocurrency",
    description: "Learn about digital currencies and blockchain technology",
    levels: ["Beginner", "Intermediate", "Advanced"],
    icon: "₿"
  },
  {
    id: "forex",
    title: "Forex",
    description: "Understand foreign exchange markets and currency trading",
    levels: ["Beginner", "Intermediate", "Advanced"],
    icon: "💱"
  },
  {
    id: "stocks",
    title: "Stocks",
    description: "Master equity markets and stock trading strategies",
    levels: ["Beginner", "Intermediate", "Advanced"],
    icon: "📈"
  },
  {
    id: "commodities",
    title: "Commodities",
    description: "Explore trading in physical goods like gold, oil, and agricultural products",
    levels: ["Beginner", "Intermediate", "Advanced"],
    icon: "🛢️"
  },
  {
    id: "mutual-funds",
    title: "Mutual Funds",
    description: "Learn about pooled investment vehicles managed by professionals",
    levels: ["Beginner", "Intermediate", "Advanced"],
    icon: "📊"
  },
  {
    id: "business",
    title: "Business",
    description: "Understand fundamentals of running and investing in businesses",
    levels: ["Beginner", "Intermediate", "Advanced"],
    icon: "🏢"
  }
];

const Topics = () => {
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="bg-gradient-to-br from-white to-slate-100 min-h-screen">
      <div className="container mx-auto max-w-md px-4 py-6">
        {/* Header */}
        <header className="flex items-center gap-4 mb-6">
          <Link to="/education" className="p-2">
            <ArrowLeft className="h-5 w-5" />
          </Link>
          <h1 className="text-2xl font-bold">Learning Topics</h1>
        </header>
        
        {/* Topics Grid */}
        <div className="grid gap-4">
          {topics.map((topic) => (
            <Card key={topic.id} className="transition-all hover:shadow-md">
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
                <Link 
                  to={`/education/${topic.id}`} 
                  className="text-sm text-finance-blue hover:underline"
                >
                  Explore curriculum →
                </Link>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Topics;
