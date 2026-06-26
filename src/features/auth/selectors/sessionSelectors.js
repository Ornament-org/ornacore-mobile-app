export const getAccountType = (auth = {}) => (
  auth.accountType
  || auth.user?.actorType
  || auth.user?.accountType
  || auth.user?.role
  || auth.user?.type
);

export const getApprovalStatus = (auth = {}) => (
  auth.approvalStatus
  || auth.shopkeeperProfile?.approvalStatus
  || auth.shopkeeperProfile?.status
  || auth.user?.shopkeeperProfile?.approvalStatus
  || auth.user?.shopkeeperProfile?.status
  || auth.user?.shopkeeper?.approvalStatus
  || auth.user?.shopkeeper?.status
  || auth.user?.approvalStatus
  || auth.user?.status
);

export const isShopkeeperSession = (auth = {}) => {
  const accountType = String(getAccountType(auth) || '').toLowerCase();
  return !accountType || ['shopkeeper', 'b2b', 'business', 'seller'].includes(accountType);
};

export const isCustomerSession = (auth = {}) => {
  const accountType = String(getAccountType(auth) || '').toLowerCase();
  return ['customer', 'b2c', 'user'].includes(accountType);
};

export const requiresShopApproval = (auth = {}) => {
  const status = String(getApprovalStatus(auth) || '').toLowerCase();
  return [
    'pending',
    'pending_review',
    'pending_approval',
    'approval_pending',
    'requested',
    'in_review',
    'review',
    'rejected',
    'suspended',
  ].includes(status);
};

export const getRootRouteForSession = (auth = {}, routeNames) => {
  if (!auth.sessionChecked || auth.bootstrapLoading) {
    return routeNames.splash;
  }

  if (!auth.isAuthenticated) {
    return routeNames.public;
  }

  if (isCustomerSession(auth)) {
    return routeNames.b2c;
  }

  if (isShopkeeperSession(auth)) {
    return requiresShopApproval(auth) ? routeNames.approval : routeNames.b2b;
  }

  return routeNames.public;
};
