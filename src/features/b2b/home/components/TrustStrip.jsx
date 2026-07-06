import React, { useMemo } from 'react';
import { Text, View } from 'react-native';
import { Building2, Headphones, Lock, ShieldCheck } from 'lucide-react-native';
import { useAppTheme } from '../../../../theme/useAppTheme';
import { createStyles } from './TrustStrip.styles';

const items = [
  { Icon: ShieldCheck, title: 'BIS Hallmarked', copy: 'Certified Jewellery' },
  { Icon: Lock, title: 'Secure Payments', copy: '100% Safe & Secure' },
  { Icon: Building2, title: 'B2B Trusted', copy: 'For Jewellery Business' },
  { Icon: Headphones, title: 'Live Support', copy: "We're Here to Help" },
];

const TrustStrip = () => {
  const theme = useAppTheme();
  const styles = useMemo(() => createStyles(theme), [theme]);

  return (
    <View style={styles.strip}>
      {items.map(({ Icon, title, copy }, index) => (
        <View key={title} style={[styles.item, index > 0 && styles.divider]}>
          <Icon color={theme.primary} size={22} strokeWidth={1.8} style={styles.icon} />
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.copy}>{copy}</Text>
        </View>
      ))}
    </View>
  );
};

export default TrustStrip;
