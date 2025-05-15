
import React from 'react';
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate, useLocation } from "react-router-dom";
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

// Create a new QueryClient instance outside of component
const queryClient = new QueryClient();

const AppRoutes = () => {
  const isMobile = useIsMobile();
  const location = useLocation();
  
  // Determine if we should show navigation based on the current route
  const isAuthPage = location.pathname === '/login' || location.pathname === '/register';
  
  React.useEffect(() => {
    // Scroll to top on route changes
    window.scrollTo(0, 0);
  }, [location]);
  
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
            <Route path="/" element={<Navigate to="/login" replace />} />
            <Route path="/dashboard" element={<Index />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/investments" element={<Investments />} />
            <Route path="/education" element={<Education />} />
            <Route path="/topics" element={<Topics />} />
            <Route path="/financial-news" element={<FinancialNews />} />
            <Route path="/watchlist" element={<Watchlist />} />
            <Route path="/nonprofit" element={<NonprofitLedger />} />
            <Route path="/advisor" element={<Advisor />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/help" element={<Help />} />
            <Route path="/legal" element={<Legal />} />
            <Route path="/language" element={<Language />} />
            <Route path="/accounts" element={<Accounts />} />
            <Route path="/transactions" element={<Transactions />} />
            <Route path="/notifications" element={<Notifications />} />
            <Route path="/buy" element={<Buy />} />
            <Route path="/send" element={<Send />} />
            <Route path="/receive" element={<Receive />} />
            <Route path="/transfer" element={<Transfer />} />
            <Route path="/inbox" element={<Inbox />} />
            <Route path="/create-account" element={<CreateAccount />} />
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
