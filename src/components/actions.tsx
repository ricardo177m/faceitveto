"use client";

import { useRouter } from "next/navigation";

import FaceitIcon from "@/components/faceit";
import crypto from "crypto";
import { useState } from "react";
import { ImSpinner8 } from "react-icons/im";
import { MdLogout } from "react-icons/md";

export function SignOut() {
  const router = useRouter();
  return (
    <button onClick={() => (window.location.href = "/api/auth/logout")}>
      <MdLogout className="w-6" />
    </button>
  );
}

export function SignInWithFaceit() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const signIn = async () => {
    const clientId = process.env.NEXT_PUBLIC_FACEIT_CLIENT_ID as string;
    const redirectUri = encodeURIComponent(
      process.env.NEXT_PUBLIC_API_URL + "/api/auth/callback/faceit"
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
      redirectUri: window.location.href.replace(window.location.search, ""),
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
