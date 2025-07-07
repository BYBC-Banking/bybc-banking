import React, { useState, useEffect } from 'react';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import CryptoBuySellToggle from '../components/crypto-trade/CryptoBuySellToggle';
import CryptoAssetDropdown from '../components/crypto-trade/CryptoAssetDropdown';
import CryptoTradingInterface from '../components/crypto-trade/CryptoTradingInterface';
import CryptoPreApprovalModal from '../components/crypto-trade/CryptoPreApprovalModal';
import CryptoReceiptModal from '../components/crypto-trade/CryptoReceiptModal';
import CryptoDisclaimer from '../components/crypto-trade/CryptoDisclaimer';
import { cryptoAssets } from '../components/crypto-trade/cryptoData';
import { calculateConversion } from '../components/crypto-trade/cryptoUtils';
const CryptoTradePage = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'buy' | 'sell'>('buy');
  const [selectedCrypto, setSelectedCrypto] = useState('ETH');
  const [amount, setAmount] = useState('');
  const [amountType, setAmountType] = useState<'crypto' | 'fiat'>('crypto');
  const [showDropdown, setShowDropdown] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [showPreApproval, setShowPreApproval] = useState(false);
  const [countdown, setCountdown] = useState(30);
  const [payAmount, setPayAmount] = useState('');
  const [receiveAmount, setReceiveAmount] = useState('');
  const selectedCryptoData = cryptoAssets.find(crypto => crypto.symbol === selectedCrypto);
  const conversion = calculateConversion(amount, amountType, selectedCryptoData);

  // Update pay/receive amounts when conversion changes
  useEffect(() => {
    if (!payAmount && !receiveAmount) {
      setPayAmount(activeTab === 'buy' ? conversion.fiat : conversion.crypto);
      setReceiveAmount(activeTab === 'buy' ? conversion.crypto : conversion.fiat);
    }
  }, [conversion, activeTab, payAmount, receiveAmount]);

  // Countdown timer effect for pre-approval modal
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (showPreApproval && countdown > 0) {
      timer = setTimeout(() => setCountdown(countdown - 1), 1000);
    } else if (countdown === 0) {
      setShowPreApproval(false);
      setCountdown(30);
    }
    return () => clearTimeout(timer);
  }, [showPreApproval, countdown]);
  return <div className="min-h-screen bg-gray-50">
      {/* Back Button Header */}
      <div className="flex items-center justify-between px-4 py-4 bg-white shadow-sm">
        <button onClick={() => navigate(-1)} className="p-2 rounded-full hover:bg-gray-100 transition-colors">
          <ArrowLeft className="w-6 h-6 text-gray-700" />
        </button>
        
        <div className="w-10 h-10"></div> {/* Spacer for centering */}
      </div>

      <CryptoBuySellToggle activeTab={activeTab} setActiveTab={setActiveTab} />
      
      <CryptoAssetDropdown cryptos={cryptoAssets} selectedCrypto={selectedCrypto} setSelectedCrypto={setSelectedCrypto} showDropdown={showDropdown} setShowDropdown={setShowDropdown} />

      <CryptoTradingInterface activeTab={activeTab} selectedCryptoData={selectedCryptoData} amount={amount} setAmount={setAmount} amountType={amountType} setAmountType={setAmountType} payAmount={payAmount} setPayAmount={setPayAmount} receiveAmount={receiveAmount} setReceiveAmount={setReceiveAmount} conversion={conversion} onBuyClick={() => setShowPreApproval(true)} />

      <CryptoPreApprovalModal showPreApproval={showPreApproval} setShowPreApproval={setShowPreApproval} setShowConfirmation={setShowConfirmation} activeTab={activeTab} selectedCryptoData={selectedCryptoData} selectedCrypto={selectedCrypto} countdown={countdown} setCountdown={setCountdown} payAmount={payAmount} receiveAmount={receiveAmount} conversion={conversion} />

      <CryptoReceiptModal showConfirmation={showConfirmation} setShowConfirmation={setShowConfirmation} activeTab={activeTab} receiveAmount={receiveAmount} payAmount={payAmount} conversion={conversion} selectedCrypto={selectedCrypto} />

      <CryptoDisclaimer />
    </div>;
};
export default CryptoTradePage;