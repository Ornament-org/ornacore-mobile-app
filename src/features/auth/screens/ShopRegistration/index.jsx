import React, { useRef } from 'react';
import { ActivityIndicator, Alert, Animated, Text, TouchableOpacity, View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { LocateFixed, Lock, Mail, MapPin, Phone, Store, User } from 'lucide-react-native';

import { useAppTheme } from '../../../../theme/useAppTheme';
import RegistrationHeader from '../../components/ShopRegistration/RegistrationHeader';
import RegistrationCard from '../../components/ShopRegistration/RegistrationCard';
import AppInput from '../../components/ShopRegistration/AppInput';
import TrustCard from '../../components/ShopRegistration/TrustCard';
import PrimaryButton from '../../components/ShopRegistration/PrimaryButton';
import { routeNames } from '../../../../navigation/routeNames';
import { PASSWORD_HELPER_TEXT } from './validation';
import { useShopRegistrationForm } from './hooks';
import { createStyles } from './styles';

const ShopRegistrationScreen = ({ navigation }) => {
  const theme = useAppTheme();
  const styles = createStyles(theme);
  const {
    values,
    errors,
    setField,
    submit,
    submitting,
    fetchAddressFromCurrentLocation,
    locating,
  } = useShopRegistrationForm();
  const scrollY = useRef(new Animated.Value(0)).current;

  return (
    <View style={styles.container}>
      <KeyboardAwareScrollView
        contentContainerStyle={styles.scrollContent}
        enableOnAndroid
        extraScrollHeight={24}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
        onScroll={Animated.event([{ nativeEvent: { contentOffset: { y: scrollY } } }], {
          useNativeDriver: false,
        })}
        scrollEventThrottle={16}
      >
        <RegistrationHeader
          title="Shop Registration"
          subtitle="Create your shop account"
          onBackPress={() => navigation.goBack()}
          onSupportPress={() =>
            Alert.alert('Need help?', 'Reach us anytime at support@ornacore.com')
          }
          scrollY={scrollY}
        />

        <RegistrationCard
          title="Shop Information"
          subtitle="Please fill in the details below to create your shop account."
        >
          <View style={styles.fieldsGroup}>
            <AppInput
              label="Owner Name"
              placeholder="Enter owner name"
              value={values.ownerName}
              onChangeText={setField('ownerName')}
              error={errors.ownerName}
              Icon={User}
              returnKeyType="next"
            />

            <AppInput
              label="Shop Name"
              placeholder="Enter shop name"
              value={values.shopName}
              onChangeText={setField('shopName')}
              error={errors.shopName}
              Icon={Store}
              returnKeyType="next"
            />

            <AppInput
              label="Mobile Number"
              placeholder="Enter mobile number"
              keyboardType="phone-pad"
              value={values.mobile}
              onChangeText={setField('mobile')}
              error={errors.mobile}
              Icon={Phone}
              returnKeyType="next"
            />

            <AppInput
              label="Email Address"
              placeholder="Enter email address"
              keyboardType="email-address"
              autoCapitalize="none"
              value={values.email}
              onChangeText={setField('email')}
              error={errors.email}
              Icon={Mail}
              returnKeyType="next"
            />

            <AppInput
              label="Password"
              placeholder="Create a password"
              value={values.password}
              onChangeText={setField('password')}
              error={errors.password}
              helperText={!errors.password ? PASSWORD_HELPER_TEXT : undefined}
              Icon={Lock}
              secureTextEntry
              autoCapitalize="none"
              returnKeyType="next"
            />

            <TouchableOpacity
              accessibilityRole="button"
              accessibilityLabel="Use current location"
              activeOpacity={0.75}
              disabled={locating}
              onPress={fetchAddressFromCurrentLocation}
              style={styles.locationButton}
            >
              {locating ? (
                <ActivityIndicator size="small" color={theme.primary} />
              ) : (
                <LocateFixed size={16} color={theme.primary} />
              )}
              <Text style={styles.locationButtonText}>
                {locating ? 'Fetching your location…' : 'Use current location'}
              </Text>
            </TouchableOpacity>

            <AppInput
              label="Shop Address"
              placeholder="Enter complete shop address"
              value={values.address}
              onChangeText={setField('address')}
              error={errors.address}
              Icon={MapPin}
              multiline
              numberOfLines={3}
              RightIcon={LocateFixed}
              rightIconLabel="Use current location"
              onRightIconPress={fetchAddressFromCurrentLocation}
            />

            <View style={styles.addressRow}>
              <View style={styles.addressRowItem}>
                <AppInput
                  label="City"
                  placeholder="City"
                  value={values.city}
                  onChangeText={setField('city')}
                  error={errors.city}
                  returnKeyType="next"
                />
              </View>
              <View style={styles.addressRowItem}>
                <AppInput
                  label="State"
                  placeholder="State"
                  value={values.state}
                  onChangeText={setField('state')}
                  error={errors.state}
                  returnKeyType="next"
                />
              </View>
            </View>

            <AppInput
              label="Pincode"
              placeholder="Enter pincode"
              keyboardType="number-pad"
              maxLength={6}
              value={values.pincode}
              onChangeText={setField('pincode')}
              error={errors.pincode}
              returnKeyType="done"
              onSubmitEditing={submit}
            />
          </View>

          <TrustCard />

          <View style={styles.buttonWrapper}>
            <PrimaryButton
              title="Register Shop"
              icon={Store}
              onPress={submit}
              loading={submitting}
            />
          </View>
        </RegistrationCard>

        <View style={styles.footer}>
          <Text style={styles.footerText}>Already have an account?</Text>
          <TouchableOpacity onPress={() => navigation.navigate(routeNames.login)}>
            <Text style={styles.footerLink}>Login</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAwareScrollView>
    </View>
  );
};

export default ShopRegistrationScreen;
