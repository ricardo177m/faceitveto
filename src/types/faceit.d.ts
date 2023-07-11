interface FaceitOpenIdCfg {
  token_endpoint: string;
  userinfo_endpoint: string;
}

interface FaceitToken {
  access_token: string;
  expires_in: number;
  id_token: string;
  refresh_token: string;
  scope: string;
  token_type: string;
}

interface FaceitUserInfo {
  aud: string;
  birthdate?: string;
  email?: string;
  email_verified?: string;
  exp: number;
  family_name?: string;
  given_name?: string;
  guid: string;
  iat: number;
  iss: string;
  locale?: string;
  nickname: string;
  picture?: string;
  sub: string;
}
