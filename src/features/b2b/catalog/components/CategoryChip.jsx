import React, { useMemo } from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import { LayoutGrid } from 'lucide-react-native';
import { useAppTheme } from '../../../../theme/useAppTheme';
import { createStyles } from './CategoryChip.styles';

const CategoryChip = ({ label, active, imageUrl, isAll = false, onPress }) => {
  const theme = useAppTheme();
  const styles = useMemo(() => createStyles(theme), [theme]);

  return (
    <TouchableOpacity
      activeOpacity={0.82}
      style={[styles.card, active && styles.cardActive]}
      onPress={onPress}
    >
      <View style={[styles.thumb, active && styles.thumbActive]}>
        {isAll || !imageUrl ? (
          <LayoutGrid color={active ? theme.primary : theme.muted} size={24} strokeWidth={1.7} />
        ) : (
          <Image source={{ uri: imageUrl }} style={styles.image} />
        )}
      </View>
      <Text style={[styles.label, active && styles.labelActive]} numberOfLines={2}>
        {label}
      </Text>
    </TouchableOpacity>
  );
};

export default CategoryChip;
