interface JwtPayload {
    exp: number;
    userId: number;
}
export declare const generateJwt: (exp: Date, userId: number) => string;
export declare const verifyJwt: (token: string) => Promise<JwtPayload>;
export {};
