export interface IOAuthFacebookProfile {
  id: string;
  name: string;
  email: string;
  picture: {
    data: {
      height: number;
      is_silhouette: boolean;
      url: string;
      width: number;
    };
  };
}

export interface IOAuthGoogleProfile {
  iss: string;
  azp: string;
  aud: string;
  sub: string;
  email: string;
  email_verified: string;
  at_hash: string;
  name: string;
  picture: string;
  given_name: string;
  family_name: string;
  locale: string;
  iat: string;
  exp: string;
  alg: string;
  kid: string;
  typ: string;
}

export interface IOAuthProfile {
  name: string;
  email: string;
  avatar: string;
  emailVerified?: boolean;
  locale?: string;
  providerAccountId: string;
}
