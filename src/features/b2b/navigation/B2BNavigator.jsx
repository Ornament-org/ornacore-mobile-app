import React from 'react';
import { StyleSheet } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SafeAreaView } from 'react-native-safe-area-context';
import B2BBottomTabs from './B2BBottomTabs';
import { routeNames } from '../../../navigation/routeNames';
import B2BCatalogScreen from '../catalog/screens/B2BCatalogScreen';
import B2BProductDetailsScreen from '../products/screens/B2BProductDetailsScreen';
import MyProfileScreen from '../profile/screens/MyProfileScreen';
import TransactionsScreen from '../profile/screens/TransactionsScreen';
import MyOrdersScreen from '../profile/screens/MyOrdersScreen';
import AddressesScreen from '../profile/screens/AddressesScreen';
import ThemedPlaceholder from '../../../components/common/ThemedPlaceholder';

const Stack = createNativeStackNavigator();

const B2BSearchScreen = () => <ThemedPlaceholder title="B2B Search" message="Search flow will live inside B2B." />;
const B2BFilterScreen = () => <ThemedPlaceholder title="B2B Filters" message="B2B catalog filters will be managed here." />;
const B2BCheckoutScreen = () => <ThemedPlaceholder title="B2B Checkout" message="Shopkeeper checkout will be separate from customer checkout." />;
const B2BOrderSuccessScreen = () => <ThemedPlaceholder title="Order Placed" message="B2B order success state." />;
const B2BOrderDetailsScreen = () => <ThemedPlaceholder title="B2B Order" message="Shopkeeper order details." />;
const B2BPaymentLedgerScreen = () => <ThemedPlaceholder title="Payment Ledger" message="B2B credit and payment ledger." />;
const B2BEditProfileScreen = () => <ThemedPlaceholder title="Shop Profile" message="Shopkeeper profile editing." />;
const B2BSupportScreen = () => <ThemedPlaceholder title="B2B Support" message="Business support lives here." />;
const B2BNotificationsScreen = () => <ThemedPlaceholder title="B2B Notifications" message="Shopkeeper notifications." />;

const B2BNavigator = () => (
  <SafeAreaView style={styles.safeArea} edges={['top']}>
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name={routeNames.b2bTabs} component={B2BBottomTabs} />
      <Stack.Screen name={routeNames.b2bProductList} component={B2BCatalogScreen} />
      <Stack.Screen name={routeNames.b2bProductDetails} component={B2BProductDetailsScreen} />
      <Stack.Screen name={routeNames.b2bSearch} component={B2BSearchScreen} />
      <Stack.Screen name={routeNames.b2bFilter} component={B2BFilterScreen} />
      <Stack.Screen name={routeNames.b2bCheckout} component={B2BCheckoutScreen} />
      <Stack.Screen name={routeNames.b2bOrderSuccess} component={B2BOrderSuccessScreen} />
      <Stack.Screen name={routeNames.b2bOrderDetails} component={B2BOrderDetailsScreen} />
      <Stack.Screen name={routeNames.b2bPaymentLedger} component={B2BPaymentLedgerScreen} />
      <Stack.Screen name={routeNames.b2bEditProfile} component={B2BEditProfileScreen} />
      <Stack.Screen name={routeNames.b2bSupport} component={B2BSupportScreen} />
      <Stack.Screen name={routeNames.b2bNotifications} component={B2BNotificationsScreen} />
      <Stack.Screen name={routeNames.myProfile} component={MyProfileScreen} />
      <Stack.Screen name={routeNames.transactions} component={TransactionsScreen} />
      <Stack.Screen name={routeNames.myOrders} component={MyOrdersScreen} />
      <Stack.Screen name={routeNames.addresses} component={AddressesScreen} />
    </Stack.Navigator>
  </SafeAreaView>
);

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: 'white',
  },
});

export default B2BNavigator;
