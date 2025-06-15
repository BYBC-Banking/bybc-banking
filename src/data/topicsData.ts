
export interface Lesson {
  id: string;
  title: string;
  type: 'video' | 'reading' | 'quiz';
  duration: string;
  completed: boolean;
  videoUrl?: string;
  content?: string;
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

export const topics: Topic[] = [
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
            content: "Decentralization is the transfer of control and decision-making from a centralized entity to a distributed network. In blockchain technology, decentralization means no single authority controls the network. Instead, control is distributed among many participants (nodes) worldwide. This eliminates single points of failure, reduces censorship risks, and creates a more democratic financial system. Traditional centralized systems rely on trusted intermediaries like banks or payment processors, but decentralized systems use cryptographic proof and consensus mechanisms to maintain trust without intermediaries. This revolutionary approach enables peer-to-peer transactions, eliminates central points of control, and provides greater financial sovereignty to individuals. The benefits include increased security through distribution, resistance to censorship, 24/7 availability without relying on business hours of centralized institutions, and reduced costs by eliminating middlemen fees."
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
            content: "Bitcoin operates as a peer-to-peer electronic cash system using revolutionary blockchain technology. Every transaction is verified through a decentralized process called mining, where powerful computers compete to solve complex mathematical problems to add new blocks to the chain. Each Bitcoin transaction is permanently recorded on a public ledger that's distributed across thousands of computers worldwide, making it virtually impossible to alter or counterfeit. The system uses advanced cryptographic hashing (SHA-256) to secure transactions and mathematically control the creation of new bitcoins. The total supply is strictly limited to 21 million coins, making Bitcoin inherently deflationary by design - unlike traditional currencies that can be printed indefinitely. Miners are incentivized with newly created bitcoins and transaction fees for their computational work in securing the network. This creates a self-sustaining economic model where security increases with network value, making Bitcoin more secure than traditional payment systems while eliminating the need for trusted third parties."
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
            content: "The forex market operates through currency pairs, with major pairs being the most liquid and widely traded instruments in the world. The seven major pairs include EUR/USD (Euro/US Dollar), GBP/USD (British Pound/US Dollar), USD/JPY (US Dollar/Japanese Yen), USD/CHF (US Dollar/Swiss Franc), AUD/USD (Australian Dollar/US Dollar), USD/CAD (US Dollar/Canadian Dollar), and NZD/USD (New Zealand Dollar/US Dollar). These pairs collectively account for approximately 80% of all forex trading volume, making them the most predictable and stable trading opportunities. The first currency in any pair is called the base currency, while the second is the quote currency. The exchange rate tells you precisely how much of the quote currency you need to purchase one unit of the base currency. Major pairs typically have the tightest spreads, highest liquidity, and most predictable price movements, making them ideal for both beginning and professional traders. Understanding these relationships is crucial for successful forex trading strategies."
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
            content: "Fundamental analysis in forex involves comprehensive evaluation of economic, political, and social factors that directly influence currency values in global markets. Key economic indicators include GDP growth rates which reflect overall economic health, inflation data (Consumer Price Index) that affects purchasing power, employment figures that indicate economic strength, interest rates set by central banks that attract or repel foreign investment, and trade balances that show import/export relationships. Central bank policies have profound impacts on currency strength - higher interest rates typically strengthen a currency as they attract foreign capital seeking better returns. Political stability, government debt levels, and geopolitical events create significant volatility in currency markets. Professional traders utilize economic calendars to track important announcements and data releases that can cause dramatic market movements. Understanding these fundamental drivers enables traders to make informed decisions based on long-term economic trends rather than just short-term price movements, leading to more sustainable trading strategies."
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
            content: "Stock markets are sophisticated organized exchanges where shares of publicly traded companies are bought and sold by investors worldwide. Major global exchanges include the New York Stock Exchange (NYSE), NASDAQ, London Stock Exchange, Tokyo Stock Exchange, and many others that facilitate trillions of dollars in daily trading volume. Companies transition from private to public ownership through Initial Public Offerings (IPOs), allowing them to raise substantial capital for business expansion, research and development, or debt reduction. Stock prices are determined by the fundamental economic principle of supply and demand - when more investors want to buy a stock than sell it, the price increases, and vice versa. Market makers, typically large financial institutions, provide essential liquidity by constantly buying and selling stocks to ensure smooth trading operations. Regular trading occurs during specific market hours, typically 9:30 AM to 4:00 PM Eastern Time for US markets, though extended-hours trading allows transactions before and after regular sessions. This system creates a dynamic marketplace where company ownership can be transferred efficiently while providing capital for economic growth."
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
            content: "Technical analysis is a comprehensive methodology for studying price charts, trading volumes, and market behavior to predict future stock price movements. This approach focuses on key concepts including support and resistance levels (price points where stocks tend to bounce), trend lines that show overall price direction, and chart patterns like head and shoulders, double tops/bottoms, triangles, and flags that indicate potential future movements. Popular technical indicators provide mathematical insights into market momentum: moving averages (both simple and exponential) smooth out price action to identify trends, Relative Strength Index (RSI) measures overbought/oversold conditions, MACD (Moving Average Convergence Divergence) shows momentum changes, Bollinger Bands indicate volatility and potential reversal points, and volume indicators confirm the strength of price movements. Candlestick patterns offer detailed insights into market sentiment - patterns like doji (indecision), hammer (potential reversal), and engulfing candles (strong directional moves) help traders identify optimal entry and exit points. Technical analysis operates on three core assumptions: all market information is reflected in current prices, prices move in identifiable trends, and historical patterns tend to repeat due to consistent human psychology in trading decisions."
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
            content: "Commodities represent raw materials and primary agricultural products that serve as the building blocks of the global economy and can be bought and sold in standardized markets worldwide. These essential goods are typically organized into four major categories: energy commodities (crude oil, natural gas, heating oil, gasoline), precious and industrial metals (gold, silver, copper, platinum, palladium), agricultural products (wheat, corn, soybeans, coffee, sugar, cotton), and livestock (live cattle, feeder cattle, lean hogs). Commodities trading frequently involves sophisticated futures contracts - legally binding agreements to buy or sell specific quantities at predetermined prices on future dates, allowing producers and consumers to hedge against price volatility. Major commodity exchanges facilitate this global trade, including the Chicago Mercantile Exchange (CME), New York Mercantile Exchange (NYMEX), London Metal Exchange (LME), and Intercontinental Exchange (ICE). Commodity prices fluctuate based on complex supply and demand factors, weather conditions that affect agricultural yields, geopolitical events that disrupt supply chains, economic cycles that influence industrial demand, and currency movements that affect international pricing. Understanding these markets is crucial for investors seeking portfolio diversification and inflation protection."
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
            content: "Mutual funds offer diverse investment strategies through various fund types designed to meet different investor objectives and risk tolerances. Equity funds invest primarily in stocks and can be further categorized by market capitalization (large-cap funds focusing on established companies, mid-cap funds targeting growing companies, small-cap funds investing in emerging businesses) or investment philosophy (growth funds seeking rapidly expanding companies, value funds targeting undervalued stocks, blend funds combining both approaches). Bond funds specialize in fixed-income securities and vary significantly by credit quality (government, corporate, high-yield), duration (short-term, intermediate, long-term), and issuer type (municipal, international, emerging markets). Money market funds provide stability and liquidity by investing in short-term, high-quality debt instruments like Treasury bills and commercial paper, offering capital preservation with modest returns. Balanced funds automatically maintain predetermined stock and bond allocations, providing built-in diversification for investors seeking simplified portfolio management. Index funds passively track specific market indices like the S&P 500, offering broad market exposure with minimal fees, while actively managed funds employ professional managers who actively select securities attempting to outperform market benchmarks. Target-date funds automatically adjust asset allocation based on retirement timeline, becoming more conservative as the target date approaches, making them ideal for long-term retirement planning."
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
            content: "Revenue streams represent the various methods through which businesses generate income from their customers, forming the financial foundation of any successful enterprise. Traditional product sales involve one-time transactions where customers purchase physical or digital goods, creating immediate revenue but requiring continuous customer acquisition. Subscription models generate recurring monthly or annual fees for ongoing services, providing predictable revenue streams and higher customer lifetime value - popular in software, media, and service industries. Advertising revenue involves charging third parties for promotional placement, leveraging audience size and engagement to create value for advertisers while providing free or low-cost services to end users. Licensing arrangements generate fees for allowing others to use intellectual property, patents, or proprietary systems, creating passive income streams from existing innovations. Freemium models offer basic services at no cost while charging premium fees for advanced features, allowing businesses to attract large user bases and convert a percentage to paying customers. Service-based businesses typically operate through hourly consulting rates, fixed project fees, or ongoing retainer agreements that provide predictable monthly income. E-commerce platforms may utilize transaction fees taking a percentage of each sale, affiliate commissions for referring customers to other businesses, or marketplace models connecting buyers and sellers. Diversifying revenue streams significantly reduces business risk by creating multiple income sources, ensuring stability even if one revenue channel underperforms, and provides opportunities for sustainable growth and market expansion."
          },
          { id: "b-l3", title: "Business Structure Quiz", type: "quiz" as const, duration: "12 questions", completed: false }
        ]
      }
    ]
  }
];
