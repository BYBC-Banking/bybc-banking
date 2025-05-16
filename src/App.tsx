import React, { useEffect, useState } from 'react';
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate, useLocation, useNavigate } from "react-router-dom";
import Index from "./pages/Index";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";
import Investments from "./pages/Investments";
import Education from "./pages/Education";
import Topics from "./pages/Topics";
import FinancialNews from "./pages/FinancialNews";
import Watchlist from "./pages/Watchlist";
import NonprofitLedger from "./pages/NonprofitLedger";
import Advisor from "./pages/Advisor";
import Profile from "./pages/Profile";
import Settings from "./pages/Settings";
import Help from "./pages/Help";
import Legal from "./pages/Legal";
import Language from "./pages/Language";
import Accounts from "./pages/Accounts";
import Transactions from "./pages/Transactions";
import Notifications from "./pages/Notifications";
import Buy from "./pages/Buy";
import Send from "./pages/Send";
import Receive from "./pages/Receive";
import Transfer from "./pages/Transfer";
import Inbox from "./pages/Inbox";
import CreateAccount from "./pages/CreateAccount";
import Register from "./pages/Register";
import { TooltipProvider } from "@/components/ui/tooltip";
import NavBar from "./components/NavBar";
import MobileNavigation from "./components/navigation/MobileNavigation";
import { useIsMobile } from "./hooks/use-mobile";
import AccountOnboarding from "./pages/AccountOnboarding";
import CryptoPage from "./pages/CryptoPage";
import StocksPage from "./pages/StocksPage";
import CardControls from "./pages/CardControls";
import AppAppearance from "./pages/AppAppearance";
import ReferralAndEarn from "./pages/ReferralAndEarn";

// Create a new QueryClient instance outside of component
const queryClient = new QueryClient();

// Helper function to check if user is logged in
const isLoggedIn = () => {
  // Check local storage for login state
  return localStorage.getItem('isLoggedIn') === 'true';
};

const ProtectedRoute = ({ children }) => {
  const location = useLocation();
  
  // If not logged in and not on login or register page, redirect to login
  if (!isLoggedIn() && 
      location.pathname !== '/login' && 
      location.pathname !== '/register') {
    return <Navigate to="/login" replace />;
  }
  
  return children;
};

const AppRoutes = () => {
  const isMobile = useIsMobile();
  const location = useLocation();
  const navigate = useNavigate();
  
  // Determine if we should show navigation based on the current route
  const isAuthPage = location.pathname === '/login' || location.pathname === '/register';
  
  // Check initial login status (for first load)
  const [initialCheckDone, setInitialCheckDone] = useState(false);
  
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
    setInitialCheckDone(true);
    
    // Scroll to top on route changes
    window.scrollTo(0, 0);
  }, [location]);
  
  if (!initialCheckDone) {
    return null; // Don't render until initial check is done
  }
  
  return (
    <>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        {!isAuthPage && (
          <>
            {!isMobile && <NavBar />}
            <MobileNavigation />
          </>
        )}
        <div className={isMobile && !isAuthPage ? "pb-16" : ""}>
          <Routes>
            <Route path="/" element={<Navigate to={isLoggedIn() ? "/dashboard" : "/login"} replace />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            
            {/* Protected routes */}
            <Route path="/dashboard" element={
              <ProtectedRoute>
                <Index />
              </ProtectedRoute>
            } />
            <Route path="/investments" element={
              <ProtectedRoute>
                <Investments />
              </ProtectedRoute>
            } />
            <Route path="/education" element={
              <ProtectedRoute>
                <Education />
              </ProtectedRoute>
            } />
            <Route path="/topics" element={
              <ProtectedRoute>
                <Topics />
              </ProtectedRoute>
            } />
            <Route path="/financial-news" element={
              <ProtectedRoute>
                <FinancialNews />
              </ProtectedRoute>
            } />
            <Route path="/watchlist" element={
              <ProtectedRoute>
                <Watchlist />
              </ProtectedRoute>
            } />
            <Route path="/nonprofit" element={
              <ProtectedRoute>
                <NonprofitLedger />
              </ProtectedRoute>
            } />
            <Route path="/advisor" element={
              <ProtectedRoute>
                <Advisor />
              </ProtectedRoute>
            } />
            <Route path="/profile" element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            } />
            <Route path="/settings" element={
              <ProtectedRoute>
                <Settings />
              </ProtectedRoute>
            } />
            <Route path="/help" element={
              <ProtectedRoute>
                <Help />
              </ProtectedRoute>
            } />
            <Route path="/legal" element={
              <ProtectedRoute>
                <Legal />
              </ProtectedRoute>
            } />
            <Route path="/language" element={
              <ProtectedRoute>
                <Language />
              </ProtectedRoute>
            } />
            <Route path="/accounts" element={
              <ProtectedRoute>
                <Accounts />
              </ProtectedRoute>
            } />
            <Route path="/transactions" element={
              <ProtectedRoute>
                <Transactions />
              </ProtectedRoute>
            } />
            <Route path="/notifications" element={
              <ProtectedRoute>
                <Notifications />
              </ProtectedRoute>
            } />
            <Route path="/buy" element={
              <ProtectedRoute>
                <Buy />
              </ProtectedRoute>
            } />
            <Route path="/send" element={
              <ProtectedRoute>
                <Send />
              </ProtectedRoute>
            } />
            <Route path="/receive" element={
              <ProtectedRoute>
                <Receive />
              </ProtectedRoute>
            } />
            <Route path="/transfer" element={
              <ProtectedRoute>
                <Transfer />
              </ProtectedRoute>
            } />
            <Route path="/inbox" element={
              <ProtectedRoute>
                <Inbox />
              </ProtectedRoute>
            } />
            <Route path="/create-account" element={
              <ProtectedRoute>
                <CreateAccount />
              </ProtectedRoute>
            } />
            <Route path="/account-onboarding/:accountType" element={
              <ProtectedRoute>
                <AccountOnboarding />
              </ProtectedRoute>
            } />
            <Route path="/crypto" element={
              <ProtectedRoute>
                <CryptoPage />
              </ProtectedRoute>
            } />
            <Route path="/stocks" element={
              <ProtectedRoute>
                <StocksPage />
              </ProtectedRoute>
            } />
            <Route path="/card-controls" element={
              <ProtectedRoute>
                <CardControls />
              </ProtectedRoute>
            } />
            <Route path="/app-appearance" element={
              <ProtectedRoute>
                <AppAppearance />
              </ProtectedRoute>
            } />
            <Route path="/referral" element={
              <ProtectedRoute>
                <ReferralAndEarn />
              </ProtectedRoute>
            } />
            
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </TooltipProvider>
    </>
  );
};

const App = () => (
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </QueryClientProvider>
  </React.StrictMode>
);

export default App;
