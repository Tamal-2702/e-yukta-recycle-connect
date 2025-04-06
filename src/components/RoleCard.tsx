
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
  
  // Define role images with the newly uploaded images
  const roleImages = {
    user: '/lovable-uploads/ae4e5686-c7ad-48ff-97f1-8084e1d7ce69.png', // Recycling logo with electronics
    kabadiwala: '/lovable-uploads/1299ce0f-3357-4452-9f94-1bb5aef23a99.png', // E-waste collector with cart
    recycler: '/lovable-uploads/c60af980-2b0f-4449-b1a1-f514e18c355b.png', // Person collecting e-waste
    corporate: '/lovable-uploads/81871075-be49-4b14-a55e-9a60c4a50482.png', // Corporate building
  };

  // Role-specific colors for better visual differentiation and fallback
  const roleColors = {
    user: 'bg-blue-100',
    kabadiwala: 'bg-green-100',
    recycler: 'bg-amber-100',
    corporate: 'bg-purple-100',
  };

  // Get proper description text
  const getDescription = () => {
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
              className="w-full h-full object-cover"
              onError={() => {
                console.log(`Fallback for ${role} image: ${roleImages[role]}`);
                setImageError(true);
              }}
            />
          )}
        </div>
        <h3 className="text-lg font-medium">{t(`roles.${role}`)}</h3>
        <p className="text-sm text-gray-500 mt-1 text-center">
          {getDescription()}
        </p>
        {selected && (
          <div className="absolute top-2 right-2 w-4 h-4 bg-primary rounded-full"></div>
        )}
      </CardContent>
    </Card>
  );
};

export default RoleCard;
