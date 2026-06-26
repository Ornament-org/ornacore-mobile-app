import React from 'react';
import {
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { useAppTheme } from '../../../theme/useAppTheme';

const RegistrationCard = ({
  title,
  subtitle,
  children,
}) => {
  const theme = useAppTheme();

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: theme.surface || '#FFFFFF',
        },
      ]}
    >
      {(title || subtitle) && (
        <View style={styles.header}>
          {title ? (
            <Text
              style={[
                styles.title,
                { color: theme.text },
              ]}
            >
              {title}
            </Text>
          ) : null}

          {subtitle ? (
            <Text
              style={[
                styles.subtitle,
                { color: theme.muted },
              ]}
            >
              {subtitle}
            </Text>
          ) : null}
        </View>
      )}

      {children}
    </View>
  );
};

export default RegistrationCard;

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 16,
    marginTop: 20,

    borderRadius: 24,

    paddingHorizontal: 20,
    paddingVertical: 20,

    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.08,
    shadowRadius: 10,

    elevation: 4,
  },

  header: {
    marginBottom: 20,
  },

  title: {
    fontSize: 22,
    fontWeight: '700',
  },

  subtitle: {
    marginTop: 6,
    fontSize: 14,
    lineHeight: 22,
  },
});
