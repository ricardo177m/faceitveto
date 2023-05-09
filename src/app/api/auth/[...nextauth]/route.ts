import { NextApiHandler } from "next";

import FaceitProvider from "@/providers/faceit";
import NextAuth from "next-auth";

export const authOptions = {
  // Configure one or more authentication providers
  providers: [
    FaceitProvider({
      clientId: process.env.FACEIT_CLIENT_ID as string,
      clientSecret: process.env.FACEIT_CLIENT_SECRET as string,
    }),
  ],
};

const handler: NextApiHandler = NextAuth(authOptions);

export { handler as GET, handler as POST };
