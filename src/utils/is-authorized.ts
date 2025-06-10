export const isAuthorized = (session: any | null, allowedRoles: string[]) => {
  return session && allowedRoles.includes(session?.user?.roles?.[0] || "");
};
