/**
 * The only source of raw color values in the app.
 * Admin-provided metal palettes can be merged through getCustomColors().
 */
export const CustomColors = {
  common: {
    white: '#FFFFFF',
    black: '#000000',
    transparent: 'transparent',
    success: '#10B981',
    danger: '#EF4444',
    warning: '#F59E0B',
    info: '#3B82F6',
    requested: '#F59E0B',
    confirmed: '#3B82F6',
    packed: '#8B5CF6',
    dispatched: '#06B6D4',
    delivered: '#10B981',
    cancelled: '#EF4444',
    overlayLight: 'rgba(0, 0, 0, 0.30)',
    overlayMedium: 'rgba(0, 0, 0, 0.50)',
    overlayDark: 'rgba(0, 0, 0, 0.70)',
    collectionOverlay: 'rgba(0, 0, 0, 0.22)',
    lightFloatingSurface: 'rgba(255, 255, 255, 0.88)',
    darkFloatingSurface: 'rgba(30, 32, 34, 0.86)',
  },
  modes: {
    light: {
      background: '#FCFBF9',
      surface: '#FFFFFF',
      surfaceMuted: '#F7F3EE',
      elevated: '#FFFFFF',
      text: '#171717',
      muted: '#686868',
      subtleText: '#999999',
      border: '#E9E4DE',
      borderStrong: '#D4D4D4',
      tabBar: '#FFFFFF',
    },
    dark: {
      background: '#151719',
      surface: '#202225',
      surfaceMuted: '#292B2E',
      elevated: '#25272A',
      text: '#F8F7F5',
      muted: '#B9B9B7',
      subtleText: '#8E9093',
      border: '#37393C',
      borderStrong: '#55585C',
      tabBar: '#202225',
    },
  },
  metals: {
    GOLD: {
      primary: '#CF8E25',
      primaryLight: '#E8B85E',
      primaryDark: '#8C5411',
      softLight: '#FFF1D7',
      softDark: '#3B3021',
      onPrimary: '#FFFFFF',
      heroText: '#FFF0C2',
      lightOverlay: 'rgba(42, 24, 8, 0.12)',
      darkOverlay: 'rgba(0, 0, 0, 0.34)',
    },
    SILVER: {
      primary: '#8B929A',
      primaryLight: '#C9CED3',
      primaryDark: '#535A62',
      softLight: '#EEF1F3',
      softDark: '#30353A',
      onPrimary: '#FFFFFF',
      heroText: '#F5F7F8',
      lightOverlay: 'rgba(55, 62, 69, 0.12)',
      darkOverlay: 'rgba(0, 0, 0, 0.38)',
    },
    DIAMOND: {
      primary: '#779BB5',
      primaryLight: '#BFD8E8',
      primaryDark: '#456A84',
      softLight: '#EDF7FC',
      softDark: '#263842',
      onPrimary: '#FFFFFF',
      heroText: '#F2FAFF',
      lightOverlay: 'rgba(38, 79, 105, 0.12)',
      darkOverlay: 'rgba(0, 0, 0, 0.38)',
    },
  },
};

export const getCustomColors = ({
  colorScheme = 'light',
  metalCode = 'GOLD',
  adminPalette,
} = {}) => {
  const isDark = colorScheme === 'dark';
  const mode = CustomColors.modes[isDark ? 'dark' : 'light'];
  const metal = {
    ...CustomColors.metals.GOLD,
    ...(CustomColors.metals[metalCode] ?? {}),
    ...(adminPalette ?? {}),
  };

  return {
    ...CustomColors.common,
    ...mode,
    isDark,
    metalCode,
    primary: metal.primary,
    primaryLight: metal.primaryLight,
    primaryDark: metal.primaryDark,
    primarySoft: isDark ? metal.softDark : metal.softLight,
    onPrimary: metal.onPrimary,
    heroText: metal.heroText,
    imageOverlay: isDark ? metal.darkOverlay : metal.lightOverlay,
    floatingSurface: isDark
      ? CustomColors.common.darkFloatingSurface
      : CustomColors.common.lightFloatingSurface,
  };
};

