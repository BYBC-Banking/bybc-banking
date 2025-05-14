
import React from 'react';
import { ArrowLeft, ExternalLink, Eye } from "lucide-react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { AspectRatio } from "@/components/ui/aspect-ratio";

// Mock news data
const newsArticles = [
  {
    id: "news1",
    title: "Central Bank Raises Interest Rates by 25 Basis Points",
    description: "The Federal Reserve announced a rate hike to combat inflation concerns.",
    category: "Economy",
    source: "Financial Times",
    date: "Today, 10:30",
    imageUrl: "https://source.unsplash.com/random/600x400?finance",
    readTime: "5 min read"
  },
  {
    id: "news2",
    title: "Tech Stocks Rally as Earnings Beat Expectations",
    description: "Major technology companies reported stronger than expected quarterly results.",
    category: "Markets",
    source: "Bloomberg",
    date: "Today, 08:15",
    imageUrl: "https://source.unsplash.com/random/600x400?technology",
    readTime: "4 min read"
  },
  {
    id: "news3",
    title: "Emerging Markets Face Currency Pressures Amid Dollar Strength",
    description: "Developing economies struggle as the US dollar continues to appreciate.",
    category: "Global",
    source: "Reuters",
    date: "Yesterday",
    imageUrl: "https://source.unsplash.com/random/600x400?currency",
    readTime: "7 min read"
  },
  {
    id: "news4",
    title: "New Regulations Proposed for Cryptocurrency Exchanges",
    description: "Regulatory bodies outline stricter rules for digital asset platforms.",
    category: "Crypto",
    source: "CoinDesk",
    date: "Yesterday",
    imageUrl: "https://source.unsplash.com/random/600x400?cryptocurrency",
    readTime: "6 min read"
  },
  {
    id: "news5",
    title: "Oil Prices Surge on Supply Concerns",
    description: "Crude oil hits multi-month high as geopolitical tensions rise.",
    category: "Commodities",
    source: "Wall Street Journal",
    date: "2 days ago",
    imageUrl: "https://source.unsplash.com/random/600x400?oil",
    readTime: "3 min read"
  }
];

const FinancialNews = () => {
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="bg-gradient-to-br from-white to-slate-100 min-h-screen">
      <div className="container mx-auto max-w-md px-4 py-6">
        {/* Header */}
        <header className="flex items-center gap-4 mb-6">
          <Link to="/investments" className="p-2">
            <ArrowLeft className="h-5 w-5" />
          </Link>
          <h1 className="text-2xl font-bold">Financial News</h1>
        </header>
        
        {/* News Articles */}
        <div className="space-y-4">
          {newsArticles.map((article) => (
            <Card key={article.id} className="overflow-hidden hover:shadow-md transition-shadow">
              <AspectRatio ratio={16/9}>
                <img 
                  src={article.imageUrl} 
                  alt={article.title} 
                  className="object-cover w-full h-full"
                />
              </AspectRatio>
              <CardHeader className="pb-2">
                <div className="flex justify-between items-center">
                  <Badge className="bg-slate-100 text-slate-800 hover:bg-slate-200">
                    {article.category}
                  </Badge>
                  <span className="text-xs text-muted-foreground">{article.date}</span>
                </div>
                <CardTitle className="text-lg mt-2">{article.title}</CardTitle>
                <CardDescription>{article.description}</CardDescription>
              </CardHeader>
              <CardContent className="pb-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">{article.source}</span>
                  <span className="flex items-center gap-1">
                    <Eye className="h-4 w-4" />
                    {article.readTime}
                  </span>
                </div>
              </CardContent>
              <CardFooter>
                <Link 
                  to={`/news/${article.id}`}
                  className="text-sm text-finance-blue hover:underline flex items-center gap-1"
                >
                  Read full article 
                  <ExternalLink className="h-3 w-3" />
                </Link>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FinancialNews;
