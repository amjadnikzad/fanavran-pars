import { ApiUserData, apiUserSchema } from "./schemas/auth";

export async function fetchRandomUser(): Promise<ApiUserData> {
  try {
    const response = await fetch("https://randomuser.me/api/");

    if (!response.ok) {
      throw new Error("Failed to fetch user data");
    }

    const data = await response.json();

    
    const userData = {
      email: data.results[0].email,
      picture: data.results[0].picture,
      location: data.results[0].location,
    };

    
    return apiUserSchema.parse(userData);
  } catch (error) {
    console.error("Error fetching random user:", error);
    throw new Error("خطا در دریافت اطلاعات کاربر");
  }
}
