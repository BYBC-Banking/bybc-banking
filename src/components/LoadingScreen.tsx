
import React, { useEffect, useState } from 'react';
import { Loader2 } from "lucide-react";

interface LoadingScreenProps {
  onLoadingComplete?: () => void;
  loadingTime?: number; // Time in ms before triggering onLoadingComplete
}

const LoadingScreen: React.FC<LoadingScreenProps> = ({
  onLoadingComplete,
  loadingTime = 2000 // Default loading time of 2 seconds
}) => {
  const [opacity, setOpacity] = useState<number>(0);

  useEffect(() => {
    // Fade in animation
    const fadeInTimeout = setTimeout(() => {
      setOpacity(1);
    }, 100);

    // Trigger onLoadingComplete after loadingTime
    const loadingTimeout = setTimeout(() => {
      if (onLoadingComplete) {
        setOpacity(0); // Start fade out
        setTimeout(onLoadingComplete, 500); // Call callback after fade out animation
      }
    }, loadingTime);

    return () => {
      clearTimeout(fadeInTimeout);
      clearTimeout(loadingTimeout);
    };
  }, [onLoadingComplete, loadingTime]);

  return (
    <div 
      className="fixed inset-0 bg-gray-100 flex flex-col items-center justify-center z-50 transition-opacity duration-500"
      style={{ opacity }}
    >
      <div className="w-32 h-32 mb-8">
        <img 
          src="/lovable-uploads/e2051e76-8b0d-490d-b55b-1459c01a5438.png" 
          alt="BYBC Banking Logo" 
          className="w-full h-full object-contain"
        />
      </div>
      <div className="animate-spin mb-6">
        <Loader2 className="h-10 w-10 text-amber-500" strokeWidth={3} />
      </div>
      <p className="text-gray-700 text-lg font-medium">BYBC Banking is preparing your experience...</p>
    </div>
  );
};

export default LoadingScreen;
