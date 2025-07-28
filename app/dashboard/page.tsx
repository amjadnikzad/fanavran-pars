import { getCurrentUser, getUserDisplayName, formatUserLocation } from '@/lib/utils'
import { redirect } from 'next/navigation'
import { logoutAction } from './actions'
import { UserData } from '@/lib/schemas/auth';

export default async function DashboardPage() {
  const user = await getCurrentUser() as UserData;

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold mb-2">داشبورد</h1>
        
      </div>

      <div className="bg-white border rounded-lg p-6 mb-6">
        <div className="flex items-start gap-4 mb-6">
          <img 
            src={user.picture.large} 
            alt="Profile" 
            className="w-16 h-16 rounded-full"
          />
          <div>
            <h2 className="text-xl font-semibold">{getUserDisplayName(user)}</h2>
            <p className="text-gray-600">{user.email}</p>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h3 className="font-medium mb-3">اطلاعات تماس</h3>
            <div className="space-y-2 text-sm">
              <div>
                <span className="text-gray-500">شماره همراه:</span> {user.phone}
              </div>
              <div>
                <span className="text-gray-500">ایمیل:</span> {user.email}
              </div>
            </div>
          </div>

          <div>
            <h3 className="font-medium mb-3">اطلاعات شخصی</h3>
            <div className="space-y-2 text-sm">
              <div>
                <span className="text-gray-500">نام:</span> {getUserDisplayName(user)}
              </div>
              {user.location && (
                <div>
                  <span className="text-gray-500">آدرس:</span> {formatUserLocation(user)}
                </div>
              )}
            </div>
          </div>
        </div>

        
      </div>

      <form action={logoutAction}>
        <button 
          type="submit"
          className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded"
        >
          خروج
        </button>
      </form>
    </div>
  )
}