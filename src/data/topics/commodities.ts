import { Topic } from "../topicsData";

const commodities: Topic = {
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
};

export default commodities;
