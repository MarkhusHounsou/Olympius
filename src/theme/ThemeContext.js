import { createContext, useContext, useMemo, useState } from 'react';
import { palettes } from './palettes';

const ThemeContext = createContext(null);

export function ThemeProvider({ children }) {
  const [themeKey, setThemeKey] = useState('A');
  const value = useMemo(
    () => ({ theme: palettes[themeKey], themeKey, setThemeKey, palettes }),
    [themeKey]
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) throw new Error('useTheme doit être utilisé dans ThemeProvider');
  return context;
}
