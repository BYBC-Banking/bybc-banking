
import React from 'react';
import { CryptoAsset } from './cryptoData';
import CryptoTradingHeader from './CryptoTradingHeader';
import CryptoAmountInput from './CryptoAmountInput';
import CryptoBalanceDisplay from './CryptoBalanceDisplay';
import CryptoPayReceiveSection from './CryptoPayReceiveSection';
import CryptoAmountSlider from './CryptoAmountSlider';
import CryptoActionButton from './CryptoActionButton';

interface CryptoTradingInterfaceProps {
  activeTab: 'buy' | 'sell';
  selectedCryptoData: CryptoAsset | undefined;
  amount: string;
  setAmount: (amount: string) => void;
  amountType: 'crypto' | 'fiat';
  setAmountType: (type: 'crypto' | 'fiat') => void;
  payAmount: string;
  setPayAmount: (amount: string) => void;
  receiveAmount: string;
  setReceiveAmount: (amount: string) => void;
  conversion: { crypto: string; fiat: string };
  onBuyClick: () => void;
}

const CryptoTradingInterface: React.FC<CryptoTradingInterfaceProps> = ({
  activeTab,
  selectedCryptoData,
  amount,
  setAmount,
  amountType,
  setAmountType,
  payAmount,
  setPayAmount,
  receiveAmount,
  setReceiveAmount,
  conversion,
  onBuyClick
}) => {
  return (
    <div className="px-6 mb-6">
      <div className="bg-white rounded-2xl p-6 shadow-lg">
        <CryptoTradingHeader 
          activeTab={activeTab}
          selectedCryptoData={selectedCryptoData}
        />

        <CryptoAmountInput
          amount={amount}
          setAmount={setAmount}
          amountType={amountType}
          setAmountType={setAmountType}
          selectedCryptoData={selectedCryptoData}
        />

        <CryptoBalanceDisplay
          activeTab={activeTab}
          selectedCryptoData={selectedCryptoData}
        />

        <CryptoPayReceiveSection
          activeTab={activeTab}
          payAmount={payAmount}
          receiveAmount={receiveAmount}
          setReceiveAmount={setReceiveAmount}
          selectedCryptoData={selectedCryptoData}
        />

        {/* Amount Range with Slider - only show on buy tab */}
        {activeTab === 'buy' && (
          <CryptoAmountSlider
            amount={amount}
            setAmount={setAmount}
            amountType={amountType}
            setAmountType={setAmountType}
            selectedCryptoData={selectedCryptoData}
          />
        )}

        <CryptoActionButton
          activeTab={activeTab}
          amount={amount}
          selectedCryptoData={selectedCryptoData}
          onBuyClick={onBuyClick}
        />
      </div>
    </div>
  );
};

export default CryptoTradingInterface;
