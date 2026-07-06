import React, { createContext, useCallback, useContext, useMemo, useState } from 'react';
import ProductBottomSheet from '../components/ProductBottomSheet';

const ProductSheetContext = createContext(null);

export const ProductSheetProvider = ({ children }) => {
  const [activeProduct, setActiveProduct] = useState(null);

  const openProduct = useCallback((product) => setActiveProduct(product), []);
  const close = useCallback(() => setActiveProduct(null), []);

  const value = useMemo(() => ({ openProduct, close, activeProduct }), [openProduct, close, activeProduct]);

  return (
    <ProductSheetContext.Provider value={value}>
      {children}
      <ProductBottomSheet product={activeProduct} visible={!!activeProduct} onClose={close} />
    </ProductSheetContext.Provider>
  );
};

export const useProductSheet = () => {
  const ctx = useContext(ProductSheetContext);
  if (!ctx) {
    throw new Error('useProductSheet must be used within a ProductSheetProvider');
  }
  return ctx;
};

export default ProductSheetContext;
