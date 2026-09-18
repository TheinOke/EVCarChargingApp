import { createContext, useContext, useState, useCallback } from 'react';

const STORAGE_KEY = 'voltpoint_active_car';
const ActiveCarContext = createContext(null);

function readStoredCar() {
  try {
    const raw = sessionStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

function writeStoredCar(car) {
  try {
    if (car) {
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify(car));
    } else {
      sessionStorage.removeItem(STORAGE_KEY);
    }
  } catch {
    // ignore storage failures
  }
}

export function ActiveCarProvider({ children }) {
  const [activeCar, setActiveCarState] = useState(readStoredCar);

  const setActiveCar = useCallback((car) => {
    writeStoredCar(car);
    setActiveCarState(car);
  }, []);

  const clearActiveCar = useCallback(() => {
    writeStoredCar(null);
    setActiveCarState(null);
  }, []);

  return (
    <ActiveCarContext.Provider value={{ activeCar, setActiveCar, clearActiveCar }}>
      {children}
    </ActiveCarContext.Provider>
  );
}

export function useActiveCar() {
  const ctx = useContext(ActiveCarContext);
  if (!ctx) {
    throw new Error('useActiveCar must be used within an ActiveCarProvider');
  }
  return ctx;
}
