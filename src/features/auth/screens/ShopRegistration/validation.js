const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MOBILE_PATTERN = /^\+?[0-9]{8,15}$/;

export const PASSWORD_HELPER_TEXT = 'At least 8 characters with uppercase, lowercase and a number.';

// Mirrors the backend's password policy (src/modules/auth/auth.validation.js)
// so a submission never fails validation twice — once here, once server-side.
export const isPasswordValid = (password) =>
  password.length >= 8 &&
  /[a-z]/.test(password) &&
  /[A-Z]/.test(password) &&
  /[0-9]/.test(password);

export const validateShopRegistrationForm = (values) => {
  const errors = {};

  if (!values.ownerName.trim()) {
    errors.ownerName = 'Owner name is required';
  }

  if (!values.shopName.trim()) {
    errors.shopName = 'Shop name is required';
  }

  const mobile = values.mobile.replace(/[\s()-]/g, '');
  if (!mobile) {
    errors.mobile = 'Mobile number is required';
  } else if (!MOBILE_PATTERN.test(mobile)) {
    errors.mobile = 'Enter a valid mobile number';
  }

  if (!values.email.trim()) {
    errors.email = 'Email address is required';
  } else if (!EMAIL_PATTERN.test(values.email.trim())) {
    errors.email = 'Enter a valid email address';
  }

  if (!values.password) {
    errors.password = 'Password is required';
  } else if (!isPasswordValid(values.password)) {
    errors.password = 'Use 8+ characters with upper, lower and a number';
  }

  if (!values.address.trim()) {
    errors.address = 'Shop address is required';
  }

  if (!values.city.trim()) {
    errors.city = 'City is required';
  }

  if (!values.state.trim()) {
    errors.state = 'State is required';
  }

  if (!values.pincode.trim()) {
    errors.pincode = 'Pincode is required';
  } else if (values.pincode.trim().length < 4) {
    errors.pincode = 'Enter a valid pincode';
  }

  return errors;
};

export const buildShopRegistrationPayload = (values) => ({
  ownerName: values.ownerName.trim(),
  shopName: values.shopName.trim(),
  email: values.email.trim().toLowerCase(),
  mobile: values.mobile.replace(/[\s()-]/g, ''),
  password: values.password,
  addressLine1: values.address.trim(),
  city: values.city.trim(),
  state: values.state.trim(),
  pincode: values.pincode.trim(),
  // Captured silently via "Use current location"; omitted entirely when the
  // shop address was typed manually instead.
  ...(values.latitude != null ? { latitude: values.latitude } : null),
  ...(values.longitude != null ? { longitude: values.longitude } : null),
});
