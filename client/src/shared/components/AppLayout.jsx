import { NavLink, Outlet } from 'react-router-dom';

const navLinkClass = ({ isActive }) =>
  `px-3 py-2 rounded-md text-sm font-medium ${
    isActive ? 'bg-gray-900 text-white' : 'text-gray-600 hover:bg-gray-100'
  }`;

function AppLayout() {
  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow px-6 py-3 flex items-center gap-4">
        <span className="font-bold text-gray-900 mr-4">VoltPoint</span>
        <NavLink to="/dashboard" className={navLinkClass}>
          Dashboard
        </NavLink>
        <NavLink to="/map" className={navLinkClass}>
          Map
        </NavLink>
      </nav>
      <Outlet />
    </div>
  );
}

export default AppLayout;
