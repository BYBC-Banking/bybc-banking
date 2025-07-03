
import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

export const useAppInitialization = () => {
  const [initialCheckDone, setInitialCheckDone] = useState(false);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();
  
  // For handling back button
  useEffect(() => {
    const handlePopState = () => {
      // This will handle the browser's back button navigation
      // The history API will automatically update the URL
    };

    window.addEventListener('popstate', handlePopState);

    return () => {
      window.removeEventListener('popstate', handlePopState);
    };
  }, [navigate]);
  
  useEffect(() => {
    // If this is the first visit and no login status exists, set default
    if (localStorage.getItem('isLoggedIn') === null) {
      // Default to not logged in for first visit
      localStorage.setItem('isLoggedIn', 'false');
    }
    
    // Set initial check done
    setInitialCheckDone(true);
    
    // Simulate loading screen with a timeout
    const timer = setTimeout(() => {
      setLoading(false);
    }, 3000);
    
    // Scroll to top on route changes
    window.scrollTo(0, 0);
    
    return () => clearTimeout(timer);
  }, [location]);
  
  return { initialCheckDone, loading };
};
