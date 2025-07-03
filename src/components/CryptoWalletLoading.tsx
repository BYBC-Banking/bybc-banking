
import React from 'react';

const CryptoWalletLoading: React.FC = () => {
  return (
    <div className="fixed inset-0 bg-black flex flex-col items-center justify-center z-50">
      <div className="w-64 h-auto mb-8">
        <img 
          src="/lovable-uploads/93daeaf3-7d8a-4a4d-8ef7-4f12321ae6e8.png" 
          alt="BYBC Banking" 
          className="w-full h-full object-contain"
        />
      </div>
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-yellow-400"></div>
    </div>
  );
};

export default CryptoWalletLoading;
