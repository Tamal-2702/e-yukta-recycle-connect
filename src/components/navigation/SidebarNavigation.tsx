
import React from 'react';
import { useLocation } from 'react-router-dom';
import NavItem from './NavItem';
import { 
  Home, 
  Scan, 
  Calendar, 
  Map, 
  ShoppingBag, 
  BookOpen, 
} from 'lucide-react';

interface NavItem {
  icon: React.ReactNode;
  label: string;
  to: string;
}

interface SidebarNavigationProps {
  role: 'user' | 'kabadiwala' | 'recycler' | 'corporate';
  translationFn: (key: string) => string;
}

const SidebarNavigation: React.FC<SidebarNavigationProps> = ({ role, translationFn }) => {
  const location = useLocation();

  const userNav = [
    { icon: <Home size={18} />, label: translationFn('user.dashboard'), to: '/user' },
    { icon: <Scan size={18} />, label: translationFn('user.scan'), to: '/user/scan' },
    { icon: <Calendar size={18} />, label: translationFn('user.schedule'), to: '/user/schedule' },
    { icon: <Map size={18} />, label: translationFn('user.track'), to: '/user/track' },
    { icon: <ShoppingBag size={18} />, label: translationFn('user.marketplace'), to: '/user/marketplace' },
    { icon: <BookOpen size={18} />, label: translationFn('user.awareness'), to: '/user/awareness' },
  ];

  const kabadiwalaNavi = [
    { icon: <Home size={18} />, label: translationFn('kabadiwala.dashboard'), to: '/kabadiwala' },
    { icon: <Calendar size={18} />, label: translationFn('kabadiwala.pickups'), to: '/kabadiwala/pickups' },
    { icon: <ShoppingBag size={18} />, label: translationFn('kabadiwala.inventory'), to: '/kabadiwala/inventory' },
    { icon: <Scan size={18} />, label: translationFn('kabadiwala.verification'), to: '/kabadiwala/verification' },
    { icon: <Map size={18} />, label: translationFn('kabadiwala.performance'), to: '/kabadiwala/performance' },
  ];

  const recyclerNav = [
    { icon: <Home size={18} />, label: translationFn('recycler.dashboard'), to: '/recycler' },
    { icon: <ShoppingBag size={18} />, label: translationFn('recycler.inventory'), to: '/recycler/inventory' },
    { icon: <BookOpen size={18} />, label: translationFn('recycler.certification'), to: '/recycler/certification' },
    { icon: <Calendar size={18} />, label: translationFn('recycler.bulk'), to: '/recycler/bulk' },
  ];

  const corporateNav = [
    { icon: <Home size={18} />, label: translationFn('corporate.dashboard'), to: '/corporate' },
    { icon: <BookOpen size={18} />, label: translationFn('corporate.compliance'), to: '/corporate/compliance' },
    { icon: <ShoppingBag size={18} />, label: translationFn('corporate.bulk_upload'), to: '/corporate/bulk' },
    { icon: <Calendar size={18} />, label: translationFn('corporate.campaigns'), to: '/corporate/campaigns' },
  ];

  const navItems: Record<'user' | 'kabadiwala' | 'recycler' | 'corporate', NavItem[]> = {
    user: userNav,
    kabadiwala: kabadiwalaNavi, 
    recycler: recyclerNav,
    corporate: corporateNav
  };

  return (
    <nav className="space-y-2 flex-1">
      {navItems[role].map((item) => (
        <NavItem
          key={item.to}
          icon={item.icon}
          label={item.label}
          to={item.to}
          active={location.pathname === item.to}
        />
      ))}
    </nav>
  );
};

export default SidebarNavigation;
