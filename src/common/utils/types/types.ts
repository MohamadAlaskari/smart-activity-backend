export type JWTPayloadTypes = {
    id: string;
    username: string;
    email: string;
    isEmailVerified?: boolean;
};

export type AccessTokentype = {
    accessToken: string;
};
