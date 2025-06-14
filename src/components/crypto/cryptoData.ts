// Mock crypto data
export const cryptoAssets = [
  {
    id: "bitcoin",
    name: "Bitcoin",
    ticker: "BTC",
    price: 1145632.50,
    change: 2.5,
    isPositive: true,
    marketCap: "22.4T",
    chartData: [
      { time: "09:00", price: 1120000.00 },
      { time: "10:00", price: 1125500.25 },
      { time: "11:00", price: 1132000.10 },
      { time: "12:00", price: 1138500.35 },
      { time: "13:00", price: 1142000.12 },
      { time: "14:00", price: 1145632.50 },
    ],
  },
  {
    id: "ethereum",
    name: "Ethereum",
    ticker: "ETH",
    price: 68547.80,
    change: -1.2,
    isPositive: false,
    marketCap: "8.2T",
    chartData: [
      { time: "09:00", price: 69500.30 },
      { time: "10:00", price: 69200.75 },
      { time: "11:00", price: 68900.45 },
      { time: "12:00", price: 68750.80 },
      { time: "13:00", price: 68600.15 },
      { time: "14:00", price: 68547.80 },
    ],
  },
  {
    id: "ripple",
    name: "Ripple",
    ticker: "XRP",
    price: 8.52,
    change: 5.8,
    isPositive: true,
    marketCap: "480B",
    chartData: [
      { time: "09:00", price: 8.05 },
      { time: "10:00", price: 8.15 },
      { time: "11:00", price: 8.25 },
      { time: "12:00", price: 8.35 },
      { time: "13:00", price: 8.45 },
      { time: "14:00", price: 8.52 },
    ],
  },
  {
    id: "cardano",
    name: "Cardano",
    ticker: "ADA",
    price: 6.22,
    change: 0.8,
    isPositive: true,
    marketCap: "220B",
    chartData: [
      { time: "09:00", price: 6.17 },
      { time: "10:00", price: 6.18 },
      { time: "11:00", price: 6.19 },
      { time: "12:00", price: 6.20 },
      { time: "13:00", price: 6.21 },
      { time: "14:00", price: 6.22 },
    ],
  },
  {
    id: "polkadot",
    name: "Polkadot",
    ticker: "DOT",
    price: 95.45,
    change: -2.1,
    isPositive: false,
    marketCap: "125B",
    chartData: [
      { time: "09:00", price: 97.50 },
      { time: "10:00", price: 96.85 },
      { time: "11:00", price: 96.40 },
      { time: "12:00", price: 96.10 },
      { time: "13:00", price: 95.70 },
      { time: "14:00", price: 95.45 },
    ],
  }
];

// Updated categories as requested: add "Favourite" between All and Gainers, remove others
export const categories = ["All", "Favourite", "Gainers", "Losers"];
