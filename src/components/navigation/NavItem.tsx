
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
  
  // Safely render the icon or fallback to a Circle
  const renderIcon = () => {
    // Check if the icon exists in Lucide icons
    if (icon && icon in LucideIcons) {
      const Icon = LucideIcons[icon as keyof typeof LucideIcons];
      return <Icon size={18} />;
    }
    // Fallback to Circle icon
    return <LucideIcons.Circle size={18} />;
  };

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
          {renderIcon()}
          <span>{label}</span>
        </Link>
      </SidebarMenuButton>
    </SidebarMenuItem>
  );
};

export default NavItem;
