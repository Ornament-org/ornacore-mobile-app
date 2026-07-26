export const getPrimaryMetalSummary = (ledgerSummary = []) =>
  ledgerSummary.find(row => row.code === 'GOLD') || ledgerSummary[0] || null;

export const formatMetalWeight = (value) => {
  const numericValue = Number(value);

  if (!Number.isFinite(numericValue)) {
    return '0.000 gm';
  }

  return `${numericValue.toFixed(3)} gm`;
};
