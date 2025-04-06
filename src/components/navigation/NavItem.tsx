
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
  variant?: "default" | "outline";
}

const NavItem: React.FC<NavItemProps> = ({ icon, label, to, active, variant = "default" }) => (
  <Link to={to} className="w-full">
    <SidebarMenuButton
      isActive={active}
      className="w-full"
      variant={variant}
    >
      {icon}
      <span>{label}</span>
    </SidebarMenuButton>
  </Link>
);

export default NavItem;
