import React, { useMemo } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { Bell, Crown, LogIn, Menu } from 'lucide-react-native';
import { useAppTheme } from '../../../../theme/useAppTheme';
import { createStyles } from './HomeHeader.styles';

const HomeHeader = ({ isPublicLanding = false, onLogin, onMenu, onNotifications }) => {
  const theme = useAppTheme();
  const styles = useMemo(() => createStyles(theme), [theme]);

  return (
    <View style={styles.row}>
      <View style={styles.sideSlot}>
        <TouchableOpacity
          style={styles.iconButton}
          activeOpacity={0.7}
          onPress={onMenu}
          accessibilityRole="button"
          accessibilityLabel="Menu"
        >
          <Menu color={theme.text} size={24} />
        </TouchableOpacity>
      </View>

      <View style={styles.brand}>
        <Crown color={theme.primary} size={13} style={styles.crown} />
        <Text style={styles.wordmark}>ORNACORE</Text>
        <Text style={styles.tagline}>METALS. TRUST. VALUE.</Text>
      </View>

      <View style={styles.sideSlotRight}>
        {isPublicLanding ? (
          <TouchableOpacity
            style={styles.loginButton}
            activeOpacity={0.8}
            onPress={onLogin}
            accessibilityRole="button"
            accessibilityLabel="Login"
          >
            <LogIn color={theme.primary} size={14} />
            <Text style={styles.loginText}>Login</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            style={styles.iconButton}
            activeOpacity={0.7}
            onPress={onNotifications}
            accessibilityRole="button"
            accessibilityLabel="Notifications"
          >
            <Bell color={theme.text} size={23} />
            <View style={styles.bellDot} />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default HomeHeader;
