import { StyleSheet } from 'react-native';
import { Radius, Spacing, Typography } from '../../../screens/ShopRegistration/tokens';

export const createStyles = (theme, insets) =>
  StyleSheet.create({
    container: {
      overflow: 'hidden',
      paddingTop: insets.top + Spacing.sm,
      paddingBottom: Spacing.xxl,
      paddingHorizontal: Spacing.lg,
      borderBottomLeftRadius: Radius.xl,
      borderBottomRightRadius: Radius.xl,
    },

    gradient: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      width: '100%',
      height: '100%',
    },

    patternBlobOne: {
      position: 'absolute',
      top: -40,
      right: -30,
      width: 140,
      height: 140,
      borderRadius: 70,
      backgroundColor: 'rgba(255, 255, 255, 0.08)',
    },

    patternBlobTwo: {
      position: 'absolute',
      bottom: -60,
      left: -40,
      width: 160,
      height: 160,
      borderRadius: 80,
      backgroundColor: 'rgba(255, 255, 255, 0.06)',
    },

    topRow: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },

    iconButton: {
      width: 40,
      height: 40,
      borderRadius: Radius.full,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: 'rgba(255, 255, 255, 0.18)',
    },

    heroRow: {
      marginTop: Spacing.xl,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },

    textBlock: {
      flex: 1,
      paddingRight: Spacing.sm,
    },

    title: {
      fontSize: Typography.heading - 4,
      fontWeight: '800',
      color: theme.onPrimary,
      letterSpacing: -0.5,
    },

    subtitle: {
      marginTop: Spacing.xs,
      fontSize: Typography.subtitle,
      color: theme.heroText,
    },
  });
