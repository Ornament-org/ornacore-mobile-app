import React from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import { theme } from '../../theme';

const AppButton = ({
  title,
  onPress,
  variant = 'primary',
  size = 'medium',
  disabled = false,
  loading = false,
  style,
  textStyle,
  fullWidth = false,
}) => {
  const getButtonStyle = () => {
    const baseStyle = {
      ...styles.button,
      ...(fullWidth && styles.fullWidth),
    };

    const sizeStyles = {
      small: { height: theme.spacing.component.buttonHeight - 8, paddingHorizontal: theme.spacing.md },
      medium: { height: theme.spacing.component.buttonHeight, paddingHorizontal: theme.spacing.lg },
      large: { height: theme.spacing.component.buttonHeight + 8, paddingHorizontal: theme.spacing.xl },
    };

    const variantStyles = {
      primary: {
        backgroundColor: disabled ? theme.colors.text.tertiary : theme.colors.primary.main,
      },
      secondary: {
        backgroundColor: disabled ? theme.colors.text.tertiary : theme.colors.text.primary,
      },
      outline: {
        backgroundColor: 'transparent',
        borderWidth: 1,
        borderColor: disabled ? theme.colors.text.tertiary : theme.colors.primary.main,
      },
      text: {
        backgroundColor: 'transparent',
        paddingHorizontal: theme.spacing.sm,
      },
    };

    return {
      ...baseStyle,
      ...sizeStyles[size],
      ...variantStyles[variant],
    };
  };

  const getTextStyle = () => {
    const baseStyle = {
      ...styles.text,
    };

    const variantStyles = {
      primary: { color: theme.colors.white },
      secondary: { color: theme.colors.white },
      outline: { color: disabled ? theme.colors.text.tertiary : theme.colors.primary.main },
      text: { color: disabled ? theme.colors.text.tertiary : theme.colors.primary.main },
    };

    return {
      ...baseStyle,
      ...variantStyles[variant],
    };
  };

  return (
    <TouchableOpacity
      style={[getButtonStyle(), style]}
      onPress={onPress}
      disabled={disabled || loading}
      activeOpacity={0.7}
    >
      {loading ? (
        <ActivityIndicator color={variant === 'outline' || variant === 'text' ? theme.colors.primary.main : theme.colors.white} />
      ) : (
        <Text style={[getTextStyle(), textStyle]}>{title}</Text>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    borderRadius: theme.spacing.borderRadius.md,
    justifyContent: 'center',
    alignItems: 'center',
    ...theme.shadows.medium,
  },
  fullWidth: {
    width: '100%',
  },
  text: {
    ...theme.typography.button,
    fontWeight: '600',
  },
});

export default AppButton;
