export function toURLSafe(id: string) {
  // replaces . with _
  return id.replace(/\./g, "_");
}

export function fromURLSafe(id: string) {
  // replaces _ with .
  return id.replace(/_/g, ".");
}
