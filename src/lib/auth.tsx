import FaceitProvider from "@/providers/faceit";
import { NextAuthOptions } from "next-auth";

export const authOptions: NextAuthOptions = {
  // Configure one or more authentication providers
  providers: [
    FaceitProvider({
      clientId: process.env.FACEIT_CLIENT_ID as string,
      clientSecret: process.env.FACEIT_CLIENT_SECRET as string,
    }),
  ],
  callbacks: {},
};
