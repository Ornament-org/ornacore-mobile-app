import React from 'react';
import { Text } from 'react-native';
import { theme } from '../../theme';

const AppText = ({
  children,
  variant = 'body1',
  color,
  style,
  numberOfLines,
  textAlign = 'auto',
  onPress,
}) => {
  const getTextStyle = () => {
    const baseStyle = theme.typography[variant] || theme.typography.body1;
    
    return {
      ...baseStyle,
      color: color || theme.colors.text.primary,
      textAlign,
    };
  };

  return (
    <Text
      style={[getTextStyle(), style]}
      numberOfLines={numberOfLines}
      onPress={onPress}
    >
      {children}
    </Text>
  );
};

export default AppText;
