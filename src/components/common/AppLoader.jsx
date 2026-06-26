import React from 'react';
import { View, ActivityIndicator, StyleSheet, Modal, Text } from 'react-native';
import { theme } from '../../theme';

const AppLoader = ({ visible = true, message }) => {
  return (
    <Modal visible={visible} transparent animationType="fade">
      <View style={styles.container}>
        <View style={styles.loaderContainer}>
          <ActivityIndicator
            size="large"
            color={theme.colors.primary.main}
          />
          {message && (
            <Text style={styles.message}>{message}</Text>
          )}
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.overlay.medium,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loaderContainer: {
    backgroundColor: theme.colors.white,
    padding: theme.spacing.xl,
    borderRadius: theme.spacing.borderRadius.lg,
    alignItems: 'center',
    minWidth: 120,
    ...theme.shadows.large,
  },
  message: {
    ...theme.typography.body2,
    color: theme.colors.text.primary,
    marginTop: theme.spacing.md,
    textAlign: 'center',
  },
});

export default AppLoader;
