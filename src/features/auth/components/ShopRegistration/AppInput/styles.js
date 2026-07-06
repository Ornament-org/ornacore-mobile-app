import { StyleSheet } from 'react-native';
import { Radius, Spacing, Typography } from '../../../screens/ShopRegistration/tokens';

export const createStyles = (theme) =>
  StyleSheet.create({
    wrapper: {
      marginBottom: Spacing.lg,
    },

    label: {
      fontSize: Typography.caption + 1,
      fontWeight: '700',
      color: theme.text,
      marginBottom: Spacing.sm,
    },

    inputContainer: {
      minHeight: 56,
      borderWidth: 1.4,
      borderRadius: Radius.sm,
      paddingHorizontal: Spacing.md,
      flexDirection: 'row',
      alignItems: 'center',
      gap: Spacing.sm,
      backgroundColor: theme.surface,
    },

    inputContainerFocused: {
      shadowColor: theme.primary,
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: theme.isDark ? 0.25 : 0.12,
      shadowRadius: 8,
      elevation: 2,
    },

    inputContainerDisabled: {
      backgroundColor: theme.surfaceMuted ?? theme.background,
      opacity: 0.7,
    },

    inputContainerMultiline: {
      minHeight: 88,
      alignItems: 'flex-start',
      paddingVertical: Spacing.sm,
    },

    input: {
      flex: 1,
      fontSize: Typography.body,
      paddingVertical: 0,
    },

    inputMultiline: {
      textAlignVertical: 'top',
      paddingTop: Spacing.xs,
    },

    errorText: {
      marginTop: Spacing.xs,
      marginLeft: 2,
      fontSize: Typography.caption,
      color: theme.danger,
      fontWeight: '600',
    },

    helperText: {
      marginTop: Spacing.xs,
      marginLeft: 2,
      fontSize: Typography.caption,
      color: theme.muted,
    },
  });
