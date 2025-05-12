
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";
import Investments from "./pages/Investments";
import Education from "./pages/Education";
import NonprofitLedger from "./pages/NonprofitLedger";
import { TooltipProvider } from "@/components/ui/tooltip";
import MoyaButton from "./components/MoyaButton";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <BrowserRouter>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/login" element={<Login />} />
          <Route path="/investments" element={<Investments />} />
          <Route path="/education" element={<Education />} />
          <Route path="/nonprofit" element={<NonprofitLedger />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
        <MoyaButton />
      </TooltipProvider>
    </BrowserRouter>
  </QueryClientProvider>
);

export default App;
