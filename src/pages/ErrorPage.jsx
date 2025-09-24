
import { Link } from "react-router-dom";

const ErrorPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-black p-6">
      <div className="bg-white rounded-3xl shadow-xl p-10 max-w-lg text-center">
        <h1 className="text-9xl font-extrabold text-black mb-6">404</h1>
        <h2 className="text-3xl font-bold mb-4 text-gray-900">Page Not Found</h2>
        <p className="text-gray-700 mb-8">
          Sorry, the page you are looking for doesn’t exist or has been moved.
        </p>
        <Link
          to="/"
          className="inline-block px-6 py-3 border border-black text-black font-semibold rounded-xl shadow hover:bg-black hover:text-white transition transform hover:scale-105"
        >
          Go Back Home
        </Link>
      </div>
    </div>
  );
};

export default ErrorPage;
