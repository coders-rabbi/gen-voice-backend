import jwt, { SignOptions } from "jsonwebtoken";

export const createToken = (
  jwtPayload: { email: string; role: string; isDeleted: boolean },
  secret: string,
  expiresIn: SignOptions["expiresIn"]
) => {
  const options: SignOptions = {
    ...(expiresIn !== undefined && { expiresIn }),
  };

  return jwt.sign(jwtPayload, secret, options);
};