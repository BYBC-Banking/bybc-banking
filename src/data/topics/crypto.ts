import { Topic } from "../topicsData";

const crypto: Topic = {
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
};

export default crypto;
