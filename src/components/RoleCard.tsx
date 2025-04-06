
import React, { useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { useLanguage } from '@/contexts/LanguageContext';

interface RoleCardProps {
  role: 'user' | 'kabadiwala' | 'recycler' | 'corporate';
  selected?: boolean;
  onClick?: () => void;
}

const RoleCard: React.FC<RoleCardProps> = ({ role, selected = false, onClick }) => {
  const { t } = useLanguage();
  const [imageError, setImageError] = useState(false);
  
  // Define role images with appropriate paths
  const roleImages = {
    user: '/lovable-uploads/6c301a42-c407-456b-b013-05fa8c7bb54b.png',
    kabadiwala: '/lovable-uploads/5cf4d238-8867-41cf-8b31-91d2cabfc66a.png',
    recycler: '/lovable-uploads/d37ce6c5-60d7-468a-a8ba-32adb3f7de51.png',
    corporate: '/lovable-uploads/27733395-edc3-4227-9c4f-64c67cc6ae4a.png',
  };

  // Role-specific colors for better visual differentiation and fallback
  const roleColors = {
    user: 'bg-blue-100',
    kabadiwala: 'bg-green-100',
    recycler: 'bg-amber-100',
    corporate: 'bg-purple-100',
  };

  return (
    <Card 
      className={`relative overflow-hidden cursor-pointer transition-all hover:shadow-md ${
        selected ? 'border-primary border-2 scale-105' : 'border-gray-200 hover:border-gray-300'
      }`}
      onClick={onClick}
    >
      <CardContent className="p-6 flex flex-col items-center">
        <div className={`w-24 h-24 mb-4 rounded-full ${roleColors[role]} flex items-center justify-center overflow-hidden`}>
          {imageError ? (
            <div className="text-3xl font-bold text-gray-500">
              {role.charAt(0).toUpperCase()}
            </div>
          ) : (
            <img 
              src={roleImages[role]} 
              alt={t(`roles.${role}`)} 
              className="w-20 h-20 object-contain"
              onError={() => {
                console.log(`Fallback for ${role} image: ${roleImages[role]}`);
                setImageError(true);
              }}
            />
          )}
        </div>
        <h3 className="text-lg font-medium">{t(`roles.${role}`)}</h3>
        <p className="text-sm text-gray-500 mt-1 text-center">
          {getRoleDescription(role, t)}
        </p>
        {selected && (
          <div className="absolute top-2 right-2 w-4 h-4 bg-primary rounded-full"></div>
        )}
      </CardContent>
    </Card>
  );
};

// Helper function to get role descriptions
function getRoleDescription(role: string, t: any) {
  switch(role) {
    case 'user':
      return t('roles.user_desc') || 'Individual with e-waste';
    case 'kabadiwala':
      return t('roles.kabadiwala_desc') || 'E-waste collector';
    case 'recycler':
      return t('roles.recycler_desc') || 'Recycling facility';
    case 'corporate':
      return t('roles.corporate_desc') || 'Business entity';
    default:
      return '';
  }
}

export default RoleCard;
