import { combineReducers } from '@reduxjs/toolkit';
import catalogReducer from '../features/sharedCatalog/store/catalogSlice';
import authReducer from '../features/auth/reducers/authReducer';

// B2B Reducers
import b2bCatalogReducer from '../features/b2b/catalog/reducers/catalogReducer';
import b2bCartReducer from '../features/b2b/cart/reducers/cartReducer';
import b2bOrderReducer from '../features/b2b/orders/reducers/orderReducer';
import b2bProfileReducer from '../features/b2b/profile/reducers/profileReducer';
import b2bPaymentReducer from '../features/b2b/payments/reducers/paymentReducer';

// B2C Reducers
import b2cCatalogReducer from '../features/b2c/catalog/reducers/catalogReducer';
import b2cCartReducer from '../features/b2c/cart/reducers/cartReducer';
import b2cWishlistReducer from '../features/b2c/wishlist/reducers/wishlistReducer';
import b2cOrderReducer from '../features/b2c/orders/reducers/orderReducer';
import b2cCheckoutReducer from '../features/b2c/checkout/reducers/checkoutReducer';
import b2cProfileReducer from '../features/b2c/profile/reducers/profileReducer';

const rootReducer = combineReducers({
  // Shared
  catalog: catalogReducer,
  auth: authReducer,
  
  // B2B State
  b2bCatalog: b2bCatalogReducer,
  b2bCart: b2bCartReducer,
  b2bOrder: b2bOrderReducer,
  b2bProfile: b2bProfileReducer,
  b2bPayment: b2bPaymentReducer,
  
  // B2C State
  b2cCatalog: b2cCatalogReducer,
  b2cCart: b2cCartReducer,
  b2cWishlist: b2cWishlistReducer,
  b2cOrder: b2cOrderReducer,
  b2cCheckout: b2cCheckoutReducer,
  b2cProfile: b2cProfileReducer,
});

export default rootReducer;
