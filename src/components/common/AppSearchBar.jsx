import React from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import { theme } from '../../theme';

const AppSearchBar = ({
  placeholder = 'Search products...',
  value,
  onChangeText,
  onClear,
  style,
  autoFocus = false,
}) => {
  return (
    <View style={[styles.container, style]}>
      <View style={styles.searchIcon}>
        <Text style={styles.searchIconText}>🔍</Text>
      </View>
      <TextInput
        style={styles.input}
        placeholder={placeholder}
        placeholderTextColor={theme.colors.text.tertiary}
        value={value}
        onChangeText={onChangeText}
        autoFocus={autoFocus}
      />
      {(value?.length ?? 0) > 0 && onClear && (
        <TouchableOpacity onPress={onClear} style={styles.clearButton}>
          <Text style={styles.clearText}>✕</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    height: theme.spacing.component.inputHeight,
    backgroundColor: theme.colors.background.tertiary,
    borderRadius: theme.spacing.borderRadius.lg,
    paddingHorizontal: theme.spacing.md,
    marginHorizontal: theme.spacing.md,
    marginBottom: theme.spacing.md,
  },
  searchIcon: {
    marginRight: theme.spacing.sm,
  },
  searchIconText: {
    fontSize: theme.typography.fontSize.lg,
  },
  input: {
    flex: 1,
    ...theme.typography.body1,
    color: theme.colors.text.primary,
  },
  clearButton: {
    padding: theme.spacing.xs,
  },
  clearText: {
    fontSize: theme.typography.fontSize.lg,
    color: theme.colors.text.tertiary,
  },
});

export default AppSearchBar;
