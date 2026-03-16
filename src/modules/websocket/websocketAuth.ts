import jwt from "jsonwebtoken";
import { env } from "../../config/env";

export const verifySocketToken = (token: string) => {
    try {
        const decoded = jwt.verify(token, env.jwtSecret) as { userId: string };
        console.log("Decode: ", decoded);

        return decoded.userId;
    } catch (error) {
        return null;
    }
};