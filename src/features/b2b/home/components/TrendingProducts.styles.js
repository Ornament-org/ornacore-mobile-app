import { StyleSheet } from 'react-native';
import { typography } from '../../../../theme/typography';

export const createStyles = (theme) =>
  StyleSheet.create({
    row: {
      paddingHorizontal: 16,
      gap: 12,
    },
    card: {
      width: 168,
      borderRadius: 16,
      backgroundColor: theme.surface,
      borderWidth: 1,
      borderColor: theme.border,
      overflow: 'hidden',
    },
    imageWrap: {
      height: 150,
      backgroundColor: theme.surfaceMuted,
    },
    image: {
      width: '100%',
      height: '100%',
    },
    heartButton: {
      position: 'absolute',
      top: 9,
      right: 9,
      width: 30,
      height: 30,
      borderRadius: 15,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: theme.floatingSurface,
    },
    body: {
      paddingHorizontal: 11,
      paddingVertical: 10,
    },
    name: {
      ...typography.subtitle2,
      fontSize: 13,
      fontWeight: '700',
      color: theme.text,
    },
    purity: {
      ...typography.caption,
      fontSize: 11,
      fontWeight: '700',
      color: theme.primary,
      marginTop: 4,
    },
    weight: {
      ...typography.caption,
      fontSize: 11,
      color: theme.muted,
      marginTop: 3,
    },
  });
