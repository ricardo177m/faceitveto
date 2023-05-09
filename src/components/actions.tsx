"use client";

import FaceitIcon from "@/components/faceit";
import { signIn, signOut } from "next-auth/react";

export function SignOut() {
  return <button onClick={() => signOut()}>Sign out</button>;
}

export function SignInWithFaceit() {
  return (
    <button
      onClick={() => signIn("faceit")}
      className="inline-flex items-center gap-2 px-4 py-1 rounded-lg text-white bg-orange-600 hover:bg-orange-700 transition-colors"
    >
      <FaceitIcon className="w-6" />
      Sign in with FACEIT
    </button>
  );
}
