import React from 'react';
import { useSelector } from 'react-redux';
import B2CAuthNavigator from '../../auth/navigation/B2CAuthNavigator';
import B2CNavigator from './B2CNavigator';
import { isCustomerSession } from '../../auth/selectors/sessionSelectors';

const B2CSegment = () => {
  const auth = useSelector((state) => state.auth);

  if (!auth.isAuthenticated || !isCustomerSession(auth)) {
    return <B2CAuthNavigator />;
  }

  return <B2CNavigator />;
};

export default B2CSegment;
