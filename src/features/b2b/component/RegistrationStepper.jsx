import React from 'react';
import {
  StyleSheet,
  Text,
  View,
} from 'react-native';

const steps = [
  'Shop Info',

];

const RegistrationStepper = ({
  currentStep = 1,
}) => {
  return (
    <View style={styles.container}>
      {steps.map((step, index) => {
        const stepNumber = index + 1;
        const isActive = stepNumber === currentStep;
        const isCompleted = stepNumber < currentStep;

        return (
          <React.Fragment key={step}>
            <View style={styles.stepWrapper}>
              <View
                style={[
                  styles.circle,
                  isCompleted && styles.completedCircle,
                  isActive && styles.activeCircle,
                ]}
              >
                <Text
                  style={[
                    styles.circleText,
                    (isCompleted || isActive) &&
                      styles.activeCircleText,
                  ]}
                >
                  {stepNumber}
                </Text>
              </View>

              <Text
                style={[
                  styles.label,
                  isActive && styles.activeLabel,
                ]}
                numberOfLines={1}
              >
                {step}
              </Text>
            </View>

            {index !== steps.length - 1 && (
              <View
                style={[
                  styles.line,
                  stepNumber < currentStep &&
                    styles.activeLine,
                ]}
              />
            )}
          </React.Fragment>
        );
      })}
    </View>
  );
};

export default RegistrationStepper;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'center',

    marginTop: 20,
    marginHorizontal: 16,
    paddingVertical: 8,
  },

  stepWrapper: {
    alignItems: 'center',
    width: 70,
  },

  circle: {
    width: 34,
    height: 34,
    borderRadius: 17,

    backgroundColor: '#EFEFEF',

    alignItems: 'center',
    justifyContent: 'center',
  },

  activeCircle: {
    backgroundColor: '#C99632',
  },

  completedCircle: {
    backgroundColor: '#C99632',
  },

  circleText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#666666',
  },

  activeCircleText: {
    color: '#FFFFFF',
  },

  label: {
    marginTop: 8,
    fontSize: 11,
    textAlign: 'center',
    color: '#777777',
  },

  activeLabel: {
    color: '#1F1F1F',
    fontWeight: '700',
  },

  line: {
    flex: 1,
    height: 2,
    backgroundColor: '#E5E5E5',
    marginTop: 16,
  },

  activeLine: {
    backgroundColor: '#C99632',
  },
});
