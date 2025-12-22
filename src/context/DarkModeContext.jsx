import React, { createContext, useContext } from 'react';

const DarkModeContext = createContext();

export function DarkModeProvider({ children, darkMode, setDarkMode }) {
  return (
    <DarkModeContext.Provider value={{ darkMode, setDarkMode }}>
      {children}
    </DarkModeContext.Provider>
  );
}

export function useDarkMode() {
  const context = useContext(DarkModeContext);
  if (!context) {
    throw new Error('useDarkMode must be used within DarkModeProvider');
  }
  return context;
}
