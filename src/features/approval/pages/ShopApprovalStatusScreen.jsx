import React, { useCallback, useEffect, useMemo, useState } from 'react';
import {
  Alert,
  Modal,
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import {
  AlertTriangle,
  Bell,
  Check,
  CheckCircle2,
  ChevronRight,
  CircleHelp,
  ClipboardList,
  Clock3,
  FileText,
  Hourglass,
  Lock,
  LogOut,
  RefreshCw,
  ShieldCheck,
} from 'lucide-react-native';
import { useDispatch, useSelector } from 'react-redux';
import { reset as resetRootNavigation } from '../../../app/navigationRef';
import AppErrorState from '../../../components/common/AppErrorState';
import AppLoader from '../../../components/common/AppLoader';
import { fetchShopkeeperProfileStatus, logout } from '../../auth/actions/authActions';
import { routeNames } from '../../../navigation/routeNames';
import { formatDate } from '../../../utils/formatDate';

const GOLD = '#E99A05';
const GOLD_DARK = '#B87502';
const GOLD_SOFT = '#FFF4DA';
const INK = '#121722';
const MUTED = '#69707D';
const BORDER = '#E7E1D8';
const SURFACE = '#FFFFFF';
const GREEN = '#27A35D';

const getProfile = (auth) =>
  auth.shopkeeperProfile
  || auth.user?.shopkeeper
  || auth.user?.shopkeeperProfile
  || {};

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

const normalizeStatus = (status) =>
  String(status || 'Under Review')
    .replaceAll('_', ' ')
    .replace(/\b\w/g, letter => letter.toUpperCase());

const getPrimaryAddress = (profile) =>
  profile?.addresses?.find(address => address.isPrimary) || profile?.addresses?.[0] || {};

const buildDetails = (profile, submittedDate) => {
  const address = getPrimaryAddress(profile);
  return [
    ['Owner Name', profile?.ownerName || profile?.owner?.name || 'Akash Gupta'],
    ['Shop Name', profile?.shopName || 'Akash Jewellers'],
    ['Mobile', profile?.mobile || profile?.phone || '+91 98765 43210'],
    ['Email', profile?.email || 'akashjewellers@gmail.com'],
    ['Address', address?.addressLine1 || profile?.addressLine1 || '123, Railway Road'],
    ['City', profile?.city || address?.city || 'Darbhanga'],
    ['State', profile?.state || address?.state || 'Bihar'],
    ['Pincode', profile?.pincode || address?.pincode || '846004'],
    ['Submission Date', submittedDate || '18 May 2025'],
    ['Current Status', normalizeStatus(profile?.status || profile?.approvalStatus || 'Under Review')],
  ];
};

const NEXT_STEPS = [
  'Documents Verification',
  'Business Validation',
  'Final Approval',
  'Account Activation',
];

const TIMELINE = [
  {
    title: 'Submitted',
    meta: 'Completed',
    dateKey: 'submitted',
    icon: ClipboardList,
    state: 'completed',
  },
  {
    title: 'Under Review',
    meta: 'In Progress',
    icon: Hourglass,
    state: 'active',
  },
  {
    title: 'Verification',
    meta: 'Pending',
    icon: ShieldCheck,
    state: 'pending',
  },
  {
    title: 'Approved',
    meta: 'Pending',
    icon: Check,
    state: 'pending',
  },
];

const ACTIONS = [
  {
    id: 'progress',
    title: 'Verification Progress',
    description: 'View current verification status.',
    icon: ShieldCheck,
  },
  {
    id: 'updates',
    title: 'Stay Updated',
    description: 'Receive approval notifications.',
    icon: Bell,
  },
  {
    id: 'details',
    title: 'View Submitted Details',
    description: 'View submitted registration information.',
    icon: FileText,
  },
  {
    id: 'support',
    title: 'Contact Support',
    description: 'Need help with approval?',
    icon: CircleHelp,
  },
  {
    id: 'logout',
    title: 'Logout',
    description: 'Return to Login Screen.',
    icon: LogOut,
  },
];

const Header = ({ onSupportPress, onLogoutPress }) => (
  <View style={styles.header}>
    <View style={styles.brand}>
      <View style={styles.logoMark}>
        <ShieldCheck size={22} color={GOLD} strokeWidth={1.8} />
      </View>
      <View>
        <Text style={styles.brandName}>Akash Jewellers</Text>
        <Text style={styles.brandMeta}>B2B Jewellery Platform</Text>
      </View>
    </View>

    <Text style={styles.headerTitle}>Shop Approval Status</Text>

    <View style={styles.headerActions}>
      <TouchableOpacity activeOpacity={0.82} onPress={onSupportPress} style={styles.supportButton}>
        <CircleHelp size={17} color={INK} />
        <Text style={styles.supportText}>Help & Support</Text>
      </TouchableOpacity>
      <TouchableOpacity activeOpacity={0.82} onPress={onLogoutPress} style={styles.logoutButton}>
        <Text style={styles.logoutText}>Logout</Text>
      </TouchableOpacity>
    </View>
  </View>
);

const HeroApprovalCard = () => (
  <View style={styles.heroCard}>
    <View style={styles.heroMain}>
      <View style={styles.heroIconHalo}>
        <View style={styles.heroIconCircle}>
          <ClipboardList size={58} color={GOLD} strokeWidth={2.2} />
          <View style={styles.clockBubble}>
            <Clock3 size={20} color="#FFFFFF" strokeWidth={2.4} />
          </View>
        </View>
      </View>

      <View style={styles.heroCopy}>
        <Text style={styles.heroTitle}>Under Review</Text>
        <Text style={styles.heroDescription}>
          We're reviewing your shop registration and verification details. Your account will become active once approved by our admin team.
        </Text>
        <View style={styles.etaBadge}>
          <Clock3 size={16} color={GOLD_DARK} />
          <Text style={styles.etaText}>Usually takes 1-2 Business Days</Text>
        </View>
      </View>
    </View>

    <View style={styles.nextPanel}>
      <Text style={styles.nextTitle}>What happens next?</Text>
      {NEXT_STEPS.map(step => (
        <View key={step} style={styles.nextRow}>
          <CheckCircle2 size={17} color={GREEN} />
          <Text style={styles.nextText}>{step}</Text>
        </View>
      ))}
    </View>
  </View>
);

const Timeline = ({ submittedDate }) => (
  <View style={styles.timelineCard}>
    <View style={styles.timelineTrack} />
    <View style={styles.timelineRow}>
      {TIMELINE.map((step, index) => {
        const Icon = step.icon;
        const isCompleted = step.state === 'completed';
        const isActive = step.state === 'active';

        return (
          <View key={step.title} style={styles.step}>
            {index > 0 ? (
              <View
                style={[
                  styles.stepConnector,
                  index === 1 && styles.stepConnectorDone,
                ]}
              />
            ) : null}
            <View
              style={[
                styles.stepIcon,
                isCompleted && styles.stepIconCompleted,
                isActive && styles.stepIconActive,
              ]}
            >
              <Icon
                size={24}
                color={isCompleted ? '#FFFFFF' : isActive ? GOLD : '#8F96A3'}
                strokeWidth={2.2}
              />
            </View>
            <Text style={[styles.stepTitle, (isCompleted || isActive) && styles.stepTitleActive]}>
              {index + 1}. {step.title}
            </Text>
            <Text style={[styles.stepMeta, isActive && styles.stepMetaActive]}>
              {step.dateKey === 'submitted' ? submittedDate : step.meta}
            </Text>
          </View>
        );
      })}
    </View>
  </View>
);

const WarningNotice = () => (
  <View style={styles.warningNotice}>
    <AlertTriangle size={28} color={GOLD_DARK} />
    <View style={styles.warningCopy}>
      <Text style={styles.warningTitle}>Your shop has not been activated yet.</Text>
      <Text style={styles.warningText}>
        Until approval is complete you cannot browse products, place orders or access the B2B dashboard.
      </Text>
    </View>
  </View>
);

const ActionRow = ({ item, onPress }) => {
  const Icon = item.icon;
  return (
    <TouchableOpacity activeOpacity={0.84} onPress={onPress} style={styles.actionRow}>
      <View style={styles.actionIcon}>
        <Icon size={25} color={GOLD_DARK} strokeWidth={2} />
      </View>
      <View style={styles.actionCopy}>
        <Text style={styles.actionTitle}>{item.title}</Text>
        <Text style={styles.actionDescription}>{item.description}</Text>
      </View>
      <ChevronRight size={24} color="#737B87" />
    </TouchableOpacity>
  );
};

const TrustCard = () => (
  <View style={styles.trustCard}>
    <View style={styles.greenShield}>
      <ShieldCheck size={48} color={GREEN} strokeWidth={1.9} />
      <Lock style={styles.greenLock} size={21} color="#FFFFFF" strokeWidth={2.4} />
    </View>
    <View style={styles.trustCopy}>
      <Text style={styles.trustTitle}>Your Information is Secure</Text>
      <Text style={styles.trustText}>
        All submitted documents are securely encrypted and reviewed only by authorized administrators.
      </Text>
    </View>
    <View style={styles.safeArt}>
      <View style={styles.safeBody}>
        <View style={styles.safeDial} />
      </View>
      <ShieldCheck style={styles.safeShield} size={38} color={GOLD} />
    </View>
  </View>
);

const LockedDashboardPreview = () => (
  <View style={styles.previewWrap}>
    <View style={styles.previewHeader}>
      <View style={styles.previewNav} />
      <View style={styles.previewSearch} />
      <View style={styles.previewAvatar} />
    </View>
    <View style={styles.previewGrid}>
      <View style={styles.previewChart} />
      <View style={styles.previewChartSmall} />
      <View style={styles.previewProduct} />
      <View style={styles.previewProduct} />
      <View style={styles.previewProduct} />
      <View style={styles.previewProduct} />
    </View>
    <View style={styles.previewOverlay}>
      <Lock size={34} color="#FFFFFF" />
      <Text style={styles.previewText}>Dashboard locked until approval</Text>
    </View>
  </View>
);

const DetailsModal = ({ visible, details, onClose }) => (
  <Modal visible={visible} transparent animationType="fade" onRequestClose={onClose}>
    <View style={styles.modalBackdrop}>
      <View style={styles.modalCard}>
        <View style={styles.modalHeader}>
          <Text style={styles.modalTitle}>Submitted Details</Text>
          <TouchableOpacity onPress={onClose} style={styles.modalClose}>
            <Text style={styles.modalCloseText}>Close</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.modalRows}>
          {details.map(([label, value]) => (
            <View key={label} style={styles.modalRow}>
              <Text style={styles.modalLabel}>{label}</Text>
              <Text style={styles.modalValue}>{value}</Text>
            </View>
          ))}
        </View>
      </View>
    </View>
  </Modal>
);

const StickyNotice = ({ bottomInset, onRefreshPress, onLogoutPress, loading }) => (
  <View style={[styles.stickyWrap, { paddingBottom: Math.max(bottomInset, 10) }]}>
    <View style={styles.disabledMessage}>
      <Lock size={18} color={GOLD_DARK} />
      <Text style={styles.disabledText}>Dashboard access is disabled until your shop is approved.</Text>
    </View>
    <View style={styles.stickyButtons}>
      <TouchableOpacity
        activeOpacity={0.86}
        onPress={onRefreshPress}
        disabled={loading}
        style={[styles.refreshButton, loading && styles.disabledButton]}
      >
        <RefreshCw size={18} color="#FFFFFF" />
        <Text style={styles.refreshText}>{loading ? 'Refreshing...' : 'Refresh Approval Status'}</Text>
      </TouchableOpacity>
      <TouchableOpacity activeOpacity={0.86} onPress={onLogoutPress} style={styles.secondaryLogout}>
        <Text style={styles.secondaryLogoutText}>Logout</Text>
      </TouchableOpacity>
    </View>
  </View>
);

const ShopApprovalStatusScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const insets = useSafeAreaInsets();
  const auth = useSelector(state => state.auth);
  const profile = getProfile(auth);
  const [detailsVisible, setDetailsVisible] = useState(false);
  const submittedDate = formatDate(profile?.createdAt) || '18 May 2025';
  const submittedDetails = useMemo(
    () => buildDetails(profile, submittedDate),
    [profile, submittedDate],
  );

  const refreshStatus = useCallback(async () => {
    await dispatch(fetchShopkeeperProfileStatus());
  }, [dispatch]);

  const handleRefresh = useCallback(() => {
    refreshStatus().catch(() => {});
  }, [refreshStatus]);

  useEffect(() => {
    handleRefresh();
  }, [handleRefresh]);

  const handleSupport = () => {
    Alert.alert('Help & Support', 'Our team will help you with your shop approval status.');
  };

  const handleAction = (id) => {
    if (id === 'details') {
      setDetailsVisible(true);
      return;
    }
    if (id === 'support') {
      handleSupport();
      return;
    }
    if (id === 'logout') {
      handleLogout();
      return;
    }
    if (id === 'progress' || id === 'updates') {
      Alert.alert('Approval in progress', 'We will notify you once there is an update.');
    }
  };

  const handleLogout = async () => {
    await dispatch(logout());
    goToLanding();
  };

  const handleBack = () => {
    if (navigation.canGoBack()) navigation.goBack();
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
    <SafeAreaView style={styles.screen}>
      <LockedDashboardPreview />

      <Header
        onBackPress={handleBack}
        onSupportPress={handleSupport}
        onLogoutPress={handleLogout}
      />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[styles.content, { paddingBottom: 176 + insets.bottom }]}
        refreshControl={(
          <RefreshControl
            refreshing={Boolean(auth.profileStatusLoading)}
            onRefresh={handleRefresh}
            tintColor={GOLD}
          />
        )}
      >
        <HeroApprovalCard />
        <Timeline submittedDate={submittedDate} />
        <WarningNotice />

        <View style={styles.actionsCard}>
          {ACTIONS.map(item => (
            <ActionRow
              key={item.id}
              item={item}
              onPress={() => handleAction(item.id)}
            />
          ))}
        </View>

        <TrustCard />
      </ScrollView>

      <StickyNotice
        bottomInset={insets.bottom}
        onRefreshPress={handleRefresh}
        onLogoutPress={handleLogout}
        loading={Boolean(auth.profileStatusLoading)}
      />

      <DetailsModal
        visible={detailsVisible}
        details={submittedDetails}
        onClose={() => setDetailsVisible(false)}
      />
    </SafeAreaView>
  );
};

export default ShopApprovalStatusScreen;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#FBFAF7',
  },
  content: {
    paddingHorizontal: 14,
    paddingTop: 12,
  },
  header: {
    minHeight: 74,
    paddingHorizontal: 14,
    paddingTop: 6,
    paddingBottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    backgroundColor: 'rgba(251, 250, 247, 0.96)',
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(231, 225, 216, 0.75)',
  },
  brand: {
    flex: 1.05,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 9,
  },
  logoMark: {
    width: 38,
    height: 38,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#F2C76E',
    backgroundColor: '#FFF6DF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  brandName: {
    color: INK,
    fontSize: 14,
    fontWeight: '800',
  },
  brandMeta: {
    marginTop: 2,
    color: MUTED,
    fontSize: 10,
    fontWeight: '600',
  },
  headerTitle: {
    flex: 1,
    color: INK,
    fontSize: 16,
    fontWeight: '900',
    textAlign: 'center',
  },
  headerActions: {
    flex: 1.05,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 6,
  },
  supportButton: {
    minHeight: 38,
    paddingHorizontal: 10,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: BORDER,
    backgroundColor: SURFACE,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  supportText: {
    color: INK,
    fontSize: 11,
    fontWeight: '800',
  },
  logoutButton: {
    minHeight: 38,
    paddingHorizontal: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#D4A23C',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoutText: {
    color: GOLD_DARK,
    fontSize: 11,
    fontWeight: '900',
  },
  heroCard: {
    borderWidth: 1,
    borderColor: '#F2C76E',
    borderRadius: 16,
    padding: 18,
    backgroundColor: 'rgba(255, 252, 246, 0.96)',
    flexDirection: 'row',
    gap: 18,
    shadowColor: '#C7840D',
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.08,
    shadowRadius: 22,
    elevation: 3,
  },
  heroMain: {
    flex: 1.45,
    flexDirection: 'row',
    gap: 16,
    alignItems: 'center',
  },
  heroIconHalo: {
    width: 116,
    height: 116,
    borderRadius: 58,
    backgroundColor: '#FFF5DC',
    alignItems: 'center',
    justifyContent: 'center',
  },
  heroIconCircle: {
    width: 88,
    height: 88,
    borderRadius: 44,
    borderWidth: 1,
    borderColor: '#F3D48A',
    backgroundColor: SURFACE,
    alignItems: 'center',
    justifyContent: 'center',
  },
  clockBubble: {
    position: 'absolute',
    right: -4,
    bottom: 8,
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: GOLD,
    alignItems: 'center',
    justifyContent: 'center',
  },
  heroCopy: {
    flex: 1,
  },
  heroTitle: {
    color: GOLD,
    fontSize: 28,
    fontWeight: '900',
    lineHeight: 34,
  },
  heroDescription: {
    marginTop: 9,
    color: '#343A46',
    fontSize: 15,
    lineHeight: 23,
  },
  etaBadge: {
    marginTop: 14,
    alignSelf: 'flex-start',
    minHeight: 36,
    paddingHorizontal: 12,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#F2C76E',
    backgroundColor: '#FFFDF8',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  etaText: {
    color: GOLD_DARK,
    fontSize: 13,
    fontWeight: '900',
  },
  nextPanel: {
    flex: 0.85,
    paddingLeft: 18,
    borderLeftWidth: 1,
    borderLeftColor: BORDER,
    justifyContent: 'center',
  },
  nextTitle: {
    color: GOLD,
    fontSize: 17,
    fontWeight: '900',
    marginBottom: 12,
  },
  nextRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginTop: 8,
  },
  nextText: {
    color: '#303641',
    fontSize: 13,
    fontWeight: '700',
  },
  timelineCard: {
    marginTop: 14,
    paddingVertical: 22,
    paddingHorizontal: 10,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: BORDER,
    backgroundColor: SURFACE,
    overflow: 'hidden',
  },
  timelineTrack: {
    position: 'absolute',
    left: 58,
    right: 58,
    top: 52,
    height: 4,
    borderRadius: 4,
    backgroundColor: '#E1E4E8',
  },
  timelineRow: {
    flexDirection: 'row',
  },
  step: {
    flex: 1,
    alignItems: 'center',
  },
  stepConnector: {
    position: 'absolute',
    top: 28,
    left: '-50%',
    width: '100%',
    height: 4,
    backgroundColor: '#E1E4E8',
  },
  stepConnectorDone: {
    backgroundColor: GOLD,
  },
  stepIcon: {
    zIndex: 1,
    width: 58,
    height: 58,
    borderRadius: 29,
    borderWidth: 2,
    borderColor: '#DADDE2',
    backgroundColor: SURFACE,
    alignItems: 'center',
    justifyContent: 'center',
  },
  stepIconCompleted: {
    borderColor: GOLD,
    backgroundColor: GOLD,
  },
  stepIconActive: {
    borderColor: GOLD,
    backgroundColor: SURFACE,
    shadowColor: GOLD,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.45,
    shadowRadius: 12,
    elevation: 4,
  },
  stepTitle: {
    marginTop: 12,
    color: INK,
    fontSize: 13,
    fontWeight: '900',
    textAlign: 'center',
  },
  stepTitleActive: {
    color: '#171B22',
  },
  stepMeta: {
    marginTop: 7,
    color: '#858C97',
    fontSize: 12,
    textAlign: 'center',
  },
  stepMetaActive: {
    color: GOLD_DARK,
    fontWeight: '800',
  },
  warningNotice: {
    marginTop: 14,
    padding: 15,
    borderRadius: 15,
    borderWidth: 1,
    borderLeftWidth: 5,
    borderColor: '#F1D197',
    borderLeftColor: GOLD,
    backgroundColor: '#FFF8EA',
    flexDirection: 'row',
    gap: 12,
  },
  warningCopy: {
    flex: 1,
  },
  warningTitle: {
    color: '#7A4F00',
    fontSize: 15,
    fontWeight: '900',
  },
  warningText: {
    marginTop: 5,
    color: '#5E6470',
    fontSize: 13,
    lineHeight: 19,
  },
  actionsCard: {
    marginTop: 14,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: BORDER,
    backgroundColor: SURFACE,
    overflow: 'hidden',
  },
  actionRow: {
    minHeight: 84,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: BORDER,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 13,
  },
  actionIcon: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: GOLD_SOFT,
    alignItems: 'center',
    justifyContent: 'center',
  },
  actionCopy: {
    flex: 1,
  },
  actionTitle: {
    color: INK,
    fontSize: 16,
    fontWeight: '900',
  },
  actionDescription: {
    marginTop: 5,
    color: MUTED,
    fontSize: 13,
    lineHeight: 19,
  },
  trustCard: {
    marginTop: 18,
    padding: 18,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#CDEFD9',
    backgroundColor: '#F1FFF6',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    overflow: 'hidden',
  },
  greenShield: {
    width: 84,
    height: 84,
    borderRadius: 42,
    backgroundColor: '#DDF8E7',
    alignItems: 'center',
    justifyContent: 'center',
  },
  greenLock: {
    position: 'absolute',
  },
  trustCopy: {
    flex: 1,
  },
  trustTitle: {
    color: INK,
    fontSize: 17,
    fontWeight: '900',
  },
  trustText: {
    marginTop: 7,
    color: '#59616C',
    fontSize: 13,
    lineHeight: 20,
  },
  safeArt: {
    width: 108,
    height: 74,
    alignItems: 'center',
    justifyContent: 'center',
  },
  safeBody: {
    width: 78,
    height: 56,
    borderRadius: 13,
    backgroundColor: '#2E2E2F',
    borderWidth: 2,
    borderColor: '#6C6557',
    alignItems: 'center',
    justifyContent: 'center',
  },
  safeDial: {
    width: 28,
    height: 28,
    borderRadius: 14,
    borderWidth: 3,
    borderColor: '#D9A63B',
  },
  safeShield: {
    position: 'absolute',
    left: 4,
    bottom: 3,
  },
  previewWrap: {
    ...StyleSheet.absoluteFillObject,
    opacity: 0.18,
    backgroundColor: '#F6F2EA',
  },
  previewHeader: {
    marginTop: 96,
    marginHorizontal: 20,
    height: 50,
    borderRadius: 16,
    backgroundColor: '#C9CED6',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    gap: 10,
  },
  previewNav: {
    width: 88,
    height: 20,
    borderRadius: 10,
    backgroundColor: '#9DA5B2',
  },
  previewSearch: {
    flex: 1,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#AEB5C0',
  },
  previewAvatar: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: '#8F98A7',
  },
  previewGrid: {
    marginTop: 18,
    marginHorizontal: 20,
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  previewChart: {
    width: '62%',
    height: 132,
    borderRadius: 20,
    backgroundColor: '#B9C0CA',
  },
  previewChartSmall: {
    flex: 1,
    height: 132,
    borderRadius: 20,
    backgroundColor: '#C8CED7',
  },
  previewProduct: {
    width: '47%',
    height: 130,
    borderRadius: 18,
    backgroundColor: '#CCD1D9',
  },
  previewOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  previewText: {
    marginTop: 8,
    color: '#7D8490',
    fontSize: 13,
    fontWeight: '800',
  },
  stickyWrap: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    paddingHorizontal: 14,
    paddingTop: 12,
    backgroundColor: 'rgba(255, 255, 255, 0.97)',
    borderTopWidth: 1,
    borderTopColor: BORDER,
  },
  disabledMessage: {
    minHeight: 40,
    paddingHorizontal: 12,
    borderRadius: 13,
    backgroundColor: '#FFF8EA',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  disabledText: {
    flex: 1,
    color: '#7A4F00',
    fontSize: 12,
    fontWeight: '800',
  },
  stickyButtons: {
    marginTop: 10,
    flexDirection: 'row',
    gap: 10,
  },
  refreshButton: {
    flex: 1,
    minHeight: 46,
    borderRadius: 14,
    backgroundColor: GOLD,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  disabledButton: {
    opacity: 0.72,
  },
  refreshText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '900',
  },
  secondaryLogout: {
    minWidth: 92,
    minHeight: 46,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#D8DDE5',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: SURFACE,
  },
  secondaryLogoutText: {
    color: '#4E5663',
    fontSize: 14,
    fontWeight: '900',
  },
  modalBackdrop: {
    flex: 1,
    backgroundColor: 'rgba(14, 18, 25, 0.52)',
    padding: 20,
    justifyContent: 'center',
  },
  modalCard: {
    borderRadius: 18,
    backgroundColor: SURFACE,
    padding: 18,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  modalTitle: {
    color: INK,
    fontSize: 18,
    fontWeight: '900',
  },
  modalClose: {
    paddingHorizontal: 12,
    paddingVertical: 7,
    borderRadius: 10,
    backgroundColor: GOLD_SOFT,
  },
  modalCloseText: {
    color: GOLD_DARK,
    fontSize: 12,
    fontWeight: '900',
  },
  modalRows: {
    borderTopWidth: 1,
    borderTopColor: BORDER,
  },
  modalRow: {
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: BORDER,
  },
  modalLabel: {
    color: MUTED,
    fontSize: 12,
    fontWeight: '700',
  },
  modalValue: {
    marginTop: 3,
    color: INK,
    fontSize: 14,
    fontWeight: '800',
  },
});
