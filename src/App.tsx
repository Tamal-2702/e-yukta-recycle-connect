
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { LanguageProvider } from "@/contexts/LanguageContext";
import { AuthProvider } from "@/contexts/AuthContext";
import EcoBotWrapper from "@/components/EcoBot";
import React from "react";

// Welcome and Auth pages
import Welcome from "./pages/Welcome";
import Auth from "./pages/Auth";

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

// Import useAuth inside the App component to avoid circular dependency
import { useAuth } from "@/contexts/AuthContext";

// Protected route component
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const auth = useAuth();
  
  if (auth.loading) {
    return <div className="flex items-center justify-center h-screen">Loading...</div>;
  }
  
  if (!auth.currentUser) {
    return <Navigate to="/auth" />;
  }
  
  return <>{children}</>;
};

// Create the QueryClient instance inside the component
const App = () => {
  // Create a client
  const queryClient = React.useMemo(() => new QueryClient(), []);

  return (
    <QueryClientProvider client={queryClient}>
      <LanguageProvider>
        <AuthProvider>
          <TooltipProvider>
            <Toaster />
            <Sonner />
            <BrowserRouter>
              <Routes>
                <Route path="/" element={<Welcome />} />
                <Route path="/landing" element={<Landing />} />
                <Route path="/auth" element={<Auth />} />
                
                {/* User routes */}
                <Route path="/user" element={<ProtectedRoute><UserDashboard /></ProtectedRoute>} />
                <Route path="/user/scan" element={<ProtectedRoute><ScanWaste /></ProtectedRoute>} />
                <Route path="/user/schedule" element={<ProtectedRoute><SchedulePickup /></ProtectedRoute>} />
                <Route path="/user/track" element={<ProtectedRoute><TrackDisposal /></ProtectedRoute>} />
                <Route path="/user/marketplace" element={<ProtectedRoute><Marketplace /></ProtectedRoute>} />
                <Route path="/user/awareness" element={<ProtectedRoute><AwarenessHub /></ProtectedRoute>} />
                <Route path="/user/progress" element={<ProtectedRoute><ProgressTracker /></ProtectedRoute>} />
                
                {/* Kabadiwala routes */}
                <Route path="/kabadiwala" element={<ProtectedRoute><KabadiwalasDashboard /></ProtectedRoute>} />
                
                {/* Recycler routes */}
                <Route path="/recycler" element={<ProtectedRoute><RecyclerDashboard /></ProtectedRoute>} />
                
                {/* Corporate routes */}
                <Route path="/corporate" element={<ProtectedRoute><CorporateDashboard /></ProtectedRoute>} />
                <Route path="/corporate/campaigns" element={<ProtectedRoute><CorporateCampaigns /></ProtectedRoute>} />
                <Route path="/corporate/compliance" element={<ProtectedRoute><CorporateCompliance /></ProtectedRoute>} />
                <Route path="/corporate/bulk" element={<ProtectedRoute><CorporateBulk /></ProtectedRoute>} />
                
                {/* Catch-all route */}
                <Route path="*" element={<NotFound />} />
              </Routes>
              <EcoBotWrapper />
            </BrowserRouter>
          </TooltipProvider>
        </AuthProvider>
      </LanguageProvider>
    </QueryClientProvider>
  );
};

export default App;
