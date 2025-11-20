import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-8">
      <h1 className="text-6xl font-bold text-gray-800">404</h1>
      <p className="mt-4 text-xl text-gray-600">Page not found</p>
      <Link to="/" className="mt-6 rounded-lg bg-blue-500 px-6 py-3 text-white hover:bg-blue-600">
        Go Home
      </Link>
    </div>
  );
};

export default NotFound;
