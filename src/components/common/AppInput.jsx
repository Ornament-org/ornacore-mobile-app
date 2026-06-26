import React from 'react';
import {
  View,
  TextInput,
  Text,
  StyleSheet,
} from 'react-native';
import { theme } from '../../theme';

const AppInput = ({
  label,
  error,
  leftIcon,
  rightIcon,
  containerStyle,
  style,
  ...props
}) => {
  return (
    <View style={[styles.container, containerStyle]}>
      {label && <Text style={styles.label}>{label}</Text>}
      <View style={[styles.inputContainer, error && styles.inputError]}>
        {leftIcon && <View style={styles.iconLeft}>{leftIcon}</View>}
        <TextInput
          style={[styles.input, style]}
          placeholderTextColor={theme.colors.text.tertiary}
          {...props}
        />
        {rightIcon && <View style={styles.iconRight}>{rightIcon}</View>}
      </View>
      {error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: theme.spacing.md,
  },
  label: {
    ...theme.typography.subtitle2,
    color: theme.colors.text.primary,
    marginBottom: theme.spacing.xs,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    height: theme.spacing.component.inputHeight,
    borderWidth: 1,
    borderColor: theme.colors.border.medium,
    borderRadius: theme.spacing.borderRadius.md,
    backgroundColor: theme.colors.white,
    paddingHorizontal: theme.spacing.md,
    ...theme.shadows.small,
  },
  inputError: {
    borderColor: theme.colors.danger.main,
  },
  input: {
    flex: 1,
    ...theme.typography.body1,
    color: theme.colors.text.primary,
  },
  iconLeft: {
    marginRight: theme.spacing.sm,
  },
  iconRight: {
    marginLeft: theme.spacing.sm,
  },
  errorText: {
    ...theme.typography.caption,
    color: theme.colors.danger.main,
    marginTop: theme.spacing.xs,
  },
});

export default AppInput;
