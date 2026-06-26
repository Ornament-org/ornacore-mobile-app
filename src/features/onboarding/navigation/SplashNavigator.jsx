import React, { useMemo } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { routeNames } from '../../../navigation/routeNames';
import { useAppTheme } from '../../../theme/useAppTheme';

const Stack = createNativeStackNavigator();

const SplashScreen = () => {
  const colors = useAppTheme();
  const styles = useMemo(() => createStyles(colors), [colors]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>OrnaCore</Text>
      <Text style={styles.subtitle}>Premium Jewelry</Text>
    </View>
  );
};

const SplashNavigator = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name={routeNames.splash} component={SplashScreen} />
  </Stack.Navigator>
);

const createStyles = (colors) => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 36,
    fontWeight: 'bold',
    color: colors.primary,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 18,
    color: colors.muted,
  },
});

export default SplashNavigator;
