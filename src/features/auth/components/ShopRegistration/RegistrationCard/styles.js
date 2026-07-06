import { StyleSheet } from 'react-native';
import { Radius, Spacing, Typography } from '../../../screens/ShopRegistration/tokens';

export const createStyles = (theme) =>
  StyleSheet.create({
    container: {
      marginHorizontal: Spacing.lg,
      marginTop: -Spacing.xxl,
      borderRadius: Radius.xl,
      padding: Spacing.xl,
      backgroundColor: theme.surface,
      shadowColor: theme.isDark ? '#000000' : '#3A2C10',
      shadowOffset: { width: 0, height: 12 },
      shadowOpacity: theme.isDark ? 0.4 : 0.12,
      shadowRadius: 24,
      elevation: 10,
    },

    header: {
      marginBottom: Spacing.lg,
    },

    title: {
      fontSize: Typography.title,
      fontWeight: '800',
      color: theme.text,
      letterSpacing: -0.3,
    },

    headerRule: {
      marginTop: Spacing.sm,
      marginBottom: Spacing.sm,
      width: 56,
      height: 3,
      borderRadius: Radius.full,
      backgroundColor: theme.primary,
    },

    subtitle: {
      fontSize: Typography.body,
      lineHeight: Typography.body * 1.5,
      color: theme.muted,
    },
  });
