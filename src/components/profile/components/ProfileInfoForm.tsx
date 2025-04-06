
import React from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { User } from 'firebase/auth';

interface ProfileInfoFormProps {
  displayName: string;
  setDisplayName: (name: string) => void;
  email: string | null;
  isEditing: boolean;
  onSave: () => Promise<void>;
}

const ProfileInfoForm: React.FC<ProfileInfoFormProps> = ({
  displayName,
  setDisplayName,
  email,
  isEditing,
  onSave
}) => {
  return (
    <div className="flex-1 space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="text-sm font-medium">Display Name</label>
          <Input
            value={displayName}
            onChange={(e) => setDisplayName(e.target.value)}
            disabled={!isEditing}
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium">Email</label>
          <Input
            value={email || ''}
            disabled
          />
        </div>
      </div>
      {isEditing && (
        <Button onClick={onSave}>Save Changes</Button>
      )}
    </div>
  );
};

export default ProfileInfoForm;
