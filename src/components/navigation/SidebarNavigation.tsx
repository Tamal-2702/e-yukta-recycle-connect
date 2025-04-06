
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { useAuth } from '@/contexts/AuthContext';
import NavItem from './NavItem';
import UserProfileSection from './UserProfileSection';

interface SidebarNavigationProps {
  role: 'user' | 'kabadiwala' | 'recycler' | 'corporate';
}

const SidebarNavigation: React.FC<SidebarNavigationProps> = ({ role }) => {
  const { t } = useLanguage();
  const { currentUser, updateProfilePicture } = useAuth();
  const navigate = useNavigate();

  // Define the navigation items based on the user role
  const getNavItems = () => {
    switch (role) {
      case 'user':
        return [
          { label: t('user.dashboard'), to: '/user/dashboard', icon: 'LayoutDashboard' },
          { label: t('user.scan_waste'), to: '/user/scan', icon: 'Camera' },
          { label: t('user.schedule_pickup'), to: '/user/schedule', icon: 'Calendar' },
          { label: t('user.track_disposal'), to: '/user/track', icon: 'MapPin' },
          { label: t('user.marketplace'), to: '/user/marketplace', icon: 'ShoppingBag' },
          { label: t('user.awareness_hub'), to: '/user/awareness', icon: 'Info' },
          { label: t('user.progress_tracker'), to: '/user/progress', icon: 'BarChart' },
        ];
      case 'kabadiwala':
        return [
          { label: t('kabadiwala.dashboard'), to: '/kabadiwala/dashboard', icon: 'LayoutDashboard' },
          { label: t('kabadiwala.pickups'), to: '/kabadiwala/pickups', icon: 'Truck' },
          { label: t('kabadiwala.earnings'), to: '/kabadiwala/earnings', icon: 'Wallet' },
          { label: t('kabadiwala.map'), to: '/kabadiwala/map', icon: 'Map' },
        ];
      case 'recycler':
        return [
          { label: t('recycler.dashboard'), to: '/recycler/dashboard', icon: 'LayoutDashboard' },
          { label: t('recycler.inventory'), to: '/recycler/inventory', icon: 'Package' },
          { label: t('recycler.processing'), to: '/recycler/processing', icon: 'Settings' },
          { label: t('recycler.compliance'), to: '/recycler/compliance', icon: 'ShieldCheck' },
        ];
      case 'corporate':
        return [
          { label: t('corporate.dashboard'), to: '/corporate/dashboard', icon: 'LayoutDashboard' },
          { label: t('corporate.campaigns'), to: '/corporate/campaigns', icon: 'Megaphone' },
          { label: t('corporate.compliance'), to: '/corporate/compliance', icon: 'ShieldCheck' },
          { label: t('corporate.bulk_disposal'), to: '/corporate/bulk', icon: 'Truck' },
        ];
      default:
        return [];
    }
  };

  const handleProfileClick = () => {
    navigate(`/${role}/profile`);
  };

  const handleProfileImageChange = async (file: File) => {
    try {
      await updateProfilePicture(file);
    } catch (error) {
      console.error("Error updating profile image:", error);
    }
  };

  return (
    <div className="flex flex-col h-full overflow-y-auto">
      <UserProfileSection 
        currentUser={currentUser} 
        role={role} 
        translationFn={t} 
        onProfileClick={handleProfileClick}
        onProfileImageChange={handleProfileImageChange}
      />
      <div className="space-y-1 p-2">
        {getNavItems().map((item, index) => (
          <NavItem
            key={index}
            label={item.label}
            to={item.to}
            icon={item.icon}
          />
        ))}
      </div>
    </div>
  );
};

export default SidebarNavigation;
