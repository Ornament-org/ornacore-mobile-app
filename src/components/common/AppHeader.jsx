import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { theme } from '../../theme';

const AppHeader = ({
  title,
  leftIcon,
  rightIcon,
  onLeftPress,
  onRightPress,
  style,
  showBackButton = false,
  onBackPress,
}) => {
  return (
    <View style={[styles.container, style]}>
      <View style={styles.leftContainer}>
        {showBackButton ? (
          <TouchableOpacity onPress={onBackPress} style={styles.iconButton}>
            <Text style={styles.backIcon}>←</Text>
          </TouchableOpacity>
        ) : leftIcon ? (
          <TouchableOpacity onPress={onLeftPress} style={styles.iconButton}>
            {leftIcon}
          </TouchableOpacity>
        ) : (
          <View style={styles.iconPlaceholder} />
        )}
      </View>
      
      {title && (
        <View style={styles.titleContainer}>
          <Text style={styles.title} numberOfLines={1}>
            {title}
          </Text>
        </View>
      )}
      
      <View style={styles.rightContainer}>
        {rightIcon ? (
          <TouchableOpacity onPress={onRightPress} style={styles.iconButton}>
            {rightIcon}
          </TouchableOpacity>
        ) : (
          <View style={styles.iconPlaceholder} />
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: theme.spacing.component.headerHeight,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: theme.colors.white,
    paddingHorizontal: theme.spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border.light,
    ...theme.shadows.navigationBar,
  },
  leftContainer: {
    width: 40,
    justifyContent: 'center',
  },
  rightContainer: {
    width: 40,
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  titleContainer: {
    flex: 1,
    alignItems: 'center',
  },
  title: {
    ...theme.typography.h6,
    color: theme.colors.text.primary,
  },
  iconButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconPlaceholder: {
    width: 40,
  },
  backIcon: {
    fontSize: theme.typography.fontSize.xl,
    color: theme.colors.text.primary,
  },
});

export default AppHeader;
