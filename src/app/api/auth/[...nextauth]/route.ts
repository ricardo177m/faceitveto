import NextAuth from "next-auth";
import FaceitProvider from "@/providers/faceit";

export const authOptions = {
  // Configure one or more authentication providers
  providers: [
    FaceitProvider({
      clientId: process.env.FACEIT_CLIENT_ID as string,
      clientSecret: process.env.FACEIT_CLIENT_SECRET as string,
    })
  ],
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
