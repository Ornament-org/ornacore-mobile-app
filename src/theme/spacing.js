import { Dimensions } from 'react-native';

// Base spacing unit (8px)
const baseSpacing = 8;

// Screen dimensions
const { width, height } = Dimensions.get('window');

export const spacing = {
  // Base spacing multiples
  xs: baseSpacing * 0.5,   // 4px
  sm: baseSpacing,          // 8px
  md: baseSpacing * 2,      // 16px
  lg: baseSpacing * 3,      // 24px
  xl: baseSpacing * 4,      // 32px
  '2xl': baseSpacing * 5,   // 40px
  '3xl': baseSpacing * 6,   // 48px
  '4xl': baseSpacing * 8,   // 64px
  '5xl': baseSpacing * 10,  // 80px
  '6xl': baseSpacing * 12,  // 96px
  '7xl': baseSpacing * 16,  // 128px
  '8xl': baseSpacing * 20,  // 160px
  
  // Component-specific spacing
  padding: {
    xs: baseSpacing * 0.5,
    sm: baseSpacing,
    md: baseSpacing * 2,
    lg: baseSpacing * 3,
    xl: baseSpacing * 4,
  },
  
  margin: {
    xs: baseSpacing * 0.5,
    sm: baseSpacing,
    md: baseSpacing * 2,
    lg: baseSpacing * 3,
    xl: baseSpacing * 4,
  },
  
  // Screen dimensions
  screen: {
    width,
    height,
    minWidth: 320,
    maxWidth: 768,
  },
  
  // Component dimensions
  component: {
    buttonHeight: 48,
    inputHeight: 48,
    tabBarHeight: 56,
    headerHeight: 56,
    cardMinHeight: 200,
    imageMinHeight: 150,
  },
  
  // Border radius
  borderRadius: {
    none: 0,
    sm: 4,
    md: 8,
    lg: 12,
    xl: 16,
    '2xl': 24,
    full: 9999,
  },
  
  // Icon sizes
  iconSize: {
    xs: 16,
    sm: 20,
    md: 24,
    lg: 32,
    xl: 40,
    '2xl': 48,
  },
};

// Helper function to get spacing value
export const getSpacing = (value) => {
  if (typeof value === 'number') {
    return value;
  }
  return spacing[value] || spacing.md;
};
