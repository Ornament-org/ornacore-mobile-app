import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';
import { ChevronRight } from 'lucide-react-native';
import { useAppTheme } from '../../../../theme/useAppTheme';

const ProfileNavigationItem = ({
  icon: Icon,
  title,
  subtitle,
  onPress,
  showArrow = true,
}) => {
  const theme = useAppTheme();

  return (
    <TouchableOpacity
      style={[
        styles.container,
        {
          backgroundColor: theme.surface,
          borderColor: theme.border,
        },
      ]}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <View style={styles.contentContainer}>
        {Icon && (
          <View style={[styles.iconContainer, { backgroundColor: theme.primary + '20' }]}>
            <Icon size={20} color={theme.primary} />
          </View>
        )}
        
        <View style={styles.textContainer}>
          <Text style={[styles.title, { color: theme.text }]}>
            {title}
          </Text>
          {subtitle && (
            <Text style={[styles.subtitle, { color: theme.muted }]}>
              {subtitle}
            </Text>
          )}
        </View>

        {showArrow && (
          <ChevronRight size={20} color={theme.muted} />
        )}
      </View>
    </TouchableOpacity>
  );
};

export default ProfileNavigationItem;

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 16,
    marginTop: 12,
    
    borderRadius: 16,
    borderWidth: 1,
    
    paddingHorizontal: 16,
    paddingVertical: 16,
  },

  contentContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },

  textContainer: {
    flex: 1,
  },

  title: {
    fontSize: 16,
    fontWeight: '600',
  },

  subtitle: {
    fontSize: 14,
    marginTop: 2,
  },
});
