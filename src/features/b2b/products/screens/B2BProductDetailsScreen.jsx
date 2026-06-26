import React from 'react';
import ThemedPlaceholder from '../../../../components/common/ThemedPlaceholder';

const B2BProductDetailsScreen = ({ route }) => (
  <ThemedPlaceholder title="Product Details" message={`Design ID: ${route?.params?.productId}`} />
);

export default B2BProductDetailsScreen;
