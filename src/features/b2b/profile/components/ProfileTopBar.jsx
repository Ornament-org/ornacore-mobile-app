import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { ArrowLeft, Bell, ShoppingCart } from 'lucide-react-native';
import { useAppTheme } from '../../../../theme/useAppTheme';

const ProfileTopBar = ({ title = 'My Profile', onBackPress, onNotificationsPress, onCartPress }) => {
  const theme = useAppTheme();

  return (
    <View style={styles.container}>
      <TouchableOpacity
        activeOpacity={0.75}
        onPress={onBackPress}
        style={styles.backButton}
      >
        <ArrowLeft size={28} color={theme.text} strokeWidth={2.4} />
      </TouchableOpacity>

      <Text style={[styles.title, { color: theme.text }]}>{title}</Text>

      <View style={styles.actions}>
        <TouchableOpacity
          activeOpacity={0.75}
          onPress={onNotificationsPress}
          style={[styles.actionButton, { backgroundColor: theme.surface, borderColor: theme.border }]}
        >
          <Bell size={22} color={theme.text} />
          <View style={styles.badge}>
            <Text style={styles.badgeText}>3</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          activeOpacity={0.75}
          onPress={onCartPress}
          style={[styles.actionButton, { backgroundColor: theme.surface, borderColor: theme.border }]}
        >
          <ShoppingCart size={22} color={theme.text} />
          <View style={styles.badge}>
            <Text style={styles.badgeText}>2</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ProfileTopBar;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingTop: 18,
    paddingBottom: 14,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  backButton: {
    width: 46,
    height: 46,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    position: 'absolute',
    left: 112,
    right: 112,
    textAlign: 'center',
    fontSize: 22,
    fontWeight: '800',
  },
  actions: {
    flexDirection: 'row',
    gap: 10,
  },
  actionButton: {
    width: 52,
    height: 52,
    borderRadius: 26,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  badge: {
    position: 'absolute',
    right: 1,
    top: -2,
    minWidth: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: '#F21F3A',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 5,
  },
  badgeText: {
    color: '#FFFFFF',
    fontSize: 11,
    fontWeight: '800',
  },
});
