import React, { useMemo } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { Minus, Plus } from 'lucide-react-native';
import { useAppTheme } from '../../theme/useAppTheme';
import { createStyles } from './QuantityStepper.styles';

const QuantityStepper = ({ value, min = 1, step = 1, onChange }) => {
  const theme = useAppTheme();
  const styles = useMemo(() => createStyles(theme), [theme]);
  const atMin = value <= min;

  return (
    <View style={styles.row}>
      <TouchableOpacity
        style={[styles.button, atMin && styles.buttonDisabled]}
        activeOpacity={0.75}
        disabled={atMin}
        onPress={() => onChange(Math.max(min, value - step))}
      >
        <Minus color={theme.text} size={15} />
      </TouchableOpacity>
      <Text style={styles.value}>{value}</Text>
      <TouchableOpacity
        style={styles.button}
        activeOpacity={0.75}
        onPress={() => onChange(value + step)}
      >
        <Plus color={theme.text} size={15} />
      </TouchableOpacity>
    </View>
  );
};

export default QuantityStepper;
