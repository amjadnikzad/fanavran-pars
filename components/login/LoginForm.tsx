'use client'

import { startTransition, useActionState, useEffect, useRef, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { loginSchema, type LoginFormData } from '@/lib/validations/auth'
import { loginAction } from '@/app/login/actions'
import TransitionModal from './TransitionModal'

const initialState = {
    success: false,
    errors: {},
    message: ''
}

export default function LoginForm() {
    const [state, formAction, isPending] = useActionState(loginAction, initialState);
    const [showModal, setShowModal] = useState(false);
    const router = useRouter();

    const {
        register,
        handleSubmit,
        formState: { errors },
        setError,
        clearErrors
    } = useForm<LoginFormData>({
        resolver: zodResolver(loginSchema)
    })

    useEffect(() => {
        if (state?.errors && Object.keys(state.errors).length > 0) {
            clearErrors()
            Object.entries(state.errors).forEach(([field, messages]) => {
                if (messages && Array.isArray(messages) && messages.length > 0) {
                    setError(field as keyof LoginFormData, {
                        type: 'server',
                        message: messages[0]
                    })
                }
            })
        }
    }, [state?.errors])

    const onSubmit = async (data: LoginFormData) => {
        const formData = new FormData()
        formData.append('firstName', data.firstName)
        formData.append('lastName', data.lastName)
        formData.append('phone', data.phone)
        startTransition(() => formAction(formData))
    }
    useEffect(() => {
        if (state?.success) {
            setShowModal(true);

        }
    }, [state?.success])
    return (
        <>

            <div className="min-h-screen flex items-center justify-center bg-gray-100">
                <div className="max-w-md w-full p-6">
                    <div className="text-center mb-8">
                        <h2 className="text-3xl font-bold">ورود</h2>
                        <p className="text-gray-600 mt-2">لطفا اطلاعات خود را وارد کنید</p>
                    </div>

                    <div className="bg-white p-6 rounded-lg shadow">
                        {state?.message && !state?.success && (
                            <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
                                {state.message}
                            </div>
                        )}

                        <form action={formAction} onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                            <div>
                                <label htmlFor="firstName" className="block text-sm font-medium mb-1">
                                    نام
                                </label>
                                <input
                                    {...register('firstName')}
                                    type="text"
                                    id="firstName"
                                    className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                                    disabled={isPending}
                                />
                                {errors.firstName && (
                                    <p className="text-red-600 text-sm mt-1">{errors.firstName.message}</p>
                                )}
                            </div>

                            <div>
                                <label htmlFor="lastName" className="block text-sm font-medium mb-1">
                                    نام خانوادگی
                                </label>
                                <input
                                    {...register('lastName')}
                                    type="text"
                                    id="lastName"
                                    className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                                    disabled={isPending}
                                />
                                {errors.lastName && (
                                    <p className="text-red-600 text-sm mt-1">{errors.lastName.message}</p>
                                )}
                            </div>

                            <div>
                                <label htmlFor="phone" className="block text-sm font-medium mb-1">
                                    شماره تماس
                                </label>
                                <input
                                    {...register('phone')}
                                    type="tel"
                                    id="phone"
                                    className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                                    placeholder="09011234568"
                                    disabled={isPending}
                                />
                                {errors.phone && (
                                    <p className="text-red-600 text-sm mt-1">{errors.phone.message}</p>
                                )}
                            </div>

                            <button
                                type="submit"
                                disabled={isPending}
                                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded disabled:bg-gray-400"
                            >
                                {isPending ? 'در حال ارسال...' : 'ورود'}
                            </button>
                        </form>
                    </div>
                </div>
            </div>
            <TransitionModal isOpen={showModal} onComplete={() => {
                router.push('/dashboard')
            }} />
        </>
    )
}
