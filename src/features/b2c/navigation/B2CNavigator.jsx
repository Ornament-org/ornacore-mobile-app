import React from 'react';
import { StyleSheet } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SafeAreaView } from 'react-native-safe-area-context';
import { routeNames } from '../../../navigation/routeNames';
import ThemedPlaceholder from '../../../components/common/ThemedPlaceholder';

const Stack = createNativeStackNavigator();

const CustomerBottomTabs = () => (
  <ThemedPlaceholder
    title="Customer Home"
    message="B2C home, catalog, cart, orders, and profile will live in this customer segment."
  />
);
const CustomerProductListScreen = () => <ThemedPlaceholder title="Customer Products" message="Customer catalog list." />;
const CustomerProductDetailsScreen = () => <ThemedPlaceholder title="Customer Product" message="Customer product details." />;
const CustomerAddressScreen = () => <ThemedPlaceholder title="Customer Address" message="Customer address book." />;
const CustomerPaymentScreen = () => <ThemedPlaceholder title="Customer Payment" message="Customer payment flow." />;
const CustomerOrderDetailsScreen = () => <ThemedPlaceholder title="Customer Order" message="Customer order details." />;

const B2CNavigator = () => (
  <SafeAreaView style={styles.safeArea} edges={['top']}>
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name={routeNames.customerTabs} component={CustomerBottomTabs} />
      <Stack.Screen name={routeNames.customerProductList} component={CustomerProductListScreen} />
      <Stack.Screen name={routeNames.customerProductDetails} component={CustomerProductDetailsScreen} />
      <Stack.Screen name={routeNames.customerAddress} component={CustomerAddressScreen} />
      <Stack.Screen name={routeNames.customerPayment} component={CustomerPaymentScreen} />
      <Stack.Screen name={routeNames.customerOrderDetails} component={CustomerOrderDetailsScreen} />
    </Stack.Navigator>
  </SafeAreaView>
);

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: 'white',
  },
});

export default B2CNavigator;
