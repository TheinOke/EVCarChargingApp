import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import { AuthProvider } from './features/auth/hooks/useAuth.jsx';
import { ActiveCarProvider } from './features/cars/hooks/useActiveCar.jsx';
import 'leaflet/dist/leaflet.css';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
      <ActiveCarProvider>
        <App />
      </ActiveCarProvider>
    </AuthProvider>
  </React.StrictMode>
);
