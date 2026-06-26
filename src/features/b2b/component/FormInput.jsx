import React from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { useAppTheme } from '../../../theme/useAppTheme';


const FormInput = ({
  label,
  placeholder,
  value,
  onChangeText,
  error,
  Icon,
  keyboardType = 'default',
  secureTextEntry = false,
  multiline = false,
  numberOfLines = 1,
  editable = true,
  maxLength,
  autoCapitalize = 'sentences',
}) => {
  const theme = useAppTheme();

  return (
    <View style={styles.wrapper}>
      {label ? (
        <Text
          style={[
            styles.label,
            { color: theme.text },
          ]}
        >
          {label}
        </Text>
      ) : null}

      <View
        style={[
          styles.inputContainer,
          {
            borderColor: error
              ? '#E5484D'
              : theme.border,
            backgroundColor:
              theme.surface || '#FFFFFF',
          },
        ]}
      >
        {Icon ? (
          <Icon
            size={18}
            color={theme.muted}
          />
        ) : null}

        <TextInput
          value={value}
          editable={editable}
          maxLength={maxLength}
          multiline={multiline}
          numberOfLines={numberOfLines}
          keyboardType={keyboardType}
          secureTextEntry={secureTextEntry}
          autoCapitalize={autoCapitalize}
          placeholder={placeholder}
          placeholderTextColor={theme.muted}
          onChangeText={onChangeText}
          style={[
            styles.input,
            {
              color: theme.text,
              height: multiline
                ? 100
                : undefined,
            },
          ]}
        />
      </View>

      {error ? (
        <Text style={styles.errorText}>
          {error}
        </Text>
      ) : null}
    </View>
  );
};

export default FormInput;

const styles = StyleSheet.create({
  wrapper: {
    marginBottom: 18,
  },

  label: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 8,
  },

  inputContainer: {
    minHeight: 54,

    borderWidth: 1,
    borderRadius: 14,

    paddingHorizontal: 14,

    flexDirection: 'row',
    alignItems: 'center',
  },

  input: {
    flex: 1,

    marginLeft: 10,

    fontSize: 15,

    paddingVertical: 0,
  },

  errorText: {
    color: '#E5484D',
    fontSize: 12,
    marginTop: 6,
    marginLeft: 2,
  },
});