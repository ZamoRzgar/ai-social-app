import NextAuth from 'next-auth';
import Providers from 'next-auth/providers';

export default NextAuth({
    providers: [
        Providers.Credentials({
            name: 'Credentials',
            credentials: {
                username: { label: 'Username', type: 'text' },
                password: { label: 'Password', type: 'password' },
            },
            authorize: async (credentials) => {
                const user = { id: 1, name: 'Test User' }; // Replace with DB logic
                if (credentials.username === 'test' && credentials.password === 'password') {
                    return Promise.resolve(user);
                } else {
                    return Promise.resolve(null);
                }
            },
        }),
    ],
    callbacks: {
        jwt: async (token, user) => {
            if (user) token.id = user.id;
            return token;
        },
        session: async (session, user) => {
            session.user = user;
            return session;
        },
    },
});
