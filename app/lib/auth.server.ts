import jwt from "jsonwebtoken";
import { redirect } from "@remix-run/node";
import { getUserById } from "~/models/user.server";
import type { UserPublic } from "~/models/user.server";

const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key-change-in-production";
const JWT_EXPIRES_IN = "7d";

export interface JWTPayload {
  userId: string;
}

export function createToken(userId: string): string {
  return jwt.sign({ userId } as JWTPayload, JWT_SECRET, {
    expiresIn: JWT_EXPIRES_IN,
  });
}

export function verifyToken(token: string): JWTPayload | null {
  try {
    const payload = jwt.verify(token, JWT_SECRET) as JWTPayload;
    return payload;
  } catch (error) {
    return null;
  }
}

export function getTokenFromRequest(request: Request): string | null {
  const cookieHeader = request.headers.get("Cookie");
  if (!cookieHeader) return null;

  const cookies = cookieHeader.split(";").reduce((acc, cookie) => {
    const [key, value] = cookie.trim().split("=");
    acc[key] = value;
    return acc;
  }, {} as Record<string, string>);

  return cookies.token || null;
}

export async function getUserFromRequest(
  request: Request
): Promise<UserPublic | null> {
  const token = getTokenFromRequest(request);
  if (!token) return null;

  const payload = verifyToken(token);
  if (!payload) return null;

  const user = await getUserById(payload.userId);
  if (!user) return null;

  return {
    _id: user._id!.toString(),
    email: user.email,
    name: user.name,
    createdAt: user.createdAt,
    updatedAt: user.updatedAt,
  };
}

export async function requireAuth(request: Request): Promise<UserPublic> {
  const user = await getUserFromRequest(request);
  if (!user) {
    throw redirect("/login");
  }
  return user;
}

export function createAuthCookie(token: string): string {
  return `token=${token}; HttpOnly; Path=/; Max-Age=${60 * 60 * 24 * 7}; SameSite=Lax`;
}

export function createLogoutCookie(): string {
  return `token=; HttpOnly; Path=/; Max-Age=0; SameSite=Lax`;
}
