import { StyleSheet } from 'react-native';
import { typography } from '../../../../theme/typography';

export const createStyles = (theme) =>
  StyleSheet.create({
    card: {
      flexDirection: 'row',
      gap: 10,
      padding: 12,
      borderRadius: 10,
      backgroundColor: theme.primarySoft,
      marginTop: 12,
      marginBottom: 4,
    },
    iconWrap: {
      width: 26,
      height: 26,
      borderRadius: 13,
      backgroundColor: theme.surface,
      alignItems: 'center',
      justifyContent: 'center',
    },
    body: { flex: 1 },
    title: {
      ...typography.caption,
      fontSize: 11,
      fontWeight: '800',
      color: theme.primaryDark,
    },
    copy: {
      ...typography.caption,
      fontSize: 10,
      lineHeight: 14,
      color: theme.muted,
      marginTop: 2,
    },
  });
