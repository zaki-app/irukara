import { DefaultSession } from 'next-auth/next';

declare module 'next-auth' {
  interface Session {
    user: {
      id: string;
      accessToken?: string;
    } & DefaultSession['id'];
  }
}
