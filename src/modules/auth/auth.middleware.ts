import jwt from "jsonwebtoken";

import { Request, Response, NextFunction } from "express";
import { env } from "../../config/env";

export const authenticate = (
    req: Request, res: Response, next: NextFunction
) => {
    const authHeader = req.headers.authorization;

    if(!authHeader) {
        return res.status(401).json({ message: "Authorization header missing." });
    }

    const token = authHeader.split(" ")[1];

    if(!token) {
        return res.status(401).json({ message: "Token missing." });
    }

    try {
        const decoded = jwt.verify(token, env.jwtSecret) as { userId: string };

        (req as any).userId = decoded.userId;
        next();
    } catch (error) {
        return res.status(401).json({ message: "Invalid token" });
    }
};