
import React, { useState, useEffect } from 'react';
import { ArrowLeft } from "lucide-react";
import { Link, useSearchParams } from "react-router-dom";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import TopicCurriculum from "@/components/TopicCurriculum";

// Topic data with embedded video URLs and comprehensive reading content
const topics = [
  {
    id: "crypto",
    title: "Cryptocurrency",
    description: "Learn about digital currencies and blockchain technology",
    levels: ["All", "Beginner", "Intermediate", "Advanced"],
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
          { 
            id: "c-l2", 
            title: "Decentralization Explained", 
            type: "reading" as const, 
            duration: "8 min read", 
            completed: false,
            content: "Decentralization is the transfer of control and decision-making from a centralized entity to a distributed network. In blockchain technology, decentralization means no single authority controls the network. Instead, control is distributed among many participants (nodes) worldwide. This eliminates single points of failure, reduces censorship risks, and creates a more democratic system. Traditional centralized systems rely on trusted intermediaries like banks, but decentralized systems use cryptographic proof and consensus mechanisms to maintain trust without intermediaries."
          },
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
          { 
            id: "c-l5", 
            title: "How Bitcoin Works", 
            type: "reading" as const, 
            duration: "12 min read", 
            completed: false,
            content: "Bitcoin operates as a peer-to-peer electronic cash system using blockchain technology. Transactions are verified through a process called mining, where computers solve complex mathematical problems to add new blocks to the chain. Each Bitcoin transaction is recorded on a public ledger that's distributed across thousands of computers worldwide. The system uses cryptographic hashing (SHA-256) to secure transactions and control the creation of new bitcoins. The total supply is limited to 21 million coins, making it deflationary by design. Miners are rewarded with newly created bitcoins and transaction fees for their computational work in securing the network."
          },
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
    levels: ["All", "Beginner", "Intermediate", "Advanced"],
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
          { 
            id: "f-l2", 
            title: "Major Currency Pairs", 
            type: "reading" as const, 
            duration: "10 min read", 
            completed: true,
            content: "The forex market trades currency pairs, with major pairs being the most liquid and widely traded. The seven major pairs include EUR/USD (Euro/US Dollar), GBP/USD (British Pound/US Dollar), USD/JPY (US Dollar/Japanese Yen), USD/CHF (US Dollar/Swiss Franc), AUD/USD (Australian Dollar/US Dollar), USD/CAD (US Dollar/Canadian Dollar), and NZD/USD (New Zealand Dollar/US Dollar). These pairs account for about 80% of all forex trading volume. The first currency in a pair is the base currency, and the second is the quote currency. The exchange rate tells you how much of the quote currency you need to buy one unit of the base currency."
          },
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
          { 
            id: "f-l5", 
            title: "Fundamental Analysis", 
            type: "reading" as const, 
            duration: "15 min read", 
            completed: false,
            content: "Fundamental analysis in forex involves evaluating economic, political, and social factors that influence currency values. Key economic indicators include GDP growth rates, inflation data (CPI), employment figures, interest rates set by central banks, and trade balances. Central bank policies significantly impact currency strength - higher interest rates typically strengthen a currency as they attract foreign investment. Political stability, government debt levels, and geopolitical events also affect currency values. Traders use economic calendars to track important announcements and data releases that can cause significant market movements."
          },
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
    levels: ["All", "Beginner", "Intermediate", "Advanced"],
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
          { 
            id: "s-l2", 
            title: "How Stock Markets Work", 
            type: "reading" as const, 
            duration: "9 min read", 
            completed: true,
            content: "Stock markets are organized exchanges where shares of publicly traded companies are bought and sold. Major exchanges include the New York Stock Exchange (NYSE), NASDAQ, London Stock Exchange, and Tokyo Stock Exchange. Companies go public through Initial Public Offerings (IPOs) to raise capital for growth. Stock prices are determined by supply and demand - when more people want to buy a stock than sell it, the price goes up, and vice versa. Market makers provide liquidity by constantly buying and selling stocks. Trading occurs during market hours, typically 9:30 AM to 4:00 PM Eastern Time for US markets, though after-hours trading is also available."
          },
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
          { 
            id: "s-l5", 
            title: "Technical Analysis", 
            type: "reading" as const, 
            duration: "14 min read", 
            completed: false,
            content: "Technical analysis involves studying price charts and trading volumes to predict future stock movements. Key concepts include support and resistance levels, trend lines, and chart patterns like head and shoulders, double tops/bottoms, and triangles. Popular technical indicators include moving averages (simple and exponential), Relative Strength Index (RSI), MACD, Bollinger Bands, and volume indicators. Candlestick patterns provide insights into market sentiment - patterns like doji, hammer, and engulfing candles signal potential reversals. Technical analysis assumes that all market information is reflected in price, prices move in trends, and history tends to repeat itself."
          },
          { id: "s-l6", title: "Stock Valuation Methods", type: "quiz" as const, duration: "10 questions", completed: false }
        ]
      }
    ]
  },
  {
    id: "commodities",
    title: "Commodities",
    description: "Explore trading in physical goods like gold, oil, and agricultural products",
    levels: ["All", "Beginner", "Intermediate", "Advanced"],
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
          { 
            id: "cm-l2", 
            title: "Commodities Markets", 
            type: "reading" as const, 
            duration: "11 min read", 
            completed: false,
            content: "Commodities are raw materials or primary agricultural products that can be bought and sold. They're typically divided into four categories: energy (crude oil, natural gas, gasoline), metals (gold, silver, copper, platinum), agriculture (wheat, corn, soybeans, coffee), and livestock (cattle, pork bellies). Commodities trading often involves futures contracts - agreements to buy or sell at a specific price on a future date. Major commodity exchanges include the Chicago Mercantile Exchange (CME), New York Mercantile Exchange (NYMEX), and London Metal Exchange (LME). Commodity prices are influenced by supply and demand factors, weather conditions, geopolitical events, and economic cycles."
          },
          { id: "cm-l3", title: "Types of Commodities Quiz", type: "quiz" as const, duration: "8 questions", completed: false }
        ]
      }
    ]
  },
  {
    id: "mutual-funds",
    title: "Mutual Funds",
    description: "Learn about pooled investment vehicles managed by professionals",
    levels: ["All", "Beginner", "Intermediate", "Advanced"],
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
          { 
            id: "mf-l2", 
            title: "Types of Mutual Funds", 
            type: "reading" as const, 
            duration: "13 min read", 
            completed: true,
            content: "Mutual funds come in various types to suit different investment objectives. Equity funds invest primarily in stocks and can be further categorized by market capitalization (large-cap, mid-cap, small-cap) or investment style (growth, value, blend). Bond funds invest in fixed-income securities and vary by credit quality, duration, and issuer type. Money market funds invest in short-term, high-quality debt instruments and offer stability and liquidity. Balanced funds combine stocks and bonds in predetermined allocations. Index funds passively track market indices like the S&P 500, while actively managed funds employ professional managers to select securities. Target-date funds automatically adjust asset allocation based on retirement timeline."
          },
          { id: "mf-l3", title: "Mutual Fund Fees", type: "quiz" as const, duration: "9 questions", completed: false }
        ]
      }
    ]
  },
  {
    id: "business",
    title: "Business",
    description: "Understand fundamentals of running and investing in businesses",
    levels: ["All", "Beginner", "Intermediate", "Advanced"],
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
          { 
            id: "b-l2", 
            title: "Revenue Streams", 
            type: "reading" as const, 
            duration: "10 min read", 
            completed: false,
            content: "Revenue streams are the various ways a business generates income from its customers. Common models include product sales (one-time transactions), subscription models (recurring fees for ongoing service), advertising revenue (charging for ad placement), licensing (fees for using intellectual property), and freemium models (basic service free, premium features paid). Service-based businesses typically charge hourly rates, project fees, or retainer agreements. E-commerce businesses may use transaction fees, affiliate commissions, or marketplace models. Diversifying revenue streams reduces business risk and creates multiple income sources. Understanding your revenue model is crucial for financial planning, pricing strategies, and investor relations."
          },
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
