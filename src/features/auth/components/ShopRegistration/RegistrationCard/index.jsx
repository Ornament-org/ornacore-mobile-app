import React, { useEffect, useRef } from 'react';
import { Animated, Text, View } from 'react-native';
import { useAppTheme } from '../../../../../theme/useAppTheme';
import { createStyles } from './styles';

const RegistrationCard = ({ title, subtitle, children }) => {
  const theme = useAppTheme();
  const styles = createStyles(theme);
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const translateAnim = useRef(new Animated.Value(18)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 420,
        useNativeDriver: true,
      }),
      Animated.timing(translateAnim, {
        toValue: 0,
        duration: 420,
        useNativeDriver: true,
      }),
    ]).start();
  }, [fadeAnim, translateAnim]);

  return (
    <Animated.View
      style={[
        styles.container,
        { opacity: fadeAnim, transform: [{ translateY: translateAnim }] },
      ]}
    >
      {title || subtitle ? (
        <View style={styles.header}>
          {title ? <Text style={styles.title}>{title}</Text> : null}
          <View style={styles.headerRule} />
          {subtitle ? <Text style={styles.subtitle}>{subtitle}</Text> : null}
        </View>
      ) : null}

      {children}
    </Animated.View>
  );
};

export default RegistrationCard;
