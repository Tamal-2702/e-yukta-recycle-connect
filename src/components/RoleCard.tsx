
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { useLanguage } from '@/contexts/LanguageContext';

interface RoleCardProps {
  role: 'user' | 'kabadiwala' | 'recycler' | 'corporate';
  selected?: boolean;
  onClick?: () => void;
}

const RoleCard: React.FC<RoleCardProps> = ({ role, selected = false, onClick }) => {
  const { t } = useLanguage();
  
  // Update image paths to use the new uploaded images
  const roleImages = {
    user: '/lovable-uploads/6034ca27-31fe-46df-8e3c-0d44228f95d7.png', // E-Yukta user with computer equipment
    kabadiwala: '/lovable-uploads/a677cbfe-2066-489a-b1d7-97c0ba1a843c.png', // Person with cart of electronic waste
    recycler: '/lovable-uploads/2b3dcc80-ba3a-4379-8445-15fe6ec57bb0.png', // Recycling symbol with electronics
    corporate: '/lovable-uploads/18943706-8b73-49f7-8d77-78d63ab6cd22.png', // Corporate building
  };

  return (
    <Card 
      className={`relative overflow-hidden cursor-pointer card-hover ${
        selected ? 'border-primary border-2' : 'border-gray-200'
      }`}
      onClick={onClick}
    >
      <CardContent className="p-6 flex flex-col items-center">
        <div className="w-24 h-24 mb-4 rounded-full bg-gray-100 flex items-center justify-center overflow-hidden">
          <img 
            src={roleImages[role]} 
            alt={t(`roles.${role}`)} 
            className="w-20 h-20 object-contain"
            key={`role-image-${role}-${new Date().getTime()}`} // Add a unique key to force re-render
          />
        </div>
        <h3 className="text-lg font-medium">{t(`roles.${role}`)}</h3>
        {selected && (
          <div className="absolute top-2 right-2 w-4 h-4 bg-primary rounded-full"></div>
        )}
      </CardContent>
    </Card>
  );
};

export default RoleCard;
