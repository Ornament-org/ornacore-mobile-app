import React from 'react';
import {
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {
  ShieldCheck,
  LockKeyhole,
} from 'lucide-react-native';
import { useAppTheme } from '../../../theme/useAppTheme';


const SecurityInfoCard = () => {
  const theme = useAppTheme();

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: '#FFF8E8',
          borderColor: '#F3D48A',
        },
      ]}
    >
      <View style={styles.iconContainer}>
        <ShieldCheck
          size={28}
          color="#C99632"
        />
      </View>

      <View style={styles.content}>
        <Text
          style={[
            styles.title,
            {
              color: theme.text,
            },
          ]}
        >
          Your Information is Secure
        </Text>

        <Text
          style={[
            styles.description,
            {
              color: theme.muted,
            },
          ]}
        >
          We use industry-standard security practices to
          protect your business information. Your details
          will only be used for account verification and
          onboarding purposes.
        </Text>

        <View style={styles.featuresRow}>
          <View style={styles.feature}>
            <LockKeyhole
              size={14}
              color="#C99632"
            />
            <Text style={styles.featureText}>
              Encrypted
            </Text>
          </View>

          <View style={styles.feature}>
            <ShieldCheck
              size={14}
              color="#C99632"
            />
            <Text style={styles.featureText}>
              Verified
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default SecurityInfoCard;

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 16,
    marginTop: 20,
    marginBottom: 24,

    borderWidth: 1,
    borderRadius: 18,

    padding: 16,

    flexDirection: 'row',
    alignItems: 'flex-start',
  },

  iconContainer: {
    width: 44,
    height: 44,

    borderRadius: 22,

    backgroundColor: '#FFF1C7',

    alignItems: 'center',
    justifyContent: 'center',
  },

  content: {
    flex: 1,
    marginLeft: 12,
  },

  title: {
    fontSize: 15,
    fontWeight: '700',
  },

  description: {
    marginTop: 6,
    fontSize: 13,
    lineHeight: 20,
  },

  featuresRow: {
    flexDirection: 'row',
    marginTop: 12,
  },

  feature: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 16,
  },

  featureText: {
    marginLeft: 4,
    fontSize: 12,
    fontWeight: '600',
    color: '#C99632',
  },
});