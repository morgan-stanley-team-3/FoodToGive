import { mongoDBConnection } from './mongodb';
import User from '@/models/User';
import type { NextAuthOptions } from 'next-auth';
import credentials from 'next-auth/providers/credentials';
import bcrypt from 'bcryptjs';

export const userOptions: NextAuthOptions = {
  providers: [
    credentials({
      name: 'Credentials',
      id: 'credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      authorize: async function (
        credentials: Record<'email' | 'password', string> | undefined
      ) {
        await mongoDBConnection();

        const user = await User.findOne({
          email: credentials?.email,
        }).select('+password');

        if (!user) {
          throw new Error('No user found');
        }

        const passwordMatch = await bcrypt.compare(
          credentials!.password,
          user.password
        );

        if (!passwordMatch) {
          throw new Error('Password is wrong');
        }
        return user;
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = user.role;
      }
      return token;
    },
    async session({ session, token }) {
      if (token && session.user) {
        session.user.role = token.role as string;
      }

      return session;
    },
  },
  session: {
    strategy: 'jwt',
  },
};
