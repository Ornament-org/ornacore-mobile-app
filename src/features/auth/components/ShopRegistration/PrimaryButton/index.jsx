import React, { useRef } from 'react';
import { ActivityIndicator, Animated, Pressable, Text, View } from 'react-native';
import Svg, { Defs, LinearGradient, Rect, Stop } from 'react-native-svg';
import { useAppTheme } from '../../../../../theme/useAppTheme';
import { createStyles } from './styles';

const PrimaryButton = ({ title, onPress, icon: Icon, loading = false, disabled = false }) => {
  const theme = useAppTheme();
  const styles = createStyles(theme);
  const scaleAnim = useRef(new Animated.Value(1)).current;
  const isDisabled = disabled || loading;

  const animateTo = (toValue) =>
    Animated.spring(scaleAnim, {
      toValue,
      useNativeDriver: true,
      speed: 40,
      bounciness: 6,
    }).start();

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityState={{ disabled: isDisabled, busy: loading }}
      disabled={isDisabled}
      onPress={onPress}
      onPressIn={() => animateTo(0.97)}
      onPressOut={() => animateTo(1)}
    >
      <Animated.View
        style={[
          styles.container,
          { transform: [{ scale: scaleAnim }] },
          isDisabled ? styles.containerDisabled : styles.containerShadow,
        ]}
      >
        {!isDisabled ? (
          <Svg style={styles.gradient} pointerEvents="none">
            <Defs>
              <LinearGradient id="ctaGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <Stop offset="0" stopColor={theme.primary} stopOpacity="1" />
                <Stop offset="1" stopColor={theme.primaryDark} stopOpacity="1" />
              </LinearGradient>
            </Defs>
            <Rect x="0" y="0" width="100%" height="100%" fill="url(#ctaGradient)" />
          </Svg>
        ) : null}

        <View style={styles.content}>
          {loading ? (
            <ActivityIndicator color={theme.onPrimary} />
          ) : (
            <>
              {Icon ? <Icon size={18} color={theme.onPrimary} /> : null}
              <Text style={styles.label}>{title}</Text>
            </>
          )}
        </View>
      </Animated.View>
    </Pressable>
  );
};

export default PrimaryButton;
