
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

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

export default NavItem;
