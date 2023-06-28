"use client";

import FaceitIcon from "@/components/faceit";
import { signIn, signOut } from "next-auth/react";
import { useState } from "react";
import { ImSpinner8 } from "react-icons/im";
import { MdLogout } from "react-icons/md";

export function SignOut() {
  return (
    <button onClick={() => signOut()}>
      <MdLogout className="w-6" />
    </button>
  );
}

export function SignInWithFaceit() {
  const [loading, setLoading] = useState(false);

  return (
    <button
      onClick={() => {
        signIn("faceit");
        setLoading(true);
      }}
      className="inline-flex items-center gap-2 px-4 py-1 rounded-lg text-white bg-primary hover:bg-orange-700 disabled:bg-orange-700 transition-colors"
      disabled={loading}
    >
      {loading ? (
        <>
          <ImSpinner8 className="animate-spin h-6" />
          Logging in...
        </>
      ) : (
        <>
          <FaceitIcon className="w-6" />
          Login with FACEIT
        </>
      )}
    </button>
  );
}
