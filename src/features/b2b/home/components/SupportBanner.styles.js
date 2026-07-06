import { StyleSheet } from 'react-native';
import { typography } from '../../../../theme/typography';

export const createStyles = (theme) =>
  StyleSheet.create({
    card: {
      marginHorizontal: 16,
      marginTop: 16,
      padding: 14,
      borderRadius: 14,
      backgroundColor: theme.surface,
      borderWidth: 1,
      borderColor: theme.border,
      flexDirection: 'row',
      alignItems: 'center',
      gap: 10,
    },
    copyBlock: { flex: 1 },
    title: {
      ...typography.subtitle2,
      fontSize: 13,
      fontWeight: '800',
      color: theme.text,
    },
    copy: {
      ...typography.caption,
      fontSize: 10,
      color: theme.muted,
      marginTop: 2,
    },
    contactButton: {
      height: 38,
      paddingHorizontal: 12,
      borderRadius: 10,
      borderWidth: 1,
      borderColor: theme.primary,
      alignItems: 'center',
      justifyContent: 'center',
    },
    contactText: {
      ...typography.caption,
      fontSize: 11,
      fontWeight: '700',
      color: theme.primaryDark,
    },
    whatsappButton: {
      width: 40,
      height: 40,
      borderRadius: 20,
      backgroundColor: '#25D366',
      alignItems: 'center',
      justifyContent: 'center',
    },
  });
