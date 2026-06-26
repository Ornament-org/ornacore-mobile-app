import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { routeNames } from '../../../navigation/routeNames';
import ShopApprovalStatusScreen from '../pages/ShopApprovalStatusScreen';

const Stack = createNativeStackNavigator();

const ApprovalNavigator = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name={routeNames.pendingApproval} component={ShopApprovalStatusScreen} />
    <Stack.Screen name={routeNames.rejected} component={ShopApprovalStatusScreen} />
    <Stack.Screen name={routeNames.suspended} component={ShopApprovalStatusScreen} />
  </Stack.Navigator>
);

export default ApprovalNavigator;
