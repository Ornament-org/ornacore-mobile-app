import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useAppTheme } from '../../../../theme/useAppTheme';
import ProfileInfoTile from './ProfileInfoTile';

const ProfileInfoSection = ({ title, items }) => {
  const theme = useAppTheme();

  return (
    <View style={styles.section}>
      <Text style={[styles.title, { color: theme.text }]}>{title}</Text>
      <View style={styles.grid}>
        {items.map((item) => (
          <ProfileInfoTile key={item.label} {...item} />
        ))}
      </View>
    </View>
  );
};

export default ProfileInfoSection;

const styles = StyleSheet.create({
  section: {
    marginTop: 26,
    paddingHorizontal: 16,
  },
  title: {
    fontSize: 19,
    fontWeight: '800',
    marginBottom: 16,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: 12,
  },
});
