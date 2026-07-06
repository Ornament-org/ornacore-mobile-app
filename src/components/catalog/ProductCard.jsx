import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Heart, Plus } from 'lucide-react-native';
import { formatCurrency } from '../../utils/formatCurrency';
import { formatWeight } from '../../utils/formatWeight';
import { useAppTheme } from '../../theme/useAppTheme';
import { typography } from '../../theme/typography';

const ProductCard = ({ product, onPress, onAdd, compact = false, commerce = false, layout = 'default', metalName }) => {
  const theme = useAppTheme();
  const isGrid = layout === 'grid';
  const styles = createStyles(theme, compact, commerce, isGrid);
  const variant = product.variant ?? {};
  const gridMeta = [
    [variant.purity, metalName].filter(Boolean).join(' '),
    variant.publicPurity ?? variant.publicKarat,
  ]
    .filter(Boolean)
    .join('  |  ');
  return (
    <TouchableOpacity style={styles.card} activeOpacity={0.88} onPress={onPress}>
      <View style={styles.imageWrap}>
        {product.imageUrl ? <Image source={{ uri: product.imageUrl }} style={styles.image} /> : null}
        <TouchableOpacity style={styles.heartButton} activeOpacity={0.7}>
          <Heart color={theme.text} size={compact ? 14 : 17} />
        </TouchableOpacity>
        {!compact && !isGrid && product.badge ? <Text style={styles.badge}>{product.badge}</Text> : null}
      </View>

      <View style={styles.body}>
        {!isGrid ? <Text style={styles.code} numberOfLines={1}>{product.designCode}</Text> : null}
        <Text style={styles.name} numberOfLines={1}>{product.name}</Text>
        {isGrid ? (
          <>
            <Text style={styles.meta} numberOfLines={1}>{gridMeta}</Text>
            <View style={styles.gridFooter}>
              <Text style={styles.gridWeight}>{Number(variant.weightGrams ?? 0).toFixed(2)} gm</Text>
              <TouchableOpacity
                style={styles.gridAddButton}
                activeOpacity={0.8}
                onPress={(event) => {
                  event.stopPropagation();
                  onAdd?.(product);
                }}
              >
                <Plus color={theme.primary} size={16} strokeWidth={2.6} />
              </TouchableOpacity>
            </View>
          </>
        ) : (
          <Text style={styles.meta}>
            {variant.purity}  ·  {formatWeight(variant.weightGrams)}
          </Text>
        )}
        {commerce && !isGrid ? <Text style={styles.moq}>MOQ: {variant.minimumOrderQuantity ?? 1} Pc</Text> : null}
        {!isGrid ? (
          <Text style={styles.price}>
            {variant.yourPrice ? formatCurrency(variant.yourPrice) : 'Ask price'}
            <Text style={styles.perPiece}> /pc</Text>
          </Text>
        ) : null}
        {commerce && !isGrid ? (
          <TouchableOpacity
            style={styles.addButton}
            activeOpacity={0.8}
            onPress={(event) => {
              event.stopPropagation();
              onAdd?.(product);
            }}
          >
            <Text style={styles.addText}>Add</Text>
            <Plus color={theme.onPrimary} size={14} strokeWidth={3} />
          </TouchableOpacity>
        ) : null}
      </View>
    </TouchableOpacity>
  );
};

const createStyles = (theme, compact, commerce, isGrid) => StyleSheet.create({
  card: {
    flex: 1,
    minWidth: compact || commerce || isGrid ? 0 : 156,
    backgroundColor: theme.surface,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: theme.border,
    overflow: 'hidden',
  },
  imageWrap: {
    height: compact ? 88 : (commerce || isGrid) ? 105 : 132,
    backgroundColor: theme.surfaceMuted,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  heartButton: {
    position: 'absolute',
    top: compact ? 6 : 10,
    right: compact ? 6 : 10,
    width: compact ? 24 : 32,
    height: compact ? 24 : 32,
    borderRadius: compact ? 12 : 16,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: theme.floatingSurface,
  },
  gridFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 7,
  },
  gridWeight: {
    ...typography.caption,
    fontSize: 11,
    fontWeight: '600',
    color: theme.text,
  },
  gridAddButton: {
    width: 30,
    height: 30,
    borderRadius: 8,
    borderWidth: 1.3,
    borderColor: theme.primary,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: theme.surface,
  },
  badge: {
    position: 'absolute',
    top: 10,
    left: 10,
    paddingHorizontal: 7,
    paddingVertical: 3,
    borderRadius: 4,
    overflow: 'hidden',
    backgroundColor: theme.primary,
    color: theme.onPrimary,
    fontSize: 11,
    fontWeight: '700',
  },
  body: {
    paddingHorizontal: compact ? 7 : commerce ? 8 : 10,
    paddingTop: compact ? 7 : 10,
    paddingBottom: compact ? 8 : 10,
  },
  code: {
    color: theme.muted,
    ...typography.caption,
    fontSize: compact ? 8 : 10,
    fontWeight: '600',
  },
  name: {
    marginTop: 2,
    color: theme.text,
    ...typography.subtitle2,
    fontSize: compact ? 9 : 13,
    lineHeight: compact ? 12 : 17,
    fontWeight: '700',
  },
  meta: {
    color: theme.muted,
    ...typography.caption,
    fontSize: compact ? 8 : 10,
    lineHeight: compact ? 11 : 14,
    marginTop: compact ? 4 : 6,
  },
  moq: {
    ...typography.caption,
    color: theme.muted,
    fontSize: 9,
    marginTop: 2,
  },
  price: {
    fontFamily: typography.fontFamily.bold,
    color: theme.danger,
    fontSize: compact ? 12 : 17,
    lineHeight: compact ? 15 : 21,
    fontWeight: '800',
    marginTop: 4,
  },
  perPiece: { fontSize: compact ? 7 : 9, fontWeight: '700' },
  addButton: {
    height: 31,
    marginTop: 8,
    borderRadius: 7,
    backgroundColor: theme.primary,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 4,
  },
  addText: {
    ...typography.button,
    color: theme.onPrimary,
    fontSize: 11,
  },
});

export default ProductCard;
