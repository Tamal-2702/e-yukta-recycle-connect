
import React from 'react';
import { useTheme } from '@/contexts/ThemeContext';
import ThemeToggle from '@/components/ThemeToggle';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Eye, EyeOff } from 'lucide-react';

interface ProfileHeaderProps {
  title: string;
  description: string;
  action?: React.ReactNode;
}

const ProfileHeader: React.FC<ProfileHeaderProps> = ({ 
  title, 
  description, 
  action 
}) => {
  const { theme } = useTheme();
  const [highContrast, setHighContrast] = React.useState(false);
  const [largeText, setLargeText] = React.useState(false);

  // Apply accessibility settings
  React.useEffect(() => {
    const root = window.document.documentElement;
    
    if (highContrast) {
      root.classList.add('high-contrast');
    } else {
      root.classList.remove('high-contrast');
    }
    
    if (largeText) {
      root.classList.add('large-text');
    } else {
      root.classList.remove('large-text');
    }
  }, [highContrast, largeText]);

  return (
    <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
      <div>
        <h1 className={`text-3xl font-bold ${largeText ? 'text-4xl' : ''}`}>{title}</h1>
        <p className={`text-muted-foreground mt-1 ${largeText ? 'text-lg' : ''}`}>{description}</p>
      </div>
      
      <div className="flex flex-col sm:flex-row gap-4 mt-4 md:mt-0">
        <div className="flex items-center gap-2">
          <ThemeToggle />
          <Label htmlFor="dark-mode" className="sr-only">Dark Mode</Label>
        </div>
        
        <div className="flex items-center space-x-2">
          <Switch
            id="high-contrast"
            checked={highContrast}
            onCheckedChange={setHighContrast}
          />
          <Label htmlFor="high-contrast" className="text-sm cursor-pointer">
            {highContrast ? <Eye className="h-4 w-4 inline mr-1" /> : <EyeOff className="h-4 w-4 inline mr-1" />}
            High Contrast
          </Label>
        </div>
        
        <div className="flex items-center space-x-2">
          <Switch
            id="large-text"
            checked={largeText}
            onCheckedChange={setLargeText}
          />
          <Label htmlFor="large-text" className="text-sm cursor-pointer">
            Larger Text
          </Label>
        </div>
        
        {action && <div>{action}</div>}
      </div>
    </div>
  );
};

export default ProfileHeader;
