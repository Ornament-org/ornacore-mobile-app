import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Grid2X2,
  PackageOpen,
  Search,
} from 'lucide-react-native';
import { useDispatch, useSelector } from 'react-redux';
import { useFocusEffect } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import ProductCard from '../../../../components/catalog/ProductCard';
import { routeNames } from '../../../../navigation/routeNames';
import { useAppTheme } from '../../../../theme/useAppTheme';
import { typography } from '../../../../theme/typography';
import catalogService from '../../../sharedCatalog/services/catalogService';
import { loadB2BCatalog } from '../../../sharedCatalog/store/catalogSlice';
import { useMetalRates } from '../../../sharedCatalog/hooks/useMetalRates';
import { useProductSheet } from '../../products/context/ProductSheetContext';
import { selectB2BCartItemCount } from '../../cart/selectors';
import { glyphForCategory } from '../../home/components/JewelryGlyphs';
import RateBanner from '../../home/components/RateBanner';
import CatalogHeader from '../components/CatalogHeader';
import CategoryChip from '../components/CategoryChip';
import HowItWorksHint from '../components/HowItWorksHint';
import ProductListToolbar from '../components/ProductListToolbar';

const categoryImages = [
  'https://images.unsplash.com/photo-1617038260897-41a1f14a8ca0?auto=format&fit=crop&w=400&q=85',
  'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=400&q=85',
  'https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=400&q=85',
  'https://images.unsplash.com/photo-1611652022419-a9419f74343d?auto=format&fit=crop&w=400&q=85',
  'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=400&q=85',
];

const findCategoryPath = (nodes, categoryId, parents = []) => {
  for (const node of nodes) {
    const path = [...parents, node];
    if (node.id === categoryId) return path;
    const childPath = findCategoryPath(node.children ?? [], categoryId, path);
    if (childPath) return childPath;
  }
  return null;
};

const CollectionCard = ({ category, index, colors, styles, onPress, horizontal = false }) => (
  <TouchableOpacity
    activeOpacity={0.82}
    style={[styles.collectionCard, horizontal && styles.collectionCardHorizontal]}
    onPress={onPress}
  >
    <View style={[styles.collectionImageWrap, { backgroundColor: colors.primarySoft }]}>
      <Image
        source={{ uri: category.imageUrl ?? categoryImages[index % categoryImages.length] }}
        style={styles.collectionImage}
      />
    </View>
    <View style={[styles.collectionCopy, horizontal && styles.collectionCopyHorizontal]}>
      <Text style={styles.collectionName} numberOfLines={2}>{category.name}</Text>
      <Text style={styles.collectionCount}>{category.productCount ?? 0}+ Designs</Text>
    </View>
    {!horizontal ? (
      <View style={[styles.chevron, { backgroundColor: colors.primarySoft }]}>
        <ChevronRight color={colors.primary} size={17} />
      </View>
    ) : null}
  </TouchableOpacity>
);

const B2BCatalogScreen = ({ navigation, route }) => {
  const colors = useAppTheme();
  const styles = useMemo(() => createStyles(colors), [colors]);
  const insets = useSafeAreaInsets();
  const dispatch = useDispatch();
  const initializedKey = useRef(null);
  const { categories, metals, selectedMetalId, status } = useSelector((state) => state.catalog);
  const { rateFor } = useMetalRates();
  const { openProduct: openProductSheet } = useProductSheet();
  const cartCount = useSelector(selectB2BCartItemCount);
  const [path, setPath] = useState([]);
  const [products, setProducts] = useState([]);
  const [productsLoading, setProductsLoading] = useState(false);
  const [productLimit, setProductLimit] = useState(40);

  const selectedMetal = metals.find((metal) => metal.id === selectedMetalId) ?? metals[0];
  const currentCategory = path[path.length - 1] ?? categories[0];
  const children = currentCategory?.children ?? [];
  const hasChildren = children.length > 0;
  const hasProducts = products.length > 0;

  const loadProducts = useCallback(async (category, limit = 40) => {
    if (!category) return;
    setProductsLoading(true);
    const rows = await catalogService.getProducts({
      metalId: selectedMetalId,
      categoryId: category.id,
      limit,
    });
    setProducts(rows);
    setProductsLoading(false);
  }, [selectedMetalId]);

  const selectPath = useCallback((nextPath) => {
    const category = nextPath[nextPath.length - 1];
    setPath(nextPath);
    setProductLimit(40);
    loadProducts(category);
  }, [loadProducts]);

  const loadMore = () => {
    const nextLimit = productLimit + 40;
    setProductLimit(nextLimit);
    loadProducts(currentCategory, nextLimit);
  };

  useFocusEffect(
    useCallback(() => {
      dispatch(loadB2BCatalog({
        metalId: route?.params?.metalId,
        categoryId: route?.params?.categoryId,
        forceRefresh: true,
      }));
    }, [dispatch, route?.params?.categoryId, route?.params?.metalId]),
  );

  useEffect(() => {
    if (!categories.length) return;
    const key = `${selectedMetalId}:${route?.params?.categoryId ?? 'first'}`;
    if (initializedKey.current === key) return;
    initializedKey.current = key;
    const initialPath = findCategoryPath(categories, route?.params?.categoryId) ?? [categories[0]];
    selectPath(initialPath);
  }, [categories, route?.params?.categoryId, selectPath, selectedMetalId]);

  const selectRoot = (category) => selectPath([category]);
  const selectChild = (category) => selectPath([...path, category]);
  const selectBreadcrumb = (index) => selectPath(path.slice(0, index + 1));
  const openProduct = (product) => {
    openProductSheet(product);
  };

  return (
    <View style={styles.screen}>
      <CatalogHeader
        cartCount={cartCount}
        onBack={() => navigation.navigate(routeNames.home)}
        onSearch={() => {}}
        onCart={() => navigation.navigate(routeNames.cart)}
      />

      <View style={styles.explorer}>
        <View style={[styles.rail, { paddingBottom: insets.bottom + 78 }]}>
          <Text style={styles.railHeading}>PARENT CATEGORIES</Text>
          <ScrollView
            style={styles.railScroll}
            contentContainerStyle={styles.railContent}
            showsVerticalScrollIndicator={false}
          >
            {categories.map((category) => {
              const active = path[0]?.id === category.id;
              const Glyph = glyphForCategory(category.name);
              return (
                <TouchableOpacity
                  key={category.id}
                  style={[styles.railItem, active && styles.railItemActive]}
                  onPress={() => selectRoot(category)}
                >
                  <Glyph color={active ? colors.primary : colors.muted} size={22} />
                  <Text style={[styles.railText, active && styles.railTextActive]} numberOfLines={2}>
                    {category.name}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </ScrollView>
          <RateBanner
            compact
            rate={rateFor(selectedMetalId)}
            theme={colors}
            onViewRates={() => {}}
          />
        </View>

        <View style={styles.contentPanel}>
          <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={[styles.contentScroll, { paddingBottom: insets.bottom + 96 }]}>
            <View style={styles.searchBar}>
              <Search color={colors.muted} size={17} />
              <TextInput
                style={styles.searchInput}
                placeholder={`Search in ${currentCategory?.name ?? 'catalog'}...`}
                placeholderTextColor={colors.muted}
                returnKeyType="search"
              />
            </View>

            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.breadcrumb}
            >
              <Text style={styles.breadcrumbMetal}>{selectedMetal?.name ?? 'Gold'}</Text>
              {path.map((category, index) => (
                <React.Fragment key={category.id}>
                  <ChevronRight color={colors.subtleText} size={12} />
                  <TouchableOpacity onPress={() => selectBreadcrumb(index)}>
                    <Text style={[styles.breadcrumbText, index === path.length - 1 && styles.breadcrumbCurrent]}>
                      {category.name}
                    </Text>
                  </TouchableOpacity>
                </React.Fragment>
              ))}
            </ScrollView>

            {path.length > 1 ? (
              <TouchableOpacity style={styles.backButton} onPress={() => selectBreadcrumb(path.length - 2)}>
                <ChevronLeft color={colors.primary} size={16} />
                <Text style={styles.backText}>Back to {path[path.length - 2].name}</Text>
              </TouchableOpacity>
            ) : null}

            <View style={styles.branchHeading}>
              <View>
                <Text style={styles.branchTitle}>{currentCategory?.name}</Text>
                <Text style={styles.branchSubtitle}>
                  {hasChildren ? 'Explore collections' : 'Available designs'}
                </Text>
              </View>
              <View style={styles.branchIcon}>
                <Grid2X2 color={colors.primary} size={18} />
              </View>
            </View>

            {hasChildren && hasProducts ? (
              <>
                <Text style={styles.sectionLabel}>Sub Categories</Text>
                <ScrollView
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  contentContainerStyle={styles.chipRow}
                >
                  <CategoryChip label={`All ${currentCategory.name}`} active isAll onPress={() => {}} />
                  {children.map((category, index) => (
                    <CategoryChip
                      key={category.id}
                      label={category.name}
                      active={false}
                      imageUrl={category.imageUrl ?? categoryImages[index % categoryImages.length]}
                      onPress={() => selectChild(category)}
                    />
                  ))}
                </ScrollView>
                <HowItWorksHint />
              </>
            ) : null}

            {hasChildren && !hasProducts ? (
              <View style={styles.collectionList}>
                {children.map((category, index) => (
                  <CollectionCard
                    key={category.id}
                    category={category}
                    index={index}
                    colors={colors}
                    styles={styles}
                    onPress={() => selectChild(category)}
                  />
                ))}
              </View>
            ) : null}

            {hasProducts ? (
              <View style={styles.productsSection}>
                <ProductListToolbar categoryName={currentCategory?.name} count={products.length} />
                <View style={styles.productGrid}>
                  {products.map((product) => (
                    <View key={product.id} style={styles.productCell}>
                      <ProductCard
                        layout="grid"
                        product={product}
                        metalName={selectedMetal?.name}
                        onPress={() => openProduct(product)}
                        onAdd={() => openProduct(product)}
                      />
                    </View>
                  ))}
                </View>
                {products.length >= productLimit ? (
                  <TouchableOpacity style={styles.loadMore} activeOpacity={0.7} onPress={loadMore}>
                    <Text style={styles.loadMoreText}>Load more</Text>
                    <ChevronDown color={colors.primary} size={15} />
                  </TouchableOpacity>
                ) : null}
              </View>
            ) : null}

            {!hasChildren && !hasProducts && !productsLoading && status !== 'loading' ? (
              <View style={styles.empty}>
                <PackageOpen color={colors.primary} size={28} />
                <Text style={styles.emptyTitle}>Designs coming soon</Text>
                <Text style={styles.emptyCopy}>This collection is being curated for your shop.</Text>
              </View>
            ) : null}

            {productsLoading ? <Text style={styles.loading}>Loading collection...</Text> : null}
          </ScrollView>
        </View>
      </View>
    </View>
  );
};

const createStyles = (colors) => StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.background },
  explorer: { flex: 1, flexDirection: 'row' },
  rail: { width: '27%', backgroundColor: colors.surfaceMuted, borderRightWidth: 1, borderRightColor: colors.border },
  railHeading: {
    ...typography.overline,
    fontSize: 8.5,
    letterSpacing: 0.8,
    color: colors.muted,
    paddingHorizontal: 10,
    paddingTop: 12,
    paddingBottom: 4,
  },
  railScroll: { flex: 1 },
  railContent: { paddingVertical: 4 },
  chipRow: { gap: 8, paddingBottom: 4 },
  railItem: {
    minHeight: 52,
    paddingHorizontal: 9,
    paddingVertical: 10,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    borderLeftWidth: 3,
    borderLeftColor: colors.transparent,
  },
  railItemActive: { backgroundColor: colors.primarySoft, borderLeftColor: colors.primary },
  railText: {
    ...typography.caption,
    flex: 1,
    color: colors.text,
    fontSize: 10.5,
    lineHeight: 13,
    fontWeight: '600',
  },
  railTextActive: { color: colors.primaryDark, fontWeight: '800' },
  searchBar: {
    height: 42,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surface,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 11,
    gap: 8,
    marginBottom: 10,
  },
  searchInput: { ...typography.body2, flex: 1, paddingVertical: 0, fontSize: 11, color: colors.text },
  loadMore: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 4,
    paddingVertical: 14,
  },
  loadMoreText: { ...typography.caption, fontSize: 11, fontWeight: '700', color: colors.primary },
  contentPanel: { width: '73%', backgroundColor: colors.background },
  contentScroll: { paddingHorizontal: 12, paddingTop: 12, paddingBottom: 96 },
  breadcrumb: { minHeight: 24, alignItems: 'center', gap: 3, paddingRight: 12 },
  breadcrumbMetal: { ...typography.caption, color: colors.primary, fontWeight: '800' },
  breadcrumbText: { ...typography.caption, color: colors.muted, fontSize: 9 },
  breadcrumbCurrent: { color: colors.text, fontWeight: '700' },
  backButton: { alignSelf: 'flex-start', flexDirection: 'row', alignItems: 'center', gap: 2, marginTop: 2 },
  backText: { ...typography.caption, color: colors.primary, fontWeight: '700' },
  branchHeading: {
    marginTop: 10,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  branchTitle: { ...typography.h5, color: colors.text, fontSize: 17 },
  branchSubtitle: { ...typography.caption, color: colors.muted, marginTop: 2 },
  branchIcon: {
    width: 34,
    height: 34,
    borderRadius: 10,
    backgroundColor: colors.primarySoft,
    alignItems: 'center',
    justifyContent: 'center',
  },
  sectionLabel: { ...typography.subtitle2, color: colors.text, fontWeight: '800', marginBottom: 9 },
  collectionList: { gap: 9 },
  collectionCard: {
    minHeight: 78,
    padding: 9,
    borderRadius: 8,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    flexDirection: 'row',
    alignItems: 'center',
  },
  collectionCardHorizontal: {
    width: 112,
    minHeight: 126,
    padding: 8,
    flexDirection: 'column',
    alignItems: 'flex-start',
  },
  collectionImageWrap: { width: 56, height: 56, borderRadius: 8, overflow: 'hidden' },
  collectionImage: { width: '100%', height: '100%' },
  collectionCopy: { flex: 1, marginLeft: 10 },
  collectionCopyHorizontal: { flex: 0, marginLeft: 0, marginTop: 8 },
  collectionName: { ...typography.subtitle2, color: colors.text, fontWeight: '800' },
  collectionCount: { ...typography.caption, color: colors.primary, fontSize: 9, marginTop: 3 },
  chevron: { width: 28, height: 28, borderRadius: 14, alignItems: 'center', justifyContent: 'center' },
  productsSection: { marginTop: 4 },
  productGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  productCell: { width: '48%' },
  empty: {
    marginTop: 22,
    padding: 20,
    borderRadius: 8,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    alignItems: 'center',
  },
  emptyTitle: { ...typography.subtitle2, color: colors.text, fontWeight: '800', marginTop: 8 },
  emptyCopy: { ...typography.caption, color: colors.muted, textAlign: 'center', marginTop: 3 },
  loading: { ...typography.body2, color: colors.muted, textAlign: 'center', paddingVertical: 24 },
});

export default B2BCatalogScreen;
