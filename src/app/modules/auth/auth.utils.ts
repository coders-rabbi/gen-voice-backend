import jwt, { SignOptions } from "jsonwebtoken";

export const createToken = (
  jwtPayload: { email: string; role: string; isDeleted: boolean },
  secret: string,
  expiresIn: SignOptions["expiresIn"],
) => {
  console.log("SECRET TYPE:", typeof secret, "| VALUE:", secret);
  const options: SignOptions = {
    ...(expiresIn !== undefined && { expiresIn }),
  };

  return jwt.sign(jwtPayload, secret, options);
};
