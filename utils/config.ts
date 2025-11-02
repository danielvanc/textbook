const config = {
  appRoute: "/home",
  loginRoute: "/login",
  logoutRoute: "/logout",
  sessionCookie: !!process.env.VERCEL_URL
    ? "__Secure-authjs.session-token"
    : "authjs.session-token",
} as const;

export default config;
