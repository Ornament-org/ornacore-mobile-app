import React, { useMemo } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { ArrowLeft, Search, ShoppingCart } from 'lucide-react-native';
import { useAppTheme } from '../../../../theme/useAppTheme';
import { createStyles } from './CatalogHeader.styles';

const CatalogHeader = ({ cartCount = 0, onBack, onSearch, onCart }) => {
  const theme = useAppTheme();
  const styles = useMemo(() => createStyles(theme), [theme]);

  return (
    <View style={styles.row}>
      <TouchableOpacity
        style={styles.iconButton}
        activeOpacity={0.7}
        onPress={onBack}
        accessibilityRole="button"
        accessibilityLabel="Back"
      >
        <ArrowLeft color={theme.text} size={22} />
      </TouchableOpacity>

      <View style={styles.titleBlock}>
        <Text style={styles.title}>CATEGORIES</Text>
        <Text style={styles.subtitle}>Browse & explore our jewellery collection</Text>
      </View>

      <TouchableOpacity
        style={styles.iconButton}
        activeOpacity={0.7}
        onPress={onSearch}
        accessibilityRole="button"
        accessibilityLabel="Search"
      >
        <Search color={theme.text} size={21} />
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.iconButton}
        activeOpacity={0.7}
        onPress={onCart}
        accessibilityRole="button"
        accessibilityLabel="Cart"
      >
        <ShoppingCart color={theme.text} size={21} />
        {cartCount > 0 ? (
          <View style={styles.badge}>
            <Text style={styles.badgeText}>{cartCount > 99 ? '99+' : cartCount}</Text>
          </View>
        ) : null}
      </TouchableOpacity>
    </View>
  );
};

export default CatalogHeader;
