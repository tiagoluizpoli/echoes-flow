export const generateSlug = (title: string): string => {
  // 1. Normalize the string to separate accent marks from characters
  const accentless = title.normalize('NFD').replace(/[\u0300-\u036f]/g, '');

  return accentless
    .toLowerCase() // 2. Convert to lowercase
    .trim() // 3. Remove leading/trailing whitespace
    .replace(/[^a-z0-9\s-]/g, '') // 4. Remove all non-alphanumeric, non-space, non-hyphen chars
    .replace(/[\s_]+/g, '-') // 5. Replace spaces and underscores with a single hyphen
    .replace(/--+/g, '-') // 6. Collapse multiple hyphens into one
    .replace(/^-+/, '') // 7. Remove leading hyphens
    .replace(/-+$/, ''); // 8. Remove trailing hyphens
};
