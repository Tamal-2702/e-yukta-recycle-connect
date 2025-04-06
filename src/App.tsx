
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from '@/components/ui/toaster';
import { AuthProvider } from '@/contexts/AuthContext';
import { LanguageProvider } from '@/contexts/LanguageContext';
import { ThemeProvider } from '@/contexts/ThemeContext';

// Import pages
import Index from '@/pages/Index';
import Auth from '@/pages/Auth';
import NotFound from '@/pages/NotFound';
import Landing from '@/pages/Landing';
import Welcome from '@/pages/Welcome';

// User pages
import UserDashboard from '@/pages/user/UserDashboard';
import UserProfile from '@/pages/user/UserProfile';
import ProgressTracker from '@/pages/user/ProgressTracker';
import ScanWaste from '@/pages/user/ScanWaste';
import SchedulePickup from '@/pages/user/SchedulePickup';
import TrackDisposal from '@/pages/user/TrackDisposal';
import Marketplace from '@/pages/user/Marketplace';
import AwarenessHub from '@/pages/user/AwarenessHub';

// Kabadiwala pages
import KabadiwalasDashboard from '@/pages/kabadiwala/KabadiwalasDashboard';

// Recycler pages
import RecyclerDashboard from '@/pages/recycler/RecyclerDashboard';

// Corporate pages
import CorporateDashboard from '@/pages/corporate/CorporateDashboard';
import CorporateCompliance from '@/pages/corporate/CorporateCompliance';
import CorporateBulk from '@/pages/corporate/CorporateBulk';
import CorporateCampaigns from '@/pages/corporate/CorporateCampaigns';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <LanguageProvider>
          <ThemeProvider>
            <Router>
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/welcome" element={<Welcome />} />
                <Route path="/landing" element={<Landing />} />
                <Route path="/auth" element={<Auth />} />
                
                {/* User routes */}
                <Route path="/user" element={<Navigate to="/user/dashboard" replace />} />
                <Route path="/user/dashboard" element={<UserDashboard />} />
                <Route path="/user/profile" element={<UserProfile />} />
                <Route path="/user/progress" element={<ProgressTracker />} />
                <Route path="/user/scan" element={<ScanWaste />} />
                <Route path="/user/schedule" element={<SchedulePickup />} />
                <Route path="/user/track" element={<TrackDisposal />} />
                <Route path="/user/marketplace" element={<Marketplace />} />
                <Route path="/user/awareness" element={<AwarenessHub />} />
                
                {/* Kabadiwala routes */}
                <Route path="/kabadiwala" element={<Navigate to="/kabadiwala/dashboard" replace />} />
                <Route path="/kabadiwala/dashboard" element={<KabadiwalasDashboard />} />
                <Route path="/kabadiwala/profile" element={<UserProfile />} />
                
                {/* Recycler routes */}
                <Route path="/recycler" element={<Navigate to="/recycler/dashboard" replace />} />
                <Route path="/recycler/dashboard" element={<RecyclerDashboard />} />
                <Route path="/recycler/profile" element={<UserProfile />} />
                
                {/* Corporate routes */}
                <Route path="/corporate" element={<Navigate to="/corporate/dashboard" replace />} />
                <Route path="/corporate/dashboard" element={<CorporateDashboard />} />
                <Route path="/corporate/compliance" element={<CorporateCompliance />} />
                <Route path="/corporate/bulk" element={<CorporateBulk />} />
                <Route path="/corporate/campaigns" element={<CorporateCampaigns />} />
                <Route path="/corporate/profile" element={<UserProfile />} />
                
                <Route path="*" element={<NotFound />} />
              </Routes>
            </Router>
            <Toaster />
          </ThemeProvider>
        </LanguageProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
