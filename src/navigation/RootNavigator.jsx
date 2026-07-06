import React, { useEffect, useMemo, useRef, useState } from 'react';
import {
  CommonActions,
  NavigationContainer,
  useNavigationContainerRef,
} from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useDispatch, useSelector } from 'react-redux';
import { setNavigationRef } from '../app/navigationRef';
import { routeNames } from './routeNames';
import PublicNavigator from '../features/onboarding/navigation/PublicNavigator';
import ApprovalNavigator from '../features/approval/navigation/ApprovalNavigator';
import B2BSegment from '../features/b2b/navigation/B2BSegment';
import B2CSegment from '../features/b2c/navigation/B2CSegment';
import SplashNavigator from '../features/onboarding/navigation/SplashNavigator';
import { ProductSheetProvider } from '../features/b2b/products/context/ProductSheetContext';
import { bootstrapAuth } from '../features/auth/actions/authActions';
import { getRootRouteForSession } from '../features/auth/selectors/sessionSelectors';
import { useAppTheme } from '../theme/useAppTheme';
import { typography } from '../theme/typography';

const Stack = createNativeStackNavigator();
const NAVIGATION_BOOT_KEY = 'ornament-segmented-root-v1';

const RootNavigator = () => {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  const colors = useAppTheme();
  const navigationRef = useNavigationContainerRef();
  const [isNavigationReady, setIsNavigationReady] = useState(false);
  const lastRouteRef = useRef(routeNames.splash);
  const targetRoute = useMemo(() => getRootRouteForSession(auth, routeNames), [auth]);

  useEffect(() => {
    dispatch(bootstrapAuth());
  }, [dispatch]);

  useEffect(() => {
    if (!isNavigationReady || lastRouteRef.current === targetRoute) {
      return;
    }

    lastRouteRef.current = targetRoute;
    navigationRef.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [{ name: targetRoute }],
      }),
    );
  }, [isNavigationReady, navigationRef, targetRoute]);

  return (
    <NavigationContainer
      key={NAVIGATION_BOOT_KEY}
      ref={navigationRef}
      onReady={() => {
        setNavigationRef(navigationRef.current);
        setIsNavigationReady(true);
      }}
      theme={{
        dark: colors.isDark,
        colors: {
          primary: colors.primary,
          background: colors.background,
          card: colors.surface,
          text: colors.text,
          border: colors.border,
          notification: colors.danger,
        },
        fonts: {
          regular: { fontFamily: typography.fontFamily.regular, fontWeight: '400' },
          medium: { fontFamily: typography.fontFamily.medium, fontWeight: '500' },
          bold: { fontFamily: typography.fontFamily.bold, fontWeight: '700' },
          heavy: { fontFamily: typography.fontFamily.bold, fontWeight: '800' },
        },
      }}
    >
      <ProductSheetProvider>
        <Stack.Navigator
          initialRouteName={routeNames.splash}
          screenOptions={{ headerShown: false }}
        >
          <Stack.Screen name={routeNames.splash} component={SplashNavigator} />
          <Stack.Screen name={routeNames.public} component={PublicNavigator} />
          <Stack.Screen name={routeNames.b2b} component={B2BSegment} />
          <Stack.Screen name={routeNames.b2c} component={B2CSegment} />
          <Stack.Screen name={routeNames.approval} component={ApprovalNavigator} />
        </Stack.Navigator>
      </ProductSheetProvider>
    </NavigationContainer>
  );
};

export default RootNavigator;
