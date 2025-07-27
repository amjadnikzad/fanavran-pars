
type props = {
    isOpen: boolean,
    onComplete: () => void
}
export default function TransitionModal({ isOpen, onComplete }: props) {
    
    if (!isOpen) return null
    setTimeout(() => {
        onComplete();
    }, 2500)
    return (
        <div className="fixed inset-0 bg-black/20 bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-8 max-w-sm w-full mx-4 text-center">
               
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg
                        className="w-8 h-8 text-green-600"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M5 13l4 4L19 7"
                        />
                    </svg>
                </div>

                
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    ورود موفقیت‌آمیز
                </h3>

                
                <p className="text-gray-600 mb-6">
                    در حال انتقال به داشبورد...
                </p>


                <div className="mt-4">
                    <div className="animate-spin rounded-full h-6 w-6 border-2 border-blue-600 border-t-transparent mx-auto"></div>
                </div>
            </div>
        </div>
    )
}