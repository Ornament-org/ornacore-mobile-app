import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { ChevronRight, ShieldCheck } from 'lucide-react-native';
import { useAppTheme } from '../../../../theme/useAppTheme';

const ProfileSecureCard = () => {
  const theme = useAppTheme();

  return (
    <View style={[styles.card, { backgroundColor: theme.surface }]}>
      <View style={styles.iconHalo}>
        <ShieldCheck size={44} color="#C58B12" strokeWidth={1.8} />
      </View>
      <View style={styles.copy}>
        <Text style={styles.title}>Your Information is Secure</Text>
        <Text style={[styles.description, { color: theme.muted }]}>
          We use industry-standard security practices to protect your business information.
        </Text>
      </View>
      <ChevronRight size={24} color="#C58B12" />
    </View>
  );
};

export default ProfileSecureCard;

const styles = StyleSheet.create({
  card: {
    marginHorizontal: 16,
    marginTop: 22,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: '#F3D48A',
    borderRadius: 18,
    padding: 18,
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconHalo: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: '#FFF8E8',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 14,
  },
  copy: {
    flex: 1,
  },
  title: {
    color: '#C58B12',
    fontSize: 17,
    fontWeight: '800',
    marginBottom: 7,
  },
  description: {
    fontSize: 14,
    lineHeight: 21,
  },
});
