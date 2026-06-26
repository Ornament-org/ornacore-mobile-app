import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Check, ClipboardList, Hourglass, ShieldCheck } from 'lucide-react-native';
import { useAppTheme } from '../../../theme/useAppTheme';

const stepIcons = {
  SUBMITTED: ClipboardList,
  PENDING_REVIEW: Hourglass,
  VERIFICATION: ShieldCheck,
  APPROVED: Check,
};

const getStepIndex = (steps, activeStep) =>
  Math.max(0, steps.findIndex(step => step.key === activeStep));

const ApprovalTimeline = ({ activeStep, steps, submittedDate, accentColor }) => {
  const theme = useAppTheme();
  const activeIndex = getStepIndex(steps, activeStep);

  return (
    <View style={[styles.timeline, { backgroundColor: theme.surfaceMuted || '#FAFAFA' }]}>
      {steps.map((step, index) => {
        const Icon = stepIcons[step.key] || Check;
        const isComplete = index < activeIndex || activeStep === 'APPROVED';
        const isActive = index === activeIndex && activeStep !== 'APPROVED';
        const isReached = isComplete || isActive;
        const subtext = step.key === 'SUBMITTED' ? submittedDate : step.pendingText;

        return (
          <View key={step.key} style={styles.stepWrap}>
            {index > 0 ? (
              <View
                style={[
                  styles.connector,
                  {
                    backgroundColor: index <= activeIndex ? accentColor : theme.border,
                  },
                ]}
              />
            ) : null}

            <View
              style={[
                styles.iconCircle,
                {
                  backgroundColor: isComplete ? accentColor : theme.surface,
                  borderColor: isReached ? accentColor : theme.border,
                },
              ]}
            >
              <Icon
                size={26}
                color={isComplete ? '#FFFFFF' : isReached ? accentColor : theme.muted}
                strokeWidth={2.2}
              />
            </View>

            <Text
              numberOfLines={2}
              style={[
                styles.stepLabel,
                {
                  color: isReached ? accentColor : theme.text,
                },
              ]}
            >
              {step.label}
            </Text>
            <Text
              numberOfLines={2}
              style={[styles.stepMeta, { color: theme.muted }]}
            >
              {subtext}
            </Text>
          </View>
        );
      })}
    </View>
  );
};

export default ApprovalTimeline;

const styles = StyleSheet.create({
  timeline: {
    borderRadius: 16,
    paddingVertical: 22,
    paddingHorizontal: 8,
    flexDirection: 'row',
  },
  stepWrap: {
    flex: 1,
    alignItems: 'center',
  },
  connector: {
    position: 'absolute',
    top: 30,
    left: '-50%',
    width: '100%',
    height: 2,
  },
  iconCircle: {
    width: 58,
    height: 58,
    borderRadius: 29,
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
    zIndex: 1,
  },
  stepLabel: {
    minHeight: 42,
    textAlign: 'center',
    fontSize: 14,
    fontWeight: '700',
    lineHeight: 19,
  },
  stepMeta: {
    textAlign: 'center',
    fontSize: 12,
    lineHeight: 17,
    marginTop: 2,
  },
});
