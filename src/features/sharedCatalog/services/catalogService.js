import apiClient from '../../../services/apiClient';
import appConfig from '../../../config/appConfig';
import { getPrimaryImageUrl } from '../../../utils/getPrimaryImageUrl';
import { catalogFixtures } from '../data/catalogFixtures';

const unwrapData = (response) => response?.data?.data ?? response?.data ?? null;

const normalizeId = (value) => (value === null || value === undefined ? null : String(value));

const catalogEndpoints = {
  metals: '/shopkeeper/metals',
  categoryTree: '/shopkeeper/categories/tree',
  products: '/shopkeeper/products',
  metalRates: '/shopkeeper/metal-rates',
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

const normalizeMetalRate = (rate) => ({
  metalId: normalizeId(rate.metalId),
  code: rate.code,
  name: rate.name,
  rateUnit: rate.rateUnit,
  currentPrice: rate.currentPrice === null ? null : Number(rate.currentPrice),
  previousPrice: rate.previousPrice === null ? null : Number(rate.previousPrice),
  change: rate.change === null ? null : Number(rate.change),
  changePercent: rate.changePercent === null ? null : Number(rate.changePercent),
  asOfDate: rate.asOfDate,
});

const normalizeVariant = (variant = {}) => ({
  id: normalizeId(variant.id),
  sku: variant.sku ?? null,
  name: variant.name ?? null,
  purity: variant.purity ?? (variant.karat ? `${variant.karat}K` : null),
  karat: variant.karat ?? null,
  publicPurity: variant.publicPurity ?? null,
  publicKarat: variant.publicKarat ?? null,
  weightGrams: Number(variant.weightGrams ?? 0),
  minimumOrderQuantity: Number(variant.minimumOrderQuantity ?? 1),
  yourPrice: variant.yourPrice === null ? null : Number(variant.yourPrice ?? 0),
  inStock: Number(variant.inventory?.availableQuantity ?? variant.inventory?.onHandQuantity ?? 1) > 0,
  isDefault: Boolean(variant.isDefault),
});

const normalizeProduct = (product) => {
  const rawVariants = product.variants?.length ? product.variants : product.variant ? [product.variant] : [];
  const defaultVariant = rawVariants.find((item) => item.isDefault) ?? rawVariants[0] ?? {};
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
    imageUrl: getPrimaryImageUrl(product),
    variant: normalizeVariant(defaultVariant),
    variants: rawVariants.map(normalizeVariant),
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

  async getMetalRates() {
    try {
      const response = await apiClient.get(catalogEndpoints.metalRates);
      const data = unwrapData(response);
      return (Array.isArray(data) ? data : []).map(normalizeMetalRate);
    } catch (error) {
      const fixtures = loadFixture(() => (catalogFixtures.metalRates ?? []).map(normalizeMetalRate));
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
