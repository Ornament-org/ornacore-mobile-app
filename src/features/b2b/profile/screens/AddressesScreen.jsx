import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MapPin, Plus, Edit2, Trash2 } from 'lucide-react-native';
import { useAppTheme } from '../../../../theme/useAppTheme';
import AppButton from '../../../../components/common/AppButton';
import RegistrationCard from '../../component/RegistrationCard';

const AddressesScreen = () => {
  const theme = useAppTheme();

  const addresses = [
    {
      id: '1',
      label: 'Primary',
      contactName: 'John Doe',
      contactMobile: '+91 98765 43210',
      addressLine1: '123 Jewelry Street',
      addressLine2: 'Shop No. 45',
      city: 'Mumbai',
      state: 'Maharashtra',
      pincode: '400001',
      country: 'India',
      isPrimary: true,
    },
    {
      id: '2',
      label: 'Warehouse',
      contactName: 'John Doe',
      contactMobile: '+91 98765 43210',
      addressLine1: '456 Industrial Area',
      addressLine2: 'Unit 12',
      city: 'Mumbai',
      state: 'Maharashtra',
      pincode: '400002',
      country: 'India',
      isPrimary: false,
    },
  ];

  const renderAddress = ({ item }) => (
    <View
      style={[
        styles.addressItem,
        {
          backgroundColor: theme.surface,
          borderColor: theme.border,
        },
      ]}
    >
      <View style={styles.addressHeader}>
        <View style={styles.labelContainer}>
          <MapPin size={16} color={theme.primary} />
          <Text style={[styles.label, { color: theme.primary }]}>
            {item.label}
          </Text>
          {item.isPrimary && (
            <View style={[styles.primaryBadge, { backgroundColor: theme.primary + '20' }]}>
              <Text style={[styles.primaryText, { color: theme.primary }]}>
                Primary
              </Text>
            </View>
          )}
        </View>
        
        <View style={styles.actionButtons}>
          <TouchableOpacity style={styles.actionButton}>
            <Edit2 size={18} color={theme.muted} />
          </TouchableOpacity>
          {!item.isPrimary && (
            <TouchableOpacity style={styles.actionButton}>
              <Trash2 size={18} color={theme.muted} />
            </TouchableOpacity>
          )}
        </View>
      </View>

      <View style={styles.addressDetails}>
        <Text style={[styles.contactName, { color: theme.text }]}>
          {item.contactName}
        </Text>
        <Text style={[styles.contactMobile, { color: theme.muted }]}>
          {item.contactMobile}
        </Text>
        <Text style={[styles.addressLine, { color: theme.text }]}>
          {item.addressLine1}
        </Text>
        {item.addressLine2 && (
          <Text style={[styles.addressLine, { color: theme.text }]}>
            {item.addressLine2}
          </Text>
        )}
        <Text style={[styles.addressLine, { color: theme.text }]}>
          {item.city}, {item.state} - {item.pincode}
        </Text>
        <Text style={[styles.country, { color: theme.muted }]}>
          {item.country}
        </Text>
      </View>
    </View>
  );

  const handleAddAddress = () => {
    console.log('Add new address');
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
          title="Addresses"
          subtitle="Manage your shipping and billing addresses"
        >
          <FlatList
            data={addresses}
            renderItem={renderAddress}
            keyExtractor={item => item.id}
            scrollEnabled={false}
          />

          <View style={styles.addButtonWrapper}>
            <AppButton
              title="Add New Address"
              onPress={handleAddAddress}
              icon={<Plus size={20} color="#FFFFFF" />}
            />
          </View>
        </RegistrationCard>
      </ScrollView>
    </SafeAreaView>
  );
};

export default AddressesScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  content: {
    paddingBottom: 40,
  },

  addressItem: {
    borderRadius: 12,
    borderWidth: 1,
    padding: 16,
    marginBottom: 12,
  },

  addressHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },

  labelContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  label: {
    fontSize: 14,
    fontWeight: '600',
    marginLeft: 6,
    marginRight: 8,
  },

  primaryBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },

  primaryText: {
    fontSize: 10,
    fontWeight: '600',
  },

  actionButtons: {
    flexDirection: 'row',
  },

  actionButton: {
    padding: 8,
    marginLeft: 4,
  },

  addressDetails: {
    paddingLeft: 22,
  },

  contactName: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },

  contactMobile: {
    fontSize: 14,
    marginBottom: 8,
  },

  addressLine: {
    fontSize: 14,
    lineHeight: 20,
  },

  country: {
    fontSize: 14,
    marginTop: 4,
  },

  addButtonWrapper: {
    marginTop: 20,
  },
});
