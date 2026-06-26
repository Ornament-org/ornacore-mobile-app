import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { theme } from '../../theme';
import AppButton from './AppButton';

const AppEmptyState = ({
  icon,
  title,
  message,
  actionLabel,
  onAction,
}) => {
  return (
    <View style={styles.container}>
      {icon && <View style={styles.iconContainer}>{icon}</View>}
      <Text style={styles.title}>{title}</Text>
      {message && <Text style={styles.message}>{message}</Text>}
      {actionLabel && onAction && (
        <AppButton
          title={actionLabel}
          onPress={onAction}
          style={styles.button}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: theme.spacing.xl,
    backgroundColor: theme.colors.background.primary,
  },
  iconContainer: {
    marginBottom: theme.spacing.lg,
  },
  title: {
    ...theme.typography.h5,
    color: theme.colors.text.primary,
    textAlign: 'center',
    marginBottom: theme.spacing.sm,
  },
  message: {
    ...theme.typography.body2,
    color: theme.colors.text.secondary,
    textAlign: 'center',
    marginBottom: theme.spacing.xl,
    maxWidth: 280,
  },
  button: {
    minWidth: 150,
  },
});

export default AppEmptyState;
