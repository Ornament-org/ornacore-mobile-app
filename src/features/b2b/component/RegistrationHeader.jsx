
import React from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {
  ArrowLeft,
  Headphones,
} from 'lucide-react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useAppTheme } from '../../../theme/useAppTheme';

const RegistrationHeader = ({
  title = 'Shop Registration',
  onBackPress,
  onSupportPress,
}) => {
  const theme = useAppTheme();
  const insets = useSafeAreaInsets();

  return (
    <View
      style={[
        styles.container,
        {
          paddingTop: insets.top + 12,
        },
      ]}
    >
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={onBackPress}
        style={styles.iconButton}
      >
        <ArrowLeft
          size={24}
          color="#FFFFFF"
        />
      </TouchableOpacity>

      <Text style={styles.title}>
        {title}
      </Text>

      <TouchableOpacity
        activeOpacity={0.8}
        onPress={onSupportPress}
        style={styles.iconButton}
      >
        <Headphones
          size={22}
          color="#FFFFFF"
        />
      </TouchableOpacity>
    </View>
  );
};

export default RegistrationHeader;

const styles = StyleSheet.create({
  container: {
    height: 110,
    backgroundColor: '#C99632',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 18,

    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },

  iconButton: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },

  title: {
    color: '#FFFFFF',
    fontSize: 28,
    fontWeight: '600',
  },
});
