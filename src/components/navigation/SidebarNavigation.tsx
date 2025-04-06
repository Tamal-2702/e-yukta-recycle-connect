
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
          { label: t('user.dashboard'), path: '/user', icon: 'layout-dashboard' },
          { label: t('user.scan_waste'), path: '/user/scan', icon: 'camera' },
          { label: t('user.schedule_pickup'), path: '/user/schedule', icon: 'calendar' },
          { label: t('user.track_disposal'), path: '/user/track', icon: 'map-pin' },
          { label: t('user.marketplace'), path: '/user/marketplace', icon: 'shopping-bag' },
          { label: t('user.awareness_hub'), path: '/user/awareness', icon: 'info' },
          { label: t('user.progress_tracker'), path: '/user/progress', icon: 'bar-chart' },
        ];
      case 'kabadiwala':
        return [
          { label: t('kabadiwala.dashboard'), path: '/kabadiwala', icon: 'layout-dashboard' },
          { label: t('kabadiwala.pickups'), path: '/kabadiwala/pickups', icon: 'truck' },
          { label: t('kabadiwala.earnings'), path: '/kabadiwala/earnings', icon: 'wallet' },
          { label: t('kabadiwala.map'), path: '/kabadiwala/map', icon: 'map' },
        ];
      case 'recycler':
        return [
          { label: t('recycler.dashboard'), path: '/recycler', icon: 'layout-dashboard' },
          { label: t('recycler.inventory'), path: '/recycler/inventory', icon: 'package' },
          { label: t('recycler.processing'), path: '/recycler/processing', icon: 'settings' },
          { label: t('recycler.compliance'), path: '/recycler/compliance', icon: 'shield-check' },
        ];
      case 'corporate':
        return [
          { label: t('corporate.dashboard'), path: '/corporate', icon: 'layout-dashboard' },
          { label: t('corporate.campaigns'), path: '/corporate/campaigns', icon: 'megaphone' },
          { label: t('corporate.compliance'), path: '/corporate/compliance', icon: 'shield-check' },
          { label: t('corporate.bulk_disposal'), path: '/corporate/bulk', icon: 'truck' },
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
            path={item.path}
            icon={item.icon}
            isActive={window.location.pathname === item.path}
          />
        ))}
      </div>
    </div>
  );
};

export default SidebarNavigation;
