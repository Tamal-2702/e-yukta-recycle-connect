
import React, { createContext, useContext, useEffect, useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';

type Theme = 'light' | 'dark';

interface UserPreferences {
  theme: Theme;
  highContrast: boolean;
  largeText: boolean;
}

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
  highContrast: boolean;
  toggleHighContrast: () => void;
  largeText: boolean;
  toggleLargeText: () => void;
  isLoading: boolean;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const { currentUser } = useAuth();
  const [theme, setTheme] = useState<Theme>('light');
  const [highContrast, setHighContrast] = useState<boolean>(false);
  const [largeText, setLargeText] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Load user preferences from Firestore if logged in, or localStorage if not
  useEffect(() => {
    const loadPreferences = async () => {
      try {
        setIsLoading(true);
        
        if (currentUser) {
          // User is logged in, load from Firestore
          const userPrefsRef = doc(db, 'userPreferences', currentUser.uid);
          const userPrefsDoc = await getDoc(userPrefsRef);
          
          if (userPrefsDoc.exists()) {
            const data = userPrefsDoc.data() as UserPreferences;
            setTheme(data.theme || 'light');
            setHighContrast(data.highContrast || false);
            setLargeText(data.largeText || false);
          } else {
            // No preferences stored for this user yet, check localStorage
            loadFromLocalStorage();
          }
        } else {
          // User not logged in, load from localStorage
          loadFromLocalStorage();
        }
      } catch (error) {
        console.error('Error loading preferences:', error);
        // Fallback to localStorage
        loadFromLocalStorage();
      } finally {
        setIsLoading(false);
      }
    };

    const loadFromLocalStorage = () => {
      const savedTheme = localStorage.getItem('theme') as Theme;
      const savedHighContrast = localStorage.getItem('highContrast') === 'true';
      const savedLargeText = localStorage.getItem('largeText') === 'true';
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      
      if (savedTheme) {
        setTheme(savedTheme);
      } else if (prefersDark) {
        setTheme('dark');
      }
      
      if (localStorage.getItem('highContrast') !== null) {
        setHighContrast(savedHighContrast);
      }
      
      if (localStorage.getItem('largeText') !== null) {
        setLargeText(savedLargeText);
      }
    };

    loadPreferences();
  }, [currentUser]);

  // Save preferences when they change
  useEffect(() => {
    if (isLoading) return; // Don't save during initial load
    
    const savePreferences = async () => {
      try {
        // Save to localStorage (for non-logged in users or as backup)
        localStorage.setItem('theme', theme);
        localStorage.setItem('highContrast', highContrast.toString());
        localStorage.setItem('largeText', largeText.toString());
        
        // If user is logged in, save to Firestore as well
        if (currentUser) {
          const userPrefsRef = doc(db, 'userPreferences', currentUser.uid);
          await setDoc(userPrefsRef, {
            theme,
            highContrast,
            largeText
          }, { merge: true });
          
          console.log('User preferences saved to Firestore');
        }
      } catch (error) {
        console.error('Error saving preferences:', error);
      }
    };
    
    savePreferences();
  }, [theme, highContrast, largeText, currentUser, isLoading]);

  // Update document class when theme changes
  useEffect(() => {
    const root = window.document.documentElement;
    
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    
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
  }, [theme, highContrast, largeText]);

  const toggleTheme = () => {
    setTheme(prevTheme => prevTheme === 'light' ? 'dark' : 'light');
  };

  const toggleHighContrast = () => {
    setHighContrast(prevState => !prevState);
  };

  const toggleLargeText = () => {
    setLargeText(prevState => !prevState);
  };

  return (
    <ThemeContext.Provider value={{ 
      theme, 
      toggleTheme, 
      highContrast, 
      toggleHighContrast, 
      largeText, 
      toggleLargeText,
      isLoading
    }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
