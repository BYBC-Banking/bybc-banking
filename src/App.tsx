
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

// Create a new QueryClient instance outside of component
const queryClient = new QueryClient();

const AppContent = () => {
  const { initialCheckDone, loading } = useAppInitialization();
  
  if (!initialCheckDone) {
    return null; // Don't render until initial check is done
  }
  
  if (loading) {
    return <LoadingScreen />;
  }
  
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

const App = () => (
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <AppContent />
      </BrowserRouter>
    </QueryClientProvider>
  </React.StrictMode>
);

export default App;
