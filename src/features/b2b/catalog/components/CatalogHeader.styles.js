import { StyleSheet } from 'react-native';
import { typography } from '../../../../theme/typography';

export const createStyles = (theme) =>
  StyleSheet.create({
    row: {
      minHeight: 64,
      paddingHorizontal: 12,
      paddingVertical: 8,
      flexDirection: 'row',
      alignItems: 'center',
      gap: 4,
      borderBottomWidth: 1,
      borderBottomColor: theme.border,
    },
    iconButton: {
      width: 40,
      height: 40,
      alignItems: 'center',
      justifyContent: 'center',
    },
    titleBlock: {
      flex: 1,
      marginLeft: 2,
    },
    title: {
      ...typography.h5,
      fontSize: 17,
      letterSpacing: 1,
      color: theme.text,
    },
    subtitle: {
      ...typography.caption,
      fontSize: 10,
      color: theme.muted,
      marginTop: 1,
    },
    badge: {
      position: 'absolute',
      top: 3,
      right: 1,
      minWidth: 17,
      height: 17,
      borderRadius: 9,
      paddingHorizontal: 4,
      backgroundColor: theme.primary,
      alignItems: 'center',
      justifyContent: 'center',
    },
    badgeText: {
      color: theme.onPrimary,
      fontSize: 9,
      fontWeight: '800',
    },
  });
