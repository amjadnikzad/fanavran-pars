import { cookies } from 'next/headers'
import { userSchema, type UserData } from './validations/auth'

export async function getCurrentUser(): Promise<UserData | null> {
  try {
    const cookieStore = await cookies()
    const userCookie = cookieStore.get('user-session')
    
    if (!userCookie?.value) {
      return null
    }
    
    const userData = JSON.parse(userCookie.value)
    
    const validatedUser = userSchema.safeParse(userData)
    
    if (!validatedUser.success) {
      console.error('Invalid user data in cookie:', validatedUser.error)
      return null
    }
    
    return validatedUser.data
  } catch (error) {
    console.error('Error getting current user:', error)
    return null
  }
}

export function getUserDisplayName(user: UserData): string {
  return `${user.firstName} ${user.lastName}`
}

export function formatUserLocation(user: UserData): string {
  if (!user.location) return 'Location not available'
  return `${user.location.city}, ${user.location.country}`
}