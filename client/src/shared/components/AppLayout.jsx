import { useState } from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { useAuth } from '../../features/auth/hooks/useAuth.jsx';
import { useActiveCar } from '../../features/cars/hooks/useActiveCar.jsx';
import { useDarkMode } from '../hooks/useDarkMode.js';

const navLinkClass = ({ isActive }) =>
  `block px-3 py-2 rounded-md text-sm font-medium ${
    isActive
      ? 'bg-gray-900 text-white dark:bg-white dark:text-gray-900'
      : 'text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700'
  }`;

const actionButtonClass =
  'block w-full text-left px-3 py-2 rounded-md text-sm font-medium text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700';

function AppLayout() {
  const { logout } = useAuth();
  const { activeCar, clearActiveCar } = useActiveCar();
  const { isDark, toggle } = useDarkMode();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  function handleLogout() {
    setMenuOpen(false);
    logout();
    clearActiveCar();
    navigate('/login', { replace: true });
  }

  function goToSelectCar() {
    setMenuOpen(false);
    navigate('/select-car?manage=true');
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <nav className="bg-white dark:bg-gray-800 shadow px-4 sm:px-6 py-3">
        <div className="flex items-center gap-4">
          <span className="font-bold text-gray-900 dark:text-white mr-2 sm:mr-4">VoltPoint</span>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-2">
            <NavLink to="/dashboard" className={navLinkClass}>
              Dashboard
            </NavLink>
            <NavLink to="/map" className={navLinkClass}>
              Map
            </NavLink>
            <NavLink to="/history" className={navLinkClass}>
              History
            </NavLink>
          </div>

          <div className="hidden md:flex ml-auto items-center gap-3">
            <button onClick={goToSelectCar} className={actionButtonClass}>
              {activeCar ? `${activeCar.make} ${activeCar.model} · Change car` : 'Add a car'}
            </button>
            <button onClick={toggle} className={actionButtonClass}>
              {isDark ? 'Light mode' : 'Dark mode'}
            </button>
            <button onClick={handleLogout} className={actionButtonClass}>
              Logout
            </button>
          </div>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMenuOpen((prev) => !prev)}
            className="md:hidden ml-auto p-2 rounded-md text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
            aria-label="Toggle menu"
          >
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              {menuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile menu panel */}
        {menuOpen && (
          <div className="md:hidden mt-3 space-y-1 pb-2">
            <NavLink to="/dashboard" className={navLinkClass} onClick={() => setMenuOpen(false)}>
              Dashboard
            </NavLink>
            <NavLink to="/map" className={navLinkClass} onClick={() => setMenuOpen(false)}>
              Map
            </NavLink>
            <NavLink to="/history" className={navLinkClass} onClick={() => setMenuOpen(false)}>
              History
            </NavLink>
            <hr className="my-2 border-gray-200 dark:border-gray-700" />
            <button onClick={goToSelectCar} className={actionButtonClass}>
              {activeCar ? `${activeCar.make} ${activeCar.model} · Change car` : 'Add a car'}
            </button>
            <button onClick={toggle} className={actionButtonClass}>
              {isDark ? 'Light mode' : 'Dark mode'}
            </button>
            <button onClick={handleLogout} className={actionButtonClass}>
              Logout
            </button>
          </div>
        )}
      </nav>
      <Outlet />
    </div>
  );
}

export default AppLayout;
