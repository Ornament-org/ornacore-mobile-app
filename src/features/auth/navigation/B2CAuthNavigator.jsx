import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { routeNames } from '../../../navigation/routeNames';
import ThemedPlaceholder from '../../../components/common/ThemedPlaceholder';

const Stack = createNativeStackNavigator();

const CustomerLoginScreen = () => (
  <ThemedPlaceholder
    title="Customer Login"
    message="Customer authentication will live separately from B2B shopkeeper auth."
  />
);
const CustomerRegisterScreen = () => (
  <ThemedPlaceholder
    title="Customer Register"
    message="Customer signup will use its own B2C flow."
  />
);

const B2CAuthNavigator = () => (
  <Stack.Navigator
    initialRouteName={routeNames.customerLogin}
    screenOptions={{ headerShown: false }}
  >
    <Stack.Screen name={routeNames.customerLogin} component={CustomerLoginScreen} />
    <Stack.Screen name={routeNames.customerRegister} component={CustomerRegisterScreen} />
  </Stack.Navigator>
);

export default B2CAuthNavigator;
