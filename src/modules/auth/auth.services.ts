import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import { createUser, findUserByEmail } from "./auth.repositories";
import { env } from "../../config/env";

export const registerUser = async (
  name: string,
  email: string,
  password: string,
) => {
  const existingUser = await findUserByEmail(email);

  if (existingUser) {
    throw new Error("Email already registered");
  }

  const passHash = await bcrypt.hash(password, 10);

  const user = await createUser(name, email, passHash);

  return user;
};

export const loginUser = async (email: string, password: string) => {
  const user = await findUserByEmail(email);

  if (!user) {
    throw new Error("Invalid credentials");
  }

  const passwordValid = await bcrypt.compare(password, user.password_hash);

  if (!passwordValid) {
    throw new Error("Invalid credentials");
  }

  const token = jwt.sign({ userId: user.id }, env.jwtSecret, {
    expiresIn: "1d",
  });

  return {
    token,
  };
};
