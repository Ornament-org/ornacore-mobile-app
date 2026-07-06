import React, { useCallback, useMemo } from 'react';
import { FlatList, Image, Text, TouchableOpacity, View } from 'react-native';
import { ShoppingCart, Trash2 } from 'lucide-react-native';
import { useDispatch, useSelector } from 'react-redux';
import { useFocusEffect } from '@react-navigation/native';
import { useAppTheme } from '../../../../theme/useAppTheme';
import { routeNames } from '../../../../navigation/routeNames';
import { formatCurrency } from '../../../../utils/formatCurrency';
import { formatWeight } from '../../../../utils/formatWeight';
import { getPrimaryImageUrl } from '../../../../utils/getPrimaryImageUrl';
import QuantityStepper from '../../../../components/common/QuantityStepper';
import { fetchB2BCart, removeFromB2BCart, updateB2BCartItem } from '../actions/cartActions';
import { createStyles } from './B2BCartScreen.styles';

const CartRow = ({ item, styles, theme, onChangeQuantity, onRemove }) => {
  const variant = item.variant ?? {};
  const product = variant.product ?? {};
  const imageUrl = getPrimaryImageUrl(product);

  return (
    <View style={styles.row}>
      {imageUrl ? (
        <Image source={{ uri: imageUrl }} style={styles.thumb} />
      ) : (
        <View style={[styles.thumb, styles.thumbPlaceholder]}>
          <ShoppingCart color={theme.muted} size={22} />
        </View>
      )}

      <View style={styles.body}>
        <View>
          <Text style={styles.name} numberOfLines={1}>{product.name ?? variant.name ?? 'Product'}</Text>
          <Text style={styles.meta}>
            {[variant.purity, formatWeight(variant.weightGrams)].filter(Boolean).join(' · ')}
          </Text>
        </View>

        <View style={styles.footerRow}>
          <QuantityStepper
            value={Number(item.quantity)}
            min={Number(variant.minimumOrderQuantity ?? 1)}
            onChange={(quantity) => onChangeQuantity(item, quantity)}
          />
          <Text style={styles.lineTotal}>
            {formatCurrency(Number(item.unitPriceSnapshot ?? 0) * item.quantity)}
          </Text>
        </View>
      </View>

      <TouchableOpacity style={styles.removeButton} activeOpacity={0.75} onPress={() => onRemove(item)}>
        <Trash2 color={theme.danger} size={15} />
      </TouchableOpacity>
    </View>
  );
};

const B2BCartScreen = ({ navigation }) => {
  const theme = useAppTheme();
  const styles = useMemo(() => createStyles(theme), [theme]);
  const dispatch = useDispatch();
  const { cart, loading } = useSelector((state) => state.b2bCart);
  const items = cart?.items ?? [];

  useFocusEffect(
    useCallback(() => {
      dispatch(fetchB2BCart()).catch(() => {});
    }, [dispatch]),
  );

  const handleChangeQuantity = (item, quantity) => {
    dispatch(updateB2BCartItem(item.id, { quantity })).catch(() => {});
  };

  const handleRemove = (item) => {
    dispatch(removeFromB2BCart(item.id)).catch(() => {});
  };

  if (!loading && items.length === 0) {
    return (
      <View style={styles.screen}>
        <View style={styles.header}>
          <Text style={styles.title}>Cart</Text>
        </View>
        <View style={styles.empty}>
          <ShoppingCart color={theme.muted} size={40} />
          <Text style={styles.emptyTitle}>Your cart is empty</Text>
          <Text style={styles.emptyCopy}>Add designs from Home or Categories to see them here.</Text>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.screen}>
      <View style={styles.header}>
        <Text style={styles.title}>Cart</Text>
      </View>

      <FlatList
        data={items}
        keyExtractor={(item) => String(item.id)}
        contentContainerStyle={styles.list}
        renderItem={({ item }) => (
          <CartRow
            item={item}
            styles={styles}
            theme={theme}
            onChangeQuantity={handleChangeQuantity}
            onRemove={handleRemove}
          />
        )}
      />

      <View style={styles.summary}>
        <View style={styles.summaryRow}>
          <Text style={styles.summaryLabel}>Subtotal</Text>
          <Text style={styles.summaryValue}>{formatCurrency(Number(cart?.total ?? 0))}</Text>
        </View>
        <TouchableOpacity
          style={styles.checkoutButton}
          activeOpacity={0.85}
          onPress={() => navigation.navigate(routeNames.b2bCheckout)}
        >
          <Text style={styles.checkoutText}>Proceed to Checkout</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default B2BCartScreen;
