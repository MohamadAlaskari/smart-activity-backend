export type JWTPayloadTypes = {
  id: string;
  email: string;
  isEmailVerified?: boolean;
};

export type AccessTokentype = {
  accessToken: string;
};

export type MailOptions = {
  to: string;
  subject: string;
  html: string;
};
