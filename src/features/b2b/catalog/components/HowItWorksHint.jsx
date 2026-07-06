import React, { useMemo } from 'react';
import { Text, View } from 'react-native';
import { Lightbulb } from 'lucide-react-native';
import { useAppTheme } from '../../../../theme/useAppTheme';
import { createStyles } from './HowItWorksHint.styles';

const HowItWorksHint = () => {
  const theme = useAppTheme();
  const styles = useMemo(() => createStyles(theme), [theme]);

  return (
    <View style={styles.card}>
      <View style={styles.iconWrap}>
        <Lightbulb color={theme.primary} size={14} />
      </View>
      <View style={styles.body}>
        <Text style={styles.title}>How it works?</Text>
        <Text style={styles.copy}>
          Select a sub category to explore more. If a sub category has more categories, new
          options will appear here. Products will be shown below.
        </Text>
      </View>
    </View>
  );
};

export default HowItWorksHint;
