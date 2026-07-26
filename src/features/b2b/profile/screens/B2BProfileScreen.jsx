import React, { useCallback, useMemo, useState } from 'react';
import {
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MapPin, Package, ReceiptText, User } from 'lucide-react-native';
import { useFocusEffect } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { useAppTheme } from '../../../../theme/useAppTheme';
import { routeNames } from '../../../../navigation/routeNames';
import { fetchShopkeeperProfileStatus } from '../../../auth/actions/authActions';
import { b2bApi } from '../../../../services/api';
import { formatDate } from '../../../../utils/formatDate';
import ProfileHeroCard from '../components/ProfileHeroCard';
import ProfileMenuCard from '../components/ProfileMenuCard';
import ProfileDueCard from '../components/ProfileDueCard';
import ProfileSecureCard from '../components/ProfileSecureCard';
import { formatMetalWeight, getPrimaryMetalSummary } from '../utils/ledgerSummary';

const getProfile = (auth = {}) => (
  auth.shopkeeperProfile
  || auth.user?.shopkeeper
  || auth.user?.shopkeeperProfile
  || null
);

const getPrimaryAddress = (profile) =>
  profile?.addresses?.find(address => address.isPrimary) || profile?.addresses?.[0] || null;

const compactLocation = (profile) => {
  const address = getPrimaryAddress(profile);
  return [profile?.city || address?.city, profile?.state || address?.state]
    .filter(Boolean)
    .join(', ');
};

const B2BProfileScreen = ({ navigation }) => {
  const theme = useAppTheme();
  const dispatch = useDispatch();
  const auth = useSelector(state => state.auth);
  const profile = getProfile(auth);
  const [ledgerSummary, setLedgerSummary] = useState([]);
  const primaryMetalSummary = getPrimaryMetalSummary(ledgerSummary);
  const currentDue = formatMetalWeight(primaryMetalSummary?.due);

  const refreshProfile = useCallback(() => {
    dispatch(fetchShopkeeperProfileStatus()).catch(() => {});
    b2bApi.profile
      .getMetalLedgerSummary()
      .then((response) => setLedgerSummary(response?.data?.data ?? []))
      .catch(() => setLedgerSummary([]));
  }, [dispatch]);

  useFocusEffect(refreshProfile);

  const menuItems = useMemo(() => [
    {
      Icon: User,
      title: 'Profile',
      description: 'View and manage your shop profile',
      onPress: () => navigation.navigate(routeNames.myProfile),
      active: true,
    },
    {
      Icon: ReceiptText,
      title: 'Transactions',
      description: 'View ledger, payments and account activity',
      onPress: () => navigation.navigate(routeNames.transactions),
    },
    {
      Icon: Package,
      title: 'My Orders',
      description: 'Track your orders and order history',
      onPress: () => navigation.navigate(routeNames.myOrders),
    },
    {
      Icon: MapPin,
      title: 'Addresses',
      description: 'Manage your shop addresses',
      onPress: () => navigation.navigate(routeNames.addresses),
    },
  ], [navigation]);

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]} edges={['top']}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}
        refreshControl={(
          <RefreshControl
            refreshing={auth.profileStatusLoading}
            onRefresh={refreshProfile}
            tintColor="#C58B12"
          />
        )}
      >
        <View style={styles.header}>
          <Text style={[styles.title, { color: theme.text }]}>Profile</Text>
          <Text style={[styles.subtitle, { color: theme.muted }]}>
            View and manage your shop profile
          </Text>
        </View>

        <ProfileHeroCard
          profile={profile}
          location={compactLocation(profile)}
          memberSince={formatDate(profile?.createdAt)}
        />

        <ProfileDueCard
          dueAmount={currentDue}
          metalName={primaryMetalSummary?.name || 'Gold'}
          onPress={() => navigation.navigate(routeNames.transactions)}
        />

        <ProfileMenuCard items={menuItems} />

        <ProfileSecureCard />
      </ScrollView>
    </SafeAreaView>
  );
};

export default B2BProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    paddingBottom: 108,
  },
  header: {
    paddingHorizontal: 39,
    paddingTop: 16,
    paddingBottom: 8,
  },
  title: {
    fontSize: 44,
    fontWeight: '900',
    letterSpacing: 0,
  },
  subtitle: {
    marginTop: 2,
    fontSize: 24,
    lineHeight: 30,
  },
});
