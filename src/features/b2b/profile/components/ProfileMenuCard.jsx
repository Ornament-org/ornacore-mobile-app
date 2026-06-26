import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { ChevronRight } from 'lucide-react-native';
import { useAppTheme } from '../../../../theme/useAppTheme';

const ProfileMenuCard = ({ items }) => {
  const theme = useAppTheme();

  return (
    <View style={[styles.card, { backgroundColor: theme.surface }]}>
      {items.map(({ Icon, title, onPress }, index) => (
        <TouchableOpacity
          activeOpacity={0.78}
          key={title}
          onPress={onPress}
          style={[
            styles.row,
            index > 0 && { borderTopColor: theme.border, borderTopWidth: 1 },
          ]}
        >
          <View style={styles.iconWrap}>
            <Icon size={25} color="#C58B12" strokeWidth={1.9} />
          </View>
          <Text style={[styles.title, { color: theme.text }]}>{title}</Text>
          <ChevronRight size={24} color={theme.muted} />
        </TouchableOpacity>
      ))}
    </View>
  );
};

export default ProfileMenuCard;

const styles = StyleSheet.create({
  card: {
    marginHorizontal: 16,
    marginTop: 18,
    borderRadius: 18,
    paddingHorizontal: 16,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.06,
    shadowRadius: 18,
    elevation: 2,
  },
  row: {
    minHeight: 72,
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconWrap: {
    width: 44,
    alignItems: 'center',
    marginRight: 14,
  },
  title: {
    flex: 1,
    fontSize: 17,
    fontWeight: '600',
  },
});
