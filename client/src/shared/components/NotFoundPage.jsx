import { Link } from 'react-router-dom';

function NotFoundPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 dark:bg-gray-900 px-4">
      <h1 className="text-6xl font-bold text-gray-900 dark:text-white">404</h1>
      <p className="mt-2 text-gray-500 dark:text-gray-400">Page not found</p>
      <Link to="/dashboard" className="mt-6 text-gray-900 dark:text-white font-medium underline">
        Back to Dashboard
      </Link>
    </div>
  );
}

export default NotFoundPage;
