
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LanguageProvider } from "@/contexts/LanguageContext";

// Pages
import Landing from "./pages/Landing";
import NotFound from "./pages/NotFound";

// User pages
import UserDashboard from "./pages/user/UserDashboard";
import ScanWaste from "./pages/user/ScanWaste";

// Kabadiwala pages
import KabadiwalasDashboard from "./pages/kabadiwala/KabadiwalasDashboard";

// Recycler pages
import RecyclerDashboard from "./pages/recycler/RecyclerDashboard";

// Corporate pages
import CorporateDashboard from "./pages/corporate/CorporateDashboard";
import CorporateCampaigns from "./pages/corporate/CorporateCampaigns";
import CorporateCompliance from "./pages/corporate/CorporateCompliance";
import CorporateBulk from "./pages/corporate/CorporateBulk";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <LanguageProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Landing />} />
            
            {/* User routes */}
            <Route path="/user" element={<UserDashboard />} />
            <Route path="/user/scan" element={<ScanWaste />} />
            
            {/* Kabadiwala routes */}
            <Route path="/kabadiwala" element={<KabadiwalasDashboard />} />
            
            {/* Recycler routes */}
            <Route path="/recycler" element={<RecyclerDashboard />} />
            
            {/* Corporate routes */}
            <Route path="/corporate" element={<CorporateDashboard />} />
            <Route path="/corporate/campaigns" element={<CorporateCampaigns />} />
            <Route path="/corporate/compliance" element={<CorporateCompliance />} />
            <Route path="/corporate/bulk" element={<CorporateBulk />} />
            
            {/* Catch-all route */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </LanguageProvider>
  </QueryClientProvider>
);

export default App;
