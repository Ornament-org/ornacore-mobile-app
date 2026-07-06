import { PermissionsAndroid, Platform } from 'react-native';
import Geolocation from '@react-native-community/geolocation';

export class LocationPermissionDeniedError extends Error {
  constructor() {
    super('Location permission was denied');
    this.name = 'LocationPermissionDeniedError';
  }
}

const requestAndroidPermission = async () => {
  const granted = await PermissionsAndroid.request(
    PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
    {
      title: 'Location permission',
      message: 'OrnaCore needs your location to auto-fill your shop address.',
      buttonPositive: 'Allow',
      buttonNegative: 'Deny',
    },
  );
  return granted === PermissionsAndroid.RESULTS.GRANTED;
};

export const ensureLocationPermission = async () => {
  if (Platform.OS === 'android') {
    const granted = await requestAndroidPermission();
    if (!granted) throw new LocationPermissionDeniedError();
    return;
  }

  // iOS: the permission prompt (backed by NSLocationWhenInUseUsageDescription)
  // is triggered automatically the first time getCurrentPosition is called.
  const authStatus = await new Promise((resolve) => {
    Geolocation.requestAuthorization(
      () => resolve('granted'),
      () => resolve('denied'),
    );
  });
  if (authStatus === 'denied') throw new LocationPermissionDeniedError();
};

export const getCurrentCoordinates = () =>
  new Promise((resolve, reject) => {
    Geolocation.getCurrentPosition(
      (position) => {
        resolve({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
      },
      (error) => reject(error),
      { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 },
    );
  });

// Reverse geocoding via OpenStreetMap's Nominatim — free and key-less, which
// keeps this feature working with zero setup since the project has no Google
// Maps / Places API key configured anywhere. Swap this for the Google
// Geocoding API later if a key becomes available and stricter accuracy or
// rate limits are needed for production volume.
export const reverseGeocode = async ({ latitude, longitude }) => {
  const url = `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${latitude}&lon=${longitude}&addressdetails=1`;
  const response = await fetch(url, {
    headers: {
      'User-Agent': 'OrnaCoreShopApp/1.0',
      Accept: 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error('Unable to resolve address for this location');
  }

  const data = await response.json();
  const address = data.address ?? {};

  const addressLine = [address.road, address.suburb || address.neighbourhood]
    .filter(Boolean)
    .join(', ') || data.display_name || '';

  return {
    addressLine,
    city: address.city || address.town || address.village || address.county || '',
    state: address.state || '',
    pincode: address.postcode || '',
  };
};

export const fetchCurrentAddress = async () => {
  await ensureLocationPermission();
  const coordinates = await getCurrentCoordinates();
  const address = await reverseGeocode(coordinates);
  return { ...address, ...coordinates };
};
