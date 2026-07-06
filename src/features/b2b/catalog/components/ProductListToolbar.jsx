import React, { useMemo, useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { ChevronDown, SlidersHorizontal } from 'lucide-react-native';
import { useAppTheme } from '../../../../theme/useAppTheme';
import { createStyles } from './ProductListToolbar.styles';

const SORT_OPTIONS = ['Latest First', 'Price: Low to High', 'Price: High to Low'];

const ProductListToolbar = ({ categoryName, count }) => {
  const theme = useAppTheme();
  const styles = useMemo(() => createStyles(theme), [theme]);
  const [sortOpen, setSortOpen] = useState(false);
  const [sortLabel, setSortLabel] = useState(SORT_OPTIONS[0]);

  return (
    <View style={styles.row}>
      <View style={styles.heading}>
        <Text style={styles.title} numberOfLines={1}>{categoryName}</Text>
        <Text style={styles.count}>{count}+ Products</Text>
      </View>

      <View style={styles.actions}>
        <TouchableOpacity activeOpacity={0.8} style={styles.button}>
          <SlidersHorizontal color={theme.text} size={13} />
          <Text style={styles.buttonText}>Filter</Text>
        </TouchableOpacity>

        <View style={styles.sortAnchor}>
          <TouchableOpacity
            activeOpacity={0.8}
            style={styles.button}
            onPress={() => setSortOpen((open) => !open)}
          >
            <Text style={styles.buttonText} numberOfLines={1}>Sort: {sortLabel}</Text>
            <ChevronDown color={theme.text} size={13} />
          </TouchableOpacity>

          {sortOpen ? (
            <View style={styles.dropdown}>
              {SORT_OPTIONS.map((option) => (
                <TouchableOpacity
                  key={option}
                  style={[styles.dropdownItem, option === sortLabel && styles.dropdownItemActive]}
                  onPress={() => {
                    setSortLabel(option);
                    setSortOpen(false);
                  }}
                >
                  <Text style={styles.dropdownItemText}>{option}</Text>
                </TouchableOpacity>
              ))}
            </View>
          ) : null}
        </View>
      </View>
    </View>
  );
};

export default ProductListToolbar;
