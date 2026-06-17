export function slugify(text: string): string {
  const stripped = text.normalize("NFD").replace(/[̀-ͯ]/g, "");
  return stripped
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-");
}
