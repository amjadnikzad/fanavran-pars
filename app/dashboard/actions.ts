"use server";

import { redirect } from "next/navigation";
import { cookies } from "next/headers";

// Simple version (recommended)
export async function logoutAction() {
  try {
    const cookieStore = await cookies();
    cookieStore.delete("user-session");
  } catch (error) {
    console.error("Logout error:", error);
    throw new Error("Error logging out");
  }
  redirect("/");
}

