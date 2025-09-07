import { useLocation } from "react-router-dom";
import { useEffect } from "react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-gradient-dashboard flex items-center justify-center px-4">
      <div className="max-w-md text-center p-6 bg-white/70 backdrop-blur-md rounded-2xl shadow-lg">
        <h1 className="text-5xl font-extrabold text-red-600 mb-4">404</h1>
        <p className="text-lg text-gray-800 mb-2 font-semibold">
          Oops! Page Not Found
        </p>
        <p className="text-sm text-muted-foreground mb-6">
          The page <code className="font-mono text-sm text-red-500">{location.pathname}</code> doesn’t exist or has been moved.
        </p>
        <a
          href="/"
          className="inline-block px-4 py-2 bg-primary text-white rounded-lg shadow hover:bg-primary/90 transition"
        >
          Return to Dashboard
        </a>
      </div>
    </div>
  );
};

export default NotFound;
