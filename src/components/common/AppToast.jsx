import React, { useEffect, useState } from 'react';
import { Text, StyleSheet, Animated } from 'react-native';
import { theme } from '../../theme';

const AppToast = ({
  message,
  type = 'info',
  duration = 3000,
  visible,
  onHide,
}) => {
  const [fadeAnim] = useState(new Animated.Value(0));

  useEffect(() => {
    if (visible) {
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }).start();

      const timer = setTimeout(() => {
        Animated.timing(fadeAnim, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }).start(() => onHide());
      }, duration);

      return () => clearTimeout(timer);
    }
  }, [visible, duration, fadeAnim, onHide]);

  if (!visible) return null;

  const getBackgroundColor = () => {
    switch (type) {
      case 'success':
        return theme.colors.success.main;
      case 'error':
        return theme.colors.danger.main;
      case 'warning':
        return theme.colors.warning.main;
      case 'info':
      default:
        return theme.colors.info.main;
    }
  };

  const getIcon = () => {
    switch (type) {
      case 'success':
        return '✓';
      case 'error':
        return '✕';
      case 'warning':
        return '⚠';
      case 'info':
      default:
        return 'ℹ';
    }
  };

  return (
    <Animated.View
      style={[
        styles.container,
        {
          backgroundColor: getBackgroundColor(),
          opacity: fadeAnim,
        },
      ]}
    >
      <Text style={styles.icon}>{getIcon()}</Text>
      <Text style={styles.message}>{message}</Text>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: theme.spacing.xl,
    left: theme.spacing.md,
    right: theme.spacing.md,
    flexDirection: 'row',
    alignItems: 'center',
    padding: theme.spacing.md,
    borderRadius: theme.spacing.borderRadius.md,
    ...theme.shadows.medium,
    zIndex: 1000,
  },
  icon: {
    fontSize: theme.typography.fontSize.lg,
    color: theme.colors.white,
    marginRight: theme.spacing.sm,
  },
  message: {
    ...theme.typography.body2,
    color: theme.colors.white,
    flex: 1,
  },
});

export default AppToast;
