import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useAppTheme } from '../../../../theme/useAppTheme';

const ProfileInfoTile = ({ Icon, label, value, wide = false, tone = '#C58B12' }) => {
  const theme = useAppTheme();

  return (
    <View
      style={[
        styles.tile,
        wide && styles.wide,
        {
          backgroundColor: theme.surface,
          borderColor: theme.border,
        },
      ]}
    >
      <View style={styles.content}>
        <View style={styles.iconHalo}>
          <Icon size={22} color={tone} strokeWidth={1.9} />
        </View>
        <View style={styles.copy}>
          <Text style={[styles.label, { color: theme.muted }]}>{label}</Text>
          <Text style={[styles.value, { color: theme.text }]}>{value || 'Not added'}</Text>
        </View>
      </View>
    </View>
  );
};

export default ProfileInfoTile;

const styles = StyleSheet.create({
  tile: {
    width: '48.3%',
    minHeight: 104,
    borderWidth: 1,
    borderRadius: 16,
    padding: 14,
    justifyContent: 'center',
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.04,
    shadowRadius: 14,
    elevation: 1,
  },
  wide: {
    width: '100%',
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconHalo: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#FFF8E8',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 13,
  },
  copy: {
    flex: 1,
  },
  label: {
    fontSize: 13,
    marginBottom: 8,
  },
  value: {
    fontSize: 15,
    lineHeight: 21,
    fontWeight: '500',
  },
});
