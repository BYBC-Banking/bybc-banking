
export const generateWalletAddress = (selectedCrypto: string): string => {
  const cryptoAddresses: Record<string, string> = {
    'BTC': '1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa',
    'ETH': '0x742d35Cc6634C0532925a3b8D92d2463FD5e2384',
    'XRP': 'rN7n7otQDd6FczFgLdSqtcsAUxDkw6fzRH',
    'XLM': 'GDQP2KPQGKIHYJGXNUIYOMHARUARCA7DJT5FO2FFOOKY3B2WSQHG4W37',
    'LTC': 'LdP8Qox1VAhCzLJNqrr74YovaWYyNBUWvL',
    'SOL': '7xKXtg2CW87d97TXJSDpbD5jBkheTqA83TZRuJosgAsU',
    'TON': 'EQD7wjQKLLiLT7QYhTdp7xPJfmwHlQMYGqHT8PhTxRJf8cFm',
    'BNB': 'bnb1grpf0955h0ykzq3ar5nmum7y6gdfl6lxfn46h2'
  };
  return cryptoAddresses[selectedCrypto] || cryptoAddresses['BTC'];
};

export const getNetworkName = (selectedCrypto: string): string => {
  const networks: Record<string, string> = {
    'BTC': 'Bitcoin Mainnet',
    'ETH': 'Ethereum Mainnet',
    'XRP': 'XRP Ledger',
    'XLM': 'Stellar Network',
    'LTC': 'Litecoin Network',
    'SOL': 'Solana Mainnet',
    'TON': 'TON Blockchain',
    'BNB': 'BNB Smart Chain'
  };
  return networks[selectedCrypto] || 'Bitcoin Mainnet';
};

export const copyToClipboard = (text: string): void => {
  navigator.clipboard?.writeText(text);
};

export const calculateConversion = (
  amount: string,
  amountType: 'crypto' | 'fiat',
  selectedCryptoData: { price: number } | undefined
) => {
  if (!amount || !selectedCryptoData) return { crypto: '0', fiat: 'R0.00' };
  
  const numAmount = parseFloat(amount);
  if (amountType === 'crypto') {
    const fiatValue = numAmount * selectedCryptoData.price;
    const cryptoVal = numAmount.toString();
    const fiatVal = `R${fiatValue.toLocaleString('en-ZA', { minimumFractionDigits: 2 })}`;
    
    return {
      crypto: cryptoVal,
      fiat: fiatVal
    };
  } else {
    const cryptoValue = numAmount / selectedCryptoData.price;
    const cryptoVal = cryptoValue.toFixed(8);
    const fiatVal = `R${numAmount.toLocaleString('en-ZA', { minimumFractionDigits: 2 })}`;
    
    return {
      crypto: cryptoVal,
      fiat: fiatVal
    };
  }
};
