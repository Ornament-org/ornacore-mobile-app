# API Connection Structure Guide

## Overview
This project has a complete API connection structure with complete separation between B2B and B2C contexts. The architecture follows Redux pattern with centralized API definitions, action creators, and reducers.

## Architecture

```
src/
├── services/
│   ├── api/
│   │   ├── b2bApi.js          # All B2B API endpoints
│   │   ├── b2cApi.js          # All B2C API endpoints
│   │   └── index.js           # Central export
│   ├── apiClient.js           # Axios instance with interceptors
│   └── tokenService.js        # Token management
├── features/
│   ├── b2b/
│   │   ├── catalog/
│   │   │   ├── actions/
│   │   │   │   └── catalogActions.js
│   │   │   └── reducers/
│   │   │       └── catalogReducer.js
│   │   ├── cart/
│   │   │   ├── actions/
│   │   │   │   └── cartActions.js
│   │   │   └── reducers/
│   │   │       └── cartReducer.js
│   │   ├── orders/
│   │   │   ├── actions/
│   │   │   │   └── orderActions.js
│   │   │   └── reducers/
│   │   │       └── orderReducer.js
│   │   ├── profile/
│   │   │   ├── actions/
│   │   │   │   └── profileActions.js
│   │   │   └── reducers/
│   │   │       └── profileReducer.js
│   │   └── payments/
│   │       ├── actions/
│   │       │   └── paymentActions.js
│   │       └── reducers/
│   │           └── paymentReducer.js
│   └── b2c/
│       ├── catalog/
│       │   ├── actions/
│       │   │   └── catalogActions.js
│       │   └── reducers/
│       │       └── catalogReducer.js
│       ├── cart/
│       │   ├── actions/
│       │   │   └── cartActions.js
│       │   └── reducers/
│       │       └── cartReducer.js
│       ├── wishlist/
│       │   ├── actions/
│       │   │   └── wishlistActions.js
│       │   └── reducers/
│       │       └── wishlistReducer.js
│       ├── orders/
│       │   ├── actions/
│       │   │   └── orderActions.js
│       │   └── reducers/
│       │       └── orderReducer.js
│       ├── checkout/
│       │   ├── actions/
│       │   │   └── checkoutActions.js
│       │   └── reducers/
│       │       └── checkoutReducer.js
│       └── profile/
│           ├── actions/
│           │   └── profileActions.js
│           └── reducers/
│               └── profileReducer.js
└── app/
    └── rootReducer.js         # Combines all reducers
```

## How to Use

### 1. Import Actions in Components

For B2B features:
```javascript
import { useDispatch, useSelector } from 'react-redux';
import { fetchB2BProducts, addToB2BCart } from '../features/b2b/catalog/actions/catalogActions';
import { addToB2BCart } from '../features/b2b/cart/actions/cartActions';
```

For B2C features:
```javascript
import { useDispatch, useSelector } from 'react-redux';
import { fetchB2CProducts, addToB2CCart } from '../features/b2c/catalog/actions/catalogActions';
import { addToB2CCart } from '../features/b2c/cart/actions/cartActions';
```

### 2. Dispatch Actions

```javascript
const dispatch = useDispatch();

// Fetch B2B products
const handleFetchProducts = async () => {
  try {
    await dispatch(fetchB2BAllProducts({ page: 1, limit: 10 }));
  } catch (error) {
    console.error('Error fetching products:', error);
  }
};

// Add to B2B cart
const handleAddToCart = async (product) => {
  try {
    await dispatch(addToB2BCart({
      product_id: product.id,
      quantity: 1,
      variant_id: product.variant_id,
    }));
  } catch (error) {
    console.error('Error adding to cart:', error);
  }
};
```

### 3. Access State in Components

For B2B state:
```javascript
const b2bCatalog = useSelector(state => state.b2bCatalog);
const b2bCart = useSelector(state => state.b2bCart);

// Access data
const { products, loading, error } = b2bCatalog;
const { cart, addToCartLoading } = b2bCart;
```

For B2C state:
```javascript
const b2cCatalog = useSelector(state => state.b2cCatalog);
const b2cCart = useSelector(state => state.b2cCart);

// Access data
const { products, loading, error } = b2cCatalog;
const { cart, addToCartLoading } = b2cCart;
```

### 4. Complete Component Example

```javascript
import React, { useEffect } from 'react';
import { View, Text, FlatList, ActivityIndicator } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { fetchB2BAllProducts } from '../../features/b2b/catalog/actions/catalogActions';

const B2BProductListScreen = () => {
  const dispatch = useDispatch();
  const { products, loading, error } = useSelector(state => state.b2bCatalog);

  useEffect(() => {
    dispatch(fetchB2BAllProducts({ page: 1, limit: 20 }));
  }, [dispatch]);

  if (loading) {
    return <ActivityIndicator size="large" />;
  }

  if (error) {
    return <Text>Error: {error}</Text>;
  }

  return (
    <View>
      <FlatList
        data={products}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <Text>{item.name}</Text>
        )}
      />
    </View>
  );
};

export default B2BProductListScreen;
```

## API Structure

### B2B API Endpoints

Located in `src/services/api/b2bApi.js`

- **Catalog**: Categories, products, product details, search
- **Cart**: Cart management, bulk discounts
- **Orders**: Order management, tracking, history
- **Payments**: Payment methods, ledger, invoices
- **Profile**: Business profile, user profile, addresses, documents
- **Support**: Tickets, messages
- **Notifications**: Notification management

### B2C API Endpoints

Located in `src/services/api/b2cApi.js`

- **Catalog**: Categories, products, reviews, featured, new arrivals
- **Cart**: Cart management, coupons
- **Wishlist**: Wishlist management
- **Orders**: Order management, tracking, returns
- **Checkout**: Shipping, payment, validation
- **Profile**: User profile, addresses, password
- **Support**: Tickets, FAQ
- **Notifications**: Notification management, preferences

## Key Principles

1. **Complete Separation**: B2B and B2C are completely separate with no mixing
2. **Centralized API**: All API endpoints defined in one place per context
3. **Action Pattern**: Actions call APIs and dispatch to reducers
4. **State Management**: Reducers handle state changes for each feature
5. **Type Safety**: Clear action types for each operation
6. **Error Handling**: Consistent error handling across all actions

## Adding New Features

### 1. Add API Endpoint
Add the new API function to the appropriate API file (`b2bApi.js` or `b2cApi.js`)

### 2. Create Action Types
Add action types in the actions file

### 3. Create Action Creator
Add the action function that calls the API and dispatches actions

### 4. Update Reducer
Add cases for the new action types in the reducer

### 5. Update Root Reducer
Import and add the new reducer to `rootReducer.js`

## State Structure

### B2B State
```javascript
state.b2bCatalog: {
  categories: [],
  products: [],
  productDetails: null,
  searchResults: [],
  loading: false,
  error: null
}

state.b2bCart: {
  cart: null,
  loading: false,
  error: null
}

state.b2bOrder: {
  orders: [],
  orderDetails: null,
  loading: false,
  error: null
}

state.b2bProfile: {
  businessProfile: null,
  userProfile: null,
  addresses: [],
  loading: false,
  error: null
}

state.b2bPayment: {
  paymentMethods: [],
  paymentLedger: [],
  loading: false,
  error: null
}
```

### B2C State
```javascript
state.b2cCatalog: {
  categories: [],
  products: [],
  productDetails: null,
  featuredProducts: [],
  newArrivals: [],
  loading: false,
  error: null
}

state.b2cCart: {
  cart: null,
  loading: false,
  error: null
}

state.b2cWishlist: {
  wishlist: [],
  loading: false,
  error: null
}

state.b2cOrder: {
  orders: [],
  orderDetails: null,
  loading: false,
  error: null
}

state.b2cCheckout: {
  shippingMethods: [],
  paymentMethods: [],
  loading: false,
  error: null
}

state.b2cProfile: {
  userProfile: null,
  addresses: [],
  loading: false,
  error: null
}
```

## Best Practices

1. **Always use actions**: Never call API directly from components
2. **Handle errors**: Always try-catch action dispatches
3. **Loading states**: Use loading states to show UI feedback
4. **Separation**: Never mix B2B and B2C imports in the same component
5. **Consistency**: Follow the same pattern for all new features
6. **Type safety**: Use clear action type names with context prefix (B2B_ or B2C_)
