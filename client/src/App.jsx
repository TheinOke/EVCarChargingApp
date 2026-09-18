import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import AppLayout from './shared/components/AppLayout.jsx';
import ProtectedRoute from './shared/components/ProtectedRoute.jsx';
import RequireActiveCar from './shared/components/RequireActiveCar.jsx';
import NotFoundPage from './shared/components/NotFoundPage.jsx';
import LoginPage from './features/auth/components/LoginPage.jsx';
import SignupPage from './features/auth/components/SignupPage.jsx';
import SelectCarPage from './features/cars/components/SelectCarPage.jsx';
import DashboardPage from './features/dashboard/components/DashboardPage.jsx';
import MapPage from './features/map/components/MapPage.jsx';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />

        <Route element={<ProtectedRoute />}>
          <Route path="/select-car" element={<SelectCarPage />} />

          <Route element={<AppLayout />}>
            <Route index element={<Navigate to="/dashboard" replace />} />
            <Route path="/map" element={<MapPage />} />

            {/* Only the Dashboard needs a selected car (for charge-estimate calls) */}
            <Route element={<RequireActiveCar />}>
              <Route path="/dashboard" element={<DashboardPage />} />
            </Route>
          </Route>
        </Route>

        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
