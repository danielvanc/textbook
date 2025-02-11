import NextAuth from "next-auth";
import Google from "next-auth/providers/google";

const NEXTAUTH_URL = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "http://localhost:3000";

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [Google],
  redirectProxyUrl: NEXTAUTH_URL + "/api/auth",
});
