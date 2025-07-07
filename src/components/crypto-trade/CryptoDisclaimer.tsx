
import React from 'react';

const CryptoDisclaimer: React.FC = () => {
  return (
    <div className="px-6 pb-6">
      <div className="bg-amber-50 border border-amber-200 rounded-xl p-4">
        <p className="text-xs text-amber-800">
          <strong>Disclaimer:</strong> Cryptocurrency investments are subject to market risks. 
          Please read all terms and conditions carefully before trading.
        </p>
      </div>
    </div>
  );
};

export default CryptoDisclaimer;
