import { StyleSheet } from 'react-native';
import { typography } from '../../../../theme/typography';

export const createStyles = (theme) =>
  StyleSheet.create({
    row: {
      paddingHorizontal: 16,
      gap: 10,
    },
    item: {
      alignItems: 'center',
      width: 76,
    },
    card: {
      width: 72,
      height: 72,
      borderRadius: 16,
      backgroundColor: theme.surface,
      borderWidth: 1,
      borderColor: theme.border,
      alignItems: 'center',
      justifyContent: 'center',
      shadowColor: theme.black,
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.05,
      shadowRadius: 6,
      elevation: 2,
    },
    label: {
      ...typography.caption,
      fontSize: 11,
      fontWeight: '600',
      color: theme.text,
      marginTop: 7,
      textAlign: 'center',
    },
  });
