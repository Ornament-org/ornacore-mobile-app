import React, { useCallback, useMemo } from 'react';
import {
  Image,
  ImageBackground,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from 'react-native';
import {
  BadgeCheck,
  Bell,
  ChevronDown,
  ChevronRight,
  Gem,
  LogIn,
  LogOut,
  ScanLine,
  Search,
  ShieldCheck,
  ShoppingCart,
  Sparkles,
  Truck,
} from 'lucide-react-native';
import { useDispatch, useSelector } from 'react-redux';
import { useFocusEffect } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import CatalogSection from '../../../../components/catalog/CatalogSection';
import { routeNames } from '../../../../navigation/routeNames';
import { navigate as rootNavigate, reset as resetRootNavigation } from '../../../../app/navigationRef';
import { useAppTheme } from '../../../../theme/useAppTheme';
import { typography } from '../../../../theme/typography';
import { loadB2BCatalog, selectMetalAndLoadCatalog } from '../../../sharedCatalog/store/catalogSlice';
import { logout } from '../../../auth/actions/authActions';

const heroImage = require('../../../../assets/images/saniya-hero-v2.png');

const categoryImages = {
  '101': 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=300&q=80',
  '102': 'https://images.unsplash.com/photo-1617038260897-41a1f14a8ca0?auto=format&fit=crop&w=300&q=80',
  '103': 'https://images.unsplash.com/photo-1611652022419-a9419f74343d?auto=format&fit=crop&w=300&q=80',
  '104': 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=300&q=80',
  '105': 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=300&q=80',
  '106': 'https://images.unsplash.com/photo-1610375461246-83df859d849d?auto=format&fit=crop&w=300&q=80',
};

const categoryDisplayOrder = ['102', '104', '103', '101', '105', '106'];
const categoryLabels = {
  '102': 'Nose Pins',
  '104': 'Earrings',
  '103': 'Bangles',
  '101': 'Rings',
  '105': 'Chains',
  '106': 'Pendants',
};

const collectionMock = [
  {
    id: 'daily',
    title: 'Daily Wear',
    subtitle: 'Collection',
    imageUrl: 'https://images.unsplash.com/photo-1599643477877-530eb83abc8e?auto=format&fit=crop&w=600&q=80',
    categoryId: '105',
  },
  {
    id: 'light',
    title: 'Light Weight',
    subtitle: 'Collection',
    imageUrl: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=600&q=80',
    categoryId: '101',
  },
  {
    id: 'bridal',
    title: 'Bridal',
    subtitle: 'Collection',
    imageUrl: 'https://images.unsplash.com/photo-1611652022419-a9419f74343d?auto=format&fit=crop&w=600&q=80',
    categoryId: '104',
  },
];

const fastMovingMock = [
  {
    id: 'home-p-1',
    designCode: 'GNP34211',
    name: 'Floral Nose Pin',
    imageUrl: 'https://images.unsplash.com/photo-1617038260897-41a1f14a8ca0?auto=format&fit=crop&w=400&q=85',
    variant: { purity: '22K', weightGrams: 0.12, yourPrice: 2210 },
  },
  {
    id: 'home-p-2',
    designCode: 'GNP34215',
    name: 'V Cut Nose Pin',
    imageUrl: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=400&q=85',
    variant: { purity: '22K', weightGrams: 0.135, yourPrice: 2430 },
  },
  {
    id: 'home-p-3',
    designCode: 'GNP34218',
    name: 'Plain V Cut Nose Pin',
    imageUrl: 'https://images.unsplash.com/photo-1601121141461-9d6647bca1ed?auto=format&fit=crop&w=400&q=85',
    variant: { purity: '22K', weightGrams: 0.15, yourPrice: 2620 },
  },
  {
    id: 'home-p-4',
    designCode: 'GNP34220',
    name: 'Leaf Nose Pin',
    imageUrl: 'https://images.unsplash.com/photo-1603561591411-07134e71a2a9?auto=format&fit=crop&w=400&q=85',
    variant: { purity: '22K', weightGrams: 0.13, yourPrice: 2320 },
  },
];

const metalIcons = {
  GOLD: Sparkles,
  SILVER: Gem,
  DIAMOND: Gem,
};

const SectionHeader = ({ title, onPress, theme }) => (
  <View style={styles.sectionHeader}>
    <Text style={[styles.sectionTitle, { color: theme.text }]}>{title}</Text>
    <TouchableOpacity style={styles.viewAll} onPress={onPress}>
      <Text style={[styles.viewAllText, { color: theme.primary }]}>View All</Text>
      <ChevronRight color={theme.primary} size={14} />
    </TouchableOpacity>
  </View>
);

const IconButton = ({ children, count, theme, onPress, accessibilityLabel }) => (
  <TouchableOpacity
    activeOpacity={0.75}
    onPress={onPress}
    accessibilityRole="button"
    accessibilityLabel={accessibilityLabel}
    style={[styles.iconButton, { backgroundColor: theme.surface, borderColor: theme.border }]}
  >
    {children}
    {count ? (
      <View style={[styles.badge, { backgroundColor: theme.danger }]}>
        <Text style={[styles.badgeText, { color: theme.onPrimary }]}>{count}</Text>
      </View>
    ) : null}
  </TouchableOpacity>
);

const getShopkeeperProfile = (auth = {}) => (
  auth.shopkeeperProfile
  || auth.user?.shopkeeper
  || auth.user?.shopkeeperProfile
  || null
);

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

const TrustStrip = ({ theme }) => {
  const themed = useMemo(() => createThemedStyles(theme), [theme]);
  const items = [
    { Icon: BadgeCheck, title: '100%', copy: 'Hallmarked' },
    { Icon: ShieldCheck, title: 'Assured', copy: 'Quality' },
    { Icon: ShoppingCart, title: 'Secure', copy: 'Payments' },
    { Icon: Truck, title: 'Fast & Safe', copy: 'Delivery' },
  ];

  return (
    <View style={[styles.trustStrip, { backgroundColor: theme.surface, borderColor: theme.border }]}>
      {items.map(({ Icon, title, copy }, index) => (
        <View
          key={title}
          style={[styles.trustItem, index > 0 && themed.trustDivider]}
        >
          <View style={[styles.trustIcon, { backgroundColor: theme.primarySoft }]}>
            <Icon color={theme.primary} size={18} />
          </View>
          <View>
            <Text style={[styles.trustTitle, { color: theme.text }]}>{title}</Text>
            <Text style={[styles.trustCopy, { color: theme.muted }]}>{copy}</Text>
          </View>
        </View>
      ))}
    </View>
  );
};

const B2BHomeScreen = ({ navigation, isPublicLanding = false }) => {
  const dispatch = useDispatch();
  const theme = useAppTheme();
  const { width } = useWindowDimensions();
  const insets = useSafeAreaInsets();
  const themed = useMemo(() => createThemedStyles(theme), [theme]);
  const { metals, categories, selectedMetalId } = useSelector((state) => state.catalog);
  const auth = useSelector((state) => state.auth);
  const shopkeeperProfile = getShopkeeperProfile(auth);
  const shopName = shopkeeperProfile?.shopName || 'Your Shop';
  const ownerName = shopkeeperProfile?.ownerName || auth.user?.email || auth.user?.mobile || 'Shopkeeper';

  useFocusEffect(
    useCallback(() => {
      dispatch(loadB2BCatalog({ forceRefresh: true }));
    }, [dispatch]),
  );

  const orderedCategories = useMemo(
    () => categoryDisplayOrder
      .map((id) => categories.find((category) => category.id === id))
      .filter(Boolean),
    [categories],
  );
  const collectionWidth = Math.max(112, (width - 52) / 3);
  const openCustomerEntry = () => {
    rootNavigate(routeNames.b2c);
  };
  const openCatalog = (categoryOrId) => {
    if (isPublicLanding) {
      openCustomerEntry();
      return;
    }

    const categoryId = typeof categoryOrId === 'string' ? categoryOrId : categoryOrId?.id;
    navigation.navigate(routeNames.catalog, { categoryId });
  };
  const openProduct = (product) => {
    if (isPublicLanding) {
      openCustomerEntry();
      return;
    }

    navigation.navigate(routeNames.b2bProductDetails, { productId: product.id });
  };
  const openLogin = () => {
    rootNavigate(routeNames.b2b, { authScreen: routeNames.login });
  };
  const handleLogout = async () => {
    await dispatch(logout());
    goToLanding();
  };

  return (
    <ScrollView
      style={[styles.screen, { backgroundColor: theme.background }]}
      contentContainerStyle={[styles.content, { paddingBottom: insets.bottom + 90 }]}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.header}>
        <View>
          <Text style={[styles.greeting, { color: theme.text }]}>
            {isPublicLanding ? 'Hello' : `Hello, ${shopName}`}
          </Text>
          <TouchableOpacity style={styles.shopRow}>
            <Text style={[styles.shopName, { color: theme.text }]}>
              {isPublicLanding ? 'Explore OrnaMent' : ownerName}
            </Text>
            <ChevronDown color={theme.text} size={15} />
          </TouchableOpacity>
        </View>
        <View style={styles.headerActions}>
          {isPublicLanding ? (
            <TouchableOpacity
              activeOpacity={0.8}
              accessibilityRole="button"
              accessibilityLabel="Login"
              onPress={openLogin}
              style={[styles.loginButton, { backgroundColor: theme.primarySoft, borderColor: theme.primary }]}
            >
              <LogIn color={theme.primary} size={16} />
              <Text style={[styles.loginButtonText, { color: theme.primaryDark }]}>Login</Text>
            </TouchableOpacity>
          ) : (
            <>
              <IconButton count="3" theme={theme}>
                <Bell color={theme.text} size={21} />
              </IconButton>
              <IconButton count="2" theme={theme} onPress={() => navigation.navigate(routeNames.cart)}>
                <ShoppingCart color={theme.text} size={21} />
              </IconButton>
              <IconButton theme={theme} onPress={handleLogout} accessibilityLabel="Logout">
                <LogOut color={theme.text} size={21} />
              </IconButton>
            </>
          )}
        </View>
      </View>

      <View style={[styles.searchBar, themed.surfaceBorder]}>
        <Search color={theme.text} size={20} />
        <TextInput
          style={[styles.searchInput, { color: theme.text }]}
          placeholder="Search by design code, product name..."
          placeholderTextColor={theme.muted}
          returnKeyType="search"
        />
        <ScanLine color={theme.text} size={21} />
      </View>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.metalTabsContainer}
      >
        {metals.map((metal) => {
          const active = metal.id === selectedMetalId;
          const MetalIcon = metalIcons[metal.code] ?? Gem;

          return (
            <TouchableOpacity
              key={metal.id}
              activeOpacity={0.9}
              onPress={() =>
                dispatch(selectMetalAndLoadCatalog(metal.id))
              }
              style={[
                styles.metalCard,
                active && styles.activeMetalCard,
              ]}
            >
              <View
                style={[
                  styles.iconWrapper,
                  active && styles.activeIconWrapper,
                ]}
              >
                <MetalIcon
                  size={18}
                  color={
                    active
                      ? theme.onPrimary
                      : theme.primary
                  }
                />
              </View>

              <Text
                style={[
                  styles.metalText,
                  {
                    color: active
                      ? theme.onPrimary
                      : theme.text,
                  },
                ]}
              >
                {metal.name}
              </Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>

      <ImageBackground
        source={heroImage}
        style={styles.hero}
        imageStyle={styles.heroImage}
      >
        <View style={[styles.heroOverlay, { backgroundColor: theme.imageOverlay }]}>
          <Text style={[styles.heroTitle, { color: theme.heroText }]}>New Saniya</Text>
          <Text style={[styles.heroSubtitle, { color: theme.heroText }]}>Nose Pins Collection</Text>
          <Text style={[styles.heroCopy, { color: theme.onPrimary }]}>Lightweight. Elegant. Timeless.</Text>
          <TouchableOpacity style={[styles.heroButton, { backgroundColor: theme.primary }]} onPress={() => openCatalog('102')}>
            <Text style={[styles.heroButtonText, { color: theme.onPrimary }]}>Explore Now</Text>
            <ChevronRight color={theme.onPrimary} size={14} />
          </TouchableOpacity>
          <View style={styles.heroDots}>
            <View style={[styles.heroDotActive, { backgroundColor: theme.primary }]} />
            <View style={[styles.heroDot, { backgroundColor: theme.subtleText }]} />
            <View style={[styles.heroDot, { backgroundColor: theme.subtleText }]} />
            <View style={[styles.heroDot, { backgroundColor: theme.subtleText }]} />
          </View>
        </View>
      </ImageBackground>

      <SectionHeader title="Shop by Category" theme={theme} onPress={() => openCatalog()} />
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.categoryRow}>
        {orderedCategories.map((category) => (
          <TouchableOpacity key={category.id} style={styles.categoryItem} onPress={() => openCatalog(category)}>
            <View style={[styles.categoryImageWrap, { backgroundColor: theme.surfaceMuted }]}>
              <Image source={{ uri: categoryImages[category.id] }} style={styles.categoryImage} />
            </View>
            <Text style={[styles.categoryName, { color: theme.text }]} numberOfLines={1}>
              {categoryLabels[category.id] ?? category.name}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <TrustStrip theme={theme} />

      <SectionHeader title="Popular Collections" theme={theme} onPress={() => openCatalog()} />
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.collectionRow}>
        {collectionMock.map((collection) => (
          <TouchableOpacity
            key={collection.id}
            style={[styles.collectionCard, { backgroundColor: theme.surface, width: collectionWidth }]}
            onPress={() => openCatalog(collection.categoryId)}
          >
            <ImageBackground source={{ uri: collection.imageUrl }} style={styles.collectionImage} imageStyle={styles.collectionImageRadius}>
              <View style={[styles.collectionShade, { backgroundColor: theme.collectionOverlay }]}>
                <Text style={[styles.collectionTitle, { color: theme.onPrimary }]}>{collection.title}</Text>
                <Text style={[styles.collectionSubtitle, { color: theme.onPrimary }]}>{collection.subtitle}</Text>
              </View>
            </ImageBackground>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <CatalogSection
        compact
        title="Fast Moving Products"
        products={fastMovingMock}
        onViewAll={() => openCatalog(categories[0])}
        onProductPress={openProduct}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  screen: { flex: 1 },
  content: { paddingTop: 10, paddingBottom: 18 },
  header: { paddingHorizontal: 16, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  greeting: { ...typography.body1, fontSize: 15, fontWeight: '400' },
  shopRow: { flexDirection: 'row', alignItems: 'center', gap: 5, marginTop: 3 },
  shopName: { ...typography.subtitle2, fontSize: 12 },
  headerActions: { flexDirection: 'row', gap: 10 },
  loginButton: { height: 38, minWidth: 86, borderRadius: 19, borderWidth: 1, paddingHorizontal: 13, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 6 },
  loginButtonText: { ...typography.subtitle2, fontSize: 12, fontWeight: '800' },
  iconButton: { width: 44, height: 44, borderRadius: 22, borderWidth: 1, alignItems: 'center', justifyContent: 'center' },
  badge: { position: 'absolute', right: -1, top: -3, minWidth: 18, height: 18, borderRadius: 9, paddingHorizontal: 4, alignItems: 'center', justifyContent: 'center' },
  badgeText: { ...typography.caption, fontWeight: '800' },
  searchBar: { height: 46, marginHorizontal: 16, marginTop: 13, borderRadius: 8, borderWidth: 1, flexDirection: 'row', alignItems: 'center', paddingHorizontal: 13, gap: 10 },
  searchInput: { ...typography.body2, flex: 1, paddingVertical: 0, fontSize: 12 },
  metalTabsContainer: {
    paddingHorizontal: 16,
    paddingVertical: 4,
    gap: 10,
  },

  metalCard: {
    minWidth: 110,
    height: 54,

    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',

    paddingHorizontal: 14,

    borderRadius: 16,

    backgroundColor: '#FFFFFF',

    borderWidth: 1,
    borderColor: '#ECECEC',

    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },

  activeMetalCard: {
    backgroundColor: '#C99632',
    borderColor: '#C99632',

    shadowOpacity: 0.15,
    elevation: 5,
  },

  iconWrapper: {
    width: 28,
    height: 28,

    borderRadius: 14,

    backgroundColor: '#FFF5DE',

    alignItems: 'center',
    justifyContent: 'center',
  },

  activeIconWrapper: {
    backgroundColor: 'rgba(255,255,255,0.18)',
  },

  metalText: {
    marginLeft: 8,

    fontSize: 14,
    fontWeight: '700',
  },
  hero: { height: 148, marginHorizontal: 16, marginTop: 14 },
  heroImage: { borderRadius: 8 },
  heroOverlay: { flex: 1, paddingHorizontal: 14, paddingVertical: 13, borderRadius: 8 },
  heroTitle: { ...typography.display, fontSize: 23, lineHeight: 26 },
  heroSubtitle: { fontFamily: typography.fontFamily.display, fontSize: 18, lineHeight: 21, fontWeight: '500' },
  heroCopy: { ...typography.caption, fontSize: 10, marginTop: 6 },
  heroButton: { marginTop: 10, borderRadius: 6, paddingHorizontal: 10, height: 31, alignSelf: 'flex-start', flexDirection: 'row', alignItems: 'center', gap: 3 },
  heroButtonText: { ...typography.caption, fontWeight: '800' },
  heroDots: { position: 'absolute', bottom: 7, left: 0, right: 0, flexDirection: 'row', justifyContent: 'center', gap: 5 },
  heroDotActive: { width: 10, height: 4, borderRadius: 2 },
  heroDot: { width: 5, height: 5, borderRadius: 3 },
  sectionHeader: { paddingHorizontal: 16, marginTop: 15, marginBottom: 8, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  sectionTitle: { ...typography.subtitle2, fontSize: 12, fontWeight: '800' },
  viewAll: { flexDirection: 'row', alignItems: 'center' },
  viewAllText: { ...typography.caption, fontWeight: '700' },
  categoryRow: { paddingHorizontal: 16, gap: 8, justifyContent: 'space-between', flexGrow: 1 },
  categoryItem: { flex: 1, minWidth: 48, maxWidth: 60, alignItems: 'center' },
  categoryImageWrap: { width: 52, height: 52, borderRadius: 8, overflow: 'hidden' },
  categoryImage: { width: '100%', height: '100%', resizeMode: 'cover' },
  categoryName: { ...typography.caption, marginTop: 5, fontSize: 9, fontWeight: '600', width: 60, textAlign: 'center' },
  trustStrip: { marginHorizontal: 16, marginTop: 14, borderRadius: 8, borderWidth: 1, paddingVertical: 8, flexDirection: 'row' },
  trustItem: { flex: 1, minHeight: 34, paddingHorizontal: 5, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 5 },
  trustIcon: { width: 29, height: 29, borderRadius: 7, alignItems: 'center', justifyContent: 'center' },
  trustTitle: { ...typography.caption, fontSize: 9, fontWeight: '800' },
  trustCopy: { ...typography.caption, fontSize: 8, lineHeight: 10 },
  collectionRow: { paddingHorizontal: 16, gap: 10 },
  collectionCard: { height: 116, borderRadius: 8, overflow: 'hidden' },
  collectionImage: { flex: 1 },
  collectionImageRadius: { borderRadius: 8 },
  collectionShade: { flex: 1, padding: 9, justifyContent: 'flex-end' },
  collectionTitle: { ...typography.subtitle2, fontSize: 12, fontWeight: '800' },
  collectionSubtitle: { ...typography.caption, fontSize: 9 },
});

const createThemedStyles = (theme) => StyleSheet.create({
  surfaceBorder: { backgroundColor: theme.surface, borderColor: theme.border },
  trustDivider: { borderLeftWidth: 1, borderLeftColor: theme.border },
});

export default B2BHomeScreen;
