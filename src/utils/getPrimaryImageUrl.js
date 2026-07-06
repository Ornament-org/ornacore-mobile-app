export const getPrimaryImageUrl = (entity) =>
  entity?.imageUrl ?? entity?.images?.find((image) => image.isPrimary)?.media?.secureUrl ?? null;

export default getPrimaryImageUrl;
