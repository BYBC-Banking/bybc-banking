
import React from 'react';
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter } from "react-router-dom";
import { TooltipProvider } from "@/components/ui/tooltip";
import AppLayout from "./components/AppLayout";
import AppRoutes from "./routes/AppRoutes";
import LoadingScreen from "./components/LoadingScreen";
import { useAppInitialization } from "./hooks/useAppInitialization";
import { HomePageProvider } from "./context/HomePageContext";
import { accounts } from "./data/accountsData";

// Create a new QueryClient instance outside of component
const queryClient = new QueryClient();

const AppContent = () => {
  console.log('AppContent: Component rendering');
  
  const { initialCheckDone, loading } = useAppInitialization();
  
  console.log('AppContent: initialCheckDone:', initialCheckDone, 'loading:', loading);
  
  if (!initialCheckDone) {
    console.log('AppContent: Initial check not done, returning null');
    return null; // Don't render until initial check is done
  }
  
  if (loading) {
    console.log('AppContent: Still loading, showing LoadingScreen');
    return <LoadingScreen />;
  }
  
  console.log('AppContent: Rendering main app content');
  
  return (
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <AppLayout>
        <AppRoutes />
      </AppLayout>
    </TooltipProvider>
  );
};

const App = () => {
  console.log('App: Main component rendering');
  
  return (
    <React.StrictMode>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <HomePageProvider accounts={accounts}>
            <AppContent />
          </HomePageProvider>
        </BrowserRouter>
      </QueryClientProvider>
    </React.StrictMode>
  );
};

export default App;
