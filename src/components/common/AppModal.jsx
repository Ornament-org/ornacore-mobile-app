import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Modal,
  TouchableOpacity,
} from 'react-native';
import { theme } from '../../theme';

const AppModal = ({
  visible,
  onClose,
  title,
  children,
  showCloseButton = true,
  containerStyle,
}) => {
  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <View style={[styles.container, containerStyle]}>
          {(title || showCloseButton) && (
            <View style={styles.header}>
              {title && <Text style={styles.title}>{title}</Text>}
              {showCloseButton && (
                <TouchableOpacity onPress={onClose} style={styles.closeButton}>
                  <Text style={styles.closeText}>✕</Text>
                </TouchableOpacity>
              )}
            </View>
          )}
          <View style={styles.content}>{children}</View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: theme.colors.overlay.medium,
    justifyContent: 'center',
    alignItems: 'center',
    padding: theme.spacing.xl,
  },
  container: {
    backgroundColor: theme.colors.white,
    borderRadius: theme.spacing.borderRadius.xl,
    width: '100%',
    maxWidth: 400,
    maxHeight: '80%',
    ...theme.shadows.modal,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: theme.spacing.lg,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border.light,
  },
  title: {
    ...theme.typography.h5,
    color: theme.colors.text.primary,
    flex: 1,
  },
  closeButton: {
    padding: theme.spacing.sm,
  },
  closeText: {
    fontSize: theme.typography.fontSize.xl,
    color: theme.colors.text.tertiary,
  },
  content: {
    padding: theme.spacing.lg,
  },
});

export default AppModal;
