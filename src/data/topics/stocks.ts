import { Topic } from "../topicsData";

const stocks: Topic = {
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
};

export default stocks;
