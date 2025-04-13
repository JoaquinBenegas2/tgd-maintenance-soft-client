import NextAuth from "next-auth";
import Auth0 from "next-auth/providers/auth0";

import {
  AUTH0_API_AUDIENCE,
  AUTH0_CLIENT_ID,
  AUTH0_CLIENT_SECRET,
  AUTH0_ISSUER,
  AUTH_SECRET,
  AUTH0_PROMPT,
} from "@/config/config";

export const { handlers, signIn, signOut, auth } = NextAuth({
  secret: AUTH_SECRET,
  providers: [
    Auth0({
      clientId: AUTH0_CLIENT_ID,
      clientSecret: AUTH0_CLIENT_SECRET,
      issuer: AUTH0_ISSUER,
      authorization: {
        params: {
          audience: AUTH0_API_AUDIENCE,
          prompt: AUTH0_PROMPT,
        },
      },
    }),
  ],
  callbacks: {
    //-- Authorization Callback
    authorized: async ({ auth }) => {
      return !!auth;
    },

    //-- JWT Callback
    jwt: async ({ token, account, user }) => {
      if (account && user) {
        token.accessToken = account.access_token;
        token.expiresAt = account.expires_at && account.expires_at * 1000; // Convertir a milisegundos
        token.user = user;
      }

      return token;
    },

    //-- Session Callback
    session: async ({ session, token }) => {
      session.accessToken = token.accessToken;
      session.expiresAt = token.expiresAt;

      return session;
    },
  },
  pages: {
    signIn: "/auth/login",
  },
});
