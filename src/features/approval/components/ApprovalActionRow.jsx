import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { ChevronRight } from 'lucide-react-native';
import { useAppTheme } from '../../../theme/useAppTheme';

const ApprovalActionRow = ({ Icon, title, description, onPress }) => {
  const theme = useAppTheme();

  return (
    <TouchableOpacity
      activeOpacity={0.82}
      onPress={onPress}
      style={[styles.card, { backgroundColor: theme.surface || '#FFFFFF' }]}
    >
      <View style={styles.content}>
        <View style={styles.iconHalo}>
          <Icon size={34} color="#C58B12" strokeWidth={1.8} />
        </View>

        <View style={styles.copy}>
          <Text style={[styles.title, { color: theme.text }]}>{title}</Text>
          <Text style={[styles.description, { color: theme.muted }]}>{description}</Text>
        </View>

        <ChevronRight size={28} color={theme.muted} strokeWidth={2.5} />
      </View>
    </TouchableOpacity>
  );
};

export default ApprovalActionRow;

const styles = StyleSheet.create({
  card: {
    borderRadius: 18,
    marginHorizontal: 16,
    marginTop: 14,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.06,
    shadowRadius: 18,
    elevation: 3,
  },
  content: {
    minHeight: 118,
    paddingHorizontal: 20,
    paddingVertical: 18,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  iconHalo: {
    width: 70,
    height: 70,
    borderRadius: 35,
    borderWidth: 1,
    borderColor: '#F3D48A',
    backgroundColor: '#FFF8E8',
    alignItems: 'center',
    justifyContent: 'center',
  },
  copy: {
    flex: 1,
  },
  title: {
    fontSize: 18,
    fontWeight: '800',
    marginBottom: 8,
  },
  description: {
    fontSize: 15,
    lineHeight: 22,
  },
});
