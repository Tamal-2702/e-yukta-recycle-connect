
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
  
  // Update image paths to use direct static paths instead of dynamic uploads
  const roleImages = {
    user: '/lovable-uploads/6bba08b6-7a2b-4eb7-b68f-2037af70c516.png',
    kabadiwala: '/lovable-uploads/49b6515a-55e8-4568-83df-895601902f64.png',
    recycler: '/lovable-uploads/ef3a9e69-e5cd-4546-9e32-42ff3c5d93ec.png',
    corporate: '/lovable-uploads/1c68de70-c1e4-481e-8d6b-9afcc0a7f169.png',
  };

  return (
    <Card 
      className={`relative overflow-hidden cursor-pointer card-hover ${
        selected ? 'border-primary border-2' : 'border-gray-200'
      }`}
      onClick={onClick}
    >
      <CardContent className="p-6 flex flex-col items-center">
        <div className="w-20 h-20 mb-4 rounded-full bg-gray-100 flex items-center justify-center overflow-hidden">
          <img 
            src={roleImages[role]} 
            alt={t(`roles.${role}`)} 
            className="w-16 h-16 object-contain"
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
