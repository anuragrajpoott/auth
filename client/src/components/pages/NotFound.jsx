import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

function NotFound() {
  const { isAuthenticated } = useSelector((state) => state.auth);

  const redirectPath = isAuthenticated ? "/dashboard" : "/login";

  return (
    <div className="page-container">
      <div className="w-full max-w-md rounded-2xl border border-slate-200 bg-white p-10 text-center shadow-sm">
        <span className="text-6xl font-bold text-blue-600">404</span>

        <h1 className="mt-4 text-3xl font-bold text-slate-900">
          Page Not Found
        </h1>

        <p className="mt-3 text-slate-600">
          The page you're looking for doesn't exist or may have been moved.
        </p>

        <Link
          to={redirectPath}
          className="mt-8 inline-flex items-center justify-center rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-blue-700"
        >
          {isAuthenticated ? "Go to Dashboard" : "Go to Login"}
        </Link>
      </div>
    </div>
  );
}

export default NotFound;