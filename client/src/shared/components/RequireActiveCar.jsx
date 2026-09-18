import { Navigate, Outlet } from 'react-router-dom';
import { useActiveCar } from '../../features/cars/hooks/useActiveCar.jsx';

function RequireActiveCar() {
  const { activeCar } = useActiveCar();

  if (!activeCar) {
    return <Navigate to="/select-car" replace />;
  }

  return <Outlet />;
}

export default RequireActiveCar;
