import { CreationOptional } from "sequelize";

export interface UserType {
  id: number;
  username: string;
  email: string;
  password: string;
  firstname: string;
  lastname: string;
  createdAt: string;
  updatedAt: string;
}

export interface PostType {
  id: number;
  slug: string;
  title: string;
  body: string;
  isPublished: boolean;
  userId: number;
  createdAt: string;
  updatedAt: string;
}

export type AppModelType<T> = {
  [P in keyof T]: P extends "createdAt" | "createdAt"
    ? CreationOptional<Date>
    : P;
};
