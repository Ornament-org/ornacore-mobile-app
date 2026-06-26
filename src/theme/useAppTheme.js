import React, { createContext, useContext, useMemo } from 'react';
import { useColorScheme } from 'react-native';
import { useSelector } from 'react-redux';
import { getCustomColors } from './CustomColors';

export const getAppTheme = (scheme, metalCode = 'GOLD', adminPalette) =>
  getCustomColors({ colorScheme: scheme, metalCode, adminPalette });

const AppThemeContext = createContext(getAppTheme('light'));

export const AppThemeProvider = ({ children }) => {
  const scheme = useColorScheme();
  const metalCode = useSelector((state) => {
    const { metals = [], selectedMetalId } = state.catalog ?? {};
    return metals.find((metal) => metal.id === selectedMetalId)?.code ?? 'GOLD';
  });
  const colors = useMemo(() => getAppTheme(scheme, metalCode), [scheme, metalCode]);

  return (
    <AppThemeContext.Provider value={colors}>
      {children}
    </AppThemeContext.Provider>
  );
};

export const useAppTheme = () => useContext(AppThemeContext);
