import type { ObjectId } from "mongodb";
import { getDb } from "../lib/db.server";
import bcrypt from "bcryptjs";

export interface User {
  _id?: ObjectId;
  email: string;
  password: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface UserPublic {
  _id: string;
  email: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
}

const USERS_COLLECTION = "users";

export async function getUserByEmail(email: string): Promise<User | null> {
  const db = await getDb();
  const user = await db.collection<User>(USERS_COLLECTION).findOne({ email });
  return user;
}

export async function getUserById(id: string): Promise<User | null> {
  const db = await getDb();
  const { ObjectId } = await import("mongodb");
  const user = await db
    .collection<User>(USERS_COLLECTION)
    .findOne({ _id: new ObjectId(id) });
  return user;
}

export async function createUser(
  email: string,
  password: string,
  name: string
): Promise<UserPublic> {
  const db = await getDb();
  const hashedPassword = await bcrypt.hash(password, 10);

  const user: Omit<User, "_id"> = {
    email,
    password: hashedPassword,
    name,
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  const result = await db.collection<User>(USERS_COLLECTION).insertOne(user as User);

  return {
    _id: result.insertedId.toString(),
    email,
    name,
    createdAt: user.createdAt,
    updatedAt: user.updatedAt,
  };
}

export async function verifyLogin(
  email: string,
  password: string
): Promise<UserPublic | null> {
  const user = await getUserByEmail(email);

  if (!user) {
    return null;
  }

  const isValid = await bcrypt.compare(password, user.password);

  if (!isValid) {
    return null;
  }

  return {
    _id: user._id!.toString(),
    email: user.email,
    name: user.name,
    createdAt: user.createdAt,
    updatedAt: user.updatedAt,
  };
}

export function sanitizeUser(user: User): UserPublic {
  return {
    _id: user._id!.toString(),
    email: user.email,
    name: user.name,
    createdAt: user.createdAt,
    updatedAt: user.updatedAt,
  };
}
