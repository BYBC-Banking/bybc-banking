import React, { useEffect, useState } from 'react';
import bybcLogo from '../assets/bybc-logo.png';

interface BusinessLoadingScreenProps {
  onLoadingComplete: () => void;
  loadingTime?: number;
}

const BusinessLoadingScreen: React.FC<BusinessLoadingScreenProps> = ({
  onLoadingComplete,
  loadingTime = 2000
}) => {
  const [opacity, setOpacity] = useState<number>(0);

  useEffect(() => {
    // Fade in animation
    const fadeInTimeout = setTimeout(() => {
      setOpacity(1);
    }, 100);

    // Trigger onLoadingComplete after loadingTime
    const loadingTimeout = setTimeout(() => {
      setOpacity(0); // Start fade out
      setTimeout(onLoadingComplete, 500); // Call callback after fade out animation
    }, loadingTime);

    return () => {
      clearTimeout(fadeInTimeout);
      clearTimeout(loadingTimeout);
    };
  }, [onLoadingComplete, loadingTime]);

  return (
    <div 
      className="fixed inset-0 bg-gradient-to-br from-yellow-400 to-amber-500 flex flex-col items-center justify-center z-50 transition-opacity duration-500"
      style={{ opacity }}
    >
      <div className="flex flex-col items-center space-y-4">
        <div className="w-24 h-24 mb-4">
          <img 
            src={bybcLogo} 
            alt="BYBC Logo" 
            className="w-full h-full object-contain"
          />
        </div>
        <div className="flex items-center space-x-3 mb-2">
          <h1 className="text-3xl font-bold text-black">BYBC</h1>
        </div>
        <p className="text-xl font-medium text-black">Business</p>
      </div>
      <div className="absolute bottom-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-black"></div>
      </div>
    </div>
  );
};

export default BusinessLoadingScreen;