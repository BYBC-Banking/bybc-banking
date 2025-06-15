import { Topic } from "../topicsData";

const mutualFunds: Topic = {
  id: "mutual-funds",
  title: "Mutual Funds",
  description: "Learn about pooled investment vehicles managed by professionals",
  levels: ["All", "Beginner", "Intermediate", "Advanced"],
  icon: "/lovable-uploads/fe8e6a52-f0e8-4543-95fe-e066b01acec5.png",
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
};

export default mutualFunds;
