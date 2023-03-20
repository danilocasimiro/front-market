import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

export default NextAuth({
  providers: [
    CredentialsProvider({
      name: "Domain Account",
      credentials: {
        email: { label: "Username", type: "text ", placeholder: "johndoe@test.com" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        let data = {
          email: credentials.email,
          password: credentials.password  
        }

        const result = await fetch('http://localhost:3090/api/users/login', {
          body: JSON.stringify(data),
          headers: {
            'Content-Type': 'application/json'
          },
          method: 'POST'
        })

        if (result.ok) {
          return result
        }

        return null;
      },
    }),
  ],
  callbacks: {
    jwt: async ({ token, user }) => {
      if (user) {
        token.id = user.id;
      }
    },
    session: ({ session, token, user }) => {
      if (token) {
        session.id = token.id;
        session.user = user;
      }

      return session;
    }
  },
  pages: {
    signIn: '/sign-in',
    signOut: '/sign-in',
  },
  secret: 'test',
  jwt: {
    secret: 'test',
    encryption: true
  }
});