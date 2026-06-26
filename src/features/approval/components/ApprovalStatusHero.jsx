import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { AlertTriangle, CheckCircle2, Clock3, Hourglass } from 'lucide-react-native';
import { useAppTheme } from '../../../theme/useAppTheme';
import ApprovalTimeline from './ApprovalTimeline';

const toneColors = {
  warning: {
    accent: '#C58B12',
    soft: '#FFF8E8',
    border: '#F3D48A',
  },
  success: {
    accent: '#248A3D',
    soft: '#ECFDF3',
    border: '#B7E4C7',
  },
  danger: {
    accent: '#C2410C',
    soft: '#FFF4ED',
    border: '#FDBA8C',
  },
};

const getHeroIcon = (tone) => {
  if (tone === 'success') return CheckCircle2;
  if (tone === 'danger') return AlertTriangle;
  return Hourglass;
};

const ApprovalStatusHero = ({ content, steps, submittedDate }) => {
  const theme = useAppTheme();
  const colors = toneColors[content.tone] || toneColors.warning;
  const HeroIcon = getHeroIcon(content.tone);

  return (
    <View style={[styles.card, { borderColor: colors.border, backgroundColor: theme.surface || '#FFFFFF' }]}>
      <View style={styles.topRow}>
        <View style={[styles.iconHalo, { backgroundColor: colors.soft, borderColor: colors.border }]}>
          <HeroIcon size={54} color={colors.accent} strokeWidth={1.8} />
        </View>

        <View style={styles.copyWrap}>
          <Text style={[styles.title, { color: colors.accent }]}>{content.title}</Text>
          <Text style={[styles.description, { color: theme.muted }]}>{content.description}</Text>

          <View style={[styles.etaBadge, { backgroundColor: colors.soft, borderColor: colors.border }]}>
            <Clock3 size={16} color={colors.accent} strokeWidth={2.2} />
            <Text style={[styles.etaText, { color: colors.accent }]}>{content.eta}</Text>
          </View>
        </View>
      </View>

      <ApprovalTimeline
        activeStep={content.activeStep}
        steps={steps}
        submittedDate={submittedDate}
        accentColor={colors.accent}
      />
    </View>
  );
};

export default ApprovalStatusHero;

const styles = StyleSheet.create({
  card: {
    borderWidth: 1,
    borderRadius: 18,
    padding: 18,
    marginHorizontal: 16,
    marginTop: 20,
  },
  topRow: {
    flexDirection: 'row',
    gap: 18,
    alignItems: 'center',
    marginBottom: 26,
  },
  iconHalo: {
    width: 98,
    height: 98,
    borderWidth: 1,
    borderRadius: 49,
    alignItems: 'center',
    justifyContent: 'center',
  },
  copyWrap: {
    flex: 1,
  },
  title: {
    fontSize: 24,
    fontWeight: '800',
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    lineHeight: 24,
  },
  etaBadge: {
    marginTop: 18,
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 12,
    minHeight: 36,
    alignSelf: 'flex-start',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  etaText: {
    fontSize: 14,
    fontWeight: '700',
  },
});
