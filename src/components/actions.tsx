"use client";

import crypto from "crypto";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { ImSpinner8 } from "react-icons/im";
import { MdLogout } from "react-icons/md";

import { useSession } from "@/hooks";
import FaceitIcon from "@/components/icons/Faceit";
import { env } from "@/env";

export function SignOut() {
  const router = useRouter();
  const session = useSession();

  const signOut = async () => {
    const res = await fetch("/api/auth/logout");
    if (res.ok) {
      session.clear();
      router.refresh();
    }
  };

  return (
    <button
      onClick={() => signOut()}
      className="rounded-md px-1 py-2 transition-colors duration-200 ease-in-out hover:bg-red-600"
    >
      <MdLogout className="w-6" />
    </button>
  );
}

export function SignInWithFaceit() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const signIn = async () => {
    const clientId = env.NEXT_PUBLIC_FACEIT_CLIENT_ID as string;
    const redirectUri = encodeURIComponent(
      env.NEXT_PUBLIC_API_URL + "/api/auth/callback/faceit"
    );

    const code_verifier = crypto
      .randomBytes(64)
      .toString("base64")
      .replace(/\+/g, "-")
      .replace(/\//g, "_")
      .replace(/=/g, "");

    const code_challenge = crypto
      .createHash("sha256")
      .update(code_verifier)
      .digest("base64")
      .replace(/\+/g, "-")
      .replace(/\//g, "_")
      .replace(/=/g, "");

    const state = JSON.stringify({
      verifier: code_verifier, // workaround for faceit bug
      redirectUri: window.location.pathname + window.location.search,
    });

    const url = new URL("https://accounts.faceit.com/authorize");
    url.searchParams.append("client_id", clientId);
    url.searchParams.append("scope", "openid");
    url.searchParams.append("redirect_uri", redirectUri);
    url.searchParams.append("redirect_popup", "true");
    url.searchParams.append("response_type", "code");
    url.searchParams.append("state", state);
    url.searchParams.append("code_challenge", code_challenge);
    url.searchParams.append("code_challenge_method", "S256");

    router.push(url.toString());
  };

  return (
    <button
      onClick={() => {
        signIn();
        setLoading(true);
      }}
      className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-1 text-white transition-colors hover:bg-orange-700 disabled:bg-orange-700"
      disabled={loading}
    >
      {loading ? (
        <>
          <ImSpinner8 className="h-6 animate-spin" />
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
