import React, { useCallback, useMemo, useState } from 'react';
import {
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Bell, LogOut, MapPin, Package, ReceiptText, ShoppingCart, User } from 'lucide-react-native';
import { useFocusEffect } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { useAppTheme } from '../../../../theme/useAppTheme';
import { routeNames } from '../../../../navigation/routeNames';
import { reset as resetRootNavigation } from '../../../../app/navigationRef';
import { fetchShopkeeperProfileStatus, logout } from '../../../auth/actions/authActions';
import { b2bApi } from '../../../../services/api';
import { formatDate } from '../../../../utils/formatDate';
import ProfileHeroCard from '../components/ProfileHeroCard';
import ProfileMenuCard from '../components/ProfileMenuCard';
import ProfileMetricCards from '../components/ProfileMetricCards';
import ProfileSecureCard from '../components/ProfileSecureCard';

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

const goToLanding = () => {
  resetRootNavigation({
    index: 0,
    routes: [{
      name: routeNames.public,
      state: {
        index: 0,
        routes: [{
          name: routeNames.publicTabs,
          state: {
            index: 0,
            routes: [{ name: routeNames.home }],
          },
        }],
      },
    }],
  });
};

const HeaderAction = ({ Icon, count, onPress }) => {
  const theme = useAppTheme();

  return (
    <TouchableOpacity
      activeOpacity={0.75}
      onPress={onPress}
      style={[styles.headerAction, { backgroundColor: theme.surface, borderColor: theme.border }]}
    >
      <Icon size={22} color={theme.text} />
      {count ? (
        <View style={styles.badge}>
          <Text style={styles.badgeText}>{count}</Text>
        </View>
      ) : null}
    </TouchableOpacity>
  );
};

const B2BProfileScreen = ({ navigation }) => {
  const theme = useAppTheme();
  const dispatch = useDispatch();
  const auth = useSelector(state => state.auth);
  const profile = getProfile(auth);
  const [ledgerSummary, setLedgerSummary] = useState([]);
  const primaryMetalSummary = ledgerSummary.find(row => row.code === 'GOLD') || ledgerSummary[0];

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
      title: 'My Profile',
      onPress: () => navigation.navigate(routeNames.myProfile),
    },
    {
      Icon: ReceiptText,
      title: 'Transactions',
      onPress: () => navigation.navigate(routeNames.transactions),
    },
    {
      Icon: Package,
      title: 'My Orders',
      onPress: () => navigation.navigate(routeNames.myOrders),
    },
    {
      Icon: MapPin,
      title: 'Addresses',
      onPress: () => navigation.navigate(routeNames.addresses),
    },
  ], [navigation]);

  const handleLogout = async () => {
    await dispatch(logout());
    goToLanding();
  };

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
          <View style={styles.headerActions}>
            <HeaderAction Icon={Bell} count="3" onPress={() => navigation.navigate(routeNames.b2bNotifications)} />
            <HeaderAction Icon={ShoppingCart} count="2" onPress={() => navigation.navigate(routeNames.cart)} />
            <HeaderAction Icon={LogOut} onPress={handleLogout} />
          </View>
        </View>

        <ProfileHeroCard
          profile={profile}
          location={compactLocation(profile)}
          memberSince={formatDate(profile?.createdAt)}
          onEditPress={() => navigation.navigate(routeNames.myProfile)}
        />

        <ProfileMetricCards
          dueAmount={`${primaryMetalSummary?.due ?? '0.000'} gm`}
          delivered={`${primaryMetalSummary?.delivered ?? '0.000'} gm`}
          received={`${primaryMetalSummary?.received ?? '0.000'} gm`}
          metalName={primaryMetalSummary?.name || 'Gold'}
          onBalancePress={() => navigation.navigate(routeNames.b2bPaymentLedger)}
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
    paddingHorizontal: 20,
    paddingTop: 18,
    paddingBottom: 14,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  title: {
    fontSize: 28,
    fontWeight: '800',
  },
  headerActions: {
    flexDirection: 'row',
    gap: 10,
  },
  headerAction: {
    width: 52,
    height: 52,
    borderRadius: 26,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  badge: {
    position: 'absolute',
    right: 1,
    top: -2,
    minWidth: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: '#F21F3A',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 5,
  },
  badgeText: {
    color: '#FFFFFF',
    fontSize: 11,
    fontWeight: '800',
  },
});
