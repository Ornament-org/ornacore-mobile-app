import React, { useCallback, useEffect, useMemo } from 'react';
import {
  Alert,
  RefreshControl,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Bell, FileText, LogOut, ShieldCheck } from 'lucide-react-native';
import { useDispatch, useSelector } from 'react-redux';
import { useAppTheme } from '../../../theme/useAppTheme';
import { reset as resetRootNavigation } from '../../../app/navigationRef';
import AppErrorState from '../../../components/common/AppErrorState';
import AppLoader from '../../../components/common/AppLoader';
import { fetchShopkeeperProfileStatus, logout } from '../../auth/actions/authActions';
import { formatDate } from '../../../utils/formatDate';
import { routeNames } from '../../../navigation/routeNames';
import ApprovalActionRow from '../components/ApprovalActionRow';
import ApprovalSecureCard from '../components/ApprovalSecureCard';
import ApprovalStatusHeader from '../components/ApprovalStatusHeader';
import ApprovalStatusHero from '../components/ApprovalStatusHero';
import {
  APPROVAL_STEPS,
  getApprovalStatusContent,
} from '../components/approvalStatusConfig';

const getProfile = (auth) => auth.shopkeeperProfile || auth.user?.shopkeeper || auth.user?.shopkeeperProfile;

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

const buildSubmittedDetails = (profile) => {
  const primaryAddress = profile?.addresses?.find(address => address.isPrimary) || profile?.addresses?.[0];
  const lines = [
    profile?.shopName ? `Shop: ${profile.shopName}` : null,
    profile?.ownerName ? `Owner: ${profile.ownerName}` : null,
    profile?.status ? `Status: ${String(profile.status).replaceAll('_', ' ')}` : null,
    primaryAddress?.addressLine1 ? `Address: ${primaryAddress.addressLine1}` : null,
    profile?.city || primaryAddress?.city
      ? `City: ${profile?.city || primaryAddress?.city}`
      : null,
    profile?.state || primaryAddress?.state
      ? `State: ${profile?.state || primaryAddress?.state}`
      : null,
    profile?.pincode || primaryAddress?.pincode
      ? `Pincode: ${profile?.pincode || primaryAddress?.pincode}`
      : null,
    profile?.rejectionReason ? `Note: ${profile.rejectionReason}` : null,
  ].filter(Boolean);

  return lines.join('\n');
};

const ShopApprovalStatusScreen = ({ navigation }) => {
  const theme = useAppTheme();
  const dispatch = useDispatch();
  const auth = useSelector(state => state.auth);
  const profile = getProfile(auth);
  const content = useMemo(
    () => getApprovalStatusContent(profile?.status || auth.approvalStatus),
    [auth.approvalStatus, profile?.status],
  );
  const submittedDate = formatDate(profile?.createdAt);

  const refreshStatus = useCallback(async () => {
    await dispatch(fetchShopkeeperProfileStatus());
  }, [dispatch]);

  const handleRefresh = useCallback(() => {
    refreshStatus().catch(() => {});
  }, [refreshStatus]);

  useEffect(() => {
    handleRefresh();
  }, [handleRefresh]);

  const handleBack = () => {
    if (navigation.canGoBack()) {
      navigation.goBack();
      return;
    }

    Alert.alert('Approval in progress', 'Your shop account is waiting for admin approval.');
  };

  const handleSupport = () => {
    Alert.alert('Support', 'Our team will help you with your shop approval status.');
  };

  const handleViewDetails = () => {
    Alert.alert(
      'Submitted Details',
      buildSubmittedDetails(profile) || 'Your submitted shop details will appear here after refresh.',
    );
  };
  const handleLogout = async () => {
    await dispatch(logout());
    goToLanding();
  };

  if (!profile && auth.profileStatusLoading) {
    return <AppLoader visible message="Checking approval status..." />;
  }

  if (!profile && auth.profileStatusError) {
    return (
      <AppErrorState
        title="Unable to load status"
        message={auth.profileStatusError}
        onRetry={handleRefresh}
      />
    );
  }

  return (
    <SafeAreaView style={[styles.screen, { backgroundColor: theme.background }]}>
      <ApprovalStatusHeader
        onBackPress={handleBack}
        onSupportPress={handleSupport}
      />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}
        refreshControl={(
          <RefreshControl
            refreshing={auth.profileStatusLoading}
            onRefresh={handleRefresh}
            tintColor="#C58B12"
          />
        )}
      >
        <ApprovalStatusHero
          content={content}
          steps={APPROVAL_STEPS}
          submittedDate={submittedDate}
        />

        <View style={styles.rows}>
          <ApprovalActionRow
            Icon={ShieldCheck}
            title={content.detailTitle}
            description={content.detailDescription}
            onPress={handleRefresh}
          />

          <ApprovalActionRow
            Icon={Bell}
            title="Stay Updated"
            description="We'll notify you about any updates or actions required."
            onPress={handleRefresh}
          />

          <ApprovalActionRow
            Icon={FileText}
            title="View Submitted Details"
            description="You can review the information and documents you have submitted."
            onPress={handleViewDetails}
          />

          <ApprovalActionRow
            Icon={LogOut}
            title="Logout"
            description="Sign out from this shopkeeper account."
            onPress={handleLogout}
          />
        </View>

        <ApprovalSecureCard />
      </ScrollView>
    </SafeAreaView>
  );
};

export default ShopApprovalStatusScreen;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  content: {
    paddingBottom: 12,
  },
  rows: {
    marginTop: 22,
  },
});
