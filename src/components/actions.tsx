"use client";

import { signIn, signOut } from "next-auth/react";

export function SignOut() {
  return <button onClick={() => signOut()}>Sign out</button>;
}

export function SignInWithFaceit() {
  return <button onClick={() => signIn("faceit")}>Sign in with FACEIT</button>;
}