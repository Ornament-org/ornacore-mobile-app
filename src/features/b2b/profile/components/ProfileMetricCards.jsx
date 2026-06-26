import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { ArrowUpRight, ChevronRight, CreditCard, ShieldCheck, Wallet } from 'lucide-react-native';
import { useAppTheme } from '../../../../theme/useAppTheme';

const OverviewMetric = ({ Icon, label, value, tone }) => (
  <View style={styles.metric}>
    <View style={[styles.metricIcon, { backgroundColor: tone.soft }]}>
      <Icon size={24} color={tone.color} strokeWidth={2.1} />
    </View>
    <Text style={styles.metricLabel}>{label}</Text>
    <Text style={[styles.metricValue, { color: tone.color }]} numberOfLines={1}>
      {value}
    </Text>
  </View>
);

const ProfileMetricCards = ({
  dueAmount,
  delivered,
  received,
  metalName,
  onBalancePress,
}) => {
  const theme = useAppTheme();

  return (
    <>
      <TouchableOpacity
        activeOpacity={0.85}
        onPress={onBalancePress}
        style={[styles.balanceCard, { backgroundColor: theme.surface, borderColor: '#F3D48A' }]}
      >
        <View style={styles.balanceIcon}>
          <Wallet size={40} color="#C58B12" strokeWidth={1.8} />
        </View>
        <View style={styles.balanceCopy}>
          <Text style={[styles.balanceLabel, { color: theme.muted }]}>Current Due</Text>
          <Text style={styles.balanceValue}>{dueAmount}</Text>
          <Text style={[styles.balanceHint, { color: theme.muted }]}>
            Current {metalName} balance from ledger entries
          </Text>
        </View>
        <ChevronRight size={28} color="#C58B12" />
      </TouchableOpacity>

      <View style={[styles.overviewCard, { backgroundColor: theme.surface }]}>
        <Text style={[styles.overviewTitle, { color: theme.text }]}>Account Overview</Text>
        <View style={styles.metricsRow}>
          <OverviewMetric
            Icon={ArrowUpRight}
            label="Total Delivered"
            value={delivered}
            tone={{ color: '#0C8A4B', soft: '#E7F7EF' }}
          />
          <View style={[styles.divider, { backgroundColor: theme.border }]} />
          <OverviewMetric
            Icon={ShieldCheck}
            label="Total Received"
            value={received}
            tone={{ color: '#1565C0', soft: '#EAF3FF' }}
          />
          <View style={[styles.divider, { backgroundColor: theme.border }]} />
          <OverviewMetric
            Icon={CreditCard}
            label="Current Due"
            value={dueAmount}
            tone={{ color: '#C58B12', soft: '#FFF8E8' }}
          />
        </View>
      </View>
    </>
  );
};

export default ProfileMetricCards;

const styles = StyleSheet.create({
  balanceCard: {
    minHeight: 122,
    marginHorizontal: 16,
    marginTop: 22,
    borderRadius: 18,
    borderWidth: 1,
    padding: 18,
    flexDirection: 'row',
    alignItems: 'center',
  },
  balanceIcon: {
    width: 76,
    height: 76,
    borderRadius: 38,
    backgroundColor: '#FFF1D7',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  balanceCopy: {
    flex: 1,
  },
  balanceLabel: {
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 4,
  },
  balanceValue: {
    color: '#C58B12',
    fontSize: 30,
    fontWeight: '900',
  },
  balanceHint: {
    marginTop: 3,
    fontSize: 14,
  },
  overviewCard: {
    marginHorizontal: 16,
    marginTop: 16,
    borderRadius: 18,
    padding: 16,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.05,
    shadowRadius: 16,
    elevation: 2,
  },
  overviewTitle: {
    fontSize: 18,
    fontWeight: '800',
    marginBottom: 16,
  },
  metricsRow: {
    flexDirection: 'row',
    alignItems: 'stretch',
  },
  metric: {
    flex: 1,
    alignItems: 'center',
  },
  metricIcon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },
  metricLabel: {
    color: '#686868',
    textAlign: 'center',
    fontSize: 12,
    minHeight: 34,
  },
  metricValue: {
    fontSize: 16,
    fontWeight: '900',
  },
  divider: {
    width: 1,
    marginHorizontal: 6,
  },
});
