import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { useAuth } from '../../features/auth/hooks/useAuth.jsx';
import { useActiveCar } from '../../features/cars/hooks/useActiveCar.jsx';
import { useDarkMode } from '../hooks/useDarkMode.js';

const navLinkClass = ({ isActive }) =>
  `px-3 py-2 rounded-md text-sm font-medium ${
    isActive
      ? 'bg-gray-900 text-white dark:bg-white dark:text-gray-900'
      : 'text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700'
  }`;

function AppLayout() {
  const { logout } = useAuth();
  const { activeCar, clearActiveCar } = useActiveCar();
  const { isDark, toggle } = useDarkMode();
  const navigate = useNavigate();

  function handleLogout() {
    logout();
    clearActiveCar();
    navigate('/login', { replace: true });
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <nav className="bg-white dark:bg-gray-800 shadow px-6 py-3 flex items-center gap-4">
        <span className="font-bold text-gray-900 dark:text-white mr-4">VoltPoint</span>
        <NavLink to="/dashboard" className={navLinkClass}>
          Dashboard
        </NavLink>
        <NavLink to="/map" className={navLinkClass}>
          Map
        </NavLink>
        <div className="ml-auto flex items-center gap-3">
          {activeCar && (
            <button
              onClick={() => navigate('/select-car')}
              className="px-3 py-2 rounded-md text-sm font-medium text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700"
            >
              {activeCar.make} {activeCar.model} &middot; Change car
            </button>
          )}
          <button
            onClick={toggle}
            className="px-3 py-2 rounded-md text-sm font-medium text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700"
          >
            {isDark ? 'Light mode' : 'Dark mode'}
          </button>
          <button
            onClick={handleLogout}
            className="px-3 py-2 rounded-md text-sm font-medium text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700"
          >
            Logout
          </button>
        </div>
      </nav>
      <Outlet />
    </div>
  );
}

export default AppLayout;
