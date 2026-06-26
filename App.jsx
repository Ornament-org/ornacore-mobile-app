/**
 * OrnaCore Mobile App
 * React Native app for B2B shopkeepers and future B2C customers
 *
 * @format
 */

import React from 'react';
import { StatusBar, StyleSheet } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Provider } from 'react-redux';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import store from './src/app/store';
import RootNavigator from './src/navigation/RootNavigator';
import { AppThemeProvider, useAppTheme } from './src/theme/useAppTheme';

const AppContent = () => {
  const colors = useAppTheme();

  return (
    <GestureHandlerRootView style={styles.container}>
      <SafeAreaProvider>
        <StatusBar
          barStyle={colors.isDark ? 'light-content' : 'dark-content'}
          backgroundColor={colors.background}
          translucent={false}
        />
        <RootNavigator />
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
};

function App() {
  return (
    <Provider store={store}>
      <AppThemeProvider>
        <AppContent />
      </AppThemeProvider>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;
