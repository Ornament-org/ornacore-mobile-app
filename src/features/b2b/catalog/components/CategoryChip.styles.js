import { StyleSheet } from 'react-native';
import { typography } from '../../../../theme/typography';

export const createStyles = (theme) =>
  StyleSheet.create({
    card: {
      width: 80,
      minHeight: 96,
      borderRadius: 12,
      borderWidth: 1,
      borderColor: theme.border,
      backgroundColor: theme.surface,
      alignItems: 'center',
      paddingTop: 8,
      paddingBottom: 7,
      paddingHorizontal: 5,
    },
    cardActive: {
      borderColor: theme.primary,
      backgroundColor: theme.primarySoft,
    },
    thumb: {
      width: 52,
      height: 52,
      borderRadius: 9,
      overflow: 'hidden',
      backgroundColor: theme.surfaceMuted,
      alignItems: 'center',
      justifyContent: 'center',
    },
    thumbActive: {
      backgroundColor: theme.surface,
    },
    image: {
      width: '100%',
      height: '100%',
    },
    label: {
      ...typography.caption,
      fontSize: 10,
      lineHeight: 12,
      fontWeight: '600',
      color: theme.text,
      textAlign: 'center',
      marginTop: 6,
    },
    labelActive: {
      color: theme.primaryDark,
      fontWeight: '800',
    },
  });
