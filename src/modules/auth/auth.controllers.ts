import { Request, Response, NextFunction } from "express";
import { loginUser, registerUser } from "./auth.services"

export const login = async(req: Request, res: Response, next: NextFunction) => {
    try {
        const { email, password } = req.body;

        const user = await loginUser(email, password);

        res.status(200).send( { success: true, message: "Login successfull", user} );
    } catch (error) {
        next(error);
    }
};

export const register = async(req: Request, res: Response, next: NextFunction) => {
    try {
        const { name, email, password } = req.body;

        const user = await registerUser(name, email, password);

        res.status(201).send( { success: true, message: "User registered successfully", user} );
    } catch (error) {
        next(error);
    }
};