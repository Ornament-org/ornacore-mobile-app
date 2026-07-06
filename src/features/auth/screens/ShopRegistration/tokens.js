import { spacing } from '../../../../theme/spacing';
import { typography } from '../../../../theme/typography';

/**
 * Design tokens for the Shop Registration screen.
 *
 * These are thin aliases over the app's existing spacing/typography scales
 * (src/theme/spacing.js, src/theme/typography.js) rather than a new parallel
 * token system — colors always come from useAppTheme() so this screen stays
 * dark-mode and metal-theme aware like the rest of the app.
 */
export const Spacing = {
  xs: spacing.xs,
  sm: spacing.sm,
  md: spacing.md,
  lg: spacing.lg,
  xl: spacing.xl,
  xxl: spacing['2xl'],
};

export const Radius = {
  xs: spacing.borderRadius.sm,
  sm: spacing.borderRadius.md,
  md: spacing.borderRadius.lg,
  lg: spacing.borderRadius.xl,
  xl: spacing.borderRadius['2xl'],
  full: spacing.borderRadius.full,
};

export const Typography = {
  heading: typography.fontSize['4xl'],
  title: typography.fontSize['2xl'],
  subtitle: typography.fontSize.lg,
  body: typography.fontSize.base,
  caption: typography.fontSize.sm,
};
