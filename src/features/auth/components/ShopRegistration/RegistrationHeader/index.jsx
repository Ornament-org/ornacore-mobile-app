import React from 'react';
import { Animated, Text, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Svg, { Defs, LinearGradient, Rect, Stop } from 'react-native-svg';
import { ArrowLeft, Headphones } from 'lucide-react-native';
import { useAppTheme } from '../../../../../theme/useAppTheme';
import ShopIllustration from '../ShopIllustration';
import { createStyles } from './styles';

const RegistrationHeader = ({
  title = 'Shop Registration',
  subtitle = 'Create your shop account',
  onBackPress,
  onSupportPress,
  scrollY,
}) => {
  const theme = useAppTheme();
  const insets = useSafeAreaInsets();
  const styles = createStyles(theme, insets);

  const parallaxTranslate = scrollY
    ? scrollY.interpolate({
        inputRange: [-120, 0, 120],
        outputRange: [-24, 0, 32],
        extrapolate: 'clamp',
      })
    : 0;

  const illustrationScale = scrollY
    ? scrollY.interpolate({
        inputRange: [-120, 0, 120],
        outputRange: [1.08, 1, 0.82],
        extrapolate: 'clamp',
      })
    : 1;

  return (
    <View style={styles.container}>
      <Svg style={styles.gradient} pointerEvents="none">
        <Defs>
          <LinearGradient id="heroGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <Stop offset="0" stopColor={theme.primaryLight} stopOpacity="1" />
            <Stop offset="0.55" stopColor={theme.primary} stopOpacity="1" />
            <Stop offset="1" stopColor={theme.primaryDark} stopOpacity="1" />
          </LinearGradient>
        </Defs>
        <Rect x="0" y="0" width="100%" height="100%" fill="url(#heroGradient)" />
      </Svg>

      <View pointerEvents="none" style={styles.patternBlobOne} />
      <View pointerEvents="none" style={styles.patternBlobTwo} />

      <View style={styles.topRow}>
        <TouchableOpacity
          accessibilityRole="button"
          accessibilityLabel="Go back"
          activeOpacity={0.8}
          onPress={onBackPress}
          style={styles.iconButton}
        >
          <ArrowLeft size={20} color={theme.onPrimary} />
        </TouchableOpacity>

        <TouchableOpacity
          accessibilityRole="button"
          accessibilityLabel="Get support"
          activeOpacity={0.8}
          onPress={onSupportPress}
          style={styles.iconButton}
        >
          <Headphones size={20} color={theme.onPrimary} />
        </TouchableOpacity>
      </View>

      <View style={styles.heroRow}>
        <View style={styles.textBlock}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.subtitle}>{subtitle}</Text>
        </View>

        <Animated.View
          style={{
            transform: [{ translateY: parallaxTranslate }, { scale: illustrationScale }],
          }}
        >
          <ShopIllustration size={132} />
        </Animated.View>
      </View>
    </View>
  );
};

export default RegistrationHeader;
