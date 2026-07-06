import React, { useRef, useState } from 'react';
import { Animated, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { Eye, EyeOff } from 'lucide-react-native';
import { useAppTheme } from '../../../../../theme/useAppTheme';
import { createStyles } from './styles';

const AppInput = ({
  label,
  placeholder,
  value,
  onChangeText,
  onFocus,
  onBlur,
  error,
  helperText,
  Icon,
  keyboardType = 'default',
  secureTextEntry = false,
  multiline = false,
  numberOfLines = 1,
  editable = true,
  maxLength,
  autoCapitalize = 'sentences',
  returnKeyType,
  onSubmitEditing,
  RightIcon,
  onRightIconPress,
  rightIconLabel,
}) => {
  const theme = useAppTheme();
  const styles = createStyles(theme);
  const [focused, setFocused] = useState(false);
  const [hidden, setHidden] = useState(secureTextEntry);
  const focusAnim = useRef(new Animated.Value(0)).current;

  const handleFocus = (event) => {
    setFocused(true);
    Animated.timing(focusAnim, {
      toValue: 1,
      duration: 160,
      useNativeDriver: false,
    }).start();
    onFocus?.(event);
  };

  const handleBlur = (event) => {
    setFocused(false);
    Animated.timing(focusAnim, {
      toValue: 0,
      duration: 160,
      useNativeDriver: false,
    }).start();
    onBlur?.(event);
  };

  const borderColor = error
    ? theme.danger
    : focusAnim.interpolate({
        inputRange: [0, 1],
        outputRange: [theme.border, theme.primary],
      });

  return (
    <View style={styles.wrapper}>
      {label ? <Text style={styles.label}>{label}</Text> : null}

      <Animated.View
        style={[
          styles.inputContainer,
          { borderColor },
          focused && !error ? styles.inputContainerFocused : null,
          !editable ? styles.inputContainerDisabled : null,
          multiline ? styles.inputContainerMultiline : null,
        ]}
      >
        {Icon ? (
          <Icon size={19} color={error ? theme.danger : focused ? theme.primary : theme.muted} />
        ) : null}

        <TextInput
          value={value}
          editable={editable}
          maxLength={maxLength}
          multiline={multiline}
          numberOfLines={multiline ? numberOfLines : 1}
          keyboardType={keyboardType}
          secureTextEntry={hidden}
          autoCapitalize={autoCapitalize}
          placeholder={placeholder}
          placeholderTextColor={theme.muted}
          onChangeText={onChangeText}
          onFocus={handleFocus}
          onBlur={handleBlur}
          returnKeyType={returnKeyType}
          onSubmitEditing={onSubmitEditing}
          style={[
            styles.input,
            { color: editable ? theme.text : theme.muted },
            multiline ? styles.inputMultiline : null,
          ]}
        />

        {secureTextEntry ? (
          <TouchableOpacity
            accessibilityRole="button"
            accessibilityLabel={hidden ? 'Show password' : 'Hide password'}
            hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
            onPress={() => setHidden((current) => !current)}
          >
            {hidden ? (
              <EyeOff size={19} color={theme.muted} />
            ) : (
              <Eye size={19} color={theme.muted} />
            )}
          </TouchableOpacity>
        ) : null}

        {!secureTextEntry && RightIcon ? (
          <TouchableOpacity
            accessibilityRole="button"
            accessibilityLabel={rightIconLabel ?? 'Action'}
            hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
            onPress={onRightIconPress}
          >
            <RightIcon size={19} color={theme.muted} />
          </TouchableOpacity>
        ) : null}
      </Animated.View>

      {error ? (
        <Text style={styles.errorText}>{error}</Text>
      ) : helperText ? (
        <Text style={styles.helperText}>{helperText}</Text>
      ) : null}
    </View>
  );
};

export default AppInput;
