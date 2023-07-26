import jwt from "jsonwebtoken";

interface JwtPayload {
    exp: number;
    userId: number;
}

export const generateJwt = (exp: Date, userId: number): string => {
    return jwt.sign({
        exp: Math.floor(exp.getTime() / 1000) + (60 * 60), // expires in 1 hour
        userId
    }, process.env.JWT_SECRET as string);
};

export const verifyJwt = async (token: string): Promise<JwtPayload> => {
    if (!process.env.JWT_SECRET) throw new Error("secretOrPrivateKey must have a value");
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string);
    return decoded as JwtPayload;
};