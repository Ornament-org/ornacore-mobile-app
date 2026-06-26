import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {
  ChevronLeft,
  ChevronRight,
  Gem,
  Grid2X2,
  PackageOpen,
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
  const [path, setPath] = useState([]);
  const [products, setProducts] = useState([]);
  const [productsLoading, setProductsLoading] = useState(false);

  const selectedMetal = metals.find((metal) => metal.id === selectedMetalId) ?? metals[0];
  const currentCategory = path[path.length - 1] ?? categories[0];
  const children = currentCategory?.children ?? [];
  const hasChildren = children.length > 0;
  const hasProducts = products.length > 0;

  const loadProducts = useCallback(async (category) => {
    if (!category) return;
    setProductsLoading(true);
    const rows = await catalogService.getProducts({
      metalId: selectedMetalId,
      categoryId: category.id,
      limit: 40,
    });
    setProducts(rows);
    setProductsLoading(false);
  }, [selectedMetalId]);

  const selectPath = useCallback((nextPath) => {
    const category = nextPath[nextPath.length - 1];
    setPath(nextPath);
    loadProducts(category);
  }, [loadProducts]);

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
    navigation.navigate(routeNames.b2bProductDetails, { productId: product.id });
  };

  return (
    <View style={styles.screen}>
      <View style={styles.header}>
        <View>
          <Text style={styles.eyebrow}>DISCOVER</Text>
          <Text style={styles.title}>Jewellery Categories</Text>
        </View>
        <View style={styles.metalBadge}>
          <Gem color={colors.primary} size={15} />
          <Text style={styles.metalBadgeText}>{selectedMetal?.name ?? 'Gold'}</Text>
        </View>
      </View>

      <View style={styles.explorer}>
        <ScrollView
          style={styles.rail}
          contentContainerStyle={[styles.railContent, { paddingBottom: insets.bottom + 88 }]}
          showsVerticalScrollIndicator={false}
        >
          {categories.map((category, index) => {
            const active = path[0]?.id === category.id;
            return (
              <TouchableOpacity
                key={category.id}
                style={[styles.railItem, active && styles.railItemActive]}
                onPress={() => selectRoot(category)}
              >
                <View style={[styles.railThumb, active && styles.railThumbActive]}>
                  <Image
                    source={{ uri: category.imageUrl ?? categoryImages[index % categoryImages.length] }}
                    style={styles.railImage}
                  />
                </View>
                <Text style={[styles.railText, active && styles.railTextActive]} numberOfLines={2}>
                  {category.name}
                </Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>

        <View style={styles.contentPanel}>
          <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={[styles.contentScroll, { paddingBottom: insets.bottom + 96 }]}>
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
                  contentContainerStyle={styles.horizontalCollections}
                >
                  {children.map((category, index) => (
                    <CollectionCard
                      key={category.id}
                      category={category}
                      index={index}
                      colors={colors}
                      styles={styles}
                      horizontal
                      onPress={() => selectChild(category)}
                    />
                  ))}
                </ScrollView>
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
                <Text style={styles.sectionLabel}>{hasChildren ? 'Featured Products' : 'Products'}</Text>
                <View style={styles.productGrid}>
                  {products.map((product) => (
                    <View key={product.id} style={styles.productCell}>
                      <ProductCard
                        commerce
                        product={product}
                        onPress={() => openProduct(product)}
                        onAdd={() => {}}
                      />
                    </View>
                  ))}
                </View>
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
  header: {
    height: 68,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  eyebrow: { ...typography.overline, color: colors.primary, fontSize: 9 },
  title: { ...typography.h5, color: colors.text, marginTop: 1 },
  metalBadge: {
    height: 32,
    paddingHorizontal: 10,
    borderRadius: 16,
    backgroundColor: colors.primarySoft,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  metalBadgeText: { ...typography.caption, color: colors.primaryDark, fontWeight: '700' },
  explorer: { flex: 1, flexDirection: 'row' },
  rail: { width: '25%', backgroundColor: colors.surfaceMuted, borderRightWidth: 1, borderRightColor: colors.border },
  railContent: { paddingVertical: 8, paddingBottom: 88 },
  railItem: {
    minHeight: 84,
    paddingHorizontal: 5,
    paddingVertical: 8,
    alignItems: 'center',
    justifyContent: 'center',
    borderLeftWidth: 3,
    borderLeftColor: colors.transparent,
  },
  railItemActive: { backgroundColor: colors.surface, borderLeftColor: colors.primary },
  railThumb: {
    width: 43,
    height: 43,
    borderRadius: 8,
    padding: 2,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    overflow: 'hidden',
  },
  railThumbActive: { borderColor: colors.primary, backgroundColor: colors.primarySoft },
  railImage: { width: '100%', height: '100%', borderRadius: 6 },
  railText: {
    ...typography.caption,
    color: colors.muted,
    fontSize: 9,
    lineHeight: 12,
    marginTop: 5,
    textAlign: 'center',
  },
  railTextActive: { color: colors.primaryDark, fontWeight: '800' },
  contentPanel: { width: '75%', backgroundColor: colors.background },
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
  horizontalCollections: { gap: 8, paddingBottom: 14 },
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
