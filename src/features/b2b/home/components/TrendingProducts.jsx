import React, { useMemo } from 'react';
import { Image, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { Heart } from 'lucide-react-native';
import { useAppTheme } from '../../../../theme/useAppTheme';
import { createStyles } from './TrendingProducts.styles';

const formatWeightGm = (weightGrams) => `${Number(weightGrams ?? 0).toFixed(2)} gm`;

const TrendingProducts = ({ products, metalName, onProductPress }) => {
  const theme = useAppTheme();
  const styles = useMemo(() => createStyles(theme), [theme]);

  if (!products.length) return null;

  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.row}>
      {products.map((product) => (
        <TouchableOpacity
          key={product.id}
          style={styles.card}
          activeOpacity={0.88}
          onPress={() => onProductPress(product)}
        >
          <View style={styles.imageWrap}>
            {product.imageUrl ? (
              <Image source={{ uri: product.imageUrl }} style={styles.image} />
            ) : null}
            <TouchableOpacity style={styles.heartButton} activeOpacity={0.7}>
              <Heart color={theme.text} size={16} />
            </TouchableOpacity>
          </View>
          <View style={styles.body}>
            <Text style={styles.name} numberOfLines={1}>{product.name}</Text>
            <Text style={styles.purity} numberOfLines={1}>
              {[product.variant?.purity, metalName].filter(Boolean).join(' ')}
            </Text>
            <Text style={styles.weight}>{formatWeightGm(product.variant?.weightGrams)}</Text>
          </View>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};

export default TrendingProducts;
