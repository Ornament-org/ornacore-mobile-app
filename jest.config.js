module.exports = {
  preset: '@react-native/jest-preset',
  setupFiles: ['react-native-gesture-handler/jestSetup'],
  transform: {
    '^.+\\.(js|jsx|ts|tsx)$': 'babel-jest',
  },
  transformIgnorePatterns: [
    'node_modules/(?!(react-native|@react-native|@react-native-async-storage|@react-navigation|react-native-gesture-handler|react-native-safe-area-context|react-native-screens|react-native-svg|react-native-keyboard-aware-scroll-view|react-native-iphone-x-helper|lucide-react-native|react-redux|@reduxjs/toolkit|redux|redux-thunk|reselect|immer|axios)/)',
  ],
};
