
import React from 'react';
import { useTheme } from '@/contexts/ThemeContext';
import { Moon, Sun } from 'lucide-react';
import { Toggle } from '@/components/ui/toggle';

const ThemeToggle: React.FC = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <Toggle
      aria-label={`Toggle ${theme === 'dark' ? 'light' : 'dark'} mode`}
      pressed={theme === 'dark'}
      onPressedChange={toggleTheme}
      className="rounded-full p-2 hover:bg-muted"
    >
      {theme === 'dark' ? (
        <Moon className="h-5 w-5" />
      ) : (
        <Sun className="h-5 w-5" />
      )}
      <span className="sr-only">
        {theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
      </span>
    </Toggle>
  );
};

export default ThemeToggle;
