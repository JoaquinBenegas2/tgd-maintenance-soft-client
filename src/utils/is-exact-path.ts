/**
 * Checks if the given pathname matches exactly one of the allowed paths (no subroutes).
 * @param pathname The full pathname (e.g., "/plants", "/users")
 * @param allowedPaths An array of exact allowed base paths (without trailing slashes)
 * @returns boolean
 */
export function isExactPath(pathname: string, allowedPaths: string[]): boolean {
  return allowedPaths.some((base) => new RegExp(`^${base}/?$`).test(pathname));
}
