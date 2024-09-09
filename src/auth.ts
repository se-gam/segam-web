import NextAuth, { DefaultSession } from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import { login, refreshAccessTokenByRefreshToken } from '@/lib/actions/segam-auth';
import { isJwtExpired } from '@/utils/jwt';

declare module 'next-auth' {
  interface User {
    accessToken: string;
    refreshToken: string;
    encryptedPassword: string;
    pushToken: string | undefined;
    os: string | undefined;
  }
  interface Session {
    user: {
      accessToken: string;
      refreshToken: string;
      encryptedPassword: string;
      pushToken: string | undefined;
      os: string | undefined;
    } & DefaultSession['user'];
  }
}
export const { handlers, signIn, signOut, auth } = NextAuth({
  trustHost: true,
  providers: [
    Credentials({
      credentials: {
        studentId: {},
        password: {},
      },
      authorize: async (credentials) => {
        let user = null;
        user = await login({
          studentId: credentials.studentId as string,
          password: credentials.password as string,
        });
        return user;
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user, account }) {
      if (account && user) {
        return {
          accessToken: user.accessToken,
          refreshToken: user.refreshToken,
          encryptedPassword: user.encryptedPassword,
          pushToken: user.pushToken,
          os: user.os,
        };
      }
      if (token && isJwtExpired(token.accessToken as string)) {
        const result = await refreshAccessTokenByRefreshToken(token.refreshToken as string);
        if (result) {
          return {
            ...token,
            accessToken: result.accessToken,
            refreshToken: result.refreshToken,
          };
        }
      }
      return token;
    },

    async session({ session, token }) {
      const updatedUser = {
        ...session.user,
        accessToken: token.accessToken as string,
        refreshToken: token.refreshToken as string,
        encryptedPassword: token.encryptedPassword as string,
        pushToken: token.pushToken as string | undefined,
        os: token.os as string | undefined,
      };
      const updatedSession = {
        ...session,
        user: updatedUser,
      };
      return updatedSession;
    },
  },
});
