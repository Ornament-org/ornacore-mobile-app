import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import catalogService from '../services/catalogService';

const firstCategoryId = (categories) => categories?.[0]?.id ?? null;
const METALS_CACHE_TTL_MS = 30 * 1000;

const isFresh = (timestamp) => timestamp && Date.now() - timestamp < METALS_CACHE_TTL_MS;

const resolveSelectedMetalId = ({ requestedMetalId, currentMetalId, metals }) => {
  const requested = requestedMetalId ? String(requestedMetalId) : null;
  const current = currentMetalId ? String(currentMetalId) : null;
  const availableIds = new Set(metals.map((metal) => metal.id));

  if (requested && availableIds.has(requested)) return requested;
  if (current && availableIds.has(current)) return current;
  return metals[0]?.id ?? null;
};

const getErrorMessage = (error) =>
  error?.response?.data?.message || error?.message || 'Unable to load catalog';

export const loadB2BCatalog = createAsyncThunk(
  'catalog/loadB2BCatalog',
  async ({ metalId, categoryId, search, forceRefresh = false } = {}, { getState }) => {
    const state = getState().catalog;
    const shouldRefreshMetals = forceRefresh || !state.metals.length || !isFresh(state.metalsLoadedAt);
    const metals = shouldRefreshMetals ? await catalogService.getMetals() : state.metals;
    const selectedMetalId = resolveSelectedMetalId({
      requestedMetalId: metalId,
      currentMetalId: state.selectedMetalId,
      metals,
    });
    let categories = [];
    let products = [];
    let selectedCategoryId = null;
    let partialError = null;

    if (selectedMetalId) {
      try {
        categories = await catalogService.getCategories({ metalId: selectedMetalId });
        selectedCategoryId = categoryId ?? state.selectedCategoryId ?? firstCategoryId(categories);
        products = await catalogService.getProducts({
          metalId: selectedMetalId,
          categoryId: selectedCategoryId,
          search: search ?? state.search,
          limit: 40,
        });
      } catch (error) {
        partialError = getErrorMessage(error);
      }
    }

    return {
      metals,
      categories,
      products,
      selectedMetalId,
      selectedCategoryId,
      search: search ?? state.search,
      metalsLoadedAt: shouldRefreshMetals ? Date.now() : state.metalsLoadedAt,
      error: partialError,
    };
  },
);

export const selectMetalAndLoadCatalog = createAsyncThunk(
  'catalog/selectMetalAndLoadCatalog',
  async (metalId, { dispatch }) =>
    dispatch(loadB2BCatalog({ metalId, categoryId: null, forceRefresh: true })).unwrap(),
);

export const selectCategoryAndLoadProducts = createAsyncThunk(
  'catalog/selectCategoryAndLoadProducts',
  async (categoryId, { getState }) => {
    const { selectedMetalId, search } = getState().catalog;
    const products = await catalogService.getProducts({ metalId: selectedMetalId, categoryId, search, limit: 40 });
    return { products, selectedCategoryId: categoryId };
  },
);

const catalogSlice = createSlice({
  name: 'catalog',
  initialState: {
    metals: [],
    categories: [],
    products: [],
    selectedMetalId: null,
    selectedCategoryId: null,
    search: '',
    metalsLoadedAt: null,
    status: 'idle',
    error: null,
  },
  reducers: {
    setSearch(state, action) {
      state.search = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadB2BCatalog.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(loadB2BCatalog.fulfilled, (state, action) => {
        Object.assign(state, action.payload);
        state.status = 'succeeded';
      })
      .addCase(loadB2BCatalog.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(selectMetalAndLoadCatalog.fulfilled, (state, action) => {
        Object.assign(state, action.payload);
        state.status = 'succeeded';
      })
      .addCase(selectCategoryAndLoadProducts.fulfilled, (state, action) => {
        state.products = action.payload.products;
        state.selectedCategoryId = action.payload.selectedCategoryId;
      });
  },
});

export const { setSearch } = catalogSlice.actions;
export default catalogSlice.reducer;
