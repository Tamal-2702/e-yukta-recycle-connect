
import React from 'react';
import { CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Edit, Save } from 'lucide-react';

interface PersonalInfoHeaderProps {
  isEditing: boolean;
  setIsEditing: (editing: boolean) => void;
}

const PersonalInfoHeader: React.FC<PersonalInfoHeaderProps> = ({
  isEditing,
  setIsEditing
}) => {
  return (
    <CardHeader>
      <CardTitle className="flex justify-between items-center">
        <span>Personal Information</span>
        <Button
          variant="outline"
          size="sm"
          onClick={() => setIsEditing(!isEditing)}
        >
          {isEditing ? 
            <><Save className="mr-2 h-4 w-4" /> Save</> : 
            <><Edit className="mr-2 h-4 w-4" /> Edit</>
          }
        </Button>
      </CardTitle>
      <CardDescription>Update your personal details</CardDescription>
    </CardHeader>
  );
};

export default PersonalInfoHeader;
