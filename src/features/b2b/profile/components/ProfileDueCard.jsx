import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { ChevronRight, WalletCards } from 'lucide-react-native';
import { useAppTheme } from '../../../../theme/useAppTheme';

const ProfileDueCard = ({ dueAmount, metalName = 'Gold', onPress, embedded = false }) => {
  const theme = useAppTheme();
  const Container = onPress ? TouchableOpacity : View;

  return (
    <Container
      activeOpacity={0.84}
      onPress={onPress}
      style={[
        styles.card,
        embedded && styles.embeddedCard,
        {
          backgroundColor: theme.surface,
          borderColor: theme.primaryDark,
        },
      ]}
    >
      <View style={styles.iconWrap}>
        <WalletCards size={26} color="#FFBE35" strokeWidth={2} />
      </View>

      <View style={styles.copy}>
        <Text style={[styles.label, { color: theme.muted }]}>Current Due</Text>
        <Text style={[styles.value, { color: theme.text }]} numberOfLines={1}>
          {dueAmount}
        </Text>
        <Text style={[styles.hint, { color: theme.muted }]} numberOfLines={1}>
          {metalName} balance from transactions
        </Text>
      </View>

      {onPress ? <ChevronRight size={24} color={theme.muted} /> : null}
    </Container>
  );
};

export default ProfileDueCard;

const styles = StyleSheet.create({
  card: {
    minHeight: 92,
    marginHorizontal: 20,
    marginTop: 16,
    borderRadius: 18,
    borderWidth: 1,
    paddingHorizontal: 16,
    paddingVertical: 14,
    flexDirection: 'row',
    alignItems: 'center',
  },
  embeddedCard: {
    marginHorizontal: 0,
    marginTop: 0,
    marginBottom: 22,
  },
  iconWrap: {
    width: 54,
    height: 54,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#7A550E',
    backgroundColor: '#181512',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 14,
  },
  copy: {
    flex: 1,
  },
  label: {
    fontSize: 14,
    fontWeight: '700',
    marginBottom: 3,
  },
  value: {
    fontSize: 24,
    fontWeight: '900',
  },
  hint: {
    marginTop: 2,
    fontSize: 13,
  },
});
