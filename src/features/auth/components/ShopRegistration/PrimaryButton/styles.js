import { StyleSheet } from 'react-native';
import { Radius, Spacing, Typography } from '../../../screens/ShopRegistration/tokens';

export const createStyles = (theme) =>
  StyleSheet.create({
    container: {
      minHeight: 56,
      borderRadius: Radius.sm,
      overflow: 'hidden',
    },

    containerShadow: {
      shadowColor: theme.primaryDark,
      shadowOffset: { width: 0, height: 8 },
      shadowOpacity: 0.3,
      shadowRadius: 14,
      elevation: 6,
    },

    containerDisabled: {
      backgroundColor: theme.borderStrong ?? theme.border,
    },

    gradient: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      width: '100%',
      height: '100%',
    },

    content: {
      flex: 1,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      gap: Spacing.sm,
      paddingHorizontal: Spacing.lg,
    },

    label: {
      fontSize: Typography.subtitle,
      fontWeight: '800',
      color: theme.onPrimary,
      letterSpacing: 0.2,
    },
  });
