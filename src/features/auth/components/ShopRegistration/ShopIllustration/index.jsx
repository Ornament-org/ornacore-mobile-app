import React from 'react';
import { Image, View } from 'react-native';
import { styles } from './styles';

const shopImage = require('../../../../../assets/images/jewellery-shop-landing.png');

const ShopIllustration = ({ size = 168 }) => (
  <View style={[styles.container, { width: size, height: size }]}>
    <View
      style={[
        styles.glow,
        { width: size * 1.25, height: size * 1.25, borderRadius: (size * 1.25) / 2 },
      ]}
    />
    <Image
      source={shopImage}
      resizeMode="contain"
      style={[styles.image, { width: size, height: size }]}
    />
  </View>
);

export default ShopIllustration;
