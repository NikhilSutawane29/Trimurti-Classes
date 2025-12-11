import React, { createContext, useContext, useEffect, useState } from 'react';

// Create Theme Context
const ThemeContext = createContext(null);

// ThemeProvider Component
export function ThemeProvider({
  children,
  defaultTheme = 'light',
  storageKey = 'trimurti-theme'
}) {
  // Check for saved theme preference or use default
  const [theme, setTheme] = useState(() => {
    const storedTheme = localStorage.getItem(storageKey);
    return storedTheme || defaultTheme;
  });

  // Update theme in localStorage when it changes
  useEffect(() => {
    const root = window.document.documentElement;

    // Remove the previous theme class
    root.classList.remove('light', 'dark');

    // Add the current theme class
    root.classList.add(theme);

    // Save theme preference
    localStorage.setItem(storageKey, theme);
  }, [theme, storageKey]);

  // Set theme based on user's system preference
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

    // Only apply system preference if no stored preference exists
    if (!localStorage.getItem(storageKey)) {
      const systemTheme = mediaQuery.matches ? 'dark' : 'light';
      setTheme(systemTheme);
    }

    // Update theme if system preference changes
    const handleChange = (event) => {
      // Only apply if user hasn't manually set a preference
      if (!localStorage.getItem(storageKey)) {
        const newTheme = event.matches ? 'dark' : 'light';
        setTheme(newTheme);
      }
    };

    mediaQuery.addEventListener('change', handleChange);

    return () => mediaQuery.removeEventListener('change', handleChange);
  }, [storageKey]);

  // Toggle between light and dark theme
  const toggleTheme = () => {
    setTheme(prevTheme => prevTheme === 'light' ? 'dark' : 'light');
  };

  // Set a specific theme
  const setThemeValue = (newTheme) => {
    if (newTheme === 'light' || newTheme === 'dark') {
      setTheme(newTheme);
    } else {
      console.error('Invalid theme value. Use "light" or "dark".');
    }
  };

  // Context value
  const value = {
    theme,
    isDarkMode: theme === 'dark',
    toggleTheme,
    setTheme: setThemeValue
  };

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

// Custom hook for using theme context
export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

export default ThemeContext;
