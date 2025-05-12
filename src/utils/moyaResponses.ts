
import { Message } from "@/components/MoyaMessage";

// Get demo response based on user input
export const getDemoResponse = (text: string): Message[] => {
  const lowerText = text.toLowerCase();
  
  if (lowerText.includes("invest") || lowerText.includes("stock")) {
    // Example of multiple message types including a chart
    return [
      {
        id: Date.now().toString() + "-1",
        type: "assistant",
        content: {
          type: "text",
          text: "Based on your risk profile, I recommend considering these investment options:"
        },
        timestamp: new Date()
      },
      {
        id: Date.now().toString() + "-2",
        type: "assistant",
        content: {
          type: "chart",
          text: "Expected Returns (5 Year Projection)",
          data: [
            { name: 'Year 1', value: 105, comparison: 103 },
            { name: 'Year 2', value: 110, comparison: 106 },
            { name: 'Year 3', value: 118, comparison: 110 },
            { name: 'Year 4', value: 125, comparison: 113 },
            { name: 'Year 5', value: 132, comparison: 117 }
          ]
        },
        timestamp: new Date()
      }
    ];
  } else if (lowerText.includes("compare") || lowerText.includes("vs")) {
    // Example of comparison view
    return [{
      id: Date.now().toString(),
      type: "assistant",
      content: {
        type: "comparison",
        text: "Comparison: Savings Account vs Unit Trust Investment",
        data: {
          option1Name: "Savings",
          option2Name: "Unit Trust",
          items: [
            { label: "Annual Return", value1: "3.5%", value2: "8-12%", highlight: "second" },
            { label: "Risk Level", value1: "Very Low", value2: "Medium", highlight: null },
            { label: "Access to Funds", value1: "Immediate", value2: "1-3 Days", highlight: "first" },
            { label: "Minimum Investment", value1: "R0", value2: "R500", highlight: null }
          ]
        }
      },
      timestamp: new Date()
    }];
  } else if (lowerText.includes("term") || lowerText.includes("mean") || lowerText.includes("what is")) {
    // Example of definition
    return [{
      id: Date.now().toString(),
      type: "assistant",
      content: {
        type: "definition",
        text: "Compound Interest",
        data: {
          definition: "Compound interest is the interest calculated on the initial principal and also on the accumulated interest from previous periods. It's essentially 'interest on interest' and makes your money grow faster than simple interest."
        }
      },
      timestamp: new Date()
    }];
  } else {
    // Default text response
    return [{
      id: Date.now().toString(),
      type: "assistant",
      content: {
        type: "text",
        text: "I'm here to help with your financial questions. You can ask me about investments, savings, budgeting, financial terms, or comparing financial products!"
      },
      timestamp: new Date()
    }];
  }
};
