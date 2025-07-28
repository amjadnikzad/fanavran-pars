"use server";

import { cookies } from "next/headers";
import { loginSchema, type UserData } from "@/lib/schemas/auth";
import { fetchRandomUser } from "@/lib/api";

export type LoginActionState = {
  success: boolean;
  errors?: Record<string, string[]>;
  message?: string;
};

export async function loginAction(
  prevState: LoginActionState,
  formData: FormData
): Promise<LoginActionState> {
  try {
    const rawFormData = {
      firstName: formData.get("firstName"),
      lastName: formData.get("lastName"),
      phone: formData.get("phone"),
    };

    const validatedFields = loginSchema.safeParse(rawFormData);

    if (!validatedFields.success) {
      return {
        success: false,
        errors: validatedFields.error.flatten().fieldErrors,
        message: "اطلاعات وارد شده معتبر نیست",
      };
    }

    const apiUserData = await fetchRandomUser();
    const userData: UserData = {
      ...validatedFields.data,
      ...apiUserData,
    };

    const cookieStore = await cookies();
    cookieStore.set("user-session", JSON.stringify(userData), {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 60 * 60 * 24,
      path: "/",
    });

    return {
      success: true,
      message: "ورود موفقیت‌آمیز بود! در حال انتقال...",
    };
  } catch (error) {
    console.error("Login error:", error);

    if (
      error instanceof Error &&
      error.message === "خطا در دریافت اطلاعات کاربر"
    ) {
      return {
        success: false,
        message:
          "خطا در دریافت اطلاعات. لطفاً اتصال اینترنت خود را بررسی کنید.",
      };
    }

    return {
      success: false,
      message: "خطا در ورود به سیستم. لطفاً دوباره تلاش کنید.",
    };
  }
}
