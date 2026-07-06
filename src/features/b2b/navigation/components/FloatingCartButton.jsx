import React, { useMemo } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { ShoppingCart } from 'lucide-react-native';
import { useAppTheme } from '../../../../theme/useAppTheme';
import { createStyles } from './FloatingCartButton.styles';

const FloatingCartButton = ({ onPress, accessibilityState, count = 0 }) => {
  const theme = useAppTheme();
  const styles = useMemo(() => createStyles(theme), [theme]);

  return (
    <View style={styles.wrap}>
      <TouchableOpacity
        activeOpacity={0.85}
        style={styles.button}
        onPress={onPress}
        accessibilityRole="button"
        accessibilityState={accessibilityState}
        accessibilityLabel="Cart"
      >
        <ShoppingCart color={theme.onPrimary} size={24} />
        {count > 0 ? (
          <View style={styles.badge}>
            <Text style={styles.badgeText}>{count > 99 ? '99+' : count}</Text>
          </View>
        ) : null}
      </TouchableOpacity>
    </View>
  );
};

export default FloatingCartButton;
