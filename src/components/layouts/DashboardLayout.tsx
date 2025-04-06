
import React, { ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { User, LogOut } from 'lucide-react';
import { 
  SidebarProvider, 
  Sidebar, 
  SidebarContent, 
  SidebarHeader,
  SidebarFooter,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarInset,
  SidebarTrigger,
  SidebarSeparator
} from '@/components/ui/sidebar';
import Logo from '@/components/Logo';
import LanguageToggle from '@/components/LanguageToggle';
import ThemeToggle from '@/components/ThemeToggle';
import SidebarNavigation from '@/components/navigation/SidebarNavigation';
import UserProfileSection from '@/components/navigation/UserProfileSection';

interface DashboardLayoutProps {
  children: ReactNode;
  role: 'user' | 'kabadiwala' | 'recycler' | 'corporate';
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children, role }) => {
  const { t } = useLanguage();
  const { logout, currentUser } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

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
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <Sidebar>
          <SidebarHeader>
            <div className="flex justify-between items-center p-2">
              <Logo size="sm" />
              <SidebarTrigger className="md:hidden" />
            </div>
            <UserProfileSection 
              currentUser={currentUser} 
              role={role}
              translationFn={t}
              onProfileClick={handleNavigateToProfile}
            />
          </SidebarHeader>

          <SidebarContent>
            <SidebarNavigation role={role} />
          </SidebarContent>

          <SidebarFooter>
            <SidebarSeparator />
            <div className="space-y-2 p-2">
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton 
                    onClick={handleNavigateToProfile}
                    tooltip={t('common.profile')}
                  >
                    <User size={18} />
                    <span>{t('common.profile')}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton 
                    onClick={handleLogout}
                    tooltip={t('common.logout')}
                    variant="outline"
                    className="text-red-500 hover:text-red-600 hover:border-red-200"
                  >
                    <LogOut size={18} />
                    <span>{t('common.logout')}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
              <div className="flex justify-between items-center pt-2">
                <LanguageToggle />
                <ThemeToggle />
              </div>
            </div>
          </SidebarFooter>
        </Sidebar>
        
        <SidebarInset>
          <div className="flex justify-between items-center p-4 md:hidden">
            <Logo size="sm" />
            <div className="flex items-center gap-2">
              <SidebarTrigger />
            </div>
          </div>
          {children}
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
};

export default DashboardLayout;
