/* eslint-disable react/no-unstable-nested-components */
import React from 'react';
import { Platform, StyleSheet } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Grid2X2, Home, ShoppingCart, Store } from 'lucide-react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { routeNames } from '../../../navigation/routeNames';
import { navigate as rootNavigate } from '../../../app/navigationRef';
import { useAppTheme } from '../../../theme/useAppTheme';
import { typography } from '../../../theme/typography';
import ThemedPlaceholder from '../../../components/common/ThemedPlaceholder';
import LandingHomeScreen from '../screens/LandingHomeScreen';

const Tab = createBottomTabNavigator();

const icons = {
  [routeNames.home]: Home,
  [routeNames.catalog]: Grid2X2,
  [routeNames.cart]: ShoppingCart,
  [routeNames.shop]: Store,
};

const PublicCatalogScreen = () => (
  <ThemedPlaceholder title="Categories" message="Explore collections as a customer." />
);
const PublicCartScreen = () => (
  <ThemedPlaceholder title="Cart" message="Login to save and checkout items." />
);
const PublicShopScreen = () => (
  <ThemedPlaceholder title="Shop" message="Register or login as a shopkeeper." />
);

const PublicBottomTabs = () => {
  const theme = useAppTheme();
  const insets = useSafeAreaInsets();
  const bottomOffset = Math.max(insets.bottom, 12);
  const tabBarHeight = 66;

  const openShopWelcome = () => {
    rootNavigate(routeNames.b2b, { authScreen: routeNames.shopKeeperWelcome });
  };

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: theme.background }]} edges={['top']}>
      <Tab.Navigator
        screenOptions={({ route }) => {
          const Icon = icons[route.name] || Home;

          return {
            headerShown: false,
            tabBarActiveTintColor: theme.primary,
            tabBarInactiveTintColor: theme.muted,
            tabBarStyle: {
              position: 'absolute',
              left: 16,
              right: 16,
              bottom: bottomOffset,
              height: tabBarHeight,
              paddingTop: 8,
              paddingBottom: 8,
              backgroundColor: theme.tabBar,
              borderColor: theme.border,
              borderWidth: 1,
              borderRadius: 24,
              shadowColor: theme.black,
              shadowOffset: { width: 0, height: 10 },
              shadowOpacity: theme.isDark ? 0.38 : 0.16,
              shadowRadius: 22,
              elevation: 18,
            },
            tabBarItemStyle: styles.tabBarItem,
            tabBarLabelStyle: {
              fontFamily: typography.fontFamily.semibold,
              fontSize: 11,
              fontWeight: '700',
              paddingBottom: Platform.OS === 'android' ? 2 : 0,
            },
            tabBarIcon: ({ color, focused }) => (
              <Icon color={color} size={focused ? 23 : 21} strokeWidth={focused ? 2.7 : 2.1} />
            ),
            sceneStyle: {
              backgroundColor: theme.background,
              paddingBottom: tabBarHeight + bottomOffset + 10,
            },
          };
        }}
      >
        <Tab.Screen name={routeNames.home} component={LandingHomeScreen} options={{ tabBarLabel: 'Home' }} />
        <Tab.Screen name={routeNames.catalog} component={PublicCatalogScreen} options={{ tabBarLabel: 'Categories' }} />
        <Tab.Screen name={routeNames.cart} component={PublicCartScreen} options={{ tabBarLabel: 'Cart' }} />
        <Tab.Screen
          name={routeNames.shop}
          component={PublicShopScreen}
          options={{ tabBarLabel: 'Shop' }}
          listeners={{
            tabPress: (event) => {
              event.preventDefault();
              openShopWelcome();
            },
          }}
        />
      </Tab.Navigator>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  tabBarItem: {
    borderRadius: 18,
    marginHorizontal: 2,
    paddingVertical: 4,
  },
});

export default PublicBottomTabs;
