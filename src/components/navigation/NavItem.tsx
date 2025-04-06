
import React from 'react';
import { Link } from 'react-router-dom';
import { 
  SidebarMenuButton 
} from '@/components/ui/sidebar';
import { 
  LayoutDashboard, Camera, Calendar, MapPin, ShoppingBag, 
  Info, BarChart, Truck, Wallet, Map, Package, Settings, 
  ShieldCheck, Megaphone 
} from 'lucide-react';

interface NavItemProps {
  icon: string;
  label: string;
  to: string;
  active?: boolean;
  variant?: "default" | "outline";
}

const NavItem: React.FC<NavItemProps> = ({ icon, label, to, active, variant = "default" }) => {
  // Map string icon names to actual Lucide React components
  const getIcon = () => {
    switch (icon) {
      case 'layout-dashboard': return <LayoutDashboard size={18} />;
      case 'camera': return <Camera size={18} />;
      case 'calendar': return <Calendar size={18} />;
      case 'map-pin': return <MapPin size={18} />;
      case 'shopping-bag': return <ShoppingBag size={18} />;
      case 'info': return <Info size={18} />;
      case 'bar-chart': return <BarChart size={18} />;
      case 'truck': return <Truck size={18} />;
      case 'wallet': return <Wallet size={18} />;
      case 'map': return <Map size={18} />;
      case 'package': return <Package size={18} />;
      case 'settings': return <Settings size={18} />;
      case 'shield-check': return <ShieldCheck size={18} />;
      case 'megaphone': return <Megaphone size={18} />;
      default: return <Info size={18} />;
    }
  };

  return (
    <Link to={to} className="w-full">
      <SidebarMenuButton
        isActive={active}
        className="w-full"
        variant={variant}
      >
        {getIcon()}
        <span>{label}</span>
      </SidebarMenuButton>
    </Link>
  );
};

export default NavItem;
