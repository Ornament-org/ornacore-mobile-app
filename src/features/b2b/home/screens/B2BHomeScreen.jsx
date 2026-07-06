import React, { useCallback, useEffect, useState } from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { ChevronRight, ScanLine, Search } from 'lucide-react-native';
import { useDispatch, useSelector } from 'react-redux';
import { useFocusEffect } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { routeNames } from '../../../../navigation/routeNames';
import { navigate as rootNavigate } from '../../../../app/navigationRef';
import { useAppTheme } from '../../../../theme/useAppTheme';
import { typography } from '../../../../theme/typography';
import catalogService from '../../../sharedCatalog/services/catalogService';
import { loadB2BCatalog, selectMetalAndLoadCatalog } from '../../../sharedCatalog/store/catalogSlice';
import { useMetalRates } from '../../../sharedCatalog/hooks/useMetalRates';
import { useProductSheet } from '../../products/context/ProductSheetContext';
import homepageService from '../services/homepageService';
import { DEFAULT_B2B_SECTIONS } from '../data/homepageFixtures';
import HomeHeader from '../components/HomeHeader';
import MetalSwitcher from '../components/MetalSwitcher';
import RateBanner from '../components/RateBanner';
import QuickCategories from '../components/QuickCategories';
import TrendingProducts from '../components/TrendingProducts';
import TrustStrip from '../components/TrustStrip';
import SupportBanner from '../components/SupportBanner';

const SectionHeader = ({ title, onPress, theme }) => (
  <View style={styles.sectionHeader}>
    <Text style={[styles.sectionTitle, { color: theme.text }]}>{title}</Text>
    <TouchableOpacity style={styles.viewAll} onPress={onPress}>
      <Text style={[styles.viewAllText, { color: theme.primary }]}>View All</Text>
      <ChevronRight color={theme.primary} size={14} />
    </TouchableOpacity>
  </View>
);

const B2BHomeScreen = ({ navigation, isPublicLanding = false }) => {
  const dispatch = useDispatch();
  const theme = useAppTheme();
  const insets = useSafeAreaInsets();
  const { metals, categories, selectedMetalId } = useSelector((state) => state.catalog);
  const { rateFor } = useMetalRates();
  const currentMetalRate = rateFor(selectedMetalId);
  const { openProduct: openProductSheet } = useProductSheet();
  const [trendingProducts, setTrendingProducts] = useState([]);
  const [homeSections, setHomeSections] = useState(DEFAULT_B2B_SECTIONS);

  const selectedMetal = metals.find((metal) => metal.id === selectedMetalId) ?? metals[0];

  useFocusEffect(
    useCallback(() => {
      dispatch(loadB2BCatalog({ forceRefresh: true }));
    }, [dispatch]),
  );

  useEffect(() => {
    let cancelled = false;
    homepageService
      .getHomepage({ audience: 'B2B', metalId: selectedMetalId })
      .then((result) => {
        if (!cancelled) setHomeSections(result.sections);
      });
    return () => {
      cancelled = true;
    };
  }, [selectedMetalId]);

  useEffect(() => {
    let cancelled = false;
    catalogService
      .getProducts({ metalId: selectedMetalId, limit: 10 })
      .then((rows) => {
        if (!cancelled) setTrendingProducts(rows);
      })
      .catch(() => {
        if (!cancelled) setTrendingProducts([]);
      });
    return () => {
      cancelled = true;
    };
  }, [selectedMetalId]);

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

    openProductSheet(product);
  };
  const openLogin = () => {
    rootNavigate(routeNames.b2b, { authScreen: routeNames.login });
  };
  const openSupport = () => {
    if (isPublicLanding) {
      openCustomerEntry();
      return;
    }

    navigation.navigate(routeNames.b2bSupport);
  };
  const openNotifications = () => {
    navigation.navigate(routeNames.b2bNotifications);
  };

  // The app never knows which homepage it renders — it receives an ordered
  // section list from the homepage engine and maps each type to a render
  // function. These are called as render(section), never mounted as component
  // types, so the unstable-nested-components rule does not apply.
  /* eslint-disable react/no-unstable-nested-components */
  const SECTION_RENDERERS = {
    SEARCH_BAR: (section) => (
      <View style={[styles.searchBar, { backgroundColor: theme.surface, borderColor: theme.border }]}>
        <Search color={theme.text} size={20} />
        <TextInput
          style={[styles.searchInput, { color: theme.text }]}
          placeholder={section.config?.placeholder ?? 'Search by product, design, SKU...'}
          placeholderTextColor={theme.muted}
          returnKeyType="search"
        />
        <ScanLine color={theme.text} size={21} />
      </View>
    ),
    METAL_SWITCHER: () => (
      <MetalSwitcher
        metals={metals}
        selectedMetalId={selectedMetalId}
        onSelect={(metal) => dispatch(selectMetalAndLoadCatalog(metal.id))}
      />
    ),
    RATE_BANNER: () => <RateBanner rate={currentMetalRate} theme={theme} onViewRates={() => {}} />,
    QUICK_CATEGORIES: (section) => (
      <>
        <SectionHeader
          title={section.title ?? 'QUICK CATEGORIES'}
          theme={theme}
          onPress={() => openCatalog()}
        />
        <QuickCategories
          categories={categories}
          onSelect={openCatalog}
          onViewAll={() => openCatalog()}
        />
      </>
    ),
    TRENDING_PRODUCTS: (section) => (
      <>
        <SectionHeader
          title={section.title ?? 'TRENDING PRODUCTS'}
          theme={theme}
          onPress={() => openCatalog()}
        />
        <TrendingProducts
          products={trendingProducts}
          metalName={selectedMetal?.name}
          onProductPress={openProduct}
        />
      </>
    ),
    TRUST_SECTION: () => <TrustStrip />,
    SUPPORT_SECTION: () => <SupportBanner onContact={openSupport} onWhatsApp={openSupport} />,
  };
  /* eslint-enable react/no-unstable-nested-components */

  return (
    <ScrollView
      style={[styles.screen, { backgroundColor: theme.background }]}
      contentContainerStyle={[styles.content, { paddingBottom: insets.bottom + 90 }]}
      showsVerticalScrollIndicator={false}
    >
      <HomeHeader
        isPublicLanding={isPublicLanding}
        onLogin={openLogin}
        onMenu={() => {}}
        onNotifications={openNotifications}
      />

      {homeSections.map((section) => {
        const render = SECTION_RENDERERS[section.sectionType];
        if (!render) return null;
        return <React.Fragment key={section.sectionKey}>{render(section)}</React.Fragment>;
      })}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  screen: { flex: 1 },
  content: { paddingTop: 4, paddingBottom: 18 },
  searchBar: {
    height: 48,
    marginHorizontal: 16,
    marginTop: 6,
    marginBottom: 8,
    borderRadius: 12,
    borderWidth: 1,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 13,
    gap: 10,
  },
  searchInput: { ...typography.body2, flex: 1, paddingVertical: 0, fontSize: 12 },
  sectionHeader: {
    paddingHorizontal: 16,
    marginTop: 20,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  sectionTitle: { ...typography.subtitle2, fontSize: 13, fontWeight: '800', letterSpacing: 0.6 },
  viewAll: { flexDirection: 'row', alignItems: 'center' },
  viewAllText: { ...typography.caption, fontSize: 11, fontWeight: '700' },
});

export default B2BHomeScreen;
