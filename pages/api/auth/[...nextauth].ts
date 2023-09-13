import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

type ICredentials = {
  email: string;
  password: string;
};

export default NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {},
      async authorize({ email, password }: ICredentials) {
        const response = await fetch(
          "https://apiecommerce.meucurso.com.br/api/studentlogin",
          {
            method: "POST",
            body: new URLSearchParams({ email, password }),
          }
        );
        const data = await response.json();

        if (data.Token && response.status === 200) {
          return { ...data, jwt: data.jwt };
        } else {
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async session({ session, token }) {
      session.user = token.user;
      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        token.user = user;
      }
      return token;
    },
  },
});
