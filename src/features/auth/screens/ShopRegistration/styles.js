import { StyleSheet } from 'react-native';
import { Radius, Spacing } from './tokens';

export const createStyles = (theme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.background,
    },

    scrollContent: {
      paddingBottom: Spacing.xxl,
    },

    fieldsGroup: {
      marginTop: Spacing.sm,
    },

    locationButton: {
      alignSelf: 'flex-start',
      flexDirection: 'row',
      alignItems: 'center',
      gap: Spacing.xs,
      marginBottom: Spacing.md,
      paddingVertical: Spacing.xs,
      paddingHorizontal: Spacing.md,
      borderRadius: Radius.full,
      backgroundColor: theme.primarySoft,
    },

    locationButtonText: {
      fontSize: 12.5,
      fontWeight: '700',
      color: theme.primary,
    },

    addressRow: {
      flexDirection: 'row',
      gap: Spacing.md,
    },

    addressRowItem: {
      flex: 1,
    },

    buttonWrapper: {
      marginTop: Spacing.sm,
    },

    footer: {
      marginTop: Spacing.xl,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      gap: Spacing.xs,
    },

    footerText: {
      fontSize: 13,
      color: theme.muted,
    },

    footerLink: {
      fontSize: 13,
      fontWeight: '800',
      color: theme.primary,
    },
  });
