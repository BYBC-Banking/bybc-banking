import { Topic } from "../topicsData";

const business: Topic = {
  id: "business",
  title: "Business",
  description: "Understand fundamentals of running and investing in businesses",
  levels: ["All", "Beginner", "Intermediate", "Advanced"],
  icon: "/lovable-uploads/cb2459ff-c484-446d-9e80-f61bda48c625.png",
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
};

export default business;
