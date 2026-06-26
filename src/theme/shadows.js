import { CustomColors } from './CustomColors';

const iosShadows = {
  small: {
    shadowColor: CustomColors.common.black,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  medium: {
    shadowColor: CustomColors.common.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
  },
  large: {
    shadowColor: CustomColors.common.black,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
  },
  xl: {
    shadowColor: CustomColors.common.black,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.25,
    shadowRadius: 16,
  },
};

const androidShadows = {
  small: {
    elevation: 2,
  },
  medium: {
    elevation: 4,
  },
  large: {
    elevation: 8,
  },
  xl: {
    elevation: 12,
  },
};

const mergeShadow = (size) => ({
  ...iosShadows[size],
  ...androidShadows[size],
});

export const shadows = {
  // iOS shadows
  ios: iosShadows,
  
  // Android shadows (elevation)
  android: androidShadows,
  
  // Cross-platform shadows
  small: mergeShadow('small'),
  medium: mergeShadow('medium'),
  large: mergeShadow('large'),
  xl: mergeShadow('xl'),
  
  // Special shadows for specific components
  card: {
    shadowColor: CustomColors.common.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
  },
  
  button: {
    shadowColor: CustomColors.common.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
  },
  
  modal: {
    shadowColor: CustomColors.common.black,
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.3,
    shadowRadius: 20,
    elevation: 12,
  },
  
  navigationBar: {
    shadowColor: CustomColors.common.black,
    shadowOffset: { width: 0, height: -1 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 4,
  },
};

// Helper function to get shadow style
export const getShadow = (size = 'medium') => {
  return shadows[size] || shadows.medium;
};
