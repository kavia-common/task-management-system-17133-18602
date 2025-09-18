import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';

const ThemeContext = createContext({ theme: 'light', setTheme: () => {} });

/**
 * PUBLIC_INTERFACE
 * ThemeProvider wraps the app to provide theme state (light/dark) and allow future extensibility.
 */
export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState('light');

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
  }, [theme]);

  const value = useMemo(() => ({ theme, setTheme }), [theme]);
  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

/**
 * PUBLIC_INTERFACE
 * useTheme - access current theme and setter.
 */
export function useTheme() {
  return useContext(ThemeContext);
}
