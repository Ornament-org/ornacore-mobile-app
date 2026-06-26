import React from 'react';
import { FlatList, StyleSheet, Text, TouchableOpacity, useWindowDimensions, View } from 'react-native';
import { ChevronRight } from 'lucide-react-native';
import ProductCard from './ProductCard';
import { useAppTheme } from '../../theme/useAppTheme';
import { typography } from '../../theme/typography';

const ListGap = () => <View style={staticStyles.gap} />;

const CatalogSection = ({ title, subtitle, products, onViewAll, onProductPress, compact = false }) => {
  const theme = useAppTheme();
  const { width } = useWindowDimensions();
  const compactCardWidth = Math.max(78, (width - 56) / 4);
  const styles = createStyles(theme, compact, compactCardWidth);
  return <View style={styles.section}>
    <View style={styles.header}>
      <View>
        <Text style={styles.title}>{title}</Text>
        {subtitle ? <Text style={styles.subtitle}>{subtitle}</Text> : null}
      </View>
      {onViewAll ? (
        <TouchableOpacity style={styles.viewAll} onPress={onViewAll}>
          <Text style={styles.viewAllText}>View All</Text>
          <ChevronRight color={theme.primary} size={15} />
        </TouchableOpacity>
      ) : null}
    </View>
    <FlatList
      horizontal
      showsHorizontalScrollIndicator={false}
      data={products}
      keyExtractor={(item) => item.id}
      contentContainerStyle={styles.list}
      ItemSeparatorComponent={ListGap}
      renderItem={({ item }) => (
        <View style={styles.cardWidth}>
          <ProductCard compact={compact} product={item} onPress={() => onProductPress?.(item)} />
        </View>
      )}
    />
  </View>;
};

const createStyles = (theme, compact, compactCardWidth) => StyleSheet.create({
  section: {
    marginTop: 15,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    marginBottom: 8,
  },
  title: {
    color: theme.text,
    ...typography.subtitle2,
    fontSize: 12,
    fontWeight: '800',
  },
  subtitle: {
    color: theme.muted,
    ...typography.body2,
    marginTop: 2,
  },
  viewAll: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  viewAllText: {
    color: theme.primary,
    ...typography.caption,
    fontWeight: '700',
  },
  list: {
    paddingHorizontal: 16,
  },
  cardWidth: {
    width: compact ? compactCardWidth : 185,
  },
});

const staticStyles = StyleSheet.create({
  gap: {
    width: 8,
  },
});

export default CatalogSection;
