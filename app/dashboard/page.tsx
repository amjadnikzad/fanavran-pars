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
      <div className="flex items-center gap-3">
        <form action={logoutAction}>
          <button
            type="submit"
            className="group relative bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white font-medium px-6 py-2.5 rounded-lg shadow-md hover:shadow-lg transform hover:scale-105 transition-all duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
          >
            <span className="flex items-center gap-2">
              <svg className="w-4 h-4 group-hover:rotate-12 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
              خروج
            </span>
          </button>
        </form>

        <a
          href="/"
          className="group relative bg-gradient-to-r from-slate-800 to-slate-900 hover:from-slate-700 hover:to-slate-800 text-white font-medium px-6 py-2.5 rounded-lg shadow-md hover:shadow-lg transform hover:scale-105 transition-all duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2 inline-flex items-center gap-2"
        >
          <svg className="w-4 h-4 group-hover:-translate-x-1 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
          </svg>
          خانه
        </a>
      </div>
    </div>
  )
}