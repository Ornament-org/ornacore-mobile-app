import { StyleSheet } from 'react-native';
import { Radius, Spacing, Typography } from '../../../screens/ShopRegistration/tokens';

export const createStyles = (theme) =>
  StyleSheet.create({
    container: {
      marginTop: Spacing.lg,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      borderRadius: Radius.md,
      paddingVertical: Spacing.md,
      paddingHorizontal: Spacing.sm,
      backgroundColor: theme.primarySoft,
    },

    item: {
      flex: 1,
      alignItems: 'center',
      gap: Spacing.xs,
    },

    iconBadge: {
      width: 30,
      height: 30,
      borderRadius: Radius.full,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: theme.surface,
    },

    label: {
      fontSize: Typography.caption,
      fontWeight: '700',
      color: theme.text,
      textAlign: 'center',
    },

    divider: {
      width: StyleSheet.hairlineWidth,
      alignSelf: 'stretch',
      marginVertical: Spacing.xs,
      backgroundColor: theme.borderStrong ?? theme.border,
    },
  });
