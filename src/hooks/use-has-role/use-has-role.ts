import { useSession } from "next-auth/react";

/**
 * Verifica si el usuario tiene al menos uno de los roles requeridos.
 *
 * @param allowedRoles Rol(es) necesarios para acceder (string o array)
 * @returns boolean
 */
export function useHasRole(allowedRoles: string | string[]): boolean {
  const { data: session } = useSession();
  const userRoles: string[] | null | undefined = session?.user?.roles;

  if (!userRoles || userRoles.length === 0) return false;

  const required = Array.isArray(allowedRoles) ? allowedRoles : [allowedRoles];

  return required.some((role) => userRoles.includes(role));
}
