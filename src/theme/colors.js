import { CustomColors, getCustomColors } from './CustomColors';

const defaultColors = getCustomColors({ colorScheme: 'light', metalCode: 'GOLD' });

// Backward-compatible tokens for common components. New UI should use useAppTheme().
export const colors = {
  white: CustomColors.common.white,
  black: CustomColors.common.black,
  background: {
    primary: defaultColors.background,
    secondary: defaultColors.surface,
    tertiary: defaultColors.surfaceMuted,
  },
  text: {
    primary: defaultColors.text,
    secondary: defaultColors.muted,
    tertiary: defaultColors.subtleText,
    inverse: defaultColors.onPrimary,
  },
  primary: {
    main: defaultColors.primary,
    light: defaultColors.primaryLight,
    dark: defaultColors.primaryDark,
    gradient: [defaultColors.primary, defaultColors.primaryLight],
  },
  gold: {
    primary: CustomColors.metals.GOLD.primary,
    light: CustomColors.metals.GOLD.primaryLight,
    dark: CustomColors.metals.GOLD.primaryDark,
    background: CustomColors.metals.GOLD.softLight,
    gradient: [CustomColors.metals.GOLD.primary, CustomColors.metals.GOLD.primaryLight],
  },
  silver: {
    primary: CustomColors.metals.SILVER.primary,
    light: CustomColors.metals.SILVER.primaryLight,
    dark: CustomColors.metals.SILVER.primaryDark,
    background: CustomColors.metals.SILVER.softLight,
    gradient: [CustomColors.metals.SILVER.primary, CustomColors.metals.SILVER.primaryLight],
  },
  diamond: {
    primary: CustomColors.metals.DIAMOND.primary,
    light: CustomColors.metals.DIAMOND.primaryLight,
    dark: CustomColors.metals.DIAMOND.primaryDark,
    background: CustomColors.metals.DIAMOND.softLight,
    gradient: [CustomColors.metals.DIAMOND.primary, CustomColors.metals.DIAMOND.primaryLight],
  },
  success: { main: CustomColors.common.success },
  danger: { main: CustomColors.common.danger },
  warning: { main: CustomColors.common.warning },
  info: { main: CustomColors.common.info },
  border: {
    light: defaultColors.border,
    medium: defaultColors.borderStrong,
    dark: defaultColors.subtleText,
  },
  overlay: {
    light: CustomColors.common.overlayLight,
    medium: CustomColors.common.overlayMedium,
    dark: CustomColors.common.overlayDark,
  },
  status: {
    requested: CustomColors.common.requested,
    confirmed: CustomColors.common.confirmed,
    packed: CustomColors.common.packed,
    dispatched: CustomColors.common.dispatched,
    delivered: CustomColors.common.delivered,
    cancelled: CustomColors.common.cancelled,
  },
};

export const getMetalTheme = (metal = 'gold') => colors[metal] || colors.gold;
export const theme = { ...colors, currentMetal: 'gold' };

