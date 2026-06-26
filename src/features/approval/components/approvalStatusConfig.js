export const normalizeApprovalStatus = (status) =>
  String(status || 'PENDING_REVIEW').toUpperCase();

export const APPROVAL_STEPS = [
  {
    key: 'SUBMITTED',
    label: 'Submitted',
    pendingText: 'Pending',
  },
  {
    key: 'PENDING_REVIEW',
    label: 'Under Review',
    pendingText: 'In Progress',
  },
  {
    key: 'VERIFICATION',
    label: 'Verification',
    pendingText: 'Pending',
  },
  {
    key: 'APPROVED',
    label: 'Approved',
    pendingText: 'Pending',
  },
];

export const getApprovalStatusContent = (status) => {
  const normalized = normalizeApprovalStatus(status);

  if (normalized === 'APPROVED') {
    return {
      tone: 'success',
      title: 'Approved',
      description: 'Your shop has been approved. You can now access the B2B catalog.',
      eta: 'Ready to start ordering',
      activeStep: 'APPROVED',
      detailTitle: 'Verification Complete',
      detailDescription: 'Your business information has been verified successfully.',
    };
  }

  if (normalized === 'REJECTED') {
    return {
      tone: 'danger',
      title: 'Application Rejected',
      description: 'Your shop registration needs attention before it can be approved.',
      eta: 'Contact support for next steps',
      activeStep: 'PENDING_REVIEW',
      detailTitle: 'Action Required',
      detailDescription: 'Review the update from our team and submit the required corrections.',
    };
  }

  if (normalized === 'SUSPENDED') {
    return {
      tone: 'danger',
      title: 'Account Suspended',
      description: 'Your shop account is temporarily unavailable.',
      eta: 'Contact support to restore access',
      activeStep: 'PENDING_REVIEW',
      detailTitle: 'Support Required',
      detailDescription: 'Our team can help you understand what is needed to restore access.',
    };
  }

  if (normalized === 'DRAFT') {
    return {
      tone: 'warning',
      title: 'More Information Needed',
      description: 'Your shop details need updates before review can continue.',
      eta: 'Update requested by admin',
      activeStep: 'SUBMITTED',
      detailTitle: 'Update Required',
      detailDescription: 'Review your submitted information and complete the requested changes.',
    };
  }

  return {
    tone: 'warning',
    title: 'Under Review',
    description: 'We are reviewing your shop details and documents.',
    eta: 'Usually takes 1-2 business days',
    activeStep: 'PENDING_REVIEW',
    detailTitle: 'Verification in Progress',
    detailDescription: 'Our team is verifying your information. You will receive a notification once the review is complete.',
  };
};
