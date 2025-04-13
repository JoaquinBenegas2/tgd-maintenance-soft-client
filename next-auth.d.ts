// types/next-auth.d.ts

// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Session } from "next-auth";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { JWT } from "next-auth/jwt";

// Extiende el tipo de la sesión para agregar `accessToken` y `expiresAt`
declare module "next-auth" {
  interface Session {
    accessToken?: string;
    expiresAt?: number;
    audience?: string;
  }
}

// Extiende el tipo de JWT para agregar `accessToken` y `expiresAt`
declare module "next-auth/jwt" {
  interface JWT {
    accessToken?: string;
    expiresAt?: number;
    audience?: string;
  }
}
