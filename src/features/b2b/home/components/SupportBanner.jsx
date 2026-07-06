import React, { useMemo } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { MessageCircle } from 'lucide-react-native';
import { useAppTheme } from '../../../../theme/useAppTheme';
import { createStyles } from './SupportBanner.styles';

const SupportBanner = ({ onContact, onWhatsApp }) => {
  const theme = useAppTheme();
  const styles = useMemo(() => createStyles(theme), [theme]);

  return (
    <View style={styles.card}>
      <View style={styles.copyBlock}>
        <Text style={styles.title}>Need help finding something?</Text>
        <Text style={styles.copy}>Our team is here to assist you</Text>
      </View>

      <TouchableOpacity style={styles.contactButton} activeOpacity={0.8} onPress={onContact}>
        <Text style={styles.contactText}>Contact Support</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.whatsappButton} activeOpacity={0.85} onPress={onWhatsApp}>
        <MessageCircle color={theme.white} size={20} fill={theme.white} />
      </TouchableOpacity>
    </View>
  );
};

export default SupportBanner;
