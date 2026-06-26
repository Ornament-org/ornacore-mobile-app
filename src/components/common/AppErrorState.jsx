import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { theme } from '../../theme';
import AppButton from './AppButton';

const AppErrorState = ({
  title = 'Something went wrong',
  message,
  onRetry,
}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.icon}>⚠️</Text>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.message}>{message}</Text>
      {onRetry && (
        <AppButton
          title="Retry"
          onPress={onRetry}
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
  icon: {
    fontSize: 64,
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

export default AppErrorState;
