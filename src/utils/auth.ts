import { NextApiRequest, NextApiResponse } from "next";
import jwt, { JwtPayload, VerifyErrors } from "jsonwebtoken";

interface CustomRequest extends NextApiRequest {
  user?: JwtPayload | string;
}

export function authenticateToken(
  req: CustomRequest,
  res: NextApiResponse,
  next: () => void
) {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({ message: "Unauthorized" });

  if (!process.env.JWT_SECRET) {
    throw new Error("JWT_SECRET is not defined");
  }

  jwt.verify(
    token,
    process.env.JWT_SECRET as string,
    (err: VerifyErrors | null, user: JwtPayload | string | undefined) => {
      if (err) return res.status(403).json({ status: 403, message: "Forbidden" });

      req.user = user;
      next();
    }
  );
}

