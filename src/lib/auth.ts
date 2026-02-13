/**
 * Simple admin auth helper.
 * Compares provided password with the ENV variable ADMIN_PASSWORD.
 */
export function verifyAdmin(password: string): boolean {
  return password === process.env.ADMIN_PASSWORD;
}
