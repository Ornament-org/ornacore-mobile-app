import { StyleSheet } from 'react-native';
import { typography } from '../../../../theme/typography';

export const createStyles = (theme) =>
  StyleSheet.create({
    strip: {
      marginHorizontal: 16,
      marginTop: 18,
      borderRadius: 14,
      borderWidth: 1,
      borderColor: theme.border,
      backgroundColor: theme.primarySoft,
      paddingVertical: 14,
      flexDirection: 'row',
    },
    item: {
      flex: 1,
      alignItems: 'center',
      paddingHorizontal: 4,
    },
    divider: {
      borderLeftWidth: 1,
      borderLeftColor: theme.border,
    },
    icon: {
      marginBottom: 7,
    },
    title: {
      ...typography.caption,
      fontSize: 10,
      fontWeight: '800',
      color: theme.text,
      textAlign: 'center',
    },
    copy: {
      ...typography.caption,
      fontSize: 8.5,
      lineHeight: 11,
      color: theme.muted,
      textAlign: 'center',
      marginTop: 2,
    },
  });
