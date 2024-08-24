import NextAuth from 'next-auth/next';

declare module 'next-auth' {
  interface User {
    role: string;
  }

  interface Session {
    user: {
      role: string;
    } & DefaultSession['user'];
  }

  interface JWT {
    role: string;
  }
}
