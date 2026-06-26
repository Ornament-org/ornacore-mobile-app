import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { routeNames } from '../../../navigation/routeNames';
import ShopkeeperRegistrationScreen from '../screens/ShopkeeperRegistrationScreen';
import LoginScreen from '../screens/LoginScreen';
import WelcomeScreen from '../screens/WelcomeScreen';
import ThemedPlaceholder from '../../../components/common/ThemedPlaceholder';

const Stack = createNativeStackNavigator();

const RegisterScreen = () => <ThemedPlaceholder title="B2B Register" message="Shopkeeper registration starts from the shop profile flow." />;
const ForgotPasswordScreen = () => <ThemedPlaceholder title="Reset Password" message="B2B password recovery." />;
const CompleteShopProfileScreen = () => <ThemedPlaceholder title="Complete Shop Profile" message="Finish business details." />;

const B2BAuthNavigator = ({ initialRouteName = routeNames.shopKeeperWelcome }) => (
  <Stack.Navigator
    key={`b2b-auth-${initialRouteName}`}
    initialRouteName={initialRouteName}
    screenOptions={{ headerShown: false }}
  >
    <Stack.Screen name={routeNames.shopKeeperWelcome} component={WelcomeScreen} />
    <Stack.Screen name={routeNames.login} component={LoginScreen} />
    <Stack.Screen name={routeNames.register} component={RegisterScreen} />
    <Stack.Screen name={routeNames.shopkeeperRegister} component={ShopkeeperRegistrationScreen} />
    <Stack.Screen name={routeNames.forgotPassword} component={ForgotPasswordScreen} />
    <Stack.Screen name={routeNames.completeShopProfile} component={CompleteShopProfileScreen} />
  </Stack.Navigator>
);

export default B2BAuthNavigator;
