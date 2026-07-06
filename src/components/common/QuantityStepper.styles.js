import { StyleSheet } from 'react-native';

export const createStyles = (theme) =>
  StyleSheet.create({
    row: {
      flexDirection: 'row',
      alignItems: 'center',
      borderRadius: 8,
      borderWidth: 1,
      borderColor: theme.border,
      overflow: 'hidden',
    },
    button: {
      width: 34,
      height: 34,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: theme.surfaceMuted,
    },
    buttonDisabled: {
      opacity: 0.4,
    },
    value: {
      minWidth: 40,
      textAlign: 'center',
      color: theme.text,
      fontSize: 14,
      fontWeight: '700',
    },
  });
