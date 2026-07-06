/* eslint-disable react/no-unstable-nested-components */
import React, { useEffect } from 'react';
import { Platform, StyleSheet } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { FileText, Grid2X2, Home, ShoppingCart, User } from 'lucide-react-native';
import { useDispatch, useSelector } from 'react-redux';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useAppTheme } from '../../../theme/useAppTheme';
import { routeNames } from '../../../navigation/routeNames';
import B2BHomeScreen from '../home/screens/B2BHomeScreen';
import B2BCatalogScreen from '../catalog/screens/B2BCatalogScreen';
import B2BOrdersScreen from '../orders/screens/B2BOrdersScreen';
import B2BCartScreen from '../cart/screens/B2BCartScreen';
import B2BProfileScreen from '../profile/screens/B2BProfileScreen';
import { typography } from '../../../theme/typography';
import { fetchB2BCart } from '../cart/actions/cartActions';
import { selectB2BCartItemCount } from '../cart/selectors';
import FloatingCartButton from './components/FloatingCartButton';

const Tab = createBottomTabNavigator();

const icons = {
  [routeNames.home]: Home,
  [routeNames.catalog]: Grid2X2,
  [routeNames.orders]: FileText,
  [routeNames.cart]: ShoppingCart,
  [routeNames.profile]: User,
};

const B2BBottomTabs = () => {
  const theme = useAppTheme();
  const dispatch = useDispatch();
  const insets = useSafeAreaInsets();
  const bottomOffset = Math.max(insets.bottom, 12);
  const tabBarHeight = 66;
  const cartCount = useSelector(selectB2BCartItemCount);

  useEffect(() => {
    dispatch(fetchB2BCart()).catch(() => {});
  }, [dispatch]);

  return (
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
      <Tab.Screen name={routeNames.home} component={B2BHomeScreen} options={{ tabBarLabel: 'Home' }} />
      <Tab.Screen name={routeNames.catalog} component={B2BCatalogScreen} options={{ tabBarLabel: 'Categories' }} />
      <Tab.Screen
        name={routeNames.cart}
        component={B2BCartScreen}
        options={{
          tabBarLabel: 'Cart',
          tabBarShowLabel: false,
          tabBarButton: (props) => <FloatingCartButton {...props} count={cartCount} />,
        }}
      />
      <Tab.Screen name={routeNames.orders} component={B2BOrdersScreen} options={{ tabBarLabel: 'Orders' }} />
      <Tab.Screen name={routeNames.profile} component={B2BProfileScreen} options={{ tabBarLabel: 'Profile' }} />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  tabBarItem: {
    borderRadius: 18,
    marginHorizontal: 2,
    paddingVertical: 4,
  },
});

export default B2BBottomTabs;
