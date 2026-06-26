import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { routeNames } from '../../../navigation/routeNames';
import PublicBottomTabs from './PublicBottomTabs';

const Stack = createNativeStackNavigator();

const PublicNavigator = () => (
  <Stack.Navigator
    initialRouteName={routeNames.publicTabs}
    screenOptions={{ headerShown: false }}
  >
    <Stack.Screen name={routeNames.publicTabs} component={PublicBottomTabs} />
  </Stack.Navigator>
);

export default PublicNavigator;
