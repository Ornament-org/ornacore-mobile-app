import React, { useMemo } from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { LayoutGrid } from 'lucide-react-native';
import { useAppTheme } from '../../../../theme/useAppTheme';
import { glyphForCategory } from './JewelryGlyphs';
import { createStyles } from './QuickCategories.styles';

const QuickCategories = ({ categories, onSelect, onViewAll }) => {
  const theme = useAppTheme();
  const styles = useMemo(() => createStyles(theme), [theme]);
  const visible = categories.slice(0, 5);

  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.row}>
      {visible.map((category) => {
        const Glyph = glyphForCategory(category.name);
        return (
          <TouchableOpacity
            key={category.id}
            style={styles.item}
            activeOpacity={0.8}
            onPress={() => onSelect(category)}
          >
            <View style={styles.card}>
              <Glyph color={theme.primary} size={30} />
            </View>
            <Text style={styles.label} numberOfLines={1}>{category.name}</Text>
          </TouchableOpacity>
        );
      })}

      <TouchableOpacity style={styles.item} activeOpacity={0.8} onPress={onViewAll}>
        <View style={styles.card}>
          <LayoutGrid color={theme.primary} size={26} strokeWidth={1.7} />
        </View>
        <Text style={styles.label}>More</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default QuickCategories;
