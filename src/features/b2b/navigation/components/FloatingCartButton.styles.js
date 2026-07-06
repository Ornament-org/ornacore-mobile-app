import { StyleSheet } from 'react-native';

export const createStyles = (theme) =>
  StyleSheet.create({
    wrap: {
      flex: 1,
      alignItems: 'center',
    },
    button: {
      position: 'absolute',
      top: -22,
      width: 56,
      height: 56,
      borderRadius: 28,
      backgroundColor: theme.primary,
      alignItems: 'center',
      justifyContent: 'center',
      shadowColor: theme.black,
      shadowOffset: { width: 0, height: 6 },
      shadowOpacity: 0.28,
      shadowRadius: 10,
      elevation: 10,
      borderWidth: 3,
      borderColor: theme.tabBar,
    },
    badge: {
      position: 'absolute',
      top: -2,
      right: -2,
      minWidth: 19,
      height: 19,
      borderRadius: 10,
      paddingHorizontal: 4,
      backgroundColor: theme.danger,
      alignItems: 'center',
      justifyContent: 'center',
      borderWidth: 2,
      borderColor: theme.tabBar,
    },
    badgeText: {
      color: theme.onPrimary,
      fontSize: 10,
      fontWeight: '800',
    },
  });
