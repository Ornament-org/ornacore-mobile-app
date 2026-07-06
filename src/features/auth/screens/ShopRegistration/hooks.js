import { useState } from 'react';
import { Alert, Linking, Platform } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { reset as resetRootNavigation } from '../../../../app/navigationRef';
import { routeNames } from '../../../../navigation/routeNames';
import {
  fetchCurrentAddress,
  LocationPermissionDeniedError,
} from '../../../../services/locationService';
import { registerShopkeeper } from '../../actions/authActions';
import { buildShopRegistrationPayload, validateShopRegistrationForm } from './validation';

const INITIAL_VALUES = {
  ownerName: '',
  shopName: '',
  mobile: '',
  email: '',
  password: '',
  address: '',
  city: '',
  state: '',
  pincode: '',
  // Captured silently from "Use current location" — sent to the backend but
  // never rendered as a field.
  latitude: null,
  longitude: null,
};

export const useShopRegistrationForm = () => {
  const dispatch = useDispatch();
  const registerLoading = useSelector((state) => state.auth.registerLoading);

  const [values, setValues] = useState(INITIAL_VALUES);
  const [errors, setErrors] = useState({});
  const [locating, setLocating] = useState(false);

  const setField = (field) => (value) => {
    setValues((current) => ({
      ...current,
      [field]: value,
      // A manual edit to the address text means it may no longer match the
      // coordinates we captured, so drop them rather than send stale data.
      ...(field === 'address' ? { latitude: null, longitude: null } : null),
    }));
    setErrors((current) => (current[field] ? { ...current, [field]: '' } : current));
  };

  const fetchAddressFromCurrentLocation = async () => {
    if (locating) return;
    setLocating(true);
    try {
      const address = await fetchCurrentAddress();
      setValues((current) => ({
        ...current,
        address: address.addressLine || current.address,
        city: address.city || current.city,
        state: address.state || current.state,
        pincode: address.pincode || current.pincode,
        latitude: address.latitude ?? current.latitude,
        longitude: address.longitude ?? current.longitude,
      }));
      setErrors((current) => ({
        ...current,
        address: '',
        city: address.city ? '' : current.city,
        state: address.state ? '' : current.state,
        pincode: address.pincode ? '' : current.pincode,
      }));
    } catch (error) {
      if (error instanceof LocationPermissionDeniedError) {
        Alert.alert(
          'Location permission needed',
          'Allow location access to auto-fill your shop address, or enter it manually.',
          [
            { text: 'Enter manually', style: 'cancel' },
            {
              text: 'Open Settings',
              onPress: () =>
                Platform.OS === 'ios' ? Linking.openURL('app-settings:') : Linking.openSettings(),
            },
          ],
        );
      } else {
        Alert.alert(
          'Could not fetch location',
          error?.message || 'Please enter your shop address manually.',
        );
      }
    } finally {
      setLocating(false);
    }
  };

  const submit = async () => {
    const validationErrors = validateShopRegistrationForm(values);
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length > 0) return;

    try {
      await dispatch(registerShopkeeper(buildShopRegistrationPayload(values)));
      resetRootNavigation({
        index: 0,
        routes: [{ name: routeNames.approval }],
      });
    } catch (error) {
      Alert.alert(
        'Registration failed',
        error?.response?.data?.message || error?.message || 'Unable to register shop.',
      );
    }
  };

  return {
    values,
    errors,
    setField,
    submit,
    submitting: registerLoading,
    fetchAddressFromCurrentLocation,
    locating,
  };
};
