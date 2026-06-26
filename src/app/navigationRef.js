import { CommonActions } from '@react-navigation/native';

// Navigation reference for programmatic navigation
export let navigationRef = null;

export const setNavigationRef = (ref) => {
  navigationRef = ref;
};

export const navigate = (name, params) => {
  if (navigationRef) {
    navigationRef.navigate(name, params);
  }
};

export const goBack = () => {
  if (navigationRef) {
    navigationRef.goBack();
  }
};

export const reset = (state) => {
  if (navigationRef) {
    if (typeof navigationRef.resetRoot === 'function') {
      navigationRef.resetRoot(state);
      return;
    }

    navigationRef.dispatch(CommonActions.reset(state));
  }
};
