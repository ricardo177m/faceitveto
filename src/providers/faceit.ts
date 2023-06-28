import type { OAuthConfig, OAuthUserConfig } from "next-auth/providers";

export interface FaceitProfile {
  guid: string;
  nickname: string;
  picture?: string;
  email?: string;
  birthday?: string;
  locale?: string;
  memberships?: string[];
  given_name?: string;
  family_name?: string;
  email_verified?: boolean;
  sub: string;
}

export default function FACEIT<P extends FaceitProfile>(
  options: OAuthUserConfig<P>
): OAuthConfig<P> {
  return {
    id: "faceit",
    name: "FACEIT",
    type: "oauth",
    authorization: "https://accounts.faceit.com/accounts?redirect_popup=true",
    token: {
      url: "https://api.faceit.com/auth/v1/oauth/token",
      request: async (params) => {
        const { token } = params.provider;
        const { code } = params.params;

        const endpointUrl = typeof token === "string" ? token : token?.url;
        if (!endpointUrl) throw new Error("Token url not provided");

        const url = new URL(endpointUrl);
        url.searchParams.set("code", code as string);
        url.searchParams.set("grant_type", "authorization_code");

        const headers = new Headers({
          Authorization: `Basic ${Buffer.from(
            `${options.clientId}:${options.clientSecret}`
          ).toString("base64")}`,
        });

        const response = await fetch(url.toString(), {
          method: "POST",
          headers: headers,
        }).then((res) => res.json());

        return {
          tokens: {
            access_token: response.access_token,
          },
        };
      },
    },
    userinfo: "https://api.faceit.com/auth/v1/resources/userinfo",
    profile(profile) {
      return {
        id: profile.guid,
        name: profile.nickname,
        email: profile.email,
        image: profile.picture,
      };
    },
    options,
  };
}
