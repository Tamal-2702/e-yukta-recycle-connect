
import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import { cn } from '@/lib/utils';
import * as LucideIcons from 'lucide-react';
import { 
  SidebarMenuButton, 
  SidebarMenuItem 
} from '@/components/ui/sidebar';

interface NavItemProps {
  label: string;
  to: string;
  icon: string;
  active?: boolean;
}

const NavItem: React.FC<NavItemProps> = ({ 
  label, 
  to, 
  icon,
  active: propActive
}) => {
  const location = useLocation();
  const currentPath = location.pathname;
  
  // Check if current path matches the nav item's path
  // or if the current path is a sub-path of the nav item
  const isActive = propActive || 
    currentPath === to || 
    (to !== '/' && currentPath.startsWith(to));
  
  // Dynamically get the icon from lucide-react
  const IconComponent = icon in LucideIcons 
    ? LucideIcons[icon as keyof typeof LucideIcons] 
    : LucideIcons.Circle;

  return (
    <SidebarMenuItem>
      <SidebarMenuButton
        asChild
        isActive={isActive}
        tooltip={label}
      >
        <Link
          to={to}
          className={cn(
            "flex w-full items-center gap-2"
          )}
        >
          <IconComponent size={18} />
          <span>{label}</span>
        </Link>
      </SidebarMenuButton>
    </SidebarMenuItem>
  );
};

export default NavItem;
