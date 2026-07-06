export const selectB2BCartItemCount = (state) => {
  const items = state.b2bCart?.cart?.items;
  if (!Array.isArray(items)) return 0;
  return items.reduce((sum, item) => sum + Number(item.quantity ?? 0), 0);
};

export default selectB2BCartItemCount;
