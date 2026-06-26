# OrnaCore Mobile App

React Native mobile app for B2B shopkeepers and future B2C customers in the jewelry industry.

## Overview

OrnaCore Mobile App is a scalable React Native application designed for:
- **B2B Shopkeepers**: Browse jewelry products, see special prices, manage orders, track payments
- **B2C Customers (Future)**: Browse public catalog, place orders, online payments, home delivery

## Tech Stack

- **Framework**: React Native CLI
- **Navigation**: React Navigation
- **State Management**: Redux Toolkit
- **API Client**: Axios
- **Forms**: React Hook Form (to be added)
- **Validation**: Yup/Zod (to be added)
- **Storage**: AsyncStorage
- **Theme**: Custom theme system with metal-based themes (Gold, Silver, Diamond)

## Project Structure

```
ornacore-mobile-app/
├── src/
│   ├── app/                    # App configuration
│   │   ├── store.js           # Redux store configuration
│   │   ├── rootReducer.js    # Root reducer
│   │   └── navigationRef.js   # Navigation reference
│   │
│   ├── assets/                # Images, icons, logos
│   │   ├── images/
│   │   ├── icons/
│   │   └── logos/
│   │
│   ├── components/            # Reusable components
│   │   ├── common/           # Common UI components
│   │   │   ├── AppButton.jsx
│   │   │   ├── AppText.jsx
│   │   │   ├── AppInput.jsx
│   │   │   ├── AppHeader.jsx
│   │   │   ├── AppSearchBar.jsx
│   │   │   ├── AppLoader.jsx
│   │   │   ├── AppEmptyState.jsx
│   │   │   ├── AppErrorState.jsx
│   │   │   ├── AppModal.jsx
│   │   │   └── AppToast.jsx
│   │   │
│   │   ├── catalog/          # Catalog-specific components
│   │   ├── cart/              # Cart components
│   │   └── order/            # Order components
│   │
│   ├── features/             # Feature modules
│   │   ├── auth/             # B2B/B2C auth screens and auth navigators
│   │   │   └── navigation/   # B2BAuthNavigator, B2CAuthNavigator
│   │   ├── onboarding/       # Public landing and splash
│   │   │   ├── navigation/   # PublicNavigator, SplashNavigator
│   │   │   └── screens/
│   │   ├── approval/         # Shop approval route states
│   │   │   └── navigation/
│   │   ├── b2b/              # B2B shopkeeper features
│   │   │   ├── navigation/   # Protected B2B segment, stack, tabs
│   │   │   ├── home/
│   │   │   ├── catalog/
│   │   │   ├── cart/
│   │   │   ├── orders/
│   │   │   ├── payments/
│   │   │   └── profile/
│   │   ├── b2c/              # B2C customer features
│   │   │   ├── navigation/   # Protected B2C segment and stack
│   │   ├── sharedCatalog/    # Shared catalog logic
│   │   ├── notifications/    # Notifications
│   │   └── support/          # Support features
│   │
│   ├── navigation/           # Root navigation only
│   │   ├── RootNavigator.jsx
│   │   └── routeNames.js
│   │
│   ├── services/             # API services
│   │   ├── apiClient.js      # Axios client with interceptors
│   │   ├── tokenService.js   # Token management
│   │   ├── authService.js     # Auth API
│   │   ├── catalogService.js  # Catalog API
│   │   ├── productService.js  # Product API
│   │   ├── cartService.js     # Cart API
│   │   ├── orderService.js    # Order API
│   │   ├── paymentService.js  # Payment API
│   │   └── notificationService.js
│   │
│   ├── hooks/                # Custom React hooks
│   │   ├── useAuth.js
│   │   ├── useUserMode.js
│   │   ├── useCart.js
│   │   ├── useDebounce.js
│   │   └── useThemeMode.js
│   │
│   ├── theme/                # Theme system
│   │   ├── colors.js         # Color palette
│   │   ├── typography.js     # Typography
│   │   ├── spacing.js        # Spacing scale
│   │   ├── shadows.js        # Shadow styles
│   │   └── index.js          # Theme exports
│   │
│   ├── utils/                # Utility functions
│   │   ├── formatCurrency.js
│   │   ├── formatDate.js
│   │   ├── formatWeight.js
│   │   ├── constants.js
│   │   └── helpers.js
│   │
│   └── config/               # Configuration
│       ├── env.js            # Environment variables
│       └── appConfig.js      # App configuration
│
├── android/                  # Android native code
├── ios/                      # iOS native code
├── .env                      # Environment variables
├── .env.example              # Environment variables template
├── package.json
└── README.md
```

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- React Native CLI
- Android Studio (for Android development)
- Xcode (for iOS development, macOS only)

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd ornacore-mobile-app
```

2. Install dependencies:
```bash
npm install
```

3. Configure environment variables:
```bash
cp .env.example .env
# Edit .env with your configuration
```

### Running the App

#### Android

1. Start Metro bundler:
```bash
npm start
```

2. Run on Android emulator or device:
```bash
npm run android
```

#### iOS (macOS only)

1. Install CocoaPods dependencies:
```bash
cd ios
bundle install
bundle exec pod install
cd ..
```

2. Start Metro bundler:
```bash
npm start
```

3. Run on iOS simulator:
```bash
npm run ios
```

## Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| API_BASE_URL | Backend API base URL | http://localhost:5001/api/v1 |
| APP_ENV | Environment (development/production) | development |
| APP_NAME | Application name | OrnaCore |
| DEBUG | Debug mode flag | true |
| ENABLE_B2C | Enable B2C features | false |
| ENABLE_ONLINE_PAYMENT | Enable online payments | false |
| ENABLE_PUSH_NOTIFICATIONS | Enable push notifications | false |

## Theme System

The app supports metal-based themes:
- **Gold**: Warm cream background, gold accents
- **Silver**: White/gray background, silver accents
- **Diamond**: White background, ice blue accents

Themes can be switched dynamically using the theme system.

## Navigation Structure

- **RootNavigator**: Coordinates top-level app segments only
- **PublicNavigator**: Guest landing/home surface shown on first open
- **B2BSegment**: Gates shopkeeper auth, approval, and approved B2B app
- **B2BAuthNavigator**: Shopkeeper login, registration, password reset
- **ApprovalNavigator**: Pending approval, rejected, suspended states
- **B2BNavigator**: Approved B2B shopkeeper stack with B2B-only tabs
- **B2CSegment**: Gates customer auth and customer app
- **B2CAuthNavigator**: Customer login/register flow
- **B2CNavigator**: Customer app stack for B2C-only catalog/cart/checkout

## Development Phases

### Phase 1: App Setup ✅
- Project initialization
- Folder structure
- Theme system
- Redux store
- Navigation structure
- Common components
- API client
- Utility functions

### Phase 2: Auth + Onboarding (Next)
- Splash screen
- Login/Register screens
- Shop profile completion
- Token management
- Approval status handling

### Phase 3: Home + Catalog
- B2B home screen
- Metal switcher
- Category listing
- Product grid
- Search functionality

### Phase 4: Product + Search
- Product details
- Advanced search
- Filters and sorting

### Phase 5: Cart + Orders
- Cart management
- Order placement
- Order tracking
- Order history

### Phase 6: Payment + Profile
- Payment status
- Due amount tracking
- Profile management
- Support features

## Contributing

1. Create a feature branch
2. Make your changes
3. Follow the existing code style
4. Test thoroughly
5. Submit a pull request

## License

Copyright © 2026 OrnaCore. All rights reserved.
# ornacore-mobile-app
# ornacore-mobile-app
# ornacore-mobile-app
