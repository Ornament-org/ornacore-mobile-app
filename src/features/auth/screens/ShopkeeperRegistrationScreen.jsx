import React, { useState } from 'react';
import {
  Alert,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  Lock,
  Mail,
  Phone,
  MapPin,
  Store,
  User,
} from 'lucide-react-native';
import { useDispatch, useSelector } from 'react-redux';

import { useAppTheme } from '../../../theme/useAppTheme';
import AppButton from '../../../components/common/AppButton';
import { reset as resetRootNavigation } from '../../../app/navigationRef';
import { routeNames } from '../../../navigation/routeNames';
import { registerShopkeeper } from '../actions/authActions';
import FormInput from '../../b2b/component/FormInput';
import RegistrationCard from '../../b2b/component/RegistrationCard';
import RegistrationStepper from '../../b2b/component/RegistrationStepper';
import RegistrationHeader from '../../b2b/component/RegistrationHeader';
import SecurityInfoCard from '../../b2b/component/SecurityInfoCard';

const ShopRegistrationScreen = ({ navigation }) => {
  const theme = useAppTheme();
  const dispatch = useDispatch();
  const { registerLoading } = useSelector(state => state.auth);

  const [formData, setFormData] = useState({
    ownerName: '',
    shopName: '',
    mobile: '',
    email: '',
    password: '',
    address: '',
    city: '',
    state: '',
    pincode: '',
  });

  const [errors, setErrors] = useState({});

  const updateField = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value,
    }));

    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: '',
      }));
    }
  };

  const validate = () => {
    const newErrors = {};

    if (!formData.ownerName.trim()) {
      newErrors.ownerName = 'Owner name is required';
    }

    if (!formData.shopName.trim()) {
      newErrors.shopName = 'Shop name is required';
    }

    if (!formData.email.trim() && !formData.mobile.trim()) {
      newErrors.mobile = 'Enter mobile or email';
      newErrors.email = 'Enter email or mobile';
    }

    if (formData.email.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      newErrors.email = 'Enter a valid email address';
    }

    if (formData.mobile.trim() && !/^\+?[0-9]{8,15}$/.test(formData.mobile.replace(/[\s()-]/g, ''))) {
      newErrors.mobile = 'Enter a valid mobile number';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (
      formData.password.length < 8
      || !/[a-z]/.test(formData.password)
      || !/[A-Z]/.test(formData.password)
      || !/[0-9]/.test(formData.password)
    ) {
      newErrors.password = 'Use 8+ chars with upper, lower and number';
    }

    if (!formData.address.trim()) {
      newErrors.address = 'Address is required';
    }

    if (!formData.city.trim()) {
      newErrors.city = 'City is required';
    }

    if (!formData.state.trim()) {
      newErrors.state = 'State is required';
    }

    if (!formData.pincode.trim()) {
      newErrors.pincode = 'Pincode is required';
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleNext = async () => {
    if (!validate()) {
      return;
    }

    const payload = {
      ownerName: formData.ownerName.trim(),
      shopName: formData.shopName.trim(),
      password: formData.password,
      addressLine1: formData.address.trim(),
      city: formData.city.trim(),
      state: formData.state.trim(),
      pincode: formData.pincode.trim(),
    };

    if (formData.email.trim()) {
      payload.email = formData.email.trim().toLowerCase();
    }

    if (formData.mobile.trim()) {
      payload.mobile = formData.mobile.replace(/[\s()-]/g, '');
    }

    try {
      await dispatch(registerShopkeeper(payload));
      resetRootNavigation({
        index: 0,
        routes: [{
          name: routeNames.approval,
        }],
      });
    } catch (error) {
      Alert.alert(
        'Registration failed',
        error?.response?.data?.message || error?.message || 'Unable to register shop.',
      );
    }
  };

  return (
    <SafeAreaView
      style={[
        styles.container,
        {
          backgroundColor: theme.background,
        },
      ]}
    >
      <RegistrationHeader
        onBackPress={() => navigation.goBack()}
        onSupportPress={() => {}}
      />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}
      >
        <RegistrationStepper currentStep={1} />

        <RegistrationCard
          title="Shop Information"
          subtitle="Let's start with your shop details."
        >
          <FormInput
            label="Owner Name"
            placeholder="Enter owner name"
            value={formData.ownerName}
            onChangeText={value =>
              updateField('ownerName', value)
            }
            error={errors.ownerName}
            Icon={User}
          />

          <FormInput
            label="Shop Name"
            placeholder="Enter shop name"
            value={formData.shopName}
            onChangeText={value =>
              updateField('shopName', value)
            }
            error={errors.shopName}
            Icon={Store}
          />

          <FormInput
            label="Mobile Number"
            placeholder="Enter mobile number"
            keyboardType="phone-pad"
            value={formData.mobile}
            onChangeText={value =>
              updateField('mobile', value)
            }
            error={errors.mobile}
            Icon={Phone}
          />

          <FormInput
            label="Email Address"
            placeholder="Enter email address"
            keyboardType="email-address"
            autoCapitalize="none"
            value={formData.email}
            onChangeText={value =>
              updateField('email', value)
            }
            error={errors.email}
            Icon={Mail}
          />

          <FormInput
            label="Password"
            placeholder="Create password"
            value={formData.password}
            onChangeText={value =>
              updateField('password', value)
            }
            error={errors.password}
            Icon={Lock}
            secureTextEntry
            autoCapitalize="none"
          />

          <FormInput
            label="Address"
            placeholder="Enter address"
            value={formData.address}
            onChangeText={value =>
              updateField('address', value)
            }
            error={errors.address}
            Icon={MapPin}
            multiline
          />

          <FormInput
            label="City"
            placeholder="Enter city"
            value={formData.city}
            onChangeText={value =>
              updateField('city', value)
            }
            error={errors.city}
            Icon={MapPin}
          />

          <FormInput
            label="State"
            placeholder="Enter state"
            value={formData.state}
            onChangeText={value =>
              updateField('state', value)
            }
            error={errors.state}
            Icon={MapPin}
          />

          <FormInput
            label="Pincode"
            placeholder="Enter pincode"
            keyboardType="number-pad"
            value={formData.pincode}
            onChangeText={value =>
              updateField('pincode', value)
            }
            error={errors.pincode}
            Icon={MapPin}
          />

          <View style={styles.buttonWrapper}>
            <AppButton
              title="Register Shop"
              onPress={handleNext}
              loading={registerLoading}
              disabled={registerLoading}
            />
          </View>
        </RegistrationCard>

        <SecurityInfoCard />
      </ScrollView>
    </SafeAreaView>
  );
};

export default ShopRegistrationScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  content: {
    paddingBottom: 40,
  },

  buttonWrapper: {
    marginTop: 10,
  },
});
