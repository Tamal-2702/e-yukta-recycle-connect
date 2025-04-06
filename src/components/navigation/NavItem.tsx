
import React from 'react';
import { Link } from 'react-router-dom';
import { 
  SidebarMenuButton 
} from '@/components/ui/sidebar';

interface NavItemProps {
  icon: React.ReactNode;
  label: string;
  to: string;
  active?: boolean;
}

const NavItem: React.FC<NavItemProps> = ({ icon, label, to, active }) => (
  <Link to={to} className="w-full">
    <SidebarMenuButton
      isActive={active}
      className="w-full"
    >
      {icon}
      <span>{label}</span>
    </SidebarMenuButton>
  </Link>
);

export default NavItem;
