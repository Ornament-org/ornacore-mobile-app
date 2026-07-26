import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { ChevronRight } from 'lucide-react-native';
import { useAppTheme } from '../../../../theme/useAppTheme';

const ProfileMenuCard = ({ items }) => {
  const theme = useAppTheme();

  return (
    <View style={[styles.card, { backgroundColor: theme.surface, borderColor: theme.borderStrong }]}>
      {items.map(({ Icon, title, description, onPress, active }) => (
        <TouchableOpacity
          activeOpacity={0.78}
          key={title}
          onPress={onPress}
          style={[
            styles.row,
            active && styles.activeRow,
          ]}
        >
          <View style={styles.iconWrap}>
            <Icon size={32} color="#FFBE35" strokeWidth={2} />
          </View>
          <View style={styles.copy}>
            <Text style={[styles.title, { color: theme.text }]}>{title}</Text>
            {description ? (
              <Text style={[styles.description, { color: theme.muted }]} numberOfLines={2}>
                {description}
              </Text>
            ) : null}
          </View>
          <ChevronRight size={24} color={theme.muted} />
        </TouchableOpacity>
      ))}
    </View>
  );
};

export default ProfileMenuCard;

const styles = StyleSheet.create({
  card: {
    marginHorizontal: 20,
    marginTop: 20,
    borderRadius: 24,
    borderWidth: 1,
    padding: 10,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.06,
    shadowRadius: 18,
    elevation: 2,
  },
  row: {
    minHeight: 108,
    borderRadius: 18,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
  },
  activeRow: {
    borderWidth: 1,
    borderColor: '#8A6419',
    backgroundColor: '#352915',
  },
  iconWrap: {
    width: 76,
    height: 76,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#6E4E0E',
    backgroundColor: '#151719',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 18,
  },
  copy: {
    flex: 1,
    paddingRight: 10,
  },
  title: {
    fontSize: 26,
    lineHeight: 31,
    fontWeight: '900',
  },
  description: {
    marginTop: 5,
    fontSize: 19,
    lineHeight: 24,
  },
});
