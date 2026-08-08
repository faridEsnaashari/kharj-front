export const categoriesToOptions = (categories) =>
  Object.values(categories || {}).map((category) => ({
    value: category.key,
    label: category.value,
  }));
