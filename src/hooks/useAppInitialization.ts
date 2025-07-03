
import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

export const useAppInitialization = () => {
  const [initialCheckDone, setInitialCheckDone] = useState(false);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();
  
  console.log('useAppInitialization: Current location:', location.pathname);
  console.log('useAppInitialization: Initial check done:', initialCheckDone);
  console.log('useAppInitialization: Loading:', loading);
  
  // For handling back button
  useEffect(() => {
    const handlePopState = () => {
      console.log('useAppInitialization: Pop state event triggered');
      // This will handle the browser's back button navigation
      // The history API will automatically update the URL
    };

    window.addEventListener('popstate', handlePopState);

    return () => {
      window.removeEventListener('popstate', handlePopState);
    };
  }, [navigate]);
  
  useEffect(() => {
    console.log('useAppInitialization: Initialization effect running');
    
    // If this is the first visit and no login status exists, set default
    if (localStorage.getItem('isLoggedIn') === null) {
      console.log('useAppInitialization: Setting default login status to false');
      // Default to not logged in for first visit
      localStorage.setItem('isLoggedIn', 'false');
    }
    
    const loginStatus = localStorage.getItem('isLoggedIn');
    console.log('useAppInitialization: Current login status:', loginStatus);
    
    // Set initial check done
    console.log('useAppInitialization: Setting initial check done to true');
    setInitialCheckDone(true);
    
    // Reduce loading time to 1 second for faster debugging
    const timer = setTimeout(() => {
      console.log('useAppInitialization: Setting loading to false');
      setLoading(false);
    }, 1000);
    
    // Scroll to top on route changes
    window.scrollTo(0, 0);
    
    return () => {
      console.log('useAppInitialization: Cleaning up timer');
      clearTimeout(timer);
    };
  }, [location]);
  
  console.log('useAppInitialization: Returning values - initialCheckDone:', initialCheckDone, 'loading:', loading);
  
  return { initialCheckDone, loading };
};
