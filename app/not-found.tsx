import Link from 'next/link'

export default function NotFound() {
    return (
        <div className="min-h-screen flex mt-16">
            <div className="text-center">
                <h1 className="text-6xl font-bold text-gray-900 dark:text-gray-100 mb-4">404</h1>
                <p className="text-xl text-gray-600 dark:text-gray-400 mb-8">
                    Page not found - if you think it's a dead link, let me know.
                </p>
                <Link
                    href="/"
                    className="text-blue-600 dark:text-blue-400 hover:underline"
                >
                    <span className="text-2xl font-medium">Back to Home</span>
                </Link>
            </div>
        </div>
    )
}
