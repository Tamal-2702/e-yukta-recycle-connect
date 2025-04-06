
import React, { ReactNode } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import MobileHeader from '@/components/navigation/MobileHeader';
import MobileSidebar from '@/components/navigation/MobileSidebar';
import DesktopSidebar from '@/components/navigation/DesktopSidebar';

interface DashboardLayoutProps {
  children: ReactNode;
  role: 'user' | 'kabadiwala' | 'recycler' | 'corporate';
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children, role }) => {
  const [sidebarOpen, setSidebarOpen] = React.useState(false);
  const { t } = useLanguage();
  const { logout, currentUser } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/');
      toast({
        title: "Success",
        description: "You have been logged out",
      });
    } catch (error: any) {
      toast({
        title: "Error logging out",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const handleNavigateToProfile = () => {
    navigate(`/${role}/profile`);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <MobileHeader 
        toggleSidebar={toggleSidebar} 
        handleNavigateToProfile={handleNavigateToProfile} 
      />

      <div className="flex flex-1">
        <DesktopSidebar 
          role={role}
          currentUser={currentUser}
          translationFn={t}
          handleNavigateToProfile={handleNavigateToProfile}
          handleLogout={handleLogout}
        />

        <MobileSidebar 
          sidebarOpen={sidebarOpen}
          toggleSidebar={toggleSidebar}
          role={role}
          currentUser={currentUser}
          translationFn={t}
          handleNavigateToProfile={handleNavigateToProfile}
          handleLogout={handleLogout}
        />

        <main className="flex-1 p-4 md:p-6 overflow-auto">
          {children}
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
