
import React, { useState, useEffect } from 'react';
import { TrendingUp, TrendingDown, ArrowUpDown, DollarSign, Bitcoin, Clock, Copy, Shield, AlertTriangle } from 'lucide-react';

const CryptoTradePage = () => {
  const [activeTab, setActiveTab] = useState('buy');
  const [selectedCrypto, setSelectedCrypto] = useState('ETH');
  const [amount, setAmount] = useState('');
  const [amountType, setAmountType] = useState('crypto');
  const [showDropdown, setShowDropdown] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [showPreApproval, setShowPreApproval] = useState(false);
  const [countdown, setCountdown] = useState(30);
  const [payAmount, setPayAmount] = useState('');
  const [receiveAmount, setReceiveAmount] = useState('');

  const cryptos = [
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

  const selectedCryptoData = cryptos.find(crypto => crypto.symbol === selectedCrypto);

  const calculateConversion = () => {
    if (!amount || !selectedCryptoData) return { crypto: '0', fiat: 'R0.00' };
    
    const numAmount = parseFloat(amount);
    if (amountType === 'crypto') {
      const fiatValue = numAmount * selectedCryptoData.price;
      const cryptoVal = numAmount.toString();
      const fiatVal = `R${fiatValue.toLocaleString('en-ZA', { minimumFractionDigits: 2 })}`;
      
      // Update pay/receive amounts if they're empty
      if (!payAmount && !receiveAmount) {
        setPayAmount(activeTab === 'buy' ? fiatVal : cryptoVal);
        setReceiveAmount(activeTab === 'buy' ? cryptoVal : fiatVal);
      }
      
      return {
        crypto: cryptoVal,
        fiat: fiatVal
      };
    } else {
      const cryptoValue = numAmount / selectedCryptoData.price;
      const cryptoVal = cryptoValue.toFixed(8);
      const fiatVal = `R${numAmount.toLocaleString('en-ZA', { minimumFractionDigits: 2 })}`;
      
      // Update pay/receive amounts if they're empty
      if (!payAmount && !receiveAmount) {
        setPayAmount(activeTab === 'buy' ? fiatVal : cryptoVal);
        setReceiveAmount(activeTab === 'buy' ? cryptoVal : fiatVal);
      }
      
      return {
        crypto: cryptoVal,
        fiat: fiatVal
      };
    }
  };

  const conversion = calculateConversion();

  // Countdown timer effect for pre-approval modal
  useEffect(() => {
    let timer;
    if (showPreApproval && countdown > 0) {
      timer = setTimeout(() => setCountdown(countdown - 1), 1000);
    } else if (countdown === 0) {
      setShowPreApproval(false);
      setCountdown(30);
    }
    return () => clearTimeout(timer);
  }, [showPreApproval, countdown]);

  // Generate mock wallet address
  const generateWalletAddress = () => {
    const cryptoAddresses = {
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

  const getNetworkName = () => {
    const networks = {
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

  const copyToClipboard = (text) => {
    navigator.clipboard?.writeText(text);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <style>{`
        .slider::-webkit-slider-thumb {
          appearance: none;
          height: 20px;
          width: 20px;
          border-radius: 50%;
          background: #f59e0b;
          cursor: pointer;
          border: 2px solid white;
          box-shadow: 0 2px 4px rgba(0,0,0,0.2);
        }
        .slider::-moz-range-thumb {
          height: 20px;
          width: 20px;
          border-radius: 50%;
          background: #f59e0b;
          cursor: pointer;
          border: 2px solid white;
          box-shadow: 0 2px 4px rgba(0,0,0,0.2);
        }
      `}</style>
      
      {/* Buy/Sell Toggle */}
      <div className="px-6 py-4">
        <div className="bg-slate-700 rounded-full p-1 flex relative">
          <button
            onClick={() => setActiveTab('buy')}
            className={`flex-1 py-3 px-6 rounded-full font-medium transition-all duration-300 relative z-10 ${
              activeTab === 'buy'
                ? 'text-white'
                : 'text-gray-400'
            }`}
          >
            Buy
          </button>
          <button
            onClick={() => setActiveTab('sell')}
            className={`flex-1 py-3 px-6 rounded-full font-medium transition-all duration-300 relative z-10 ${
              activeTab === 'sell'
                ? 'text-white'
                : 'text-gray-400'
            }`}
          >
            Sell
          </button>
          <div
            className={`absolute top-1 bottom-1 w-1/2 rounded-full transition-all duration-300 ease-in-out ${
              activeTab === 'buy' 
                ? 'left-1 bg-green-500' 
                : 'left-1/2 bg-red-500'
            }`}
            style={{ 
              transform: activeTab === 'buy' ? 'translateX(0)' : 'translateX(-1px)'
            }}
          />
        </div>
      </div>

      {/* Available Assets Dropdown */}
      <div className="px-6 mb-4">
        <div className="relative">
          <h3 className="text-md font-medium text-slate-800 mb-3">Available Assets</h3>
          
          {/* Dropdown Trigger */}
          <button
            onClick={() => setShowDropdown(!showDropdown)}
            className="w-full bg-slate-700 rounded-2xl p-4 flex items-center justify-between text-white hover:bg-slate-600 transition-colors"
          >
            <div className="flex items-center gap-3">
              <div 
                className="w-10 h-10 rounded-xl flex items-center justify-center text-white font-bold text-lg"
                style={{ backgroundColor: selectedCryptoData?.color }}
              >
                {selectedCryptoData?.icon}
              </div>
              <div className="text-left">
                <p className="text-white font-medium">{selectedCryptoData?.name}</p>
                <p className="text-gray-300 text-sm">
                  Available: {selectedCryptoData?.available} {selectedCryptoData?.symbol}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <p className="text-amber-400 font-semibold text-sm">{selectedCryptoData?.symbol}</p>
              <div className={`transform transition-transform ${showDropdown ? 'rotate-180' : ''}`}>
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M4 6L8 10L12 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
            </div>
          </button>

          {/* Dropdown Content */}
          {showDropdown && (
            <div className="absolute top-full left-0 right-0 mt-2 bg-slate-700 rounded-2xl p-2 shadow-xl z-10 max-h-64 overflow-y-auto">
              {cryptos.filter(crypto => crypto.symbol !== selectedCrypto).map((crypto) => (
                <button
                  key={crypto.symbol}
                  onClick={() => {
                    setSelectedCrypto(crypto.symbol);
                    setShowDropdown(false);
                  }}
                  className="w-full flex items-center justify-between p-3 rounded-xl hover:bg-slate-600 transition-all duration-200"
                >
                  <div className="flex items-center gap-3">
                    <div 
                      className="w-10 h-10 rounded-xl flex items-center justify-center text-white font-bold text-lg"
                      style={{ backgroundColor: crypto.color }}
                    >
                      {crypto.icon}
                    </div>
                    <div className="text-left">
                      <p className="text-white font-medium">{crypto.name}</p>
                      <p className="text-gray-300 text-sm">
                        Available: {crypto.available} {crypto.symbol}
                      </p>
                    </div>
                  </div>
                  <p className="text-amber-400 font-semibold text-sm">{crypto.symbol}</p>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Trading Interface */}
      <div className="px-6 mb-6">
        <div className="bg-white rounded-2xl p-6 shadow-lg">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-slate-800">
              {activeTab === 'buy' ? 'Buy' : 'Sell'} {selectedCryptoData?.name}
            </h3>
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <Clock size={16} />
              Live Price
            </div>
          </div>

          <div className="mb-4">
            <div className="flex rounded-2xl border-2 border-gray-200 overflow-hidden">
              <button
                onClick={() => setAmountType('fiat')}
                className={`px-4 py-3 font-medium transition-colors ${
                  amountType === 'fiat'
                    ? 'bg-amber-500 text-white'
                    : 'bg-gray-50 text-gray-600 hover:bg-gray-100'
                }`}
              >
                ZAR
              </button>
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder={`Enter ${amountType === 'crypto' ? selectedCrypto : 'ZAR'} amount`}
                className="flex-1 px-4 py-3 border-none outline-none text-lg font-semibold"
              />
              <button
                onClick={() => setAmountType('crypto')}
                className={`px-4 py-3 font-medium transition-colors ${
                  amountType === 'crypto'
                    ? 'bg-amber-500 text-white'
                    : 'bg-gray-50 text-gray-600 hover:bg-gray-100'
                }`}
              >
                {selectedCrypto}
              </button>
            </div>
          </div>

          <div className="mb-3">
            <p className="text-gray-600 text-sm mb-1">Available Balance:</p>
            <div className="flex items-center justify-between">
              <span className="text-gray-600 text-sm">
                {activeTab === 'buy' ? 'Cash:' : `${selectedCrypto}:`}
              </span>
              <span className="font-semibold text-slate-800">
                {activeTab === 'buy' ? 'R25,430.50' : `${selectedCryptoData?.available} ${selectedCrypto}`}
              </span>
            </div>
          </div>

          <div className="bg-gray-50 rounded-xl p-4 mb-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-gray-600">You {activeTab === 'buy' ? 'pay' : 'receive'}:</span>
              <input
                type="text"
                value={payAmount || (activeTab === 'buy' ? conversion.fiat : conversion.crypto + ' ' + selectedCrypto)}
                onChange={(e) => setPayAmount(e.target.value)}
                className="text-right font-bold text-slate-800 bg-transparent border-none outline-none"
                placeholder="0"
              />
            </div>
            <div className="flex items-center justify-center my-2">
              <ArrowUpDown size={16} className="text-gray-400" />
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-600">You {activeTab === 'buy' ? 'receive' : 'pay'}:</span>
              <input
                type="text"
                value={receiveAmount || (activeTab === 'buy' ? conversion.crypto + ' ' + selectedCrypto : conversion.fiat)}
                onChange={(e) => setReceiveAmount(e.target.value)}
                className="text-right font-bold text-slate-800 bg-transparent border-none outline-none"
                placeholder="0"
              />
            </div>
          </div>

          {/* Amount Range with Slider */}
          <div className="relative mb-6">
            <div className="flex items-center justify-between text-xs text-gray-600 mb-2">
              <span>R100</span>
              <span>R2,500</span>
              <span>R5,000</span>
              <span>R7,500</span>
              <span>R10,000</span>
            </div>
            <div className="relative">
              <input
                type="range"
                min="100"
                max="10000"
                step="100"
                value={(() => {
                  if (amountType === 'fiat' && amount) {
                    return Math.min(amount, 10000);
                  } else if (amountType === 'crypto' && amount && selectedCryptoData) {
                    return Math.min(parseFloat(amount) * selectedCryptoData.price, 10000).toString();
                  }
                  return '2500';
                })()}
                onChange={(e) => {
                  const fiatValue = e.target.value;
                  
                  // Always switch to ZAR amount type when slider is used
                  setAmountType('fiat');
                  setAmount(fiatValue);
                }}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
                style={{
                  background: (() => {
                    let currentValue;
                    if (amountType === 'fiat' && amount) {
                      currentValue = Math.min(amount, 10000);
                    } else if (amountType === 'crypto' && amount && selectedCryptoData) {
                      currentValue = Math.min(parseFloat(amount) * selectedCryptoData.price, 10000);
                    } else {
                      currentValue = 2500;
                    }
                    const percentage = ((currentValue - 100) / (10000 - 100)) * 100;
                    return `linear-gradient(to right, #f59e0b 0%, #f59e0b ${percentage}%, #e5e7eb ${percentage}%, #e5e7eb 100%)`;
                  })()
                }}
              />
              <div className="flex items-center justify-between mt-1">
                <div className="w-1 h-1 bg-gray-400 rounded-full"></div>
                <div className="w-1 h-1 bg-gray-400 rounded-full"></div>
                <div className="w-1 h-1 bg-gray-400 rounded-full"></div>
                <div className="w-1 h-1 bg-gray-400 rounded-full"></div>
                <div className="w-1 h-1 bg-gray-400 rounded-full"></div>
              </div>
            </div>
          </div>

          <button
            disabled={!amount}
            onClick={() => setShowPreApproval(true)}
            className={`w-full py-4 rounded-2xl font-bold text-lg transition-all duration-300 ${
              amount
                ? activeTab === 'buy' 
                  ? 'bg-green-500 text-white shadow-lg hover:bg-green-600'
                  : 'bg-red-500 text-white shadow-lg hover:bg-red-600'
                : 'bg-gray-200 text-gray-400 cursor-not-allowed'
            }`}
          >
            {activeTab === 'buy' ? `Buy ${selectedCrypto}` : `Sell ${selectedCrypto}`}
          </button>
        </div>
      </div>

      {/* Pre-Approval Confirmation Modal */}
      {showPreApproval && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl p-0 w-full max-w-md max-h-[95vh] overflow-y-auto shadow-2xl transform transition-all duration-300 scale-100">
            
            {/* Header Section */}
            <div className="bg-gradient-to-r from-slate-800 to-slate-700 p-6 text-center relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-amber-400/10 to-transparent"></div>
              <div className="relative z-10">
                <div className="w-16 h-16 bg-white rounded-full mx-auto mb-3 flex items-center justify-center shadow-lg">
                  <div 
                    className="w-10 h-10 rounded-xl flex items-center justify-center text-white font-bold text-lg"
                    style={{ backgroundColor: selectedCryptoData?.color }}
                  >
                    {selectedCryptoData?.icon}
                  </div>
                </div>
                <h2 className="text-xl font-bold text-white mb-1">
                  Confirm Your {activeTab === 'buy' ? 'Purchase' : 'Sale'}
                </h2>
                <p className="text-slate-300 text-sm">
                  {selectedCryptoData?.name} ({selectedCrypto})
                </p>
                
                {/* Countdown Timer */}
                <div className="mt-4 bg-white bg-opacity-15 rounded-lg p-3 backdrop-blur-sm">
                  <div className="flex items-center justify-center gap-2 text-white">
                    <Clock size={16} className="text-amber-300" />
                    <span className="text-sm">Offer valid for</span>
                    <span className="font-bold text-amber-300">{countdown}s</span>
                  </div>
                  <div className="w-full bg-white bg-opacity-20 rounded-full h-1 mt-2">
                    <div 
                      className="bg-amber-400 h-1 rounded-full transition-all duration-1000 ease-linear"
                      style={{ width: `${(countdown / 30) * 100}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>

            {/* Receipt Body */}
            <div className="p-6 bg-white">
              
              {/* Transaction Summary */}
              <div className="bg-slate-50 rounded-2xl p-4 mb-6 border border-slate-200">
                <h3 className="font-semibold text-slate-800 mb-3 flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  Transaction Summary
                </h3>
                
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-slate-600">Amount to {activeTab === 'buy' ? 'Buy' : 'Sell'}</span>
                    <span className="font-bold text-slate-800">
                      {activeTab === 'buy' 
                        ? (receiveAmount || conversion.crypto + ' ' + selectedCrypto)
                        : (payAmount || conversion.crypto + ' ' + selectedCrypto)
                      }
                    </span>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-slate-600">Amount to {activeTab === 'buy' ? 'Pay' : 'Receive'}</span>
                    <span className="font-bold text-lg text-slate-800">
                      {activeTab === 'buy' 
                        ? (payAmount || conversion.fiat)
                        : (receiveAmount || conversion.fiat)
                      }
                    </span>
                  </div>
                </div>
              </div>

              {/* Detailed Breakdown */}
              <div className="mb-6">
                <h4 className="font-semibold text-slate-800 mb-4 border-b border-dashed border-slate-300 pb-2">
                  Detailed Breakdown
                </h4>
                
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between items-center">
                    <span className="text-slate-600">Exchange Rate</span>
                    <span className="font-semibold text-slate-800">
                      1 {selectedCrypto} = R{selectedCryptoData?.price.toLocaleString('en-ZA', { minimumFractionDigits: 2 })}
                    </span>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-slate-600">Platform/Service Fee</span>
                    <span className="font-semibold text-slate-800">R60.00</span>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-slate-600">Network Fee</span>
                    <span className="font-semibold text-slate-800">R50.00</span>
                  </div>
                  
                  <div className="border-t border-dashed border-slate-300 pt-3">
                    <div className="flex justify-between items-center">
                      <span className="font-semibold text-slate-700">Total Fees</span>
                      <span className="font-bold text-slate-800">R110.00</span>
                    </div>
                  </div>
                  
                  <div className="bg-amber-50 border border-amber-200 rounded-lg p-3 mt-3">
                    <div className="flex justify-between items-center">
                      <span className="font-semibold text-amber-800">Final {activeTab === 'buy' ? 'Crypto' : 'Fiat'} to Receive</span>
                      <span className="font-bold text-amber-800">
                        {activeTab === 'buy' 
                          ? ((parseFloat(conversion.crypto) * 0.99).toFixed(8) + ' ' + selectedCrypto)
                          : ('R' + (parseFloat(conversion.fiat.replace('R', '').replace(',', '')) * 0.95).toLocaleString('en-ZA', { minimumFractionDigits: 2 }))
                        }
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Receiving Wallet Information */}
              <div className="mb-6">
                <h4 className="font-semibold text-slate-800 mb-4 border-b border-dashed border-slate-300 pb-2">
                  {activeTab === 'buy' ? 'Receiving' : 'From'} Wallet Information
                </h4>
                
                <div className="bg-slate-50 rounded-lg p-4 space-y-3">
                  <div>
                    <span className="text-xs text-slate-600 block mb-1">Wallet Address</span>
                    <div className="flex items-center justify-between bg-white rounded-lg p-3 border">
                      <span className="font-mono text-sm text-slate-800 truncate mr-2">
                        {generateWalletAddress().substring(0, 20)}...{generateWalletAddress().slice(-6)}
                      </span>
                      <button 
                        onClick={() => copyToClipboard(generateWalletAddress())}
                        className="text-amber-600 hover:text-amber-700 transition-colors p-1"
                      >
                        <Copy size={16} />
                      </button>
                    </div>
                  </div>
                  
                  <div>
                    <span className="text-xs text-slate-600 block mb-1">Network</span>
                    <div className="bg-white rounded-lg p-3 border">
                      <span className="text-sm font-medium text-slate-800">{getNetworkName()}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Compliance Warnings */}
              <div className="mb-6">
                <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
                  <div className="flex items-start gap-3 mb-3">
                    <AlertTriangle size={20} className="text-amber-600 mt-0.5 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-amber-800 text-sm mb-2">Important Notices</h4>
                      <div className="space-y-2 text-xs text-amber-800">
                        <p>• Crypto purchases are final. Ensure wallet address is correct.</p>
                        <p>• Crypto markets are volatile. Rates may fluctuate during processing.</p>
                        <p>• Network fees may adjust due to blockchain congestion.</p>
                        <p>• This transaction may be subject to tax obligations.</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Security Badge */}
              <div className="flex items-center justify-center gap-2 mb-6 text-slate-600">
                <Shield size={16} className="text-green-600" />
                <span className="text-sm font-medium">Secure Transaction</span>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col gap-3">
                <button
                  onClick={() => {
                    setShowPreApproval(false);
                    setShowConfirmation(true);
                    setCountdown(30);
                  }}
                  className={`w-full py-4 rounded-2xl font-bold text-lg transition-all duration-300 ${
                    activeTab === 'buy' 
                      ? 'bg-green-500 text-white shadow-lg hover:bg-green-600'
                      : 'bg-red-500 text-white shadow-lg hover:bg-red-600'
                  }`}
                >
                  ✅ Confirm {activeTab === 'buy' ? 'Purchase' : 'Sale'}
                </button>
                
                <div className="flex gap-3">
                  <button
                    onClick={() => {
                      setShowPreApproval(false);
                      setCountdown(30);
                    }}
                    className="flex-1 py-3 px-4 rounded-xl bg-slate-100 text-slate-700 font-medium hover:bg-slate-200 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => {
                      setShowPreApproval(false);
                      setCountdown(30);
                    }}
                    className="flex-1 py-3 px-4 rounded-xl border border-slate-300 text-slate-700 font-medium hover:bg-slate-50 transition-colors"
                  >
                    Edit Amount
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Receipt-Style Confirmation Modal */}
      {showConfirmation && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-end sm:items-center justify-center z-50 p-0 sm:p-4">
          <div className="bg-white rounded-t-3xl sm:rounded-2xl p-0 w-full sm:max-w-md sm:w-full max-h-[90vh] overflow-y-auto shadow-2xl transform transition-all duration-300 scale-100">
            {/* Header Section */}
            <div className="bg-gradient-to-r from-amber-500 to-amber-600 p-4 sm:p-6 text-center">
              <div className="w-12 h-12 sm:w-16 sm:h-16 bg-white rounded-full mx-auto mb-2 sm:mb-3 flex items-center justify-center">
                <svg className="w-6 h-6 sm:w-8 sm:h-8 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path>
                </svg>
              </div>
              <h2 className="text-lg sm:text-xl font-bold text-white mb-1">Transaction Successful</h2>
              <p className="text-amber-100 text-sm">Order Completed</p>
              <div className="mt-2 sm:mt-3 bg-white bg-opacity-20 rounded-lg p-2">
                <p className="text-xs text-white opacity-90">Transaction Reference</p>
                <p className="text-xs sm:text-sm font-mono text-white">#TX{Math.random().toString(36).substr(2, 9).toUpperCase()}</p>
              </div>
            </div>

            {/* Receipt Body */}
            <div className="p-4 sm:p-6 bg-white">
              {/* BYBC Header */}
              <div className="text-center mb-4 sm:mb-6 border-b border-dashed border-gray-300 pb-3 sm:pb-4">
                <h3 className="text-base sm:text-lg font-bold text-slate-800">BYBC</h3>
                <p className="text-xs text-gray-500">Digital Asset Exchange</p>
                <p className="text-xs text-gray-400 mt-1">{new Date().toLocaleString()}</p>
              </div>

              {/* Transaction Details */}
              <div className="space-y-2 sm:space-y-3 mb-4 sm:mb-6">
                <div className="flex justify-between items-center">
                  <span className="text-xs sm:text-sm text-gray-600">Transaction Reference</span>
                  <span className="font-mono text-xs text-slate-800">#TX{Math.random().toString(36).substr(2, 9).toUpperCase()}</span>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-xs sm:text-sm text-gray-600">Status</span>
                  <span className="font-semibold text-green-600 text-sm">Completed</span>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-xs sm:text-sm text-gray-600">Date</span>
                  <span className="font-semibold text-slate-800 text-sm">
                    {new Date().toLocaleDateString('en-ZA')}
                  </span>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-xs sm:text-sm text-gray-600">Purchased</span>
                  <span className="font-semibold text-slate-800 text-sm">
                    {activeTab === 'buy' 
                      ? (receiveAmount || conversion.crypto + ' ' + selectedCrypto)
                      : (payAmount || conversion.crypto + ' ' + selectedCrypto)
                    }
                  </span>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-xs sm:text-sm text-gray-600">Amount Paid (ZAR)</span>
                  <span className="font-bold text-slate-800 text-base sm:text-lg">
                    {activeTab === 'buy' 
                      ? (payAmount || conversion.fiat)
                      : (receiveAmount || conversion.fiat)
                    }
                  </span>
                </div>
              </div>

              {/* Fees & Charges Section */}
              <div className="mb-4 sm:mb-6">
                <h4 className="text-sm sm:text-md font-semibold text-slate-800 mb-2 sm:mb-3 border-b border-dashed border-gray-300 pb-2">
                  Fees & Charges
                </h4>
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-xs sm:text-sm text-gray-600">Platform/Exchange Fee</span>
                    <span className="font-semibold text-slate-800 text-sm">R25.00</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-xs sm:text-sm text-gray-600">Network/Gas Fee</span>
                    <span className="font-semibold text-slate-800 text-sm">R8.50</span>
                  </div>
                  <div className="border-t border-dashed border-gray-300 pt-2">
                    <div className="flex justify-between items-center">
                      <span className="text-xs sm:text-sm font-semibold text-gray-700">Total Fees</span>
                      <span className="font-bold text-slate-800 text-sm">R33.50</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Compliance Notes */}
              <div className="bg-amber-50 border border-amber-200 rounded-lg p-3 mb-4 sm:mb-6">
                <div className="text-xs text-amber-800 space-y-1">
                  <p><strong>Important:</strong> Cryptocurrency is volatile. Ensure wallet details are correct.</p>
                  <p><strong>Tax Note:</strong> Capital gains may apply. Consult a tax professional.</p>
                </div>
              </div>

              {/* Footer */}
              <div className="text-center border-t border-dashed border-gray-300 pt-3 sm:pt-4">
                <p className="text-xs text-gray-500 mb-2">BYBC Ltd. FSCA Reg: XYZ123</p>
                <p className="text-xs text-gray-400">Thank you for using BYBC</p>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 mt-4 sm:mt-6">
                <button
                  onClick={() => setShowConfirmation(false)}
                  className="w-full sm:flex-1 py-3 px-4 rounded-xl bg-gray-100 text-gray-700 font-medium hover:bg-gray-200 transition-colors text-sm"
                >
                  Save Receipt
                </button>
                <button
                  onClick={() => {
                    setShowConfirmation(false);
                    // Here you would typically handle the transaction completion
                  }}
                  className="w-full sm:flex-1 py-3 px-4 rounded-xl bg-amber-500 text-white font-bold hover:bg-amber-600 transition-colors"
                >
                  Done
                </button>
              </div>

              <button
                onClick={() => setShowConfirmation(false)}
                className="w-full mt-2 py-2 px-4 text-xs text-gray-500 hover:text-amber-600 transition-colors"
              >
                View on Blockchain →
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Disclaimer */}
      <div className="px-6 pb-6">
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-4">
          <p className="text-xs text-amber-800">
            <strong>Disclaimer:</strong> Cryptocurrency investments are subject to market risks. 
            Please read all terms and conditions carefully before trading.
          </p>
        </div>
      </div>
    </div>
  );
};

export default CryptoTradePage;
