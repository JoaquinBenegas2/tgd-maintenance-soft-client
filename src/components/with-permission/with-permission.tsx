import { useHasRole } from "@/hooks/use-has-role/use-has-role";

interface Props {
  roles: string[];
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

export default function WithPermission({ roles, children, fallback = null }: Props) {
  const canView = useHasRole(roles);

  return canView ? <>{children}</> : <>{fallback}</>;
}
