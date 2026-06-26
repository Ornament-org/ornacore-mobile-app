import React from 'react';
import { useSelector } from 'react-redux';
import B2BAuthNavigator from '../../auth/navigation/B2BAuthNavigator';
import ApprovalNavigator from '../../approval/navigation/ApprovalNavigator';
import B2BNavigator from './B2BNavigator';
import { routeNames } from '../../../navigation/routeNames';
import { isShopkeeperSession, requiresShopApproval } from '../../auth/selectors/sessionSelectors';

const B2BSegment = ({ route }) => {
  const auth = useSelector((state) => state.auth);
  const authInitialRoute = route?.params?.authScreen || routeNames.login;

  if (!auth.isAuthenticated || !isShopkeeperSession(auth)) {
    return <B2BAuthNavigator initialRouteName={authInitialRoute} />;
  }

  if (requiresShopApproval(auth)) {
    return <ApprovalNavigator />;
  }

  return <B2BNavigator />;
};

export default B2BSegment;
