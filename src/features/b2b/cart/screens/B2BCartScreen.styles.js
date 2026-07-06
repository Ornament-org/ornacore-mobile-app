import { StyleSheet } from 'react-native';
import { typography } from '../../../../theme/typography';

export const createStyles = (theme) =>
  StyleSheet.create({
    screen: { flex: 1, backgroundColor: theme.background },
    header: {
      height: 60,
      paddingHorizontal: 16,
      justifyContent: 'center',
      borderBottomWidth: 1,
      borderBottomColor: theme.border,
    },
    title: { ...typography.h5, color: theme.text },
    list: { padding: 16, gap: 12 },
    row: {
      flexDirection: 'row',
      padding: 10,
      borderRadius: 10,
      borderWidth: 1,
      borderColor: theme.border,
      backgroundColor: theme.surface,
      gap: 12,
    },
    thumb: {
      width: 66,
      height: 66,
      borderRadius: 8,
      backgroundColor: theme.surfaceMuted,
    },
    thumbPlaceholder: {
      alignItems: 'center',
      justifyContent: 'center',
    },
    body: { flex: 1, justifyContent: 'space-between' },
    name: { ...typography.subtitle2, color: theme.text, fontWeight: '800' },
    meta: { ...typography.caption, color: theme.muted, marginTop: 2 },
    footerRow: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginTop: 8,
    },
    lineTotal: {
      fontFamily: typography.fontFamily.bold,
      color: theme.danger,
      fontSize: 15,
      fontWeight: '800',
    },
    removeButton: {
      width: 30,
      height: 30,
      borderRadius: 15,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: theme.surfaceMuted,
    },
    empty: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      paddingHorizontal: 30,
    },
    emptyTitle: { ...typography.h5, color: theme.text, marginTop: 12 },
    emptyCopy: { ...typography.body2, color: theme.muted, textAlign: 'center', marginTop: 6 },
    summary: {
      borderTopWidth: 1,
      borderTopColor: theme.border,
      padding: 16,
      backgroundColor: theme.surface,
    },
    summaryRow: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginBottom: 12,
    },
    summaryLabel: { ...typography.body1, color: theme.muted },
    summaryValue: {
      fontFamily: typography.fontFamily.bold,
      color: theme.text,
      fontSize: 18,
      fontWeight: '800',
    },
    checkoutButton: {
      height: 50,
      borderRadius: 10,
      backgroundColor: theme.primary,
      alignItems: 'center',
      justifyContent: 'center',
    },
    checkoutText: {
      ...typography.button,
      color: theme.onPrimary,
      fontSize: 15,
    },
  });
