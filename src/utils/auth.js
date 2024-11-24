import GoogleProvider from "next-auth/providers/github"

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
    }),
  ],
}

export const getAuthSession = () => getServerSession(authOptions);