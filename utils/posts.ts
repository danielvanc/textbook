export function generateSlug(str: string, id: string) {
  const trimmedId = id.slice(-5);
  const stringToSlug = `${trimmedId}-${str}`;
  return stringToSlug
    .toLocaleLowerCase()
    .trim()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "") // Remove accents
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}
