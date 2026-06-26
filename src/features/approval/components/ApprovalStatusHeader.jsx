import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { ArrowLeft, CircleHelp } from 'lucide-react-native';
import { useAppTheme } from '../../../theme/useAppTheme';

const ApprovalStatusHeader = ({ onBackPress, onSupportPress }) => {
  const theme = useAppTheme();

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: theme.surface || '#FFFFFF',
          borderBottomColor: theme.border,
        },
      ]}
    >
      <TouchableOpacity
        activeOpacity={0.75}
        onPress={onBackPress}
        style={styles.iconButton}
      >
        <ArrowLeft size={30} color={theme.text} strokeWidth={2.8} />
      </TouchableOpacity>

      <Text style={[styles.title, { color: theme.text }]}>Shop Approval Status</Text>

      <TouchableOpacity
        activeOpacity={0.75}
        onPress={onSupportPress}
        style={styles.iconButton}
      >
        <CircleHelp size={28} color={theme.text} strokeWidth={2.2} />
      </TouchableOpacity>
    </View>
  );
};

export default ApprovalStatusHeader;

const styles = StyleSheet.create({
  container: {
    minHeight: 78,
    borderBottomWidth: 1,
    paddingHorizontal: 18,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  iconButton: {
    width: 44,
    height: 44,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    flex: 1,
    textAlign: 'center',
    fontSize: 22,
    fontWeight: '800',
  },
});
