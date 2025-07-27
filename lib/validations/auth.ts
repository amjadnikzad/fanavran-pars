import { z } from "zod";

export const loginSchema = z.object({
  firstName: z
    .string()
    .min(2, "نام باید حداقل ۲ کاراکتر باشد")
    .max(50, "نام نمی‌تواند بیش از ۵۰ کاراکتر باشد")
    .regex(/^[a-zA-Zآ-ی\s]+$/, "نام فقط می‌تواند شامل حروف باشد"),

  lastName: z
    .string()
    .min(2, "نام خانوادگی باید حداقل ۲ کاراکتر باشد")
    .max(50, "نام خانوادگی نمی‌تواند بیش از ۵۰ کاراکتر باشد")
    .regex(/^[a-zA-Zآ-ی\s]+$/, "نام خانوادگی فقط می‌تواند شامل حروف باشد"),

  phone: z
    .string()
    .min(10, "شماره تلفن باید حداقل ۱۰ رقم باشد")
    .max(15, "شماره تلفن نمی‌تواند بیش از ۱۵ رقم باشد")
    .regex(/^(?:\+98|0098|0)?9\d{9}$/, "شماره تلفن معتبر وارد کنید"),
});

export const apiUserSchema = z.object({
  email: z.email(),
  picture: z.object({
    large: z.url(),
    medium: z.url(),
    thumbnail: z.url(),
  }),
  location: z
    .object({
      city: z.string(),
      country: z.string(),
    })
    .optional(),
});

export const userSchema = z.object({
  firstName: z.string(),
  lastName: z.string(),
  phone: z.string(),
  email: z.email(),
  picture: z.object({
    large: z.string(),
    medium: z.string(),
    thumbnail: z.string(),
  }),
  location: z
    .object({
      city: z.string(),
      country: z.string(),
    })
    .optional(),
});

export type LoginFormData = z.infer<typeof loginSchema>;
export type ApiUserData = z.infer<typeof apiUserSchema>;
export type UserData = z.infer<typeof userSchema>;
