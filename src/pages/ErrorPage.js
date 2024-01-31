const ErrorPage = () => {
    return (
        <div className="min-h-screen flex flex-grow items-center justify-center">
            <div className="rounded-lg p-8 text-center shadow-xl">
                <h1 className="mb-4 text-4xl font-bold">404</h1>
                <p className="text-gray-600">
                Oops! The page you are looking for could not be found.
                </p>
                <a
                href="/profile"
                className="mt-4 inline-block rounded px-4 py-2 font-semibold primaryBtn"
                >
                {" "}
                Go back to Profile{" "}
                </a>
            </div>
        </div>

    )
}

export default ErrorPage;