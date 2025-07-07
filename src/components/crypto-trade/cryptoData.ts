
export interface CryptoAsset {
  symbol: string;
  name: string;
  price: number;
  change: string;
  changePositive: boolean;
  icon: string;
  color: string;
  available: number;
}

export const cryptoAssets: CryptoAsset[] = [
  {
    symbol: 'ETH',
    name: 'Ethereum',
    price: 45000.00,
    change: '+5.2%',
    changePositive: true,
    icon: 'Ξ',
    color: '#627eea',
    available: 2.4567
  },
  {
    symbol: 'BTC',
    name: 'Bitcoin',
    price: 1250000.00,
    change: '+2.5%',
    changePositive: true,
    icon: '₿',
    color: '#f7931a',
    available: 0.08945
  },
  {
    symbol: 'XRP',
    name: 'Ripple',
    price: 12.50,
    change: '+3.8%',
    changePositive: true,
    icon: '◊',
    color: '#23292f',
    available: 1250.75
  },
  {
    symbol: 'XLM',
    name: 'Stellar',
    price: 2.15,
    change: '+1.9%',
    changePositive: true,
    icon: '⭐',
    color: '#14b6e7',
    available: 850.25
  },
  {
    symbol: 'LTC',
    name: 'Litecoin',
    price: 1850.00,
    change: '-1.5%',
    changePositive: false,
    icon: 'Ł',
    color: '#345d9d',
    available: 5.7823
  },
  {
    symbol: 'SOL',
    name: 'Solana',
    price: 3200.00,
    change: '+7.2%',
    changePositive: true,
    icon: '◎',
    color: '#9945ff',
    available: 12.346
  },
  {
    symbol: 'TON',
    name: 'Toncoin',
    price: 95.50,
    change: '+4.1%',
    changePositive: true,
    icon: '💎',
    color: '#0088cc',
    available: 45.125
  },
  {
    symbol: 'BNB',
    name: 'BNB',
    price: 8500.00,
    change: '+2.8%',
    changePositive: true,
    icon: '🔶',
    color: '#f3ba2f',
    available: 3.2456
  }
];
