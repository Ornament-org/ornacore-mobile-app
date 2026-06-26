import React from 'react';
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  ArrowRight,
  Gem,
  ShieldCheck,
  Store,
} from 'lucide-react-native';

import { routeNames } from '../../../navigation/routeNames';
import { useAppTheme } from '../../../theme/useAppTheme';
import { typography } from '../../../theme/typography';

const shopImage = require('../../../assets/images/jewellery-shop-landing.png');

const WelcomeScreen = ({ navigation }) => {
  const theme = useAppTheme();

  const openShopRegistration = () => {
    navigation.navigate(routeNames.shopkeeperRegister);
  };

  const openLogin = () => {
    navigation.navigate(routeNames.login);
  };

  return (
    <SafeAreaView
      style={[
        styles.container,
        { backgroundColor: '#FAF8F4' },
      ]}
    >
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}
      >
        {/* Logo */}
        <View style={styles.brandContainer}>
          <View
            style={[
              styles.logoWrapper,
              { backgroundColor: '#F5E8CF' },
            ]}
          >
            <Gem
              size={28}
              color="#C58B12"
            />
          </View>

          <Text
            style={[
              styles.brandTitle,
              { color: '#1F1F1F' },
            ]}
          >
            OrnaMent
          </Text>

          <Text
            style={[
              styles.brandSubTitle,
              { color: '#C58B12' },
            ]}
          >
            BUSINESS
          </Text>
        </View>

        {/* Hero Image */}
        <View style={styles.heroContainer}>
          <Image
            source={shopImage}
            resizeMode="contain"
            style={styles.heroImage}
          />
        </View>

        {/* Text */}
        <View style={styles.textContainer}>
          <Text style={styles.heading}>
            Register Your Shop
          </Text>

          <Text style={styles.description}>
            Join OrnaMent Business and grow your jewellery business
            with access to premium collections, wholesale pricing
            and trusted nationwide delivery.
          </Text>
        </View>

        {/* Register Button */}
        <TouchableOpacity
          activeOpacity={0.9}
          onPress={openShopRegistration}
          style={styles.primaryButton}
        >
          <Store
            size={20}
            color="#FFFFFF"
          />

          <Text style={styles.primaryButtonText}>
            Register Your Shop
          </Text>

          <ArrowRight
            size={20}
            color="#FFFFFF"
          />
        </TouchableOpacity>

        {/* Login */}
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={openLogin}
          style={styles.loginContainer}
        >
          <Text style={styles.loginText}>
            Already have an account?
          </Text>

          <Text style={styles.loginLink}>
            Sign In
          </Text>
        </TouchableOpacity>

        {/* Trust */}
        <View style={styles.trustContainer}>
          <ShieldCheck
            size={16}
            color="#C58B12"
          />

          <Text style={styles.trustText}>
            Secure & Verified Jewellery Business Platform
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default WelcomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  content: {
    paddingHorizontal: 24,
    paddingTop: 12,
    paddingBottom: 40,
  },

  brandContainer: {
    alignItems: 'center',
    marginTop: 10,
  },

  logoWrapper: {
    width: 54,
    height: 54,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },

  brandTitle: {
    marginTop: 12,
    fontSize: 30,
    lineHeight: 36,
    fontWeight: '700',
    fontFamily: typography.fontFamily.display,
  },

  brandSubTitle: {
    marginTop: 2,
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 4,
  },

  heroContainer: {
    alignItems: 'center',
    marginTop: 18,
  },

  heroImage: {
    width: '100%',
    height: 320,
  },

  textContainer: {
    alignItems: 'center',
    marginTop: 4,
    paddingHorizontal: 10,
  },

  heading: {
    fontSize: 22,
    lineHeight: 30,
    fontWeight: '700',
    textAlign: 'center',
    color: '#1F1F1F',
    fontFamily: typography.fontFamily.display,
  },

  description: {
    marginTop: 10,
    fontSize: 15,
    lineHeight: 24,
    textAlign: 'center',
    color: '#777777',
  },

  primaryButton: {
    marginTop: 30,
    height: 56,
    borderRadius: 14,
    backgroundColor: '#C58B12',

    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',

    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },

  primaryButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
    marginHorizontal: 10,
  },

  loginContainer: {
    marginTop: 18,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },

  loginText: {
    fontSize: 15,
    color: '#666666',
  },

  loginLink: {
    marginLeft: 5,
    fontSize: 15,
    fontWeight: '700',
    color: '#C58B12',
  },

  trustContainer: {
    marginTop: 28,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },

  trustText: {
    marginLeft: 8,
    fontSize: 13,
    color: '#888888',
  },
});