import React from 'react';
import { Text, View } from 'react-native';
import { Headset, ShieldCheck, Zap } from 'lucide-react-native';
import { useAppTheme } from '../../../../../theme/useAppTheme';
import { createStyles } from './styles';

const DEFAULT_ITEMS = [
  { Icon: ShieldCheck, label: 'Secure Registration' },
  { Icon: Zap, label: 'Fast Approval' },
  { Icon: Headset, label: '24/7 Support' },
];

const TrustCard = ({ items = DEFAULT_ITEMS }) => {
  const theme = useAppTheme();
  const styles = createStyles(theme);

  return (
    <View style={styles.container}>
      {items.map(({ Icon, label }, index) => (
        <React.Fragment key={label}>
          <View style={styles.item}>
            <View style={styles.iconBadge}>
              <Icon size={15} color={theme.primary} />
            </View>
            <Text style={styles.label}>{label}</Text>
          </View>
          {index < items.length - 1 ? <View style={styles.divider} /> : null}
        </React.Fragment>
      ))}
    </View>
  );
};

export default TrustCard;
