import React, { useMemo } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useAppTheme } from '../../theme/useAppTheme';

const ThemedPlaceholder = ({ title, message }) => {
  const colors = useAppTheme();
  const styles = useMemo(() => createStyles(colors), [colors]);

  return (
    <View style={styles.screen}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.copy}>{message}</Text>
    </View>
  );
};

const createStyles = (colors) => StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.background,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  title: { color: colors.text, fontSize: 22, fontWeight: '900' },
  copy: { color: colors.muted, marginTop: 8, textAlign: 'center' },
});

export default ThemedPlaceholder;

