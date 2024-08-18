import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET 

export function generateToken(userId: string): string {
  return jwt.sign({ userId }, JWT_SECRET, { expiresIn: "1h" });
}

export function verifyToken(token: string) {
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch (err: any) {
    throw new Error(`Invalid token: ${err.message}`);
  }
}
