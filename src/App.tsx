
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LanguageProvider } from "@/contexts/LanguageContext";
import EcoBotWrapper from "@/components/EcoBot";

// Pages
import Landing from "./pages/Landing";
import NotFound from "./pages/NotFound";

// User pages
import UserDashboard from "./pages/user/UserDashboard";
import ScanWaste from "./pages/user/ScanWaste";
import SchedulePickup from "./pages/user/SchedulePickup";
import TrackDisposal from "./pages/user/TrackDisposal";
import Marketplace from "./pages/user/Marketplace";
import AwarenessHub from "./pages/user/AwarenessHub";
import ProgressTracker from "./pages/user/ProgressTracker";

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
            <Route path="/user/schedule" element={<SchedulePickup />} />
            <Route path="/user/track" element={<TrackDisposal />} />
            <Route path="/user/marketplace" element={<Marketplace />} />
            <Route path="/user/awareness" element={<AwarenessHub />} />
            <Route path="/user/progress" element={<ProgressTracker />} />
            
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
          <EcoBotWrapper />
        </BrowserRouter>
      </TooltipProvider>
    </LanguageProvider>
  </QueryClientProvider>
);

export default App;
