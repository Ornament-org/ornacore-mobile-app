import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Alert,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Lock, Mail } from 'lucide-react-native';
import { useDispatch, useSelector } from 'react-redux';
import { useAppTheme } from '../../../theme/useAppTheme';
import AppButton from '../../../components/common/AppButton';
import { reset as resetRootNavigation } from '../../../app/navigationRef';
import { shopkeeperLogin } from '../actions/authActions';
import { routeNames } from '../../../navigation/routeNames';

const getShopStatusFromResponse = (response) =>
  response?.data?.user?.shopkeeper?.status
  || response?.data?.user?.shopkeeperProfile?.status
  || response?.user?.shopkeeper?.status
  || response?.user?.shopkeeperProfile?.status;

const needsApproval = (status) => [
  'PENDING_REVIEW',
  'DRAFT',
  'REJECTED',
  'SUSPENDED',
].includes(String(status || '').toUpperCase());

const LoginScreen = ({ navigation }) => {
  const theme = useAppTheme();
  const insets = useSafeAreaInsets();
  const dispatch = useDispatch();
  const { loginLoading } = useSelector((state) => state.auth);
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    if (!identifier.trim() || !password) {
      Alert.alert('Missing details', 'Enter your email/mobile and password.');
      return;
    }

    try {
      const result = await dispatch(shopkeeperLogin({ identifier: identifier.trim(), password }));
      resetRootNavigation({
        index: 0,
        routes: [{
          name: needsApproval(getShopStatusFromResponse(result))
            ? routeNames.approval
            : routeNames.b2b,
        }],
      });
    } catch (error) {
      Alert.alert(
        'Login failed',
        error?.response?.data?.message || error?.message || 'Unable to sign in.',
      );
    }
  };

  const handleShopkeeperRegister = () => {
    navigation.navigate(routeNames.shopkeeperRegister);
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <View style={[styles.content, { paddingTop: insets.top + 40 }]}>
        <Text style={[styles.title, { color: theme.text }]}>Welcome Back</Text>
        <Text style={[styles.subtitle, { color: theme.muted }]}>
          Sign in to continue to your account
        </Text>

        <View style={styles.form}>
          <View style={styles.inputGroup}>
            <Mail color={theme.muted} size={20} />
            <TextInput
              style={[styles.input, { color: theme.text }]}
              placeholder="Email or Mobile"
              placeholderTextColor={theme.muted}
              value={identifier}
              onChangeText={setIdentifier}
              keyboardType="email-address"
              autoCapitalize="none"
            />
          </View>

          <View style={styles.inputGroup}>
            <Lock color={theme.muted} size={20} />
            <TextInput
              style={[styles.input, { color: theme.text }]}
              placeholder="Password"
              placeholderTextColor={theme.muted}
              value={password}
              onChangeText={setPassword}
              secureTextEntry
            />
          </View>

          <TouchableOpacity>
            <Text style={[styles.forgotPassword, { color: theme.primary }]}>
              Forgot Password?
            </Text>
          </TouchableOpacity>

          <AppButton
            title="Sign In"
            onPress={handleLogin}
            style={styles.loginButton}
            textStyle={styles.primaryButtonText}
            disabled={loginLoading}
          />

          <TouchableOpacity onPress={handleShopkeeperRegister}>
            <Text style={[styles.registerLink, { color: theme.primary }]}>
              Register as Shopkeeper
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    marginBottom: 40,
  },
  form: {
    marginTop: 20,
  },
  inputGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
    marginBottom: 16,
    height: 48,
  },
  input: {
    flex: 1,
    marginLeft: 12,
    fontSize: 14,
  },
  forgotPassword: {
    fontSize: 14,
    textAlign: 'right',
    marginBottom: 24,
  },
  loginButton: {
    marginBottom: 16,
  },
  primaryButtonText: {
    color: 'white',
  },
  registerLink: {
    fontSize: 14,
    textAlign: 'center',
    fontWeight: '600',
  },
});

export default LoginScreen;
