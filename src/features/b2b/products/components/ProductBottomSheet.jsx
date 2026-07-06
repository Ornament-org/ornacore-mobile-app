import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Animated, Image, Modal, Pressable, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { X } from 'lucide-react-native';
import { useDispatch } from 'react-redux';
import { useAppTheme } from '../../../../theme/useAppTheme';
import { formatCurrency } from '../../../../utils/formatCurrency';
import { formatWeight } from '../../../../utils/formatWeight';
import QuantityStepper from '../../../../components/common/QuantityStepper';
import { addToB2BCart } from '../../cart/actions/cartActions';
import { createStyles } from './ProductBottomSheet.styles';

const SHEET_TRAVEL = 620;

const ProductBottomSheet = ({ product, visible, onClose }) => {
  const theme = useAppTheme();
  const dispatch = useDispatch();
  const styles = useMemo(() => createStyles(theme), [theme]);
  const translateY = useRef(new Animated.Value(SHEET_TRAVEL)).current;
  const backdropOpacity = useRef(new Animated.Value(0)).current;
  const [mounted, setMounted] = useState(false);
  const [selectedVariantId, setSelectedVariantId] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [adding, setAdding] = useState(false);

  const variants = product?.variants?.length ? product.variants : product?.variant ? [product.variant] : [];
  const selectedVariant = variants.find((item) => item.id === selectedVariantId) ?? variants[0] ?? null;

  useEffect(() => {
    if (visible) {
      setMounted(true);
      Animated.parallel([
        Animated.timing(translateY, { toValue: 0, duration: 260, useNativeDriver: true }),
        Animated.timing(backdropOpacity, { toValue: 1, duration: 220, useNativeDriver: true }),
      ]).start();
    } else if (mounted) {
      Animated.parallel([
        Animated.timing(translateY, { toValue: SHEET_TRAVEL, duration: 220, useNativeDriver: true }),
        Animated.timing(backdropOpacity, { toValue: 0, duration: 200, useNativeDriver: true }),
      ]).start(() => setMounted(false));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [visible]);

  useEffect(() => {
    if (product) {
      const initial = product.variants?.find((item) => item.isDefault) ?? product.variants?.[0] ?? product.variant;
      setSelectedVariantId(initial?.id ?? null);
      setQuantity(initial?.minimumOrderQuantity ?? 1);
    }
  }, [product]);

  if (!mounted && !visible) return null;

  const moq = selectedVariant?.minimumOrderQuantity ?? 1;
  const inStock = selectedVariant?.inStock !== false;

  const handleAddToCart = async () => {
    if (!selectedVariant?.id || adding) return;
    setAdding(true);
    try {
      await dispatch(addToB2BCart({ productVariantId: Number(selectedVariant.id), quantity }));
      onClose();
    } catch (error) {
      // surfaced via cartReducer's addToCartError; sheet stays open so the shopkeeper can retry
    } finally {
      setAdding(false);
    }
  };

  return (
    <Modal transparent visible={mounted} animationType="none" onRequestClose={onClose} statusBarTranslucent>
      <Animated.View style={[styles.backdrop, { opacity: backdropOpacity }]}>
        <Pressable style={styles.backdropPress} onPress={onClose} />
        <Animated.View style={[styles.sheet, { transform: [{ translateY }] }]}>
          <View style={styles.handle} />
          <TouchableOpacity style={styles.closeButton} onPress={onClose} activeOpacity={0.8}>
            <X color={theme.text} size={16} />
          </TouchableOpacity>

          <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
            {product?.imageUrl ? <Image source={{ uri: product.imageUrl }} style={styles.image} /> : null}
            <Text style={styles.name}>{product?.name}</Text>
            {product?.designCode ? <Text style={styles.designCode}>{product.designCode}</Text> : null}

            <View style={styles.metaRow}>
              <Text style={styles.price}>
                {selectedVariant?.yourPrice ? formatCurrency(selectedVariant.yourPrice) : 'Ask price'}
                <Text style={styles.perPiece}> /pc</Text>
              </Text>
            </View>
            <Text style={styles.moq}>
              {selectedVariant?.purity ? `${selectedVariant.purity} · ` : ''}
              {formatWeight(selectedVariant?.weightGrams)} · MOQ: {moq} Pc
            </Text>

            {variants.length > 1 ? (
              <>
                <Text style={styles.sectionTitle}>Select Variant</Text>
                <View style={styles.variantRow}>
                  {variants.map((item) => {
                    const active = item.id === selectedVariant?.id;
                    return (
                      <TouchableOpacity
                        key={item.id}
                        style={[styles.variantChip, active && styles.variantChipActive]}
                        onPress={() => {
                          setSelectedVariantId(item.id);
                          setQuantity(item.minimumOrderQuantity ?? 1);
                        }}
                      >
                        <Text style={[styles.variantChipText, active && styles.variantChipTextActive]}>
                          {formatWeight(item.weightGrams)}
                        </Text>
                      </TouchableOpacity>
                    );
                  })}
                </View>
              </>
            ) : null}

            <Text style={styles.sectionTitle}>Quantity</Text>
            <QuantityStepper value={quantity} min={moq} onChange={setQuantity} />

            {!inStock ? <Text style={[styles.stockText, { color: theme.danger }]}>Out of stock</Text> : null}
          </ScrollView>

          <View style={styles.footer}>
            <TouchableOpacity
              style={[styles.addButton, (!inStock || adding) && styles.addButtonDisabled]}
              activeOpacity={0.85}
              disabled={!inStock || adding}
              onPress={handleAddToCart}
            >
              <Text style={styles.addButtonText}>{adding ? 'Adding...' : 'Add to Cart'}</Text>
            </TouchableOpacity>
          </View>
        </Animated.View>
      </Animated.View>
    </Modal>
  );
};

export default ProductBottomSheet;
