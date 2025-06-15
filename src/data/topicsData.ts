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

export const topics: Topic[] = [
  {
    id: "crypto",
    title: "Cryptocurrency",
    description: "Learn about digital currencies and blockchain technology",
    levels: ["All", "Beginner", "Intermediate", "Advanced"],
    icon: "/lovable-uploads/b7f8b127-3f40-4d3c-b7d0-4141502ebf20.png",
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
            content: "Decentralization is the fundamental principle that distinguishes blockchain technology from traditional centralized systems. In a decentralized network, no single entity has complete control over the system. Instead, control is distributed among multiple participants (nodes) across the globe.\n\nKey Characteristics of Decentralization:\n\n1. **Distributed Control**: Unlike traditional banks where a central authority manages all transactions, blockchain networks rely on consensus mechanisms where multiple nodes validate transactions.\n\n2. **No Single Point of Failure**: If one node fails, the network continues operating through other nodes, making the system more resilient than centralized alternatives.\n\n3. **Transparency**: All transactions are recorded on a public ledger that anyone can verify, creating unprecedented transparency in financial systems.\n\n4. **Censorship Resistance**: No single authority can block or reverse transactions, providing financial freedom and resistance to censorship.\n\n5. **Peer-to-Peer Transactions**: Users can transact directly with each other without intermediaries, reducing costs and increasing efficiency.\n\nBenefits of Decentralization:\n- Enhanced security through distribution\n- Reduced reliance on trusted third parties\n- Lower transaction costs\n- 24/7 availability without business hour restrictions\n- Greater financial sovereignty for individuals\n- Resistance to government interference and censorship\n\nChallenges:\n- Higher energy consumption for consensus mechanisms\n- Slower transaction speeds compared to centralized systems\n- Complexity for average users\n- Regulatory uncertainty in many jurisdictions\n\nDecentralization represents a paradigm shift from trust-based systems to cryptographically-secured, mathematically-verifiable systems that don't require trust in central authorities."
          },
          { 
            id: "c-l3", 
            title: "Blockchain Technology Quiz", 
            type: "quiz" as const, 
            duration: "10 questions", 
            completed: false,
            quizQuestions: [
              {
                id: "q1",
                question: "What is the main advantage of decentralization in blockchain networks?",
                options: ["Faster transactions", "No single point of failure", "Lower energy consumption", "Easier to use"],
                correctAnswer: 1,
                explanation: "Decentralization eliminates single points of failure, making the network more resilient and secure."
              },
              {
                id: "q2", 
                question: "What consensus mechanism does Bitcoin use?",
                options: ["Proof of Stake", "Proof of Work", "Delegated Proof of Stake", "Proof of Authority"],
                correctAnswer: 1,
                explanation: "Bitcoin uses Proof of Work, where miners compete to solve cryptographic puzzles to validate transactions."
              },
              {
                id: "q3",
                question: "What makes blockchain transactions transparent?",
                options: ["Private keys", "Public ledger", "Mining pools", "Smart contracts"],
                correctAnswer: 1,
                explanation: "All transactions are recorded on a public ledger that anyone can view and verify."
              }
            ]
          }
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
            content: "Bitcoin operates as a revolutionary peer-to-peer electronic cash system that eliminates the need for trusted third parties. Understanding how Bitcoin works requires examining several key components:\n\n**Transaction Process:**\n1. When you send Bitcoin, you create a transaction that references previous transactions where you received Bitcoin\n2. You sign the transaction with your private key, proving ownership\n3. The transaction is broadcast to the Bitcoin network\n4. Miners collect transactions and attempt to include them in a new block\n5. Once included in a block and confirmed by subsequent blocks, the transaction is considered final\n\n**Mining and Proof of Work:**\nMiners compete to solve computationally intensive puzzles using the SHA-256 hashing algorithm. The first miner to solve the puzzle gets to add the next block to the blockchain and receives:\n- Block reward (currently 6.25 BTC, halved every 4 years)\n- Transaction fees from all transactions in the block\n\n**Digital Signatures and Security:**\nBitcoin uses Elliptic Curve Digital Signature Algorithm (ECDSA) to ensure:\n- Only the owner of Bitcoin can spend it\n- Transactions cannot be altered after creation\n- Double-spending is prevented through network consensus\n\n**The Blockchain Ledger:**\nEvery Bitcoin transaction is permanently recorded in blocks that are linked together cryptographically. Each block contains:\n- A hash of the previous block\n- A timestamp\n- A Merkle root of all transactions\n- A nonce (number used once) for the proof-of-work\n\n**Scarcity and Monetary Policy:**\nBitcoin's monetary policy is programmatically enforced:\n- Maximum supply: 21 million BTC\n- Block time: ~10 minutes (adjusted by difficulty)\n- Halving events: Block rewards halve every 210,000 blocks (~4 years)\n- Current circulating supply: ~19.7 million BTC\n\nThis deflationary design makes Bitcoin increasingly scarce over time, contrasting sharply with traditional fiat currencies that can be printed infinitely."
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
            content: "Stock markets are sophisticated organized exchanges where shares of publicly traded companies are bought and sold. Understanding how these markets operate is essential for successful investing.\n\n**What Are Stocks?**\nStocks represent ownership shares in publicly traded companies. When you buy stock, you become a partial owner of that company with rights to:\n- Vote on major company decisions\n- Receive dividends if the company pays them\n- Benefit from potential capital appreciation\n- Access annual reports and financial information\n\n**Major Global Stock Exchanges:**\n\n**1. New York Stock Exchange (NYSE):**\n- Largest exchange by market capitalization\n- Home to blue-chip companies like Apple, Microsoft, Amazon\n- Uses designated market makers for liquidity\n- Trading hours: 9:30 AM - 4:00 PM ET\n\n**2. NASDAQ:**\n- Technology-focused electronic exchange\n- Home to tech giants like Google, Facebook, Tesla\n- Fully electronic trading system\n- Known for growth and innovation companies\n\n**3. London Stock Exchange (LSE):**\n- Europe's largest exchange\n- Lists international companies\n- FTSE 100 index tracks top UK companies\n\n**How Price Discovery Works:**\n\n**Supply and Demand:**\n- More buyers than sellers = price increases\n- More sellers than buyers = price decreases\n- Order book shows current bid/ask prices\n- Market depth indicates available liquidity\n\n**Types of Orders:**\n- Market orders: Execute immediately at current price\n- Limit orders: Execute only at specified price or better\n- Stop orders: Trigger when price reaches specified level\n- Stop-limit orders: Combine stop and limit order features\n\n**Market Makers and Liquidity:**\n- Large financial institutions provide continuous liquidity\n- Profit from bid-ask spreads\n- Ensure smooth trading operations\n- Reduce price volatility during normal trading\n\n**Going Public - IPO Process:**\n\n**1. Private Company Preparation:**\n- Hire investment banks as underwriters\n- Prepare detailed financial documentation\n- File registration statement with SEC\n- Conduct roadshow presentations to investors\n\n**2. Pricing and Launch:**\n- Set initial share price based on demand\n- Allocate shares to institutional investors\n- Begin public trading on chosen exchange\n- Monitor post-IPO price performance\n\n**Extended Hours Trading:**\n- Pre-market: 4:00 AM - 9:30 AM ET\n- After-hours: 4:00 PM - 8:00 PM ET\n- Lower liquidity and higher volatility\n- Limited order types available\n\n**Market Regulation:**\n- Securities and Exchange Commission (SEC) oversight\n- Financial Industry Regulatory Authority (FINRA)\n- Anti-fraud and manipulation protections\n- Disclosure requirements for public companies\n\n**Key Market Indices:**\n- S&P 500: 500 largest US companies\n- Dow Jones: 30 blue-chip companies\n- NASDAQ Composite: All NASDAQ-listed stocks\n- Russell 2000: Small-cap companies\n\nUnderstanding these fundamental concepts provides the foundation for making informed investment decisions and navigating the complexities of modern stock markets."
          },
          { 
            id: "s-l3", 
            title: "Types of Stocks", 
            type: "quiz" as const, 
            duration: "12 questions", 
            completed: true,
            quizQuestions: [
              {
                id: "q1",
                question: "What rights do shareholders typically have?",
                options: ["Only dividend rights", "Voting rights and potential dividends", "Management control only", "No rights"],
                correctAnswer: 1,
                explanation: "Shareholders typically have voting rights on major company decisions and may receive dividends if the company pays them."
              },
              {
                id: "q2",
                question: "Which exchange is known for technology companies?",
                options: ["NYSE", "NASDAQ", "LSE", "TSX"],
                correctAnswer: 1,
                explanation: "NASDAQ is known for being technology-focused and is home to major tech companies like Google, Facebook, and Tesla."
              }
            ]
          }
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
            content: "Technical analysis is the study of price charts, trading volumes, and market behavior to predict future stock movements. This methodology relies on the principle that historical price patterns tend to repeat due to consistent human psychology in trading.\n\n**Core Principles of Technical Analysis:**\n\n**1. Price Discounts Everything:**\n- All available information is reflected in current stock price\n- News, earnings, and market sentiment are already factored in\n- Focus on price action rather than external factors\n\n**2. Prices Move in Trends:**\n- Uptrends: Series of higher highs and higher lows\n- Downtrends: Series of lower highs and lower lows\n- Sideways trends: Price moves within a range\n\n**3. History Repeats:**\n- Human emotions drive similar patterns\n- Fear and greed create predictable behaviors\n- Past patterns provide insights into future movements\n\n**Key Technical Indicators:**\n\n**Moving Averages:**\n- Simple Moving Average (SMA): Average price over specific periods\n- Exponential Moving Average (EMA): Gives more weight to recent prices\n- Common periods: 20, 50, 100, 200 days\n- Crossovers signal potential trend changes\n\n**Relative Strength Index (RSI):**\n- Measures momentum on scale of 0-100\n- Above 70: Potentially overbought (sell signal)\n- Below 30: Potentially oversold (buy signal)\n- Divergence with price indicates potential reversal\n\n**MACD (Moving Average Convergence Divergence):**\n- Shows relationship between two moving averages\n- MACD line: 12-day EMA minus 26-day EMA\n- Signal line: 9-day EMA of MACD line\n- Histogram: Difference between MACD and signal lines\n- Crossovers indicate momentum changes\n\n**Bollinger Bands:**\n- Middle band: 20-day SMA\n- Upper/lower bands: 2 standard deviations from middle\n- Price touching upper band: Potentially overbought\n- Price touching lower band: Potentially oversold\n- Band squeeze indicates low volatility before major moves\n\n**Volume Indicators:**\n- On-Balance Volume (OBV): Confirms price trends\n- Volume Rate of Change: Measures volume momentum\n- High volume confirms price movements\n- Low volume suggests weak trends\n\n**Support and Resistance:**\n\n**Support Levels:**\n- Price levels where buying interest emerges\n- Previous lows often become support\n- Psychological price levels (round numbers)\n- Moving averages can act as dynamic support\n\n**Resistance Levels:**\n- Price levels where selling pressure increases\n- Previous highs often become resistance\n- High-volume price areas create resistance\n- Breaking resistance often leads to continued upward movement\n\n**Chart Patterns:**\n\n**Reversal Patterns:**\n- Head and Shoulders: Bearish reversal pattern\n- Inverse Head and Shoulders: Bullish reversal\n- Double Top/Bottom: Reversal patterns at extremes\n- Triple Top/Bottom: Strong reversal signals\n\n**Continuation Patterns:**\n- Triangles: Ascending, descending, symmetrical\n- Flags and Pennants: Brief consolidations in trends\n- Rectangles: Horizontal consolidation patterns\n- Wedges: Rising and falling wedge patterns\n\n**Candlestick Patterns:**\n\n**Single Candlestick Patterns:**\n- Doji: Indecision in the market\n- Hammer: Potential bullish reversal\n- Shooting Star: Potential bearish reversal\n- Spinning Top: Market uncertainty\n\n**Multiple Candlestick Patterns:**\n- Engulfing Patterns: Strong directional signals\n- Harami: Potential trend reversal\n- Morning/Evening Star: Three-candle reversal patterns\n- Three White Soldiers/Black Crows: Strong continuation signals\n\n**Timeframe Analysis:**\n- Daily charts: Swing trading and position trading\n- 4-hour charts: Short-term trend analysis\n- 1-hour charts: Intraday trading decisions\n- 15-minute charts: Scalping and quick trades\n\n**Risk Management in Technical Analysis:**\n- Set stop-losses below support levels\n- Use position sizing based on risk tolerance\n- Confirm signals with multiple indicators\n- Avoid overreliance on single indicators\n\nTechnical analysis provides powerful tools for timing market entries and exits, but should be combined with fundamental analysis for comprehensive investment decisions."
          },
          { 
            id: "s-l6", 
            title: "Stock Valuation Methods", 
            type: "quiz" as const, 
            duration: "10 questions", 
            completed: false,
            quizQuestions: [
              {
                id: "q1",
                question: "What does RSI measure?",
                options: ["Price trends", "Volume changes", "Momentum", "Support levels"],
                correctAnswer: 2,
                explanation: "RSI (Relative Strength Index) measures momentum on a scale of 0-100, helping identify overbought and oversold conditions."
              },
              {
                id: "q2",
                question: "What indicates a potential bullish reversal in candlestick analysis?",
                options: ["Shooting Star", "Hammer", "Hanging Man", "Bearish Engulfing"],
                correctAnswer: 1,
                explanation: "A Hammer candlestick pattern typically indicates a potential bullish reversal, especially when found at the bottom of a downtrend."
              }
            ]
          }
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
            content: "Commodities are raw materials and primary agricultural products that form the building blocks of the global economy. These standardized, interchangeable goods are traded on organized exchanges worldwide and serve as essential inputs for manufacturing, energy production, and food supply.\n\n**Four Major Commodity Categories:**\n\n**1. Energy Commodities:**\n\n**Crude Oil:**\n- Most traded commodity globally\n- Benchmark grades: West Texas Intermediate (WTI), Brent Crude\n- Measured in barrels (42 gallons each)\n- Prices affected by OPEC decisions, geopolitical events, economic growth\n\n**Natural Gas:**\n- Measured in British Thermal Units (BTUs)\n- Seasonal demand patterns (heating/cooling)\n- Pipeline infrastructure affects regional pricing\n- Growing importance due to cleaner energy transition\n\n**Heating Oil and Gasoline:**\n- Refined petroleum products\n- Seasonal demand variations\n- Weather impacts on pricing\n- Regional supply/demand imbalances\n\n**2. Precious and Industrial Metals:**\n\n**Gold:**\n- Traditional store of value and inflation hedge\n- Measured in troy ounces\n- Central bank reserves and jewelry demand\n- Safe-haven asset during market uncertainty\n\n**Silver:**\n- Industrial and investment demand\n- More volatile than gold\n- Photography, electronics, and solar panel applications\n- Gold-to-silver ratio indicates relative value\n\n**Copper:**\n- \"Dr. Copper\" - economic health indicator\n- Essential for construction and electronics\n- China demand significantly impacts prices\n- Supply concerns from major mining regions\n\n**Platinum and Palladium:**\n- Automotive catalytic converter demand\n- Limited supply from South Africa and Russia\n- Electric vehicle transition affects long-term demand\n\n**3. Agricultural Commodities:**\n\n**Grains:**\n- Wheat: Global food staple, weather-sensitive\n- Corn: Food, feed, and ethanol production\n- Soybeans: Protein source and cooking oil\n- Rice: Asian dietary staple\n\n**Soft Commodities:**\n- Coffee: Global beverage crop, climate-sensitive\n- Sugar: Food and ethanol production\n- Cotton: Textile industry raw material\n- Cocoa: Chocolate production input\n\n**4. Livestock:**\n- Live Cattle: Beef production\n- Feeder Cattle: Cattle ready for feedlots\n- Lean Hogs: Pork production\n- Feed costs significantly impact profitability\n\n**Major Commodity Exchanges:**\n\n**Chicago Mercantile Exchange (CME):**\n- Largest commodity exchange\n- Agricultural products, livestock, currencies\n- Energy and metals contracts\n\n**New York Mercantile Exchange (NYMEX):**\n- Energy commodities focus\n- Crude oil, natural gas, heating oil\n- Precious metals trading\n\n**London Metal Exchange (LME):**\n- Industrial metals specialization\n- Physical delivery warehouses globally\n- Aluminum, copper, zinc, lead, nickel, tin\n\n**Intercontinental Exchange (ICE):**\n- Energy and agricultural commodities\n- Brent crude oil benchmark\n- Soft commodities like coffee, sugar, cotton\n\n**Futures Contracts:**\n\n**Contract Specifications:**\n- Standardized quantity and quality\n- Specific delivery months\n- Delivery location and procedures\n- Margin requirements for trading\n\n**Price Factors:**\n\n**Supply Factors:**\n- Weather conditions and natural disasters\n- Production capacity and technology\n- Mining output and agricultural yields\n- Geopolitical events affecting supply chains\n\n**Demand Factors:**\n- Economic growth and industrial production\n- Population growth and dietary changes\n- Infrastructure development projects\n- Alternative product development\n\n**Currency Effects:**\n- Most commodities priced in US dollars\n- Strong dollar typically pressures commodity prices\n- Emerging market currency fluctuations\n- Inflation and purchasing power changes\n\n**Investment Approaches:**\n\n**Physical Ownership:**\n- Direct commodity ownership\n- Storage and insurance costs\n- Quality and delivery considerations\n\n**Futures Trading:**\n- Leveraged exposure to price movements\n- Standardized contracts and specifications\n- Margin requirements and daily settlements\n\n**ETFs and ETNs:**\n- Commodity exposure through securities\n- Diversified commodity baskets\n- Lower barrier to entry for investors\n\n**Commodity Stocks:**\n- Mining and energy company shares\n- Indirect commodity exposure\n- Company-specific risks and management factors\n\nCommodity markets provide essential price discovery for global trade, enable risk management for producers and consumers, and offer portfolio diversification opportunities for investors seeking inflation protection and alternative asset exposure."
          },
          { 
            id: "cm-l3", 
            title: "Types of Commodities Quiz", 
            type: "quiz" as const, 
            duration: "8 questions", 
            completed: false,
            quizQuestions: [
              {
                id: "q1",
                question: "Which commodity is often called 'Dr. Copper'?",
                options: ["Gold", "Silver", "Copper", "Aluminum"],
                correctAnswer: 2,
                explanation: "Copper is called 'Dr. Copper' because its price movements are considered a reliable indicator of global economic health."
              },
              {
                id: "q2",
                question: "What are the two main benchmark grades for crude oil?",
                options: ["WTI and Dubai", "Brent and OPEC", "WTI and Brent", "Brent and Russian"],
                correctAnswer: 2,
                explanation: "West Texas Intermediate (WTI) and Brent Crude are the two main benchmark grades for crude oil pricing globally."
              }
            ]
          }
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
            content: "Mutual funds pool money from multiple investors to create diversified portfolios managed by professional fund managers. Understanding different fund types helps investors choose investments that align with their goals, risk tolerance, and time horizon.\n\n**Equity Funds (Stock Funds):**\n\n**By Market Capitalization:**\n\n**Large-Cap Funds:**\n- Invest in companies with market value > $10 billion\n- Examples: Apple, Microsoft, Amazon, Google\n- Lower volatility and more stable returns\n- Suitable for conservative equity investors\n- Often pay regular dividends\n\n**Mid-Cap Funds:**\n- Companies with market value $2-10 billion\n- Balance between growth potential and stability\n- Higher growth potential than large-cap\n- More volatile than large-cap funds\n- Examples: mid-size regional banks, growing retailers\n\n**Small-Cap Funds:**\n- Companies with market value < $2 billion\n- Highest growth potential and volatility\n- Can outperform during economic expansions\n- Greater risk of bankruptcy or failure\n- Suitable for aggressive, long-term investors\n\n**By Investment Philosophy:**\n\n**Growth Funds:**\n- Focus on companies with above-average growth rates\n- Emphasis on revenue and earnings growth\n- Typically don't pay dividends (reinvest profits)\n- Higher price-to-earnings ratios\n- Technology and biotech companies common\n\n**Value Funds:**\n- Target undervalued companies trading below intrinsic value\n- Low price-to-book and price-to-earnings ratios\n- Often mature companies in traditional industries\n- May pay higher dividends\n- Contrarian investment approach\n\n**Blend Funds:**\n- Combine growth and value strategies\n- Diversified approach across investment styles\n- Moderate risk and return expectations\n- Suitable for investors seeking balanced exposure\n\n**Bond Funds (Fixed-Income Funds):**\n\n**By Credit Quality:**\n\n**Government Bond Funds:**\n- US Treasury bonds and government agency debt\n- Highest credit quality and lowest default risk\n- Lower yields but maximum safety\n- Interest rate sensitive\n\n**Corporate Bond Funds:**\n- Investment-grade corporate debt (BBB- and above)\n- Higher yields than government bonds\n- Credit risk from corporate defaults\n- Diversification across industries and issuers\n\n**High-Yield Bond Funds:**\n- Below investment-grade bonds (junk bonds)\n- Higher yields to compensate for default risk\n- More volatile than investment-grade bonds\n- Economic cycle sensitive\n\n**By Duration:**\n\n**Short-Term Bond Funds:**\n- Average maturity 1-3 years\n- Lower interest rate sensitivity\n- More stable principal value\n- Lower yields in normal interest rate environments\n\n**Intermediate-Term Bond Funds:**\n- Average maturity 3-10 years\n- Moderate interest rate sensitivity\n- Balance between yield and price stability\n- Most popular bond fund category\n\n**Long-Term Bond Funds:**\n- Average maturity 10+ years\n- Highest interest rate sensitivity\n- Higher yields but greater price volatility\n- Suitable for long-term income investors\n\n**Specialized Bond Funds:**\n\n**Municipal Bond Funds:**\n- State and local government debt\n- Tax-free interest income for federal taxes\n- State-specific funds avoid state taxes\n- Higher effective yields for high-tax-bracket investors\n\n**International Bond Funds:**\n- Foreign government and corporate bonds\n- Currency risk in addition to credit and interest rate risk\n- Diversification benefits for US investors\n- Emerging market bond funds offer higher yields\n\n**Money Market Funds:**\n- Short-term, high-quality debt instruments\n- Treasury bills, commercial paper, CDs\n- Stable $1.00 net asset value target\n- Highest liquidity and capital preservation\n- Very low yields but minimal risk\n\n**Balanced and Asset Allocation Funds:**\n\n**Balanced Funds:**\n- Fixed stock and bond allocation (e.g., 60/40)\n- Professional rebalancing maintains target allocation\n- Single fund provides diversified portfolio\n- Conservative to moderate risk profiles\n\n**Target-Date Funds:**\n- Automatically adjust allocation based on retirement date\n- Become more conservative as target date approaches\n- \"Glide path\" reduces equity exposure over time\n- Popular in 401(k) retirement plans\n- Set-and-forget investment approach\n\n**Specialty Funds:**\n\n**Index Funds:**\n- Passively track specific market indices\n- Examples: S&P 500, Total Stock Market, FTSE Developed Markets\n- Low expense ratios (often < 0.20%)\n- No active management decisions\n- Broad market diversification\n\n**Sector Funds:**\n- Concentrate in specific industry sectors\n- Technology, healthcare, financial services, utilities\n- Higher risk due to lack of sector diversification\n- Suitable for tactical allocation strategies\n\n**International and Global Funds:**\n- Geographic diversification outside home country\n- Developed market funds: Europe, Japan, Australia\n- Emerging market funds: China, India, Brazil\n- Currency risk and political risk considerations\n\n**Real Estate Investment Trust (REIT) Funds:**\n- Invest in publicly traded real estate companies\n- Commercial real estate exposure\n- Regular dividend income from rental income\n- Inflation hedge characteristics\n\n**Active vs. Passive Management:**\n\n**Actively Managed Funds:**\n- Professional managers make investment decisions\n- Attempt to outperform benchmark indices\n- Higher expense ratios (typically 0.50-1.50%)\n- Manager selection and style consistency important\n\n**Passively Managed (Index) Funds:**\n- Track specific indices without active decisions\n- Lower costs and tax efficiency\n- Guaranteed market returns minus expenses\n- Growing popularity due to cost advantages\n\n**Fund Selection Considerations:**\n- Investment objectives and time horizon\n- Risk tolerance and experience level\n- Expense ratios and fee structures\n- Tax implications and account types\n- Manager tenure and fund company reputation\n- Asset allocation needs and existing holdings\n\nChoosing appropriate mutual fund types creates the foundation for successful long-term investing, providing professional management, diversification, and access to various asset classes and investment strategies."
          },
          { 
            id: "mf-l3", 
            title: "Mutual Fund Fees", 
            type: "quiz" as const, 
            duration: "9 questions", 
            completed: false,
            quizQuestions: [
              {
                id: "q1",
                question: "Which type of fund typically has the lowest expense ratios?",
                options: ["Actively managed funds", "Index funds", "Sector funds", "International funds"],
                correctAnswer: 1,
                explanation: "Index funds typically have the lowest expense ratios because they require no active management and simply track an index."
              },
              {
                id: "q2",
                question: "What is the main characteristic of target-date funds?",
                options: ["Fixed allocation", "Sector concentration", "Automatic rebalancing based on target retirement date", "High dividends"],
                correctAnswer: 2,
                explanation: "Target-date funds automatically adjust their asset allocation to become more conservative as the target retirement date approaches."
              }
            ]
          }
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
            content: "Revenue streams are the various methods through which businesses generate income from their customers. Understanding different revenue models is crucial for building sustainable businesses and making informed investment decisions.\n\n**Traditional Revenue Models:**\n\n**1. Product Sales:**\n- One-time transaction for physical or digital goods\n- Examples: Retail stores, e-commerce, software licenses\n- Advantages: Immediate revenue, familiar to customers\n- Challenges: Requires continuous customer acquisition\n- Considerations: Inventory management, production costs, distribution\n\n**2. Service-Based Revenue:**\n- Generate income through professional services\n- Examples: Consulting, legal services, healthcare, education\n- Pricing models: Hourly rates, project fees, retainer agreements\n- Advantages: High margins, relationship-based, expertise leverage\n- Challenges: Time-intensive, scaling limitations, client dependency\n\n**Modern Recurring Revenue Models:**\n\n**3. Subscription Models:**\n- Recurring payments for ongoing access to products/services\n- Examples: Netflix, Spotify, Software-as-a-Service (SaaS)\n- Benefits: Predictable revenue, high customer lifetime value\n- Metrics: Monthly Recurring Revenue (MRR), churn rate, customer acquisition cost\n- Success factors: Continuous value delivery, low switching costs\n\n**4. Freemium Models:**\n- Basic service free, premium features require payment\n- Examples: Dropbox, LinkedIn, mobile games\n- Conversion funnel: Free users → engaged users → paying customers\n- Key metrics: Free-to-paid conversion rate, feature usage analytics\n- Challenges: High infrastructure costs for free users\n\n**Platform and Marketplace Revenue:**\n\n**5. Transaction Fees:**\n- Percentage of each transaction processed through platform\n- Examples: PayPal, Stripe, Amazon Marketplace, Uber\n- Advantages: Revenue scales with platform growth\n- Network effects: More users attract more participants\n- Revenue share: Typically 2-30% depending on value provided\n\n**6. Commission Models:**\n- Percentage of sales generated through referrals or platforms\n- Examples: Real estate, affiliate marketing, sales agents\n- Performance-based compensation aligns interests\n- Variable income based on results achieved\n- Common in sales-intensive industries\n\n**Advertising and Media Revenue:**\n\n**7. Advertising Revenue:**\n- Income from displaying advertisements to audience\n- Models: Cost-per-click (CPC), cost-per-impression (CPM), cost-per-action (CPA)\n- Examples: Google, Facebook, traditional media\n- Metrics: Click-through rates, audience demographics, engagement\n- Challenges: Ad blocking, privacy regulations, content quality\n\n**8. Sponsorship and Partnerships:**\n- Brands pay for association with content or events\n- Examples: Sports sponsorships, influencer partnerships, podcast sponsors\n- Value proposition: Access to specific audiences\n- Long-term relationships often more valuable than one-time deals\n\n**Intellectual Property Revenue:**\n\n**9. Licensing Models:**\n- Generate fees for allowing use of intellectual property\n- Examples: Patent licensing, trademark usage, content licensing\n- Advantages: Passive income, low marginal costs\n- Considerations: Legal protection, enforcement costs\n- Industries: Technology, entertainment, pharmaceuticals\n\n**10. Royalty Arrangements:**\n- Ongoing payments based on usage or sales\n- Examples: Music royalties, book publishing, franchising\n- Percentage of revenue or fixed payment per unit\n- Long-term income streams from initial creation\n\n**Emerging Digital Revenue Models:**\n\n**11. Data Monetization:**\n- Generate revenue from user data and insights\n- Examples: Market research, targeted advertising, analytics services\n- Privacy considerations and regulatory compliance\n- Value creation through data aggregation and analysis\n\n**12. Cryptocurrency and Tokenization:**\n- Revenue through token sales, transaction fees, staking rewards\n- Examples: Cryptocurrency exchanges, DeFi protocols, NFT marketplaces\n- Emerging regulatory landscape\n- High volatility and technical complexity\n\n**Revenue Stream Diversification Strategies:**\n\n**Multiple Revenue Streams:**\n- Reduce dependence on single income source\n- Examples: Amazon (e-commerce, cloud services, advertising, Prime)\n- Cross-selling and upselling opportunities\n- Risk mitigation through diversification\n\n**Bundling Strategies:**\n- Combine multiple products/services into packages\n- Examples: Microsoft Office, cable TV packages, gym memberships\n- Higher customer lifetime value\n- Reduced churn through multiple touchpoints\n\n**Revenue Model Selection Factors:**\n\n**Customer Preferences:**\n- Payment willingness and frequency\n- Value perception and price sensitivity\n- Convenience and ease of purchase\n\n**Market Dynamics:**\n- Competitive landscape and pricing pressure\n- Industry standards and customer expectations\n- Regulatory environment and compliance requirements\n\n**Business Characteristics:**\n- Fixed vs. variable cost structure\n- Scalability requirements and growth objectives\n- Cash flow needs and working capital\n\n**Financial Metrics and KPIs:**\n\n**Customer Metrics:**\n- Customer Acquisition Cost (CAC)\n- Customer Lifetime Value (CLV)\n- CAC payback period\n- Net Promoter Score (NPS)\n\n**Revenue Metrics:**\n- Monthly/Annual Recurring Revenue (MRR/ARR)\n- Revenue growth rate\n- Average revenue per user (ARPU)\n- Churn rate and retention metrics\n\n**Profitability Metrics:**\n- Gross margin by revenue stream\n- Operating margin and EBITDA\n- Unit economics and contribution margin\n\nSuccessful businesses often combine multiple revenue streams to create sustainable, scalable, and defensible business models that can adapt to changing market conditions and customer needs."
          },
          { 
            id: "b-l3", 
            title: "Business Structure Quiz", 
            type: "quiz" as const, 
            duration: "12 questions", 
            completed: false,
            quizQuestions: [
              {
                id: "q1",
                question: "What is the main advantage of subscription revenue models?",
                options: ["Higher one-time payments", "Predictable recurring revenue", "Lower customer acquisition costs", "No customer service needed"],
                correctAnswer: 1,
                explanation: "Subscription models provide predictable recurring revenue, which helps with cash flow planning and business valuation."
              },
              {
                id: "q2",
                question: "Which revenue model involves offering basic services for free?",
                options: ["Licensing", "Commission", "Freemium", "Transaction fees"],
                correctAnswer: 2,
                explanation: "Freemium models offer basic services for free while charging for premium features, aiming to convert free users to paying customers."
              }
            ]
          }
        ]
      }
    ]
  }
];
