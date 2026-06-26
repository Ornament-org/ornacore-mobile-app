import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  FlatList,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ArrowDownLeft, ArrowUpRight, Wallet } from 'lucide-react-native';
import { useAppTheme } from '../../../../theme/useAppTheme';
import RegistrationCard from '../../component/RegistrationCard';

const TransactionsScreen = () => {
  const theme = useAppTheme();

  const transactions = [
    {
      id: '1',
      type: 'credit',
      title: 'Payment Received',
      description: 'Order #ORD-1234',
      amount: '₹45,000',
      date: 'Jun 20, 2026',
    },
    {
      id: '2',
      type: 'debit',
      title: 'Order Payment',
      description: 'Order #ORD-1235',
      amount: '₹32,500',
      date: 'Jun 18, 2026',
    },
    {
      id: '3',
      type: 'credit',
      title: 'Payment Received',
      description: 'Order #ORD-1236',
      amount: '₹28,750',
      date: 'Jun 15, 2026',
    },
    {
      id: '4',
      type: 'debit',
      title: 'Order Payment',
      description: 'Order #ORD-1237',
      amount: '₹51,200',
      date: 'Jun 12, 2026',
    },
  ];

  const renderTransaction = ({ item }) => (
    <View
      style={[
        styles.transactionItem,
        {
          backgroundColor: theme.surface,
          borderColor: theme.border,
        },
      ]}
    >
      <View
        style={[
          styles.iconContainer,
          { backgroundColor: item.type === 'credit' ? '#10B98120' : '#EF444420' },
        ]}
      >
        {item.type === 'credit' ? (
          <ArrowDownLeft size={20} color="#10B981" />
        ) : (
          <ArrowUpRight size={20} color="#EF4444" />
        )}
      </View>

      <View style={styles.transactionDetails}>
        <Text style={[styles.title, { color: theme.text }]}>
          {item.title}
        </Text>
        <Text style={[styles.description, { color: theme.muted }]}>
          {item.description}
        </Text>
        <Text style={[styles.date, { color: theme.muted }]}>
          {item.date}
        </Text>
      </View>

      <Text
        style={[
          styles.amount,
          { color: item.type === 'credit' ? '#10B981' : '#EF4444' },
        ]}
      >
        {item.type === 'credit' ? '+' : '-'}{item.amount}
      </Text>
    </View>
  );

  return (
    <SafeAreaView
      style={[
        styles.container,
        { backgroundColor: theme.background },
      ]}
    >
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}
      >
        <RegistrationCard
          title="Transactions"
          subtitle="View your payment history and ledger"
        >
          <View style={styles.balanceCard}>
            <Wallet size={24} color={theme.primary} />
            <View style={styles.balanceInfo}>
              <Text style={[styles.balanceLabel, { color: theme.muted }]}>
                Current Balance
              </Text>
              <Text style={[styles.balanceAmount, { color: theme.text }]}>
                ₹1,25,450
              </Text>
            </View>
          </View>

          <Text style={[styles.sectionTitle, { color: theme.text }]}>
            Recent Transactions
          </Text>

          <FlatList
            data={transactions}
            renderItem={renderTransaction}
            keyExtractor={item => item.id}
            scrollEnabled={false}
          />
        </RegistrationCard>
      </ScrollView>
    </SafeAreaView>
  );
};

export default TransactionsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  content: {
    paddingBottom: 40,
  },

  balanceCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8FAFC',
    borderRadius: 16,
    padding: 20,
    marginBottom: 24,
  },

  balanceInfo: {
    marginLeft: 16,
    flex: 1,
  },

  balanceLabel: {
    fontSize: 14,
    marginBottom: 4,
  },

  balanceAmount: {
    fontSize: 28,
    fontWeight: '700',
  },

  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 16,
  },

  transactionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 12,
    borderWidth: 1,
    padding: 16,
    marginBottom: 12,
  },

  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },

  transactionDetails: {
    flex: 1,
  },

  title: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },

  description: {
    fontSize: 14,
    marginBottom: 4,
  },

  date: {
    fontSize: 12,
  },

  amount: {
    fontSize: 16,
    fontWeight: '600',
  },
});
