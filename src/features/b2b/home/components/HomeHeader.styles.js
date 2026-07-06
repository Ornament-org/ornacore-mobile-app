import { StyleSheet } from 'react-native';
import { typography } from '../../../../theme/typography';

export const createStyles = (theme) =>
  StyleSheet.create({
    row: {
      height: 64,
      paddingHorizontal: 16,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    sideSlot: {
      width: 72,
      alignItems: 'flex-start',
    },
    sideSlotRight: {
      width: 72,
      alignItems: 'flex-end',
    },
    iconButton: {
      width: 40,
      height: 40,
      alignItems: 'center',
      justifyContent: 'center',
    },
    brand: {
      flex: 1,
      alignItems: 'center',
    },
    wordmarkRow: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    crown: {
      marginBottom: 1,
    },
    wordmark: {
      fontFamily: typography.fontFamily.display,
      fontSize: 22,
      lineHeight: 26,
      letterSpacing: 3,
      fontWeight: '700',
      color: theme.text,
    },
    tagline: {
      ...typography.overline,
      fontSize: 8,
      letterSpacing: 2.4,
      color: theme.muted,
      marginTop: 1,
    },
    bellDot: {
      position: 'absolute',
      top: 7,
      right: 8,
      width: 8,
      height: 8,
      borderRadius: 4,
      backgroundColor: theme.primary,
    },
    loginButton: {
      height: 36,
      paddingHorizontal: 12,
      borderRadius: 18,
      borderWidth: 1,
      borderColor: theme.primary,
      backgroundColor: theme.primarySoft,
      flexDirection: 'row',
      alignItems: 'center',
      gap: 5,
    },
    loginText: {
      ...typography.subtitle2,
      fontSize: 11,
      fontWeight: '800',
      color: theme.primaryDark,
    },
  });
