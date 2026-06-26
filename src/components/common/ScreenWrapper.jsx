import React, { useMemo } from 'react';
import { View, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const ScreenWrapper = ({
  children,
  style,
  withBottomPadding = true,
  withTopPadding = false,
}) => {
  const insets = useSafeAreaInsets();
  const insetStyle = useMemo(() => ({
    paddingBottom: withBottomPadding ? insets.bottom + 80 : insets.bottom,
    paddingTop: withTopPadding ? insets.top : 0,
  }), [insets.bottom, insets.top, withBottomPadding, withTopPadding]);

  return (
    <View
      style={[
        styles.container,
        insetStyle,
        style,
      ]}
    >
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
});

export default ScreenWrapper;
