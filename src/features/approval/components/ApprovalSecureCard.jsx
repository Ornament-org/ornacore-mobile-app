import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { ShieldCheck } from 'lucide-react-native';
import { useAppTheme } from '../../../theme/useAppTheme';

const ApprovalSecureCard = () => {
  const theme = useAppTheme();

  return (
    <View style={[styles.card, { backgroundColor: theme.surface || '#FFFFFF' }]}>
      <View style={styles.iconWrap}>
        <ShieldCheck size={58} color="#C58B12" strokeWidth={1.7} />
      </View>

      <View style={styles.copy}>
        <Text style={styles.title}>Your Information is Secure</Text>
        <Text style={[styles.description, { color: theme.muted }]}>
          We use industry-standard security practices to protect your business information.
        </Text>
      </View>
    </View>
  );
};

export default ApprovalSecureCard;

const styles = StyleSheet.create({
  card: {
    borderWidth: 1,
    borderColor: '#F3D48A',
    borderRadius: 16,
    marginHorizontal: 16,
    marginTop: 24,
    marginBottom: 28,
    paddingHorizontal: 22,
    paddingVertical: 22,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 18,
  },
  iconWrap: {
    width: 82,
    alignItems: 'center',
  },
  copy: {
    flex: 1,
  },
  title: {
    color: '#C58B12',
    fontSize: 18,
    fontWeight: '800',
    marginBottom: 10,
  },
  description: {
    fontSize: 15,
    lineHeight: 23,
  },
});
