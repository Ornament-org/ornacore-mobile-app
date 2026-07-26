import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { LockKeyhole } from 'lucide-react-native';
import { useAppTheme } from '../../../../theme/useAppTheme';

const ProfileSecureCard = () => {
  const theme = useAppTheme();

  return (
    <View style={[styles.card, { backgroundColor: theme.surface, borderColor: theme.borderStrong }]}>
      <View style={styles.iconHalo}>
        <LockKeyhole size={44} color="#FFBE35" strokeWidth={1.8} />
      </View>
      <View style={styles.copy}>
        <Text style={[styles.title, { color: theme.text }]}>Your Information is Secure</Text>
        <Text style={[styles.description, { color: theme.muted }]}>
          Protected profile and transaction data.
        </Text>
      </View>
    </View>
  );
};

export default ProfileSecureCard;

const styles = StyleSheet.create({
  card: {
    marginHorizontal: 20,
    marginTop: 22,
    marginBottom: 24,
    borderWidth: 1,
    borderRadius: 24,
    paddingHorizontal: 24,
    paddingVertical: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconHalo: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: '#151719',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 14,
  },
  copy: {
    flex: 1,
  },
  title: {
    fontSize: 25,
    lineHeight: 30,
    fontWeight: '900',
    marginBottom: 7,
  },
  description: {
    fontSize: 19,
    lineHeight: 24,
  },
});
