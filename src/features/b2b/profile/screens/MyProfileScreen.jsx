import React, { useCallback, useMemo } from 'react';
import {
  RefreshControl,
  ScrollView,
  StyleSheet,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  Building2,
  CalendarDays,
  CreditCard,
  Landmark,
  Mail,
  MapPin,
  Percent,
  Phone,
  ShieldCheck,
  Store,
  Tag,
  WalletCards,
} from 'lucide-react-native';
import { useFocusEffect } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { useAppTheme } from '../../../../theme/useAppTheme';
import { routeNames } from '../../../../navigation/routeNames';
import { fetchShopkeeperProfileStatus } from '../../../auth/actions/authActions';
import { formatDate } from '../../../../utils/formatDate';
import ProfileHeroCard from '../components/ProfileHeroCard';
import ProfileInfoSection from '../components/ProfileInfoSection';
import ProfileSecureCard from '../components/ProfileSecureCard';
import ProfileTopBar from '../components/ProfileTopBar';

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

const fullAddress = (profile) => {
  const address = getPrimaryAddress(profile);
  return [
    profile?.addressLine1 || address?.addressLine1,
    profile?.addressLine2 || address?.addressLine2,
    profile?.city || address?.city,
    profile?.state || address?.state,
    profile?.pincode || address?.pincode,
  ].filter(Boolean).join(', ');
};

const statusLabel = (status) => {
  if (status === 'APPROVED') return 'Verified';
  return String(status || 'Pending').replaceAll('_', ' ');
};

const MyProfileScreen = ({ navigation }) => {
  const theme = useAppTheme();
  const dispatch = useDispatch();
  const auth = useSelector(state => state.auth);
  const profile = getProfile(auth);
  const user = profile?.user || auth.user || {};

  const refreshProfile = useCallback(() => {
    dispatch(fetchShopkeeperProfileStatus()).catch(() => {});
  }, [dispatch]);

  useFocusEffect(refreshProfile);

  const shopDetails = useMemo(() => [
    { Icon: Store, label: 'Shop Name', value: profile?.shopName, wide: true },
    { Icon: Tag, label: 'Shop Type', value: profile?.businessType },
    { Icon: Phone, label: 'Mobile Number', value: user.mobile },
    { Icon: Mail, label: 'Email Address', value: user.email },
    { Icon: MapPin, label: 'Shop Address', value: fullAddress(profile) },
    {
      Icon: ShieldCheck,
      label: 'Verification Status',
      value: statusLabel(profile?.status),
      wide: true,
      tone: profile?.status === 'APPROVED' ? '#0C8A4B' : '#C58B12',
    },
  ], [profile, user.email, user.mobile]);

  const businessInfo = useMemo(() => [
    { Icon: Building2, label: 'GST Number', value: profile?.gstNumber },
    { Icon: Percent, label: 'PAN Number', value: profile?.panNumber },
    { Icon: Landmark, label: 'Bank Name', value: profile?.bankName },
    { Icon: CreditCard, label: 'Bank Account Number', value: profile?.bankAccountNumber },
    { Icon: WalletCards, label: 'UPI ID (Optional)', value: profile?.upiId, wide: true },
  ], [profile]);

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
        <ProfileTopBar
          title="My Profile"
          onBackPress={() => navigation.goBack()}
          onNotificationsPress={() => navigation.navigate(routeNames.b2bNotifications)}
          onCartPress={() => navigation.navigate(routeNames.cart)}
        />

        <ProfileHeroCard
          profile={profile}
          location={compactLocation(profile)}
          memberSince={formatDate(profile?.createdAt)}
          onEditPress={() => navigation.navigate(routeNames.b2bEditProfile)}
          MetaIcon={CalendarDays}
        />

        <ProfileInfoSection title="Shop Details" items={shopDetails} />
        <ProfileInfoSection title="Business Information" items={businessInfo} />
        <ProfileSecureCard />
      </ScrollView>
    </SafeAreaView>
  );
};

export default MyProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    paddingBottom: 108,
  },
});
