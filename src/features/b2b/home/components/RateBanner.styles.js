import { StyleSheet } from 'react-native';

export const createStyles = (theme, compact = false) =>
  StyleSheet.create({
    card: compact
      ? {
        marginHorizontal: 8,
        marginBottom: 10,
        marginTop: 6,
        borderRadius: 10,
        backgroundColor: theme.primarySoft,
        borderWidth: 1,
        borderColor: theme.border,
        overflow: 'hidden',
      }
      : {
        marginHorizontal: 16,
        marginTop: 12,
        borderRadius: 20,
        backgroundColor: '#171717',
        overflow: 'hidden',
        minHeight: 172,
      },

    sideImage: {
      position: 'absolute',
      top: 0,
      right: 0,
      bottom: 0,
      width: '52%',
      resizeMode: 'cover',
    },

    sideImageShade: {
      position: 'absolute',
      top: 0,
      right: 0,
      bottom: 0,
      width: '52%',
      backgroundColor: 'rgba(23, 23, 23, 0.25)',
    },

    content: {
      padding: compact ? 10 : 18,
      paddingBottom: compact ? 10 : 26,
      maxWidth: compact ? undefined : '62%',
    },

    label: {
      color: '#D8D2C4',
      fontSize: 12,
      fontWeight: '700',
      letterSpacing: 0.6,
    },

    priceRow: {
      flexDirection: 'row',
      alignItems: 'flex-end',
      marginTop: compact ? 0 : 8,
    },

    rupee: {
      color: compact ? theme.primaryDark : theme.primaryLight,
      fontSize: compact ? 13 : 22,
      fontWeight: '800',
      marginRight: 3,
    },

    price: {
      color: compact ? theme.primaryDark : theme.primaryLight,
      fontSize: compact ? 17 : 32,
      fontWeight: '800',
      lineHeight: compact ? 19 : 34,
    },

    unit: {
      color: compact ? theme.muted : '#D8D2C4',
      fontSize: compact ? 10 : 14,
      fontWeight: '600',
      marginLeft: 4,
      marginBottom: compact ? 1 : 4,
    },

    changeRow: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 4,
      marginTop: compact ? 4 : 7,
      flexWrap: 'wrap',
    },

    changeText: {
      fontSize: compact ? 9 : 12,
      fontWeight: '800',
    },

    changeSuffix: {
      color: '#8F897A',
      fontSize: 12,
    },

    ctaButton: {
      marginTop: 14,
      alignSelf: 'flex-start',
      flexDirection: 'row',
      alignItems: 'center',
      gap: 6,
      borderWidth: 1,
      borderRadius: 8,
      paddingHorizontal: 12,
      paddingVertical: 8,
    },

    ctaText: {
      fontSize: 11,
      fontWeight: '700',
    },

    compactLabel: {
      color: theme.muted,
      fontSize: 8.5,
      fontWeight: '800',
      letterSpacing: 0.5,
      marginBottom: 3,
    },

    updatedText: {
      color: theme.muted,
      fontSize: 8.5,
      marginTop: 3,
    },

    ctaLink: {
      marginTop: 7,
      alignSelf: 'flex-start',
      flexDirection: 'row',
      alignItems: 'center',
      gap: 3,
      borderWidth: 1,
      borderRadius: 7,
      paddingHorizontal: 7,
      paddingVertical: 5,
    },

    ctaLinkText: {
      fontSize: 9,
      fontWeight: '800',
    },

    dotsRow: {
      position: 'absolute',
      bottom: 10,
      left: 0,
      right: 0,
      flexDirection: 'row',
      justifyContent: 'center',
      gap: 6,
    },

    dot: {
      width: 6,
      height: 6,
      borderRadius: 3,
      backgroundColor: 'rgba(255, 255, 255, 0.4)',
    },

    dotActive: {
      width: 14,
      backgroundColor: theme.primary,
    },
  });
