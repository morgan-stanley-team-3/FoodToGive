import NextAuth from 'next-auth/next';

declare module 'next-auth' {
  interface User {
    agency: string;
    uen: string;
    address: string;
    poc_name: string;
    poc_phone: string;
    halal_certification: boolean;
    hygiene_certification: string;
    role: string;
  }

  interface Session {
    user: {
      agency: string;
      uen: string;
      address: string;
      poc_name: string;
      poc_phone: string;
      halal_certification: boolean;
      hygiene_certification: string;
      role: string;
    } & DefaultSession['user'];
  }

  interface JWT {
    agency: string;
    uen: string;
    address: string;
    poc_name: string;
    poc_phone: string;
    halal_certification: boolean;
    hygiene_certification: string;
    role: string;
  }
}
