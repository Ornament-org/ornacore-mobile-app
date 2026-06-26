import apiClient from '../../../services/apiClient';
import appConfig from '../../../config/appConfig';
import { catalogFixtures } from '../data/catalogFixtures';

const unwrapData = (response) => response?.data?.data ?? response?.data ?? null;

const normalizeId = (value) => (value === null || value === undefined ? null : String(value));

const catalogEndpoints = {
  metals: '/shopkeeper/metals',
  categoryTree: '/shopkeeper/categories/tree',
  products: '/shopkeeper/products',
};

const cleanParams = (params) =>
  Object.fromEntries(
    Object.entries(params ?? {}).filter(([, value]) => value !== undefined && value !== null && value !== ''),
  );

const loadFixture = (loader) => {
  if (!appConfig.USE_CATALOG_FIXTURES) return null;
  return loader();
};

const normalizeMetal = (metal) => ({
  ...metal,
  id: normalizeId(metal.id),
  code: metal.code || metal.name?.toUpperCase(),
});

const normalizeCategory = (category) => ({
  ...category,
  id: normalizeId(category.id),
  metalId: normalizeId(category.metalId),
  parentId: normalizeId(category.parentId),
  productCount: Number(category.productCount ?? 0),
  children: (category.children ?? []).map(normalizeCategory),
});

const normalizeProduct = (product) => {
  const variant = product.variant ?? product.variants?.[0] ?? {};
  const categoryIds =
    product.categoryIds ??
    product.categoryMappings?.map((mapping) => normalizeId(mapping.categoryId ?? mapping.category?.id)) ??
    [];

  return {
    id: normalizeId(product.id),
    metalId: normalizeId(product.metalId ?? product.metal?.id),
    categoryIds: categoryIds.filter(Boolean).map(normalizeId),
    designCode: product.designCode,
    name: product.name,
    badge: product.badge,
    imageUrl: product.imageUrl ?? product.images?.find((image) => image.isPrimary)?.media?.url,
    variant: {
      id: normalizeId(variant.id),
      purity: variant.purity ?? (variant.karat ? `${variant.karat}K` : null),
      weightGrams: Number(variant.weightGrams ?? 0),
      minimumOrderQuantity: Number(variant.minimumOrderQuantity ?? 1),
      yourPrice: variant.yourPrice === null ? null : Number(variant.yourPrice ?? 0),
      inStock: Number(variant.inventory?.availableQuantity ?? variant.inventory?.onHandQuantity ?? 1) > 0,
    },
  };
};

export const catalogService = {
  async getMetals() {
    try {
      const response = await apiClient.get(catalogEndpoints.metals);
      const data = unwrapData(response);
      return (Array.isArray(data) ? data : data?.rows ?? []).map(normalizeMetal);
    } catch (error) {
      const fixtures = loadFixture(() => catalogFixtures.metals.map(normalizeMetal));
      if (fixtures) return fixtures;
      throw error;
    }
  },

  async getCategories({ metalId }) {
    try {
      const response = await apiClient.get(catalogEndpoints.categoryTree, {
        params: cleanParams({ metalId }),
      });
      const data = unwrapData(response);
      const rows = data?.tree ?? data?.flat ?? data ?? [];
      return rows.map(normalizeCategory);
    } catch (error) {
      const fixtures = loadFixture(() =>
        (catalogFixtures.categoriesByMetal[normalizeId(metalId)] ?? []).map(normalizeCategory),
      );
      if (fixtures) return fixtures;
      throw error;
    }
  },

  async getProducts({ metalId, categoryId, search, limit = 30 }) {
    try {
      const response = await apiClient.get(catalogEndpoints.products, {
        params: cleanParams({ metalId, categoryId, search, limit }),
      });
      const data = unwrapData(response);
      return (Array.isArray(data) ? data : []).map(normalizeProduct);
    } catch (error) {
      if (!appConfig.USE_CATALOG_FIXTURES) throw error;
      const searchTerm = search?.trim().toLowerCase();
      return catalogFixtures.products
        .filter((product) => !metalId || normalizeId(product.metalId) === normalizeId(metalId))
        .filter((product) => !categoryId || product.categoryIds.map(normalizeId).includes(normalizeId(categoryId)))
        .filter(
          (product) =>
            !searchTerm ||
            product.name.toLowerCase().includes(searchTerm) ||
            product.designCode.toLowerCase().includes(searchTerm),
        )
        .slice(0, limit)
        .map(normalizeProduct);
    }
  },
};

export default catalogService;
