import { colors, getMetalTheme } from './colors';
import { typography, getTextStyle } from './typography';
import { spacing, getSpacing } from './spacing';
import { shadows, getShadow } from './shadows';

// Complete theme object
export const theme = {
  colors,
  typography,
  spacing,
  shadows,
  
  // Helper functions
  getMetalTheme,
  getTextStyle,
  getSpacing,
  getShadow,
  
  // Current metal theme (can be changed dynamically)
  currentMetal: 'gold',
  
  // Set current metal theme
  setMetalTheme: (metal) => {
    theme.currentMetal = metal;
    theme.colors.primary = getMetalTheme(metal);
  },
};

export default theme;
