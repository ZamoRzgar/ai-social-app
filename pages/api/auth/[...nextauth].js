import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { MongoDBAdapter } from '@auth/mongodb-adapter';
import clientPromise from '../../../lib/mongodb-adapter';
import dbConnect from '../../../lib/mongodb';

export default NextAuth({
  providers: [
    CredentialsProvider({
      // The name to display on the sign in form (e.g. 'Sign in with...')
      name: 'Credentials',
      // The credentials is used to generate a suitable form on the sign in page.
      credentials: {
        username: { label: 'Username', type: 'text', placeholder: 'username' },
        password: { label: 'Password', type: 'password' }
      },
      async authorize(credentials, req) {
        // Add your own authentication logic here
        try {
          // Example: Check credentials against database
          await dbConnect();
          
          // This is a simplified example - in production, replace with real user lookup
          // and proper password hashing (e.g., bcrypt)
          if (credentials.username === 'test' && credentials.password === 'password') {
            return {
              id: '1',
              name: 'Test User',
              email: 'test@example.com',
            };
          }
          return null;
        } catch (error) {
          console.error('Authentication error:', error);
          return null;
        }
      }
    })
  ],
  adapter: MongoDBAdapter(clientPromise),
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  callbacks: {
    async jwt({ token, user }) {
      // Initial sign in
      if (user) {
        token.id = user.id;
        token.role = user.role || 'user';
      }
      return token;
    },
    async session({ session, token }) {
      // Send properties to the client
      if (token) {
        session.user.id = token.id;
        session.user.role = token.role;
      }
      return session;
    }
  },
  pages: {
    signIn: '/auth/signin',
    // error: '/auth/error', // Error code passed in query string as ?error=
    // signOut: '/auth/signout',
  },
  secret: process.env.NEXTAUTH_SECRET, // Ensure this is set in your environment variables
});