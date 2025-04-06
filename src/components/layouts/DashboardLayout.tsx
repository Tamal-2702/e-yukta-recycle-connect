
import React, { ReactNode, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Logo from '@/components/Logo';
import LanguageToggle from '@/components/LanguageToggle';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { useLanguage } from '@/contexts/LanguageContext';
import { useAuth } from '@/contexts/AuthContext';
import { 
  Home, 
  Scan, 
  Calendar, 
  Map, 
  ShoppingBag, 
  BookOpen, 
  Menu, 
  X, 
  LogOut,
  User,
  Settings,
  Bell,
  HelpCircle,
  FileText,
  ChevronRight,
  MoreHorizontal
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuLabel, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetFooter,
  SheetDescription,
  SheetClose
} from "@/components/ui/sheet";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface NavItemProps {
  icon: React.ReactNode;
  label: string;
  to: string;
  active?: boolean;
}

const NavItem: React.FC<NavItemProps> = ({ icon, label, to, active }) => (
  <Link to={to} className="w-full">
    <Button
      variant={active ? "default" : "ghost"}
      className={`w-full justify-start gap-2 ${active ? 'bg-primary text-white' : ''}`}
    >
      {icon}
      <span>{label}</span>
    </Button>
  </Link>
);

interface DashboardLayoutProps {
  children: ReactNode;
  role: 'user' | 'kabadiwala' | 'recycler' | 'corporate';
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children, role }) => {
  const [sidebarOpen, setSidebarOpen] = React.useState(false);
  const location = useLocation();
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

  const userNav = [
    { icon: <Home size={18} />, label: t('user.dashboard'), to: '/user' },
    { icon: <Scan size={18} />, label: t('user.scan'), to: '/user/scan' },
    { icon: <Calendar size={18} />, label: t('user.schedule'), to: '/user/schedule' },
    { icon: <Map size={18} />, label: t('user.track'), to: '/user/track' },
    { icon: <ShoppingBag size={18} />, label: t('user.marketplace'), to: '/user/marketplace' },
    { icon: <BookOpen size={18} />, label: t('user.awareness'), to: '/user/awareness' },
  ];

  const kabadiwalaNavi = [
    { icon: <Home size={18} />, label: t('kabadiwala.dashboard'), to: '/kabadiwala' },
    { icon: <Calendar size={18} />, label: t('kabadiwala.pickups'), to: '/kabadiwala/pickups' },
    { icon: <ShoppingBag size={18} />, label: t('kabadiwala.inventory'), to: '/kabadiwala/inventory' },
    { icon: <Scan size={18} />, label: t('kabadiwala.verification'), to: '/kabadiwala/verification' },
    { icon: <Map size={18} />, label: t('kabadiwala.performance'), to: '/kabadiwala/performance' },
  ];

  const recyclerNav = [
    { icon: <Home size={18} />, label: t('recycler.dashboard'), to: '/recycler' },
    { icon: <ShoppingBag size={18} />, label: t('recycler.inventory'), to: '/recycler/inventory' },
    { icon: <BookOpen size={18} />, label: t('recycler.certification'), to: '/recycler/certification' },
    { icon: <Calendar size={18} />, label: t('recycler.bulk'), to: '/recycler/bulk' },
  ];

  const corporateNav = [
    { icon: <Home size={18} />, label: t('corporate.dashboard'), to: '/corporate' },
    { icon: <BookOpen size={18} />, label: t('corporate.compliance'), to: '/corporate/compliance' },
    { icon: <ShoppingBag size={18} />, label: t('corporate.bulk_upload'), to: '/corporate/bulk' },
    { icon: <Calendar size={18} />, label: t('corporate.campaigns'), to: '/corporate/campaigns' },
  ];

  const navItems = {
    user: userNav,
    kabadiwala: kabadiwalaNavi, 
    recycler: recyclerNav,
    corporate: corporateNav
  }[role];

  const renderMoreMenu = () => (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" size="sm" className="ml-auto flex items-center gap-1">
          <MoreHorizontal size={18} />
          <span className="hidden md:inline-block">{t('common.more')}</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="right">
        <SheetHeader>
          <SheetTitle>{t('common.more_options')}</SheetTitle>
          <SheetDescription>{t('common.more_description')}</SheetDescription>
        </SheetHeader>
        
        <div className="mt-8 space-y-6">
          {/* Profile Section */}
          <div className="flex flex-col items-center space-y-3 p-4 bg-muted rounded-lg">
            <Avatar className="h-16 w-16">
              <AvatarImage src="/placeholder.svg" alt="Profile" />
              <AvatarFallback>
                {currentUser?.displayName?.charAt(0) || role.charAt(0).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <div className="text-center">
              <h3 className="font-medium">{currentUser?.displayName || t(`${role}.profile_title`)}</h3>
              <p className="text-sm text-muted-foreground">{currentUser?.email || t(`${role}.profile_subtitle`)}</p>
            </div>
            <Button variant="outline" className="w-full" onClick={() => navigate(`/${role}/profile`)}>
              <User size={16} className="mr-2" />
              {t('common.view_profile')}
            </Button>
          </div>
          
          {/* Menu Items */}
          <div className="space-y-3">
            <Button variant="ghost" className="w-full justify-start">
              <Settings size={18} className="mr-2" />
              {t('common.settings')}
              <ChevronRight size={16} className="ml-auto" />
            </Button>
            
            <Button variant="ghost" className="w-full justify-start">
              <Bell size={18} className="mr-2" />
              {t('common.notifications')}
              <ChevronRight size={16} className="ml-auto" />
            </Button>
            
            <Button variant="ghost" className="w-full justify-start">
              <FileText size={18} className="mr-2" />
              {t('common.documents')}
              <ChevronRight size={16} className="ml-auto" />
            </Button>
            
            <Button variant="ghost" className="w-full justify-start">
              <HelpCircle size={18} className="mr-2" />
              {t('common.help')}
              <ChevronRight size={16} className="ml-auto" />
            </Button>
          </div>
        </div>
        
        <SheetFooter className="mt-6">
          <Button variant="destructive" className="w-full" onClick={handleLogout}>
            <LogOut size={16} className="mr-2" />
            {t('common.logout')}
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );

  return (
    <div className="min-h-screen flex flex-col">
      {/* Mobile header */}
      <header className="p-4 flex justify-between items-center md:hidden">
        <Logo size="sm" />
        <div className="flex gap-2">
          {renderMoreMenu()}
          <Button variant="ghost" size="icon" onClick={toggleSidebar}>
            <Menu size={24} />
          </Button>
        </div>
      </header>

      <div className="flex flex-1">
        {/* Sidebar for desktop */}
        <aside className="hidden md:flex md:w-64 p-4 flex-col border-r">
          <div className="flex justify-between items-center mb-6">
            <Logo size="sm" />
            {renderMoreMenu()}
          </div>
          <nav className="space-y-2 flex-1">
            {navItems.map((item) => (
              <NavItem
                key={item.to}
                icon={item.icon}
                label={item.label}
                to={item.to}
                active={location.pathname === item.to}
              />
            ))}
          </nav>
          <Separator className="my-4" />
          <div className="flex justify-between items-center">
            <LanguageToggle />
          </div>
        </aside>

        {/* Mobile sidebar */}
        {sidebarOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden" onClick={toggleSidebar}>
            <div 
              className="absolute top-0 left-0 w-64 h-full bg-white p-4" 
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-between items-center mb-6">
                <Logo size="sm" />
                <Button variant="ghost" size="icon" onClick={toggleSidebar}>
                  <X size={24} />
                </Button>
              </div>
              <nav className="space-y-2">
                {navItems.map((item) => (
                  <NavItem
                    key={item.to}
                    icon={item.icon}
                    label={item.label}
                    to={item.to}
                    active={location.pathname === item.to}
                  />
                ))}
              </nav>
              <Separator className="my-4" />
              <div className="flex justify-between items-center">
                <LanguageToggle />
              </div>
            </div>
          </div>
        )}

        {/* Main content */}
        <main className="flex-1 p-4 md:p-6 overflow-auto">
          {children}
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
