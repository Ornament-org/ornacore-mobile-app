import { StyleSheet } from 'react-native';

export const createStyles = (theme) =>
  StyleSheet.create({
    row: {
      paddingHorizontal: 16,
      paddingVertical: 6,
      gap: 12,
    },
    card: {
      minWidth: 118,
      height: 56,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 9,
      paddingHorizontal: 16,
      borderRadius: 16,
      backgroundColor: theme.surface,
      borderWidth: 1,
      borderColor: theme.border,
      shadowColor: theme.black,
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.05,
      shadowRadius: 8,
      elevation: 2,
    },
    cardActive: {
      backgroundColor: theme.primary,
      borderColor: theme.primary,
      shadowOpacity: 0.15,
      elevation: 5,
    },
    label: {
      fontSize: 14,
      fontWeight: '700',
      letterSpacing: 1,
      color: theme.text,
    },
    labelActive: {
      color: theme.onPrimary,
    },
  });
