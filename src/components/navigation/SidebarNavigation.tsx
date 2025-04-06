
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
          { label: t('user.dashboard'), to: '/user/dashboard', icon: 'layout-dashboard' },
          { label: t('user.scan_waste'), to: '/user/scan', icon: 'camera' },
          { label: t('user.schedule_pickup'), to: '/user/schedule', icon: 'calendar' },
          { label: t('user.track_disposal'), to: '/user/track', icon: 'map-pin' },
          { label: t('user.marketplace'), to: '/user/marketplace', icon: 'shopping-bag' },
          { label: t('user.awareness_hub'), to: '/user/awareness', icon: 'info' },
          { label: t('user.progress_tracker'), to: '/user/progress', icon: 'bar-chart' },
        ];
      case 'kabadiwala':
        return [
          { label: t('kabadiwala.dashboard'), to: '/kabadiwala/dashboard', icon: 'layout-dashboard' },
          { label: t('kabadiwala.pickups'), to: '/kabadiwala/pickups', icon: 'truck' },
          { label: t('kabadiwala.earnings'), to: '/kabadiwala/earnings', icon: 'wallet' },
          { label: t('kabadiwala.map'), to: '/kabadiwala/map', icon: 'map' },
        ];
      case 'recycler':
        return [
          { label: t('recycler.dashboard'), to: '/recycler/dashboard', icon: 'layout-dashboard' },
          { label: t('recycler.inventory'), to: '/recycler/inventory', icon: 'package' },
          { label: t('recycler.processing'), to: '/recycler/processing', icon: 'settings' },
          { label: t('recycler.compliance'), to: '/recycler/compliance', icon: 'shield-check' },
        ];
      case 'corporate':
        return [
          { label: t('corporate.dashboard'), to: '/corporate/dashboard', icon: 'layout-dashboard' },
          { label: t('corporate.campaigns'), to: '/corporate/campaigns', icon: 'megaphone' },
          { label: t('corporate.compliance'), to: '/corporate/compliance', icon: 'shield-check' },
          { label: t('corporate.bulk_disposal'), to: '/corporate/bulk', icon: 'truck' },
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
            active={window.location.pathname === item.to}
          />
        ))}
      </div>
    </div>
  );
};

export default SidebarNavigation;
