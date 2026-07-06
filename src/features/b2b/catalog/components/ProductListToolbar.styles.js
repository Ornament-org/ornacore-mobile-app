import { StyleSheet } from 'react-native';
import { typography } from '../../../../theme/typography';

export const createStyles = (theme) =>
  StyleSheet.create({
    row: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginTop: 14,
      marginBottom: 10,
    },
    heading: { flex: 1, marginRight: 8 },
    title: {
      ...typography.subtitle2,
      fontSize: 13,
      fontWeight: '800',
      color: theme.text,
    },
    count: {
      ...typography.caption,
      fontSize: 10,
      color: theme.muted,
      marginTop: 1,
    },
    actions: { flexDirection: 'row', gap: 8 },
    button: {
      height: 30,
      paddingHorizontal: 10,
      borderRadius: 8,
      borderWidth: 1,
      borderColor: theme.border,
      backgroundColor: theme.surface,
      flexDirection: 'row',
      alignItems: 'center',
      gap: 5,
    },
    buttonText: {
      ...typography.caption,
      fontSize: 10,
      fontWeight: '700',
      color: theme.text,
    },
    dropdown: {
      position: 'absolute',
      top: 34,
      right: 0,
      minWidth: 140,
      borderRadius: 8,
      borderWidth: 1,
      borderColor: theme.border,
      backgroundColor: theme.surface,
      paddingVertical: 4,
      shadowColor: theme.black,
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.12,
      shadowRadius: 10,
      elevation: 8,
      zIndex: 20,
    },
    dropdownItem: {
      paddingHorizontal: 12,
      paddingVertical: 9,
    },
    dropdownItemActive: {
      backgroundColor: theme.primarySoft,
    },
    dropdownItemText: {
      ...typography.caption,
      fontSize: 11,
      color: theme.text,
      fontWeight: '600',
    },
    sortAnchor: { position: 'relative' },
  });
