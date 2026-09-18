import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import AppLayout from './shared/components/AppLayout.jsx';
import DashboardPage from './features/dashboard/components/DashboardPage.jsx';
import MapPage from './features/map/components/MapPage.jsx';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AppLayout />}>
          <Route index element={<Navigate to="/dashboard" replace />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/map" element={<MapPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
