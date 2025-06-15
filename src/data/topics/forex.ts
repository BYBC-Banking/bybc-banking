import { Topic } from "../topicsData";

const forex: Topic = {
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
          content: "The foreign exchange market operates through currency pairs, representing the relative value between two currencies. Understanding major currency pairs is crucial for successful forex trading.\n\n**The Seven Major Currency Pairs:**\n\n1. **EUR/USD (Euro/US Dollar)** - The world's most traded pair, accounting for ~24% of daily forex volume. Known as 'Fiber' among traders.\n\n2. **GBP/USD (British Pound/US Dollar)** - Called 'Cable', represents ~9% of daily volume. Highly volatile due to Brexit impacts and UK economic policies.\n\n3. **USD/JPY (US Dollar/Japanese Yen)** - Known as 'Gopher', represents ~13% of volume. Popular for carry trades due to Japan's historically low interest rates.\n\n4. **USD/CHF (US Dollar/Swiss Franc)** - Called 'Swissy', represents ~4% of volume. Considered a safe-haven currency during market uncertainty.\n\n5. **AUD/USD (Australian Dollar/US Dollar)** - Known as 'Aussie', heavily influenced by commodity prices, especially gold and iron ore.\n\n6. **USD/CAD (US Dollar/Canadian Dollar)** - Called 'Loonie', strongly correlated with oil prices due to Canada's oil exports.\n\n7. **NZD/USD (New Zealand Dollar/US Dollar)** - Known as 'Kiwi', influenced by agricultural commodity prices and dairy exports.\n\n**Key Concepts:**\n\n**Base vs Quote Currency:**\n- Base currency (first): The currency being bought or sold\n- Quote currency (second): The currency used to price the base currency\n- Price shows how much quote currency is needed to buy one unit of base currency\n\n**Spread and Liquidity:**\nMajor pairs typically offer:\n- Tightest spreads (0.1-3 pips)\n- Highest liquidity (easiest to buy/sell)\n- Most predictable price movements\n- Lowest trading costs\n\n**Trading Sessions:**\n- London Session (8 AM - 5 PM GMT): Highest volume for EUR/GBP pairs\n- New York Session (1 PM - 10 PM GMT): Peak activity for USD pairs\n- Tokyo Session (12 AM - 9 AM GMT): Best for JPY pairs\n\n**Factors Affecting Major Pairs:**\n- Central bank interest rate decisions\n- Economic data releases (GDP, inflation, employment)\n- Political events and elections\n- Trade relationships between countries\n- Market sentiment and risk appetite\n\nMastering major currency pairs provides the foundation for understanding global forex markets and developing effective trading strategies."
        },
        { 
          id: "f-l3", 
          title: "Market Participants", 
          type: "quiz" as const, 
          duration: "8 questions", 
          completed: false,
          quizQuestions: [
            {
              id: "q1",
              question: "Which currency pair is known as 'Cable'?",
              options: ["EUR/USD", "GBP/USD", "USD/JPY", "USD/CHF"],
              correctAnswer: 1,
              explanation: "GBP/USD is called 'Cable' due to the transatlantic cable that connected London and New York for telegraph communications."
            },
            {
              id: "q2",
              question: "What percentage of daily forex volume does EUR/USD represent?",
              options: ["13%", "24%", "9%", "4%"],
              correctAnswer: 1,
              explanation: "EUR/USD accounts for approximately 24% of daily forex trading volume, making it the most traded currency pair."
            }
          ]
        }
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
          content: "Fundamental analysis in forex involves evaluating economic, political, and social factors that influence currency values. This approach helps traders understand the intrinsic value of currencies and predict long-term trends.\n\n**Key Economic Indicators:**\n\n**1. Gross Domestic Product (GDP):**\n- Measures total economic output of a country\n- Strong GDP growth typically strengthens currency\n- Released quarterly in most developed nations\n- GDP growth rate comparisons between countries affect exchange rates\n\n**2. Inflation Data (Consumer Price Index - CPI):**\n- Measures changes in cost of living\n- Moderate inflation (2-3%) is generally positive for currency\n- High inflation can weaken currency purchasing power\n- Central banks use inflation data to set monetary policy\n\n**3. Employment Statistics:**\n- Unemployment rate indicates economic health\n- Non-farm payrolls (US) is a major market mover\n- Low unemployment typically strengthens currency\n- Employment data influences consumer spending and economic growth\n\n**4. Interest Rates:**\n- Higher rates attract foreign investment\n- Rate differentials drive currency strength\n- Central bank rate decisions cause significant volatility\n- Forward guidance affects market expectations\n\n**5. Trade Balance:**\n- Trade surplus strengthens currency\n- Trade deficit can weaken currency\n- Export/import data affects supply and demand\n- Trade wars and tariffs impact currency values\n\n**Central Bank Policies:**\n\n**Federal Reserve (USD):**\n- Federal Funds Rate decisions\n- Quantitative easing programs\n- FOMC meeting minutes and statements\n- Chair's speeches and testimony\n\n**European Central Bank (EUR):**\n- Main refinancing rate\n- Asset purchase programs\n- ECB press conferences\n- Economic projections\n\n**Bank of England (GBP):**\n- Bank Rate decisions\n- Monetary Policy Committee votes\n- Inflation targeting strategy\n- Brexit-related policies\n\n**Political and Geopolitical Factors:**\n- Election outcomes and policy changes\n- Government stability and debt levels\n- International relations and trade agreements\n- Geopolitical tensions and conflicts\n- Regulatory changes and reforms\n\n**Using Economic Calendars:**\n- Track high-impact news releases\n- Plan trading around major announcements\n- Compare actual vs forecasted data\n- Monitor market reactions to news\n\n**Fundamental vs Technical Analysis:**\n- Fundamental: Why prices move (long-term)\n- Technical: When prices will move (short-term)\n- Combining both approaches improves trading decisions\n- Fundamental analysis works best for position trading\n\nSuccessful forex traders use fundamental analysis to understand the bigger picture while using technical analysis for precise entry and exit points."
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
};

export default forex;
