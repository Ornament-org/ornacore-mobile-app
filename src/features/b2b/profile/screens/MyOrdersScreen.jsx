import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  FlatList,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Package, Clock, CheckCircle, XCircle } from 'lucide-react-native';
import { useAppTheme } from '../../../../theme/useAppTheme';
import RegistrationCard from '../../component/RegistrationCard';

const MyOrdersScreen = () => {
  const theme = useAppTheme();

  const orders = [
    {
      id: 'ORD-1234',
      status: 'confirmed',
      title: 'Gold Necklace Set',
      items: 5,
      amount: '₹45,000',
      date: 'Jun 20, 2026',
    },
    {
      id: 'ORD-1235',
      status: 'pending',
      title: 'Silver Earrings Collection',
      items: 12,
      amount: '₹32,500',
      date: 'Jun 18, 2026',
    },
    {
      id: 'ORD-1236',
      status: 'delivered',
      title: 'Diamond Ring Set',
      items: 3,
      amount: '₹28,750',
      date: 'Jun 15, 2026',
    },
    {
      id: 'ORD-1237',
      status: 'cancelled',
      title: 'Gold Bangles',
      items: 8,
      amount: '₹51,200',
      date: 'Jun 12, 2026',
    },
  ];

  const getStatusConfig = (status) => {
    switch (status) {
      case 'confirmed':
        return { icon: CheckCircle, color: '#10B981', label: 'Confirmed' };
      case 'pending':
        return { icon: Clock, color: '#F59E0B', label: 'Pending' };
      case 'delivered':
        return { icon: CheckCircle, color: '#10B981', label: 'Delivered' };
      case 'cancelled':
        return { icon: XCircle, color: '#EF4444', label: 'Cancelled' };
      default:
        return { icon: Package, color: '#6B7280', label: status };
    }
  };

  const renderOrder = ({ item }) => {
    const statusConfig = getStatusConfig(item.status);
    const StatusIcon = statusConfig.icon;

    return (
      <View
        style={[
          styles.orderItem,
          {
            backgroundColor: theme.surface,
            borderColor: theme.border,
          },
        ]}
      >
        <View
          style={[
            styles.iconContainer,
            { backgroundColor: statusConfig.color + '20' },
          ]}
        >
          <Package size={20} color={statusConfig.color} />
        </View>

        <View style={styles.orderDetails}>
          <Text style={[styles.title, { color: theme.text }]}>
            {item.title}
          </Text>
          <Text style={[styles.orderId, { color: theme.muted }]}>
            {item.id}
          </Text>
          <Text style={[styles.items, { color: theme.muted }]}>
            {item.items} items • {item.date}
          </Text>
        </View>

        <View style={styles.statusContainer}>
          <StatusIcon size={16} color={statusConfig.color} />
          <Text
            style={[styles.status, { color: statusConfig.color }]}
          >
            {statusConfig.label}
          </Text>
        </View>

        <Text style={[styles.amount, { color: theme.text }]}>
          {item.amount}
        </Text>
      </View>
    );
  };

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
          title="My Orders"
          subtitle="Track and manage your orders"
        >
          <FlatList
            data={orders}
            renderItem={renderOrder}
            keyExtractor={item => item.id}
            scrollEnabled={false}
          />
        </RegistrationCard>
      </ScrollView>
    </SafeAreaView>
  );
};

export default MyOrdersScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  content: {
    paddingBottom: 40,
  },

  orderItem: {
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

  orderDetails: {
    flex: 1,
  },

  title: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },

  orderId: {
    fontSize: 12,
    marginBottom: 4,
  },

  items: {
    fontSize: 14,
  },

  statusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 12,
  },

  status: {
    fontSize: 12,
    fontWeight: '600',
    marginLeft: 4,
  },

  amount: {
    fontSize: 16,
    fontWeight: '600',
  },
});
